"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

const COLORS = ["#c8f542", "#5eead4", "#c084fc", "#fbbf24", "#f87171"];

// Deterministic pseudo-random in [0,1) so render stays pure (react-hooks/purity)
// while the scatter still looks random.
const rand = (i: number, salt: number) => {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

/**
 * Lightweight confetti overlay for streak milestones — pure framer-motion, no
 * canvas/deps. Mount it for ~3s; reduced-motion users get no animation via the
 * global <MotionConfig reducedMotion="user">.
 */
export default function Celebration({ count = 36 }: { count?: number }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: rand(i, 1) * 100,
        delay: rand(i, 2) * 0.5,
        duration: 2.2 + rand(i, 3) * 1.4,
        rotate: 360 + rand(i, 4) * 720,
        color: COLORS[i % COLORS.length],
        size: 6 + rand(i, 5) * 8,
      })),
    [count]
  );

  return (
    <div
      aria-hidden
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999, overflow: "hidden" }}
    >
      {pieces.map((p, i) => (
        <motion.span
          key={i}
          initial={{ y: -40, opacity: 1, rotate: 0 }}
          animate={{ y: "110vh", opacity: [1, 1, 0.7], rotate: p.rotate }}
          transition={{ duration: p.duration, delay: p.delay, ease: "easeIn" }}
          style={{
            position: "absolute",
            top: 0,
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.5,
            background: p.color,
            borderRadius: 2,
          }}
        />
      ))}
    </div>
  );
}
