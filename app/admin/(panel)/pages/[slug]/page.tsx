"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { SECTION_LABELS } from "@/lib/sectionLabels";

type SectionItem = {
  key?: string;
  title?: string;
  body?: string;
  image?: string;
};

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
  items?: SectionItem[];
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

  function updateItem(
    sectionIndex: number,
    itemIndex: number,
    patch: Partial<SectionItem>,
  ) {
    if (!page) return;
    const section = page.sections[sectionIndex];
    const items = (section.items || []).map((item, i) =>
      i === itemIndex ? { ...item, ...patch } : item,
    );
    updateSection(sectionIndex, { items });
  }

  function addItem(sectionIndex: number) {
    if (!page) return;
    const section = page.sections[sectionIndex];
    const items = [...(section.items || []), { title: "", body: "", image: "" }];
    updateSection(sectionIndex, { items });
  }

  function removeItem(sectionIndex: number, itemIndex: number) {
    if (!page) return;
    const section = page.sections[sectionIndex];
    const items = (section.items || []).filter((_, i) => i !== itemIndex);
    updateSection(sectionIndex, { items });
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
      setMessage("Saved. Frontend now uses this content.");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Save failed");
    } finally {
      setBusy(false);
    }
  }

  if (!page) return <p>Loading page…</p>;

  const ordered = page.sections
    .map((section, index) => ({ section, index }))
    .sort((a, b) => (a.section.order || 0) - (b.section.order || 0));

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1>Edit: {page.title}</h1>
          <p>
            Same sections as the live <strong>/{slug === "home" ? "" : slug}</strong>{" "}
            page — update text and images here.
          </p>
        </div>
        <div className="admin-actions">
          <Link className="btn-admin" href="/admin/pages">
            Back
          </Link>
          <Link
            className="btn-admin"
            href={slug === "home" ? "/" : `/${slug}`}
            target="_blank"
          >
            View page
          </Link>
          <button
            className="btn-admin primary"
            type="button"
            onClick={save}
            disabled={busy}
          >
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

      {ordered.map(({ section, index }) => (
        <div className="section-block form-grid" key={section.key + index}>
          <h3>
            {SECTION_LABELS[section.key] || section.key}
            <span style={{ color: "#94a3b8", fontWeight: 400, marginLeft: 8 }}>
              ({section.key})
            </span>
          </h3>
          <label>
            Title
            <input
              value={section.title || ""}
              onChange={(e) => updateSection(index, { title: e.target.value })}
            />
          </label>
          <label>
            Subtitle / eyebrow
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

          {(section.items && section.items.length > 0) ||
          ["meet", "community", "advocacy", "ward1", "commitment", "hero", "hero-meet"].includes(
            section.key,
          ) ? (
            <div style={{ marginTop: "0.5rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.65rem",
                }}
              >
                <strong>Items in this section</strong>
                <button
                  type="button"
                  className="btn-admin"
                  onClick={() => addItem(index)}
                >
                  Add item
                </button>
              </div>
              {(section.items || []).map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="admin-card form-grid"
                  style={{ marginBottom: "0.75rem", background: "#fff" }}
                >
                  <label>
                    Item title
                    <input
                      value={item.title || ""}
                      onChange={(e) =>
                        updateItem(index, itemIndex, { title: e.target.value })
                      }
                    />
                  </label>
                  <label>
                    Item body
                    <textarea
                      value={item.body || ""}
                      onChange={(e) =>
                        updateItem(index, itemIndex, { body: e.target.value })
                      }
                    />
                  </label>
                  <ImageUploader
                    label="Item image"
                    value={item.image || ""}
                    onChange={(url) =>
                      updateItem(index, itemIndex, { image: url })
                    }
                  />
                  <button
                    type="button"
                    className="btn-admin danger"
                    onClick={() => removeItem(index, itemIndex)}
                  >
                    Remove item
                  </button>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
