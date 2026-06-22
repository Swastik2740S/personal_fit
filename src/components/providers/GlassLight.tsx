"use client";

import { useEffect } from "react";
import { startGlassLight } from "@/lib/glassLight";
import { useTheme } from "./ThemeContext";

/**
 * Mounts the reactive Liquid Glass light source (see lib/glassLight.ts).
 * Only active under the liquid theme — re-runs when the theme toggles so the
 * listeners attach/detach with it. Renders nothing.
 */
export default function GlassLight() {
  const { theme } = useTheme();

  useEffect(() => {
    if (theme !== "liquid") return;
    return startGlassLight();
  }, [theme]);

  return null;
}
