'use client';

import { useEffect, useState } from 'react';

/**
 * Reads `prefers-reduced-motion` without causing a hydration mismatch.
 *
 * Unlike reading `matchMedia` synchronously during render (which resolves to
 * different values on the server vs. a client whose OS has reduced motion
 * enabled), this always starts as `false` — identical to the server — and is
 * corrected via an effect once hydration has already completed. Use this
 * instead of framer-motion's `useReducedMotion()` for any value that feeds
 * directly into SSR-rendered inline styles (e.g. scroll-linked transforms).
 */
export function useSafeReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(query.matches);

    const handleChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, []);

  return reduced;
}
