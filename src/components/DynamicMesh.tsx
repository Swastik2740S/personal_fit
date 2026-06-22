"use client";

import { useEffect, useRef } from "react";

export default function DynamicMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    // Honor reduced-motion: render a single static frame, no animation loop.
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (prefersReduced) draw();
    };

    window.addEventListener("resize", resize);

    const draw = () => {
      time += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Slowly drifting colour blobs. Alphas are deliberately stronger than a
      // typical mesh — glassmorphism needs a vivid backdrop to read against, so
      // the frosted surfaces above pick up real colour instead of flat dark.
      const drawBlob = (xOffset: number, yOffset: number, radius: number, color: string) => {
        ctx.beginPath();
        const x = cx + xOffset + Math.sin(time) * 100;
        const y = cy + yOffset + Math.cos(time * 0.8) * 100;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      };

      drawBlob(-320, -220, 640, "rgba(200, 245, 66, 0.14)");  // Accent (lime)
      drawBlob(320, 200, 560, "rgba(168, 85, 247, 0.11)");    // Purple
      drawBlob(-220, 420, 480, "rgba(34, 211, 238, 0.10)");   // Cyan
      drawBlob(360, -300, 420, "rgba(251, 191, 36, 0.06)");   // Amber (warm fill)

      if (!prefersReduced) animationFrameId = requestAnimationFrame(draw);
    };

    resize();
    if (!prefersReduced) draw(); // start the loop (reduced motion: resize already painted one frame)

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: -1,
      }}
    />
  );
}
