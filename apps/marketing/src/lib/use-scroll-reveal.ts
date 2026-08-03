'use client';

import { useEffect, useRef, useState } from 'react';

interface UseScrollRevealOptions {
  /** Pixels the element must clear past the viewport edge before it counts as "in view". */
  margin?: number;
  /** Once visible, stay visible (don't hide again on scroll-out). */
  once?: boolean;
}

/**
 * Drives scroll-reveal animations from real viewport geometry (scroll/resize +
 * rAF-throttled `getBoundingClientRect`) instead of relying solely on
 * `IntersectionObserver`/framer-motion's `whileInView`, whose recalculation can be
 * unreliable after programmatic scrolls in some environments (headless browsers,
 * some smooth-scroll setups) — leaving content permanently stuck at its hidden
 * variant. A supplementary `IntersectionObserver` is layered on top purely as a
 * cheap extra nudge; the scroll/resize check is the source of truth.
 */
export function useScrollReveal<T extends HTMLElement>({
  margin = 80,
  once = true,
}: UseScrollRevealOptions = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const triggeredRef = useRef(false);

  useEffect(() => {
    const check = () => {
      const el = ref.current;
      if (!el) return;
      if (once && triggeredRef.current) return;

      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const visible = rect.top < viewportHeight - margin && rect.bottom > margin;

      if (visible) {
        triggeredRef.current = true;
        setInView(true);
      } else if (!once) {
        setInView(false);
      }
    };

    check();

    let rafId: number | null = null;
    const onScrollOrResize = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        check();
      });
    };

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);

    let observer: IntersectionObserver | undefined;
    if (typeof IntersectionObserver !== 'undefined' && ref.current) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) check();
        },
        { rootMargin: `-${margin}px` },
      );
      observer.observe(ref.current);
    }

    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      if (rafId !== null) cancelAnimationFrame(rafId);
      observer?.disconnect();
    };
  }, [margin, once]);

  return { ref, inView };
}
