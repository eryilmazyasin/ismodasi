import { validateContact } from "../lib/contact";
import type { ContactValues, ContactResponse } from "../types/contact.types";
import type { WorkerEnv } from "./types";

function jsonResponse(body: ContactResponse, status = 200, headers?: HeadersInit) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", ...headers },
  });
}

async function handleContact(request: Request, env: WorkerEnv) {
  if (request.method !== "POST")
    return jsonResponse({ message: "Bu adres yalnızca form gönderimi içindir." }, 405, { Allow: "POST" });
  if (request.headers.get("Origin") !== new URL(request.url).origin)
    return jsonResponse({ message: "Formu web sitesi üzerinden gönderin." }, 403);
  if (!request.headers.get("Content-Type")?.toLowerCase().startsWith("application/json"))
    return jsonResponse({ message: "Geçersiz istek biçimi." }, 415);

  // Bound the actual request body, including requests without a Content-Length header.
  const reader = request.body?.getReader();
  if (!reader) return jsonResponse({ message: "Form bilgileri eksik." }, 400);
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > 16384) {
        await reader.cancel();
        return jsonResponse({ message: "Form içeriği çok uzun." }, 413);
      }
      chunks.push(value);
    }
  } catch {
    return jsonResponse({ message: "Form bilgileri okunamadı." }, 400);
  }
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  let data: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(new TextDecoder().decode(bytes));
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Invalid form");
    data = parsed as Record<string, unknown>;
  } catch {
    return jsonResponse({ message: "Form bilgileri okunamadı." }, 400);
  }
  const values: ContactValues = { name: "", company: "", email: "", quantity: "", message: "" };
  for (const field of Object.keys(values) as (keyof ContactValues)[]) {
    if (typeof data[field] !== "string") return jsonResponse({ message: "Form bilgileri eksik." }, 400);
    values[field] = data[field].trim();
  }
  if (typeof data.website !== "string" || data.website.length > 0)
    return jsonResponse({ message: "Form gönderilemedi. Doğrudan e-posta ile iletişime geçebilirsiniz." }, 400);
  const errors = validateContact(values);
  if (Object.keys(errors).length) return jsonResponse({ message: "İşaretli alanları kontrol edin.", errors }, 400);
  if (typeof data.requestId !== "string" || !/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(data.requestId))
    return jsonResponse({ message: "Sayfayı yenileyip tekrar deneyin." }, 400);
  if (!env.RESEND_API_KEY || !env.CONTACT_FROM)
    return jsonResponse({ message: "Form şu anda kullanılamıyor. info@ismodasi.com adresine yazabilir veya bizi arayabilirsiniz." }, 503);

  // Cloudflare supplies the client IP; the binding keeps counters across Worker instances.
  const { success } = await env.CONTACT_RATE_LIMITER.limit({ key: request.headers.get("CF-Connecting-IP") || "local" });
  if (!success) return jsonResponse({ message: "Çok sık talep gönderdiniz. Bir dakika sonra tekrar deneyin." }, 429, { "Retry-After": "60" });

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      signal: AbortSignal.timeout(10000),
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
        // A retry after a lost response must not send the same inquiry twice.
        "Idempotency-Key": `contact/${data.requestId}`,
      },
      body: JSON.stringify({
        from: env.CONTACT_FROM,
        to: ["info@ismodasi.com"],
        reply_to: values.email,
        subject: "İş Modası — Yeni kurumsal talep",
        text: `Ad soyad: ${values.name}\nFirma: ${values.company || "Belirtilmedi"}\nE-posta: ${values.email}\nTahmini adet: ${values.quantity || "Belirtilmedi"}\n\n${values.message}`,
      }),
    });
    const result = await response.json() as { id?: string };
    if (!response.ok || !result.id) throw new Error("Delivery provider rejected the request");
    return jsonResponse({ success: true, message: "Talebiniz alındı. En kısa sürede sizinle iletişime geçeceğiz." });
  } catch {
    // Do not expose provider responses, credentials, or submitted personal information.
    return jsonResponse({ message: "Gönderim doğrulanamadı. Bilgilerinizi koruduk; tekrar deneyebilir veya info@ismodasi.com adresine yazabilirsiniz." }, 502);
  }
}

export default {
  async fetch(request: Request, env: WorkerEnv): Promise<Response> {
    if (new URL(request.url).pathname === "/api/contact") return handleContact(request, env);
    return env.ASSETS.fetch(request);
  },
};
