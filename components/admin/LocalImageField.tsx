"use client";

import { useRef, useState } from "react";
import type { UploadFolder } from "@/lib/uploads";
import { resolveMediaUrl } from "@/lib/mediaUrl";
import "./LocalImageField.css";

type Props = {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  folder?: UploadFolder;
};

async function deleteStored(url: string) {
  await fetch("/api/upload", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });
}

export function LocalImageField({
  value,
  onChange,
  label = "Image",
  folder = "pages",
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<{ kind: "ok" | "err"; text: string } | null>(
    null,
  );

  function showToast(kind: "ok" | "err", text: string) {
    setToast({ kind, text });
    window.setTimeout(() => setToast(null), 3200);
  }

  async function uploadFile(file: File, previousUrl?: string) {
    setBusy(true);
    try {
      const body = new FormData();
      body.append("file", file);
      body.append("folder", folder);
      const res = await fetch("/api/upload", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      if (previousUrl?.startsWith("/api/uploads/")) {
        await deleteStored(previousUrl).catch(() => undefined);
      }

      onChange(data.url);
      showToast("ok", "Image uploaded.");
    } catch (err) {
      showToast("err", err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function remove() {
    if (!value) return;
    setBusy(true);
    try {
      if (value.startsWith("/api/uploads/")) {
        const res = await fetch("/api/upload", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: value }),
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Remove failed");
        }
      }
      onChange("");
      showToast("ok", "Image removed.");
    } catch (err) {
      showToast("err", err instanceof Error ? err.message : "Remove failed");
    } finally {
      setBusy(false);
    }
  }

  const preview = value ? resolveMediaUrl(value) : "";

  return (
    <div className="local-image-field">
      <span className="local-image-field__label">{label}</span>
      <div className="local-image-field__row">
        <div className="local-image-field__preview">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="" />
          ) : (
            <span className="local-image-field__empty">No image</span>
          )}
        </div>
        <div className="local-image-field__actions">
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            className="local-image-field__file"
            disabled={busy}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) uploadFile(file, value);
            }}
          />
          <button
            type="button"
            className="btn-admin"
            disabled={busy}
            onClick={() => inputRef.current?.click()}
          >
            {value ? "Replace" : "Upload"}
          </button>
          {value ? (
            <button
              type="button"
              className="btn-admin danger"
              disabled={busy}
              onClick={remove}
            >
              Remove
            </button>
          ) : null}
          {busy ? <small>Uploading…</small> : null}
        </div>
      </div>
      <input
        className="local-image-field__url"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="/api/uploads/... or /images/..."
      />
      {toast ? (
        <p
          className={`local-image-field__toast local-image-field__toast--${toast.kind}`}
          role="status"
        >
          {toast.text}
        </p>
      ) : null}
    </div>
  );
}
