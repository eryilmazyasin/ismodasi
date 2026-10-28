"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { validateContact } from "@/lib/contact";
import type { ContactResponse } from "@/types/contact.types";

const fields = [
  { name: "name", label: "Adınız soyadınız", autoComplete: "name", required: true },
  { name: "company", label: "Firma adı", autoComplete: "organization", required: false },
  { name: "email", label: "E-posta adresiniz", autoComplete: "email", required: true },
  { name: "quantity", label: "Tahmini adet", autoComplete: "off", required: false },
];

export default function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [failed, setFailed] = useState(false);
  const submitting = useRef(false);
  const requestId = useRef<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const company = String(data.get("company") || "").trim();
    const quantity = String(data.get("quantity") || "").trim();
    const message = String(data.get("message") || "").trim();
    const values = { name, email, company, quantity, message };
    const nextErrors = validateContact(values);
    setErrors(nextErrors);
    setFeedback("");
    setFailed(false);

    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      (form.elements.namedItem(firstError) as HTMLElement | null)?.focus();
      return;
    }

    // Keep the site's mailto flow: personal information is neither stored nor sent to a server.
    // The previous draft-only behavior above is superseded by the requested server-side delivery.
    submitting.current = true;
    setPending(true);
    try {
      // Reuse this identifier if a network failure leaves the delivery outcome uncertain.
      requestId.current ??= crypto.randomUUID();
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(20000),
        body: JSON.stringify({ ...values, website: String(data.get("website") || ""), requestId: requestId.current }),
      });
      const result: ContactResponse = await response.json();
      if (!response.ok || !result.success) {
        if (result.errors) {
          setErrors(result.errors);
          // Wait for the disabled fieldset to be enabled before restoring error focus.
          requestAnimationFrame(() => (form.elements.namedItem(Object.keys(result.errors!)[0]) as HTMLElement | null)?.focus());
        }
        setFailed(true);
        setFeedback(result.message || "Talebiniz gönderilemedi. Tekrar deneyin veya bizi arayın.");
        return;
      }
      form.reset();
      requestId.current = null;
      setFeedback(result.message);
    } catch {
      setFailed(true);
      setFeedback("Gönderim doğrulanamadı. Bilgilerinizi koruduk; bağlantınızı kontrol edip tekrar deneyin veya info@ismodasi.com adresine yazın.");
    } finally {
      submitting.current = false;
      setPending(false);
    }
  }

  return (
    <div className="contact-form-panel">
      <span className="section-label">İHTİYACINIZI PAYLAŞIN</span>
      <h2>Ekibiniz için ne düşünüyorsunuz?</h2>
      <p className="contact-form-intro">Birkaç detayla başlayalım. <span>* Zorunlu alanlar</span></p>
      <form noValidate onSubmit={handleSubmit} aria-busy={pending} onChange={() => {
        setFeedback("");
        setFailed(false);
        requestId.current = null;
      }}>
        <fieldset disabled={pending} className="contact-form-fields">
          <div className="contact-honeypot" aria-hidden="true">
            <label htmlFor="contact-website">Web sitesi</label>
            <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>
          <div className="contact-form-grid">
            {fields.map((field) => (
              <div className="contact-field" key={field.name}>
                <label htmlFor={`contact-${field.name}`}>{field.label}{field.required && " *"}</label>
                <input
                  id={`contact-${field.name}`}
                  name={field.name}
                  type={field.name === "email" ? "email" : "text"}
                  inputMode={field.name === "quantity" ? "numeric" : undefined}
                  autoComplete={field.autoComplete}
                  required={field.required}
                  maxLength={field.name === "quantity" ? 7 : 120}
                  aria-invalid={Boolean(errors[field.name])}
                  aria-describedby={errors[field.name] ? `contact-${field.name}-error` : undefined}
                />
                {errors[field.name] && <p className="contact-field-error" id={`contact-${field.name}-error`}>{errors[field.name]}</p>}
              </div>
            ))}
          </div>
          <div className="contact-field">
            <label htmlFor="contact-message">İlgilendiğiniz ürünler ve mesajınız *</label>
            <textarea className="resize-none" id="contact-message" name="message" rows={4} maxLength={1500} required
              placeholder="Örneğin: Depo ekibimiz için logolu polar ve iş pantolonu arıyoruz."
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "contact-message-error" : undefined} />
            {errors.message && <p className="contact-field-error" id="contact-message-error">{errors.message}</p>}
          </div>
        </fieldset>
        <p className="contact-form-note">Talebiniz doğrudan ekibimize iletilir. Verdiğiniz iletişim bilgileri üzerinden size dönüş yapacağız.</p>
        <button className="button button-dark contact-submit" disabled={pending} type="submit">
          <span>{pending ? "Gönderiliyor…" : "Talebi gönder"}</span><ArrowUpRight size={18} aria-hidden="true" />
        </button>
        <div className="contact-feedback" role="status" aria-live="polite" aria-atomic="true" data-error={failed}>
          {feedback && <p className="contact-form-feedback">{feedback}</p>}
        </div>
      </form>
    </div>
  );
}
