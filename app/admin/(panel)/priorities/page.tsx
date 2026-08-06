"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Priority = {
  _id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  cardImage?: string;
  published?: boolean;
};

export default function AdminPrioritiesPage() {
  const [items, setItems] = useState<Priority[]>([]);

  async function load() {
    const res = await fetch("/api/priorities");
    setItems(await res.json());
  }

  useEffect(() => {
    load().catch(() => setItems([]));
  }, []);

  async function remove(id: string) {
    if (!confirm("Delete this priority?")) return;
    await fetch(`/api/priorities/${id}`, { method: "DELETE" });
    await load();
  }

  async function createNew() {
    const title = prompt("Priority title?");
    if (!title) return;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    await fetch("/api/priorities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        slug,
        shortDescription: "",
        detailSections: [
          { key: "overview", title, body: "", image: "", order: 1 },
        ],
      }),
    });
    await load();
  }

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1>Priorities</h1>
          <p>Campaign priorities (services-style list + detail pages).</p>
        </div>
        <button className="btn-admin primary" type="button" onClick={createNew}>
          Add priority
        </button>
      </div>
      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Slug</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>
                  {item.cardImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.cardImage} alt="" className="thumb" />
                  ) : (
                    "—"
                  )}
                </td>
                <td>{item.title}</td>
                <td>{item.slug}</td>
                <td className="admin-actions">
                  <Link className="btn-admin" href={`/admin/priorities/${item._id}`}>
                    Edit
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
