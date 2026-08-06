import type { ReactNode } from "react";

/** Highlight the last word of a title (works in server + client components). */
export function accentLastWord(text: string): ReactNode {
  const parts = text.trim().split(/\s+/);
  if (parts.length < 2) return text;
  const last = parts.pop()!;
  return (
    <>
      {parts.join(" ")} <span className="accent">{last}</span>
    </>
  );
}
