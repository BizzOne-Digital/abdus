"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type GalleryCategory = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  images?: unknown[];
};

export default function AdminGalleryListPage() {
  const [items, setItems] = useState<GalleryCategory[]>([]);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  useEffect(() => {
    fetch("/api/gallery")
      .then(async (r) => {
        const data = await r.json();
        if (!r.ok) throw new Error(data.error || "Failed to load");
        setItems(data);
      })
      .catch((err) =>
        setMessage(err instanceof Error ? err.message : "Failed to load"),
      );
  }, []);

  async function createCategory() {
    setMessage("");
    const res = await fetch("/api/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, slug, description: "", images: [] }),
    });
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error || "Create failed");
      return;
    }
    setItems((prev) => [...prev, data].sort((a, b) => a.name.localeCompare(b.name)));
    setName("");
    setSlug("");
    setMessage("Category created.");
  }

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1>Gallery</h1>
          <p>Manage photos and videos shown on the public gallery page.</p>
        </div>
      </div>

      {message ? <p>{message}</p> : null}

      <div className="admin-card form-grid" style={{ marginBottom: "1.5rem" }}>
        <h2>New category</h2>
        <label>
          Name
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (!slug) {
                setSlug(
                  e.target.value
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-|-$/g, ""),
                );
              }
            }}
          />
        </label>
        <label>
          Slug
          <input value={slug} onChange={(e) => setSlug(e.target.value)} />
        </label>
        <button className="btn-admin primary" type="button" onClick={createCategory}>
          Add category
        </button>
      </div>

      <div className="admin-card">
        <h2>Categories</h2>
        {items.length === 0 ? (
          <p>No categories yet.</p>
        ) : (
          <ul className="admin-list">
            {items.map((item) => (
              <li key={item._id}>
                <div>
                  <strong>{item.name}</strong>
                  <span> /{item.slug}</span>
                  <small> — {(item.images || []).length} items</small>
                </div>
                <Link className="btn-admin" href={`/admin/gallery/${item.slug}`}>
                  Edit
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
