"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ImageUploader } from "@/components/admin/ImageUploader";

type ImageItem = {
  _id?: string;
  url: string;
  alt?: string;
  caption?: string;
  order?: number;
};

type Category = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  images: ImageItem[];
};

export default function AdminGalleryCategoryPage() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Category | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`/api/gallery/${id}`)
      .then((r) => r.json())
      .then(setItem)
      .catch(() => setItem(null));
  }, [id]);

  async function save() {
    if (!item) return;
    const res = await fetch(`/api/gallery/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error || "Save failed");
      return;
    }
    setItem(data);
    setMessage("Saved.");
  }

  if (!item) return <p>Loading…</p>;

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1>{item.name}</h1>
          <p>Manage images in this category.</p>
        </div>
        <div className="admin-actions">
          <Link className="btn-admin" href="/admin/gallery">
            Back
          </Link>
          <button className="btn-admin primary" type="button" onClick={save}>
            Save
          </button>
        </div>
      </div>
      {message ? <p>{message}</p> : null}

      <div className="admin-card form-grid" style={{ marginBottom: "1rem" }}>
        <label>
          Name
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
          />
        </label>
      </div>

      {item.images.map((img, index) => (
        <div className="section-block form-grid" key={index}>
          <ImageUploader
            label={`Image ${index + 1}`}
            value={img.url}
            onChange={(url) => {
              const images = [...item.images];
              images[index] = { ...img, url };
              setItem({ ...item, images });
            }}
          />
          <label>
            Alt text
            <input
              value={img.alt || ""}
              onChange={(e) => {
                const images = [...item.images];
                images[index] = { ...img, alt: e.target.value };
                setItem({ ...item, images });
              }}
            />
          </label>
          <label>
            Caption
            <input
              value={img.caption || ""}
              onChange={(e) => {
                const images = [...item.images];
                images[index] = { ...img, caption: e.target.value };
                setItem({ ...item, images });
              }}
            />
          </label>
          <button
            className="btn-admin danger"
            type="button"
            onClick={() =>
              setItem({
                ...item,
                images: item.images.filter((_, i) => i !== index),
              })
            }
          >
            Remove image
          </button>
        </div>
      ))}

      <button
        className="btn-admin"
        type="button"
        onClick={() =>
          setItem({
            ...item,
            images: [
              ...item.images,
              { url: "", alt: "", caption: "", order: item.images.length + 1 },
            ],
          })
        }
      >
        Add image
      </button>
    </div>
  );
}
