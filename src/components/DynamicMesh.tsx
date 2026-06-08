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

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener("resize", resize);
    resize();

    const draw = () => {
      time += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Draw slowly moving blobs
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

      drawBlob(-300, -200, 600, "rgba(200, 245, 66, 0.05)");  // Accent
      drawBlob(300, 200, 500, "rgba(168, 85, 247, 0.03)");   // Purple
      drawBlob(-200, 400, 400, "rgba(34, 211, 238, 0.03)");  // Cyan

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

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
