"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Category = {
  _id: string;
  name: string;
  slug: string;
  images?: unknown[];
};

export default function AdminGalleryPage() {
  const [items, setItems] = useState<Category[]>([]);

  async function load() {
    setItems(await (await fetch("/api/gallery")).json());
  }

  useEffect(() => {
    load().catch(() => setItems([]));
  }, []);

  async function addCategory() {
    const name = prompt("Category name?");
    if (!name) return;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    await fetch("/api/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, slug, images: [] }),
    });
    await load();
  }

  async function remove(id: string) {
    if (!confirm("Delete category?")) return;
    await fetch(`/api/gallery/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1>Gallery</h1>
          <p>Categories and images.</p>
        </div>
        <button className="btn-admin primary" type="button" onClick={addCategory}>
          Add category
        </button>
      </div>
      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Slug</th>
              <th>Images</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.slug}</td>
                <td>{item.images?.length ?? 0}</td>
                <td className="admin-actions">
                  <Link className="btn-admin" href={`/admin/gallery/${item._id}`}>
                    Open
                  </Link>
                  <button
                    className="btn-admin danger"
                    type="button"
                    onClick={() => remove(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
