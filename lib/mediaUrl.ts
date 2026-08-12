const PLACEHOLDER = "/images/hero-bg.jpg";

/** Resolve CMS/media URLs; legacy disk uploads fall back to placeholder on serverless. */
export function resolveMediaUrl(url?: string | null): string {
  if (!url) return PLACEHOLDER;
  if (url.startsWith("/uploads/")) return PLACEHOLDER;
  return url;
}

export function isStoredUploadUrl(url?: string | null): boolean {
  return Boolean(url?.startsWith("/api/uploads/"));
}
