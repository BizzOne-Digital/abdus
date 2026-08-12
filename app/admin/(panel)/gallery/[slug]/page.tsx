"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ImageUploader } from "@/components/admin/ImageUploader";

type GalleryMedia = {
  type: "image" | "video";
  url: string;
  thumbnail?: string;
  alt?: string;
  caption?: string;
  order?: number;
};

type GalleryCategory = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  images: GalleryMedia[];
};

export default function AdminGalleryEditorPage() {
  const { slug } = useParams<{ slug: string }>();
  const [item, setItem] = useState<GalleryCategory | null>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch(`/api/gallery/${slug}`)
      .then(async (r) => {
        const data = await r.json();
        if (!r.ok) throw new Error(data.error || "Failed to load");
        setItem(data);
      })
      .catch(() => setItem(null));
  }, [slug]);

  function updateMedia(index: number, patch: Partial<GalleryMedia>) {
    if (!item) return;
    const images = item.images.map((m, i) =>
      i === index ? { ...m, ...patch } : m,
    );
    setItem({ ...item, images });
  }

  function addMedia(type: "image" | "video" = "image") {
    if (!item) return;
    setItem({
      ...item,
      images: [
        ...item.images,
        {
          type,
          url: "",
          thumbnail: "",
          alt: "",
          caption: "",
          order: item.images.length,
        },
      ],
    });
  }

  function removeMedia(index: number) {
    if (!item) return;
    setItem({
      ...item,
      images: item.images.filter((_, i) => i !== index),
    });
  }

  async function save() {
    if (!item) return;
    setBusy(true);
    setMessage("");
    try {
      const payload = {
        name: item.name,
        description: item.description || "",
        images: item.images,
      };
      const res = await fetch(`/api/gallery/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      setItem(data);
      setMessage("Saved. Gallery page updated.");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Save failed");
    } finally {
      setBusy(false);
    }
  }

  if (!item) return <p>Loading gallery…</p>;

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1>{item.name}</h1>
          <p>Photos and videos for /gallery</p>
        </div>
        <div className="admin-actions">
          <Link className="btn-admin" href="/admin/gallery">
            Back
          </Link>
          <button
            className="btn-admin primary"
            type="button"
            onClick={save}
            disabled={busy}
          >
            {busy ? "Saving…" : "Save"}
          </button>
        </div>
      </div>

      {message ? <p>{message}</p> : null}

      <div className="admin-card form-grid" style={{ marginBottom: "1.5rem" }}>
        <label>
          Category name
          <input
            value={item.name}
            onChange={(e) => setItem({ ...item, name: e.target.value })}
          />
        </label>
        <label>
          Description
          <textarea
            value={item.description || ""}
            onChange={(e) => setItem({ ...item, description: e.target.value })}
            rows={3}
          />
        </label>
      </div>

      <div className="admin-card">
        <div className="admin-header" style={{ marginBottom: "1rem" }}>
          <h2>Media items</h2>
          <div className="admin-actions">
            <button className="btn-admin" type="button" onClick={() => addMedia("image")}>
              + Photo
            </button>
            <button className="btn-admin" type="button" onClick={() => addMedia("video")}>
              + Video link
            </button>
          </div>
        </div>

        {item.images.map((media, index) => (
          <div key={index} className="admin-card nested" style={{ marginBottom: "1rem" }}>
            <div className="admin-header">
              <strong>
                {media.type === "video" ? "Video" : "Photo"} #{index + 1}
              </strong>
              <button
                className="btn-admin danger"
                type="button"
                onClick={() => removeMedia(index)}
              >
                Remove
              </button>
            </div>
            <div className="form-grid">
              <label>
                Type
                <select
                  value={media.type || "image"}
                  onChange={(e) =>
                    updateMedia(index, {
                      type: e.target.value as "image" | "video",
                    })
                  }
                >
                  <option value="image">Image</option>
                  <option value="video">Video (YouTube / Vimeo / MP4 URL)</option>
                </select>
              </label>
              {media.type === "image" ? (
                <ImageUploader
                  label="Image"
                  folder="gallery"
                  value={media.url}
                  onChange={(url) => updateMedia(index, { url })}
                />
              ) : (
                <>
                  <label>
                    Video URL
                    <input
                      value={media.url}
                      onChange={(e) => updateMedia(index, { url: e.target.value })}
                      placeholder="https://youtube.com/watch?v=..."
                    />
                  </label>
                  <ImageUploader
                    label="Thumbnail (optional)"
                    folder="gallery"
                    value={media.thumbnail || ""}
                    onChange={(url) => updateMedia(index, { thumbnail: url })}
                  />
                </>
              )}
              <label>
                Alt text
                <input
                  value={media.alt || ""}
                  onChange={(e) => updateMedia(index, { alt: e.target.value })}
                />
              </label>
              <label>
                Caption
                <textarea
                  value={media.caption || ""}
                  onChange={(e) => updateMedia(index, { caption: e.target.value })}
                  rows={2}
                />
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
