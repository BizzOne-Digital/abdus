"use client";

import { useEffect, useState } from "react";

type Item = {
  _id?: string;
  question: string;
  answer: string;
  order?: number;
};

export default function AdminFaqsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [message, setMessage] = useState("");

  async function load() {
    setItems(await (await fetch("/api/faqs")).json());
  }

  useEffect(() => {
    load().catch(() => setItems([]));
  }, []);

  async function saveItem(item: Item) {
    const isNew = !item._id;
    const res = await fetch(isNew ? "/api/faqs" : `/api/faqs/${item._id}`, {
      method: isNew ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    if (!res.ok) {
      const data = await res.json();
      setMessage(data.error || "Save failed");
      return;
    }
    setMessage("Saved.");
    await load();
  }

  async function remove(id?: string) {
    if (!id || !confirm("Delete FAQ?")) return;
    await fetch(`/api/faqs/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1>FAQs</h1>
          <p>Questions and answers for the FAQs page.</p>
        </div>
        <button
          className="btn-admin primary"
          type="button"
          onClick={() =>
            setItems([...items, { question: "New question?", answer: "" }])
          }
        >
          Add FAQ
        </button>
      </div>
      {message ? <p>{message}</p> : null}
      {items.map((item, index) => (
        <div className="section-block form-grid" key={item._id || index}>
          <label>
            Question
            <input
              value={item.question}
              onChange={(e) => {
                const next = [...items];
                next[index] = { ...item, question: e.target.value };
                setItems(next);
              }}
            />
          </label>
          <label>
            Answer
            <textarea
              value={item.answer}
              onChange={(e) => {
                const next = [...items];
                next[index] = { ...item, answer: e.target.value };
                setItems(next);
              }}
            />
          </label>
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
