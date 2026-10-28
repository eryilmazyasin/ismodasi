export type WorkerEnv = {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
  CONTACT_FROM: string;
  RESEND_API_KEY?: string;
  CONTACT_RATE_LIMITER: {
    limit: (options: { key: string }) => Promise<{ success: boolean }>;
  };
};
