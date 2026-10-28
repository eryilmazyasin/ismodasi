export type ContactValues = {
  name: string;
  company: string;
  email: string;
  quantity: string;
  message: string;
};

export type ContactResponse = {
  success?: boolean;
  message: string;
  errors?: Record<string, string>;
};
