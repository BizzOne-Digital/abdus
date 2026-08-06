import { useEffect, useRef, useState } from "react";

export function useInView<T extends HTMLElement>(
  options: IntersectionObserverInit = { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.unobserve(entry.target);
      }
    }, options);

    observer.observe(node);
    return () => observer.disconnect();
  }, [options.rootMargin, options.threshold]);

  return { ref, inView };
}
