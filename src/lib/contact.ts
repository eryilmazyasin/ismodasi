import type { ContactValues } from "../types/contact.types";

export function validateContact(values: ContactValues) {
  const errors: Record<string, string> = {};
  if (!values.name || values.name.length > 120 || /[\r\n]/.test(values.name))
    errors.name = "Adınızı ve soyadınızı en fazla 120 karakterle yazın.";
  if (values.company.length > 120 || /[\r\n]/.test(values.company))
    errors.company = "Firma adını en fazla 120 karakterle yazın.";
  if (values.email.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    errors.email = "Geçerli bir e-posta adresi yazın.";
  if (values.quantity && (!/^\d{1,7}$/.test(values.quantity) || Number(values.quantity) < 1))
    errors.quantity = "Adedi 1 veya daha büyük bir tam sayı olarak yazın.";
  if (!values.message || values.message.length > 1500)
    errors.message = "İhtiyacınızı 1–1500 karakter arasında yazın.";
  return errors;
}
