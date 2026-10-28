"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";

const fields = [
  { name: "name", label: "Adınız soyadınız", autoComplete: "name", required: true },
  { name: "company", label: "Firma adı", autoComplete: "organization", required: false },
  { name: "email", label: "E-posta adresiniz", autoComplete: "email", required: true },
  { name: "quantity", label: "Tahmini adet", autoComplete: "off", required: false },
];

export default function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [draftHref, setDraftHref] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const company = String(data.get("company") || "").trim();
    const quantity = String(data.get("quantity") || "").trim();
    const message = String(data.get("message") || "").trim();
    const nextErrors: Record<string, string> = {};

    if (!name) nextErrors.name = "Adınızı ve soyadınızı yazın.";
    if (!email || !form.elements.namedItem("email") || !(form.elements.namedItem("email") as HTMLInputElement).validity.valid)
      nextErrors.email = "Geçerli bir e-posta adresi yazın.";
    if (quantity && (!/^\d+$/.test(quantity) || Number(quantity) < 1))
      nextErrors.quantity = "Adedi 1 veya daha büyük bir tam sayı olarak yazın.";
    if (!message) nextErrors.message = "İlgilendiğiniz ürünleri ve ihtiyacınızı kısaca yazın.";
    setErrors(nextErrors);
    setDraftHref("");

    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      (form.elements.namedItem(firstError) as HTMLElement | null)?.focus();
      return;
    }

    // Keep the site's mailto flow: personal information is neither stored nor sent to a server.
    const body = `Merhaba,\n\n${message}\n\nAd soyad: ${name}\nFirma: ${company || "Belirtilmedi"}\nE-posta: ${email}\nTahmini adet: ${quantity || "Belirtilmedi"}`;
    const href = `mailto:info@ismodasi.com?subject=${encodeURIComponent("Kurumsal iş kıyafeti talebi")}&body=${encodeURIComponent(body)}`;
    setDraftHref(href);
    window.location.href = href;
  }

  return (
    <div className="contact-form-panel">
      <span className="section-label">İHTİYACINIZI PAYLAŞIN</span>
      <h2>Ekibiniz için ne düşünüyorsunuz?</h2>
      <p className="contact-form-intro">Birkaç detayla başlayalım. <span>* Zorunlu alanlar</span></p>
      <form noValidate onSubmit={handleSubmit} onChange={() => setDraftHref("")}>
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
        <p className="contact-form-note">Form, bilgilerinizi e-posta uygulamanızda bir taslak olarak açar. Gönderimi oradan tamamlayabilirsiniz.</p>
        <button className="button button-dark" type="submit">E-posta taslağını aç <ArrowUpRight size={18} aria-hidden="true" /></button>
        <div role="status">
          {draftHref && <p className="contact-form-feedback">Taslağınız hazır. E-posta uygulamanız açılmadıysa <a href={draftHref}>yeniden açın</a> veya info@ismodasi.com adresine yazın. Mesajınız henüz gönderilmedi.</p>}
        </div>
      </form>
    </div>
  );
}
