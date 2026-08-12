"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ImageUploader } from "@/components/admin/ImageUploader";

type DetailSection = {
  key: string;
  title: string;
  body: string;
  image?: string;
  order?: number;
};

type Priority = {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  cardImage: string;
  published: boolean;
  detailSections: DetailSection[];
};

export default function AdminPriorityEditor() {
  const { id } = useParams<{ id: string }>();
  const [tab, setTab] = useState<"card" | "detail">("card");
  const [item, setItem] = useState<Priority | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`/api/priorities/${id}`)
      .then((r) => r.json())
      .then(setItem)
      .catch(() => setItem(null));
  }, [id]);

  async function save() {
    if (!item) return;
    const res = await fetch(`/api/priorities/${id}`, {
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
          <h1>{item.title}</h1>
          <p>Card listing + detail page content.</p>
        </div>
        <div className="admin-actions">
          <Link className="btn-admin" href="/admin/priorities">
            Back
          </Link>
          <button className="btn-admin primary" type="button" onClick={save}>
            Save
          </button>
        </div>
      </div>

      <div className="tabs">
        <button
          type="button"
          className={tab === "card" ? "is-active" : undefined}
          onClick={() => setTab("card")}
        >
          Description / Card
        </button>
        <button
          type="button"
          className={tab === "detail" ? "is-active" : undefined}
          onClick={() => setTab("detail")}
        >
          Detail page
        </button>
      </div>

      {message ? <p>{message}</p> : null}

      {tab === "card" ? (
        <div className="admin-card form-grid">
          <label>
            Title
            <input
              value={item.title}
              onChange={(e) => setItem({ ...item, title: e.target.value })}
            />
          </label>
          <label>
            Slug
            <input
              value={item.slug}
              onChange={(e) => setItem({ ...item, slug: e.target.value })}
            />
          </label>
          <label>
            Short description
            <textarea
              value={item.shortDescription || ""}
              onChange={(e) =>
                setItem({ ...item, shortDescription: e.target.value })
              }
            />
          </label>
          <ImageUploader
            label="Card image (Vision/priorities listing)"
            folder="pages"
            value={item.cardImage || ""}
            onChange={(url) => setItem({ ...item, cardImage: url })}
          />
        </div>
      ) : (
        <div>
          {item.detailSections.map((section, index) => (
            <div className="section-block form-grid" key={section.key + index}>
              <h3>Detail section: {section.key}</h3>
              <label>
                Title
                <input
                  value={section.title}
                  onChange={(e) => {
                    const detailSections = [...item.detailSections];
                    detailSections[index] = {
                      ...section,
                      title: e.target.value,
                    };
                    setItem({ ...item, detailSections });
                  }}
                />
              </label>
              <label>
                Body
                <textarea
                  value={section.body}
                  onChange={(e) => {
                    const detailSections = [...item.detailSections];
                    detailSections[index] = {
                      ...section,
                      body: e.target.value,
                    };
                    setItem({ ...item, detailSections });
                  }}
                />
              </label>
              <ImageUploader
                label="Section image"
                folder="pages"
                value={section.image || ""}
                onChange={(url) => {
                  const detailSections = [...item.detailSections];
                  detailSections[index] = { ...section, image: url };
                  setItem({ ...item, detailSections });
                }}
              />
            </div>
          ))}
          <button
            className="btn-admin"
            type="button"
            onClick={() =>
              setItem({
                ...item,
                detailSections: [
                  ...item.detailSections,
                  {
                    key: `section-${item.detailSections.length + 1}`,
                    title: "New section",
                    body: "",
                    image: "",
                    order: item.detailSections.length + 1,
                  },
                ],
              })
            }
          >
            Add detail section
          </button>
        </div>
      )}
    </div>
  );
}
