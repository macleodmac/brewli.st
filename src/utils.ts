export function buildUrl(path: string) {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}${path}`;
  } else {
    return `http://localhost:3000${path}`;
  }
}
