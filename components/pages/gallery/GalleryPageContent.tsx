"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { resolveMediaUrl } from "@/lib/mediaUrl";
import type { GalleryCategoryDoc } from "@/lib/cms";
import "./gallery-page.css";

function embedUrl(url: string): string | null {
  try {
    if (url.includes("youtube.com/watch")) {
      const id = new URL(url).searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1]?.split(/[?#]/)[0];
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (url.includes("vimeo.com/")) {
      const id = url.split("vimeo.com/")[1]?.split(/[?#]/)[0];
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }
  } catch {
    return null;
  }
  return null;
}

function isDirectVideo(url: string) {
  return /\.(mp4|webm|ogg)(\?|$)/i.test(url);
}

type Props = {
  categories: GalleryCategoryDoc[];
};

export function GalleryPageContent({ categories }: Props) {
  const reduced = usePrefersReducedMotion();

  const hasMedia = categories.some((c) => (c.images || []).length > 0);

  return (
    <section className="inner-section gallery-page">
      <div className="container">
        <motion.div
          className="gallery-page__intro"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <p className="section__eyebrow">Gallery</p>
          <h2 className="section__title">
            Photos &amp; <span className="accent">Videos</span>
          </h2>
          <p className="section__lead section__lead--wide">
            Campaign moments, community events, and Ward 1 in action.
          </p>
        </motion.div>

        {!hasMedia ? (
          <p className="gallery-page__empty">Gallery content coming soon.</p>
        ) : (
          categories.map((category) => {
            const items = [...(category.images || [])].sort(
              (a, b) => (a.order || 0) - (b.order || 0),
            );
            if (!items.length) return null;

            return (
              <div key={category.slug} className="gallery-page__block">
                <h3 className="gallery-page__category">{category.name}</h3>
                {category.description ? (
                  <p className="gallery-page__desc">{category.description}</p>
                ) : null}
                <div className="gallery-page__grid">
                  {items.map((item, i) => {
                    const isVideo = item.type === "video";
                    const embed = isVideo ? embedUrl(item.url) : null;
                    const thumb = resolveMediaUrl(
                      item.thumbnail || (isVideo ? "" : item.url),
                    );

                    return (
                      <motion.figure
                        key={`${category.slug}-${i}-${item.url}`}
                        className={`gallery-card ${isVideo ? "gallery-card--video" : ""}`}
                        initial={reduced ? false : { opacity: 0, y: 18 }}
                        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.4, delay: reduced ? 0 : i * 0.04 }}
                      >
                        <div className="gallery-card__media">
                          {isVideo && embed ? (
                            <iframe
                              src={embed}
                              title={item.alt || item.caption || "Video"}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          ) : isVideo && isDirectVideo(item.url) ? (
                            <video controls preload="metadata" poster={thumb}>
                              <source src={item.url} />
                            </video>
                          ) : isVideo ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={thumb} alt={item.alt || "Video"} />
                          ) : (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={resolveMediaUrl(item.url)}
                              alt={item.alt || category.name}
                              loading="lazy"
                            />
                          )}
                        </div>
                        {item.caption ? (
                          <figcaption className="gallery-card__caption">
                            {item.caption}
                          </figcaption>
                        ) : null}
                      </motion.figure>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
