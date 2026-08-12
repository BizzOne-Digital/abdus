const META_KEYS = new Set(["_id", "__v", "createdAt", "updatedAt"]);

/** Strip Mongo metadata before findOneAndUpdate / findByIdAndUpdate. */
export function sanitizeMongoUpdate<T extends Record<string, unknown>>(
  body: T,
): Partial<T> {
  return stripMeta(body) as Partial<T>;
}

function stripMeta(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(stripMeta);
  }
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
      if (META_KEYS.has(key)) continue;
      out[key] = stripMeta(child);
    }
    return out;
  }
  return value;
}
