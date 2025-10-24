// Use proxy during development, direct URL in production
export const BASE_URL = import.meta.env.DEV 
  ? "/api"  // This will be proxied to https://zenjournalbe.vercel.app/api
  : "https://zenjournalbe.vercel.app/api";