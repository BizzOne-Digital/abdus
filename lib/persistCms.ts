import type { Document } from "mongoose";
import { sanitizeMongoUpdate } from "@/lib/sanitizeUpdate";

/** Persist nested CMS arrays reliably (Mongoose Mixed/subdoc arrays). */
export function applyNestedUpdate(
  doc: Document,
  update: Record<string, unknown>,
  fields: string[],
) {
  for (const field of fields) {
    if (update[field] !== undefined) {
      doc.set(field, update[field]);
      doc.markModified(field);
    }
  }
}

export function buildSanitizedUpdate(body: Record<string, unknown>) {
  return sanitizeMongoUpdate(body);
}
