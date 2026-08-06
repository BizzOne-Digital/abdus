"use client";

import { useEffect, useState } from "react";
import { ImageUploader } from "@/components/admin/ImageUploader";

type Item = {
  _id?: string;
  name: string;
  role?: string;
  quote: string;
  image?: string;
  order?: number;
  published?: boolean;
};

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [message, setMessage] = useState("");

  async function load() {
    setItems(await (await fetch("/api/testimonials")).json());
  }

  useEffect(() => {
    load().catch(() => setItems([]));
  }, []);

  async function saveItem(item: Item) {
    const isNew = !item._id;
    const res = await fetch(
      isNew ? "/api/testimonials" : `/api/testimonials/${item._id}`,
      {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      },
    );
    if (!res.ok) {
      const data = await res.json();
      setMessage(data.error || "Save failed");
      return;
    }
    setMessage("Saved.");
    await load();
  }

  async function remove(id?: string) {
    if (!id || !confirm("Delete testimonial?")) return;
    await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1>Testimonials</h1>
          <p>Edit quotes shown on the testimonials page.</p>
        </div>
        <button
          className="btn-admin primary"
          type="button"
          onClick={() =>
            setItems([
              ...items,
              { name: "New resident", role: "Ward 1", quote: "", image: "" },
            ])
          }
        >
          Add testimonial
        </button>
      </div>
      {message ? <p>{message}</p> : null}
      {items.map((item, index) => (
        <div className="section-block form-grid" key={item._id || index}>
          <label>
            Name
            <input
              value={item.name}
              onChange={(e) => {
                const next = [...items];
                next[index] = { ...item, name: e.target.value };
                setItems(next);
              }}
            />
          </label>
          <label>
            Role / area
            <input
              value={item.role || ""}
              onChange={(e) => {
                const next = [...items];
                next[index] = { ...item, role: e.target.value };
                setItems(next);
              }}
            />
          </label>
          <label>
            Quote
            <textarea
              value={item.quote}
              onChange={(e) => {
                const next = [...items];
                next[index] = { ...item, quote: e.target.value };
                setItems(next);
              }}
            />
          </label>
          <ImageUploader
            label="Photo (optional)"
            value={item.image || ""}
            onChange={(url) => {
              const next = [...items];
              next[index] = { ...item, image: url };
              setItems(next);
            }}
          />
          <div className="admin-actions">
            <button
              className="btn-admin primary"
              type="button"
              onClick={() => saveItem(item)}
            >
              Save
            </button>
            <button
              className="btn-admin danger"
              type="button"
              onClick={() => remove(item._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
