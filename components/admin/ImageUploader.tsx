"use client";

import { useState } from "react";

type Props = {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
};

export function ImageUploader({ value, onChange, label = "Image" }: Props) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onFile(file?: File | null) {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <label>
      {label}
      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="thumb" />
        ) : (
          <div className="thumb" />
        )}
        <input
          type="file"
          accept="image/*"
          disabled={busy}
          onChange={(e) => onFile(e.target.files?.[0])}
        />
      </div>
      <input
        style={{ marginTop: "0.5rem" }}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="/uploads/... or /images/..."
      />
      {busy ? <small>Uploading…</small> : null}
      {error ? <small style={{ color: "#be123c" }}>{error}</small> : null}
    </label>
  );
}
