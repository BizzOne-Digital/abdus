"use client";

import { useEffect, useState } from "react";

type Item = {
  _id: string;
  name: string;
  role?: string;
  quote: string;
  image?: string;
};

export function TestimonialsSlider({ items }: { items: Item[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length < 2) return;
    const id = window.setInterval(
      () => setIndex((v) => (v + 1) % items.length),
      6000,
    );
    return () => window.clearInterval(id);
  }, [items.length]);

  if (!items.length) return <p>No testimonials yet.</p>;
  const item = items[index];

  return (
    <div className="liquid-glass testimonials-slider">
      <p className="testimonials-slider__quote">“{item.quote}”</p>
      <div className="testimonials-slider__person">
        {item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.image}
            alt={item.name}
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              objectFit: "cover",
              flexShrink: 0,
            }}
          />
        ) : null}
        <div style={{ minWidth: 0 }}>
          <strong>{item.name}</strong>
          <div style={{ color: "var(--light-blue)" }}>{item.role}</div>
        </div>
      </div>
      <div className="testimonials-slider__dots">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Show testimonial ${i + 1}`}
            onClick={() => setIndex(i)}
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              border: 0,
              background: i === index ? "#fff" : "rgba(255,255,255,.35)",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </div>
  );
}
