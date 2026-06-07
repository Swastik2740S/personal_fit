"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useReducedMotion, type Variants } from "framer-motion";

// Shared "subtle & professional" motion language.
// Global reduced-motion is handled by <MotionConfig reducedMotion="user">
// in LayoutWrapper; useCountUp additionally guards itself.

export const EASE = [0.22, 1, 0.36, 1] as const;

// Route-level page transition (used by LayoutWrapper).
export const pageVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: EASE } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: EASE } },
};

// Stagger container + child, imported by pages as `container` / `item`.
export const containerStagger: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.02 } },
};

export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: EASE } },
};

/**
 * Smoothly counts a number up to its target. Falls back to the final value
 * instantly when the user prefers reduced motion.
 */
export function useCountUp(value: number, duration = 0.8): number {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);
  const latest = useRef(0);

  useEffect(() => {
    if (reduce) return;
    const controls = animate(latest.current, value, {
      duration,
      ease: EASE,
      onUpdate: (v) => {
        latest.current = v;
        setDisplay(v);
      },
    });
    return () => controls.stop();
  }, [value, reduce, duration]);

  // Under reduced motion, skip animation and report the value directly.
  return reduce ? value : display;
}
