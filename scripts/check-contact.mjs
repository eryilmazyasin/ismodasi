import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";

// Test Wrangler's actual Worker bundle without contacting the delivery provider.
const bundle = await readFile("output/contact-worker/index.js", "utf8");
await writeFile("output/contact-worker/test-bundle.mjs", bundle);
const { default: worker } = await import("../output/contact-worker/test-bundle.mjs");
const originalFetch = globalThis.fetch;
const body = {
  name: "İş Modası Test", company: "Test Firma", email: "visitor@example.com",
  quantity: "12", message: "Polar ve iş pantolonu hakkında bilgi istiyorum.", website: "",
  requestId: "48c0836f-bf86-4ed2-9528-7522af734b12",
};
const calls = [];
const env = {
  CONTACT_FROM: "İş Modası <form@bildirim.ismodasi.com>",
  RESEND_API_KEY: "test-key-not-a-real-secret",
  CONTACT_RATE_LIMITER: { limit: async () => ({ success: true }) },
  ASSETS: { fetch: async () => new Response("static asset") },
};
function contactRequest(values = body, headers = {}) {
  return new Request("https://ismodasi.com/api/contact", {
    method: "POST", headers: { Origin: "https://ismodasi.com", "Content-Type": "application/json", ...headers },
    body: JSON.stringify(values),
  });
}

try {
  globalThis.fetch = async (url, options) => {
    assert.equal(url, "https://api.resend.com/emails");
    calls.push(options);
    return Response.json({ id: "test-message-id" });
  };
  let response = await worker.fetch(contactRequest({ ...body, to: "attacker@example.com" }), env);
  assert.equal(response.status, 200);
  assert.equal((await response.json()).success, true);
  assert.equal(response.headers.get("cache-control"), "no-store");
  const sent = JSON.parse(calls[0].body);
  assert.deepEqual(sent.to, ["info@ismodasi.com"]);
  assert.equal(sent.reply_to, body.email);
  assert.equal(sent.from, env.CONTACT_FROM);
  assert.ok(sent.text.includes(body.message));
  assert.ok(sent.text.includes(body.name));
  assert.equal(calls[0].headers["Idempotency-Key"], `contact/${body.requestId}`);
  await worker.fetch(contactRequest(), env);
  assert.equal(calls[0].headers["Idempotency-Key"], calls[1].headers["Idempotency-Key"]);
  const delivered = calls.length;

  for (const values of [
    { ...body, name: "" }, { ...body, email: "invalid" }, { ...body, message: "" },
    { ...body, quantity: "0" }, { ...body, quantity: "1.5" },
    { ...body, message: "x".repeat(1501) }, { ...body, email: "visitor@example.com\r\nBcc: x@example.com" },
    { ...body, website: "https://spam.example.com" }, { ...body, requestId: "invalid" },
    { ...body, name: 123 }, null, [],
  ]) assert.equal((await worker.fetch(contactRequest(values), env)).status, 400);
  assert.equal((await worker.fetch(contactRequest(body, { Origin: "https://other.example.com" }), env)).status, 403);
  assert.equal((await worker.fetch(contactRequest(body, { "Content-Type": "text/plain" }), env)).status, 415);
  assert.equal((await worker.fetch(new Request("https://ismodasi.com/api/contact"), env)).status, 405);
  assert.equal((await worker.fetch(contactRequest({ ...body, message: "x".repeat(20000) }), env)).status, 413);
  assert.equal((await worker.fetch(contactRequest(), { ...env, RESEND_API_KEY: undefined })).status, 503);
  response = await worker.fetch(contactRequest(), { ...env, CONTACT_RATE_LIMITER: { limit: async () => ({ success: false }) } });
  assert.equal(response.status, 429);
  assert.equal(response.headers.get("retry-after"), "60");
  assert.equal(calls.length, delivered, "Rejected requests must never call the email provider");
  assert.equal(await (await worker.fetch(new Request("https://ismodasi.com/urunler"), env)).text(), "static asset");

  globalThis.fetch = async () => Response.json({ message: "provider details must not leak" }, { status: 403 });
  response = await worker.fetch(contactRequest(), env);
  assert.equal(response.status, 502);
  assert.ok(!(await response.text()).includes("provider details"));
  globalThis.fetch = async () => { throw new DOMException("Timed out", "TimeoutError"); };
  assert.equal((await worker.fetch(contactRequest(), env)).status, 502);
  console.log("Contact checks passed: fixed recipient, reply-to, idempotency, validation, origin, body size, spam limits, missing credentials, provider failure/timeout and asset fallback. No real email sent.");
} finally {
  globalThis.fetch = originalFetch;
}
