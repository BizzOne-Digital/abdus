"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ImageUploader } from "@/components/admin/ImageUploader";

type Section = {
  _id?: string;
  key: string;
  title: string;
  subtitle?: string;
  body?: string;
  image?: string;
  buttonLabel?: string;
  buttonLink?: string;
  order?: number;
};

type PageDoc = {
  _id: string;
  slug: string;
  title: string;
  seoDescription?: string;
  sections: Section[];
};

export default function AdminPageEditor() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const [page, setPage] = useState<PageDoc | null>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch(`/api/pages/${slug}`)
      .then((r) => r.json())
      .then(setPage)
      .catch(() => setPage(null));
  }, [slug]);

  function updateSection(index: number, patch: Partial<Section>) {
    if (!page) return;
    const sections = page.sections.map((s, i) =>
      i === index ? { ...s, ...patch } : s,
    );
    setPage({ ...page, sections });
  }

  async function save() {
    if (!page) return;
    setBusy(true);
    setMessage("");
    try {
      const res = await fetch(`/api/pages/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(page),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      setPage(data);
      setMessage("Saved. Frontend will use the updated content.");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Save failed");
    } finally {
      setBusy(false);
    }
  }

  if (!page) return <p>Loading page…</p>;

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1>Edit: {page.title}</h1>
          <p>Update each section and its image.</p>
        </div>
        <div className="admin-actions">
          <Link className="btn-admin" href="/admin/pages">
            Back
          </Link>
          <button className="btn-admin primary" type="button" onClick={save} disabled={busy}>
            {busy ? "Saving…" : "Save page"}
          </button>
        </div>
      </div>

      {message ? <p>{message}</p> : null}

      <div className="admin-card form-grid" style={{ marginBottom: "1rem" }}>
        <label>
          Page title
          <input
            value={page.title}
            onChange={(e) => setPage({ ...page, title: e.target.value })}
          />
        </label>
        <label>
          SEO description
          <textarea
            value={page.seoDescription || ""}
            onChange={(e) =>
              setPage({ ...page, seoDescription: e.target.value })
            }
          />
        </label>
      </div>

      {page.sections
        .slice()
        .sort((a, b) => (a.order || 0) - (b.order || 0))
        .map((section, index) => (
          <div className="section-block form-grid" key={section.key + index}>
            <h3>
              Section: {section.key}
            </h3>
            <label>
              Title
              <input
                value={section.title || ""}
                onChange={(e) => updateSection(index, { title: e.target.value })}
              />
            </label>
            <label>
              Subtitle
              <input
                value={section.subtitle || ""}
                onChange={(e) =>
                  updateSection(index, { subtitle: e.target.value })
                }
              />
            </label>
            <label>
              Body
              <textarea
                value={section.body || ""}
                onChange={(e) => updateSection(index, { body: e.target.value })}
              />
            </label>
            <ImageUploader
              label="Section image"
              value={section.image || ""}
              onChange={(url) => updateSection(index, { image: url })}
            />
            <label>
              Button label
              <input
                value={section.buttonLabel || ""}
                onChange={(e) =>
                  updateSection(index, { buttonLabel: e.target.value })
                }
              />
            </label>
            <label>
              Button link
              <input
                value={section.buttonLink || ""}
                onChange={(e) =>
                  updateSection(index, { buttonLink: e.target.value })
                }
              />
            </label>
          </div>
        ))}
    </div>
  );
}
