"use client";

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useAuth } from "@clerk/nextjs";

export type UiTheme = "classic" | "liquid";

interface ThemeContextType {
  theme: UiTheme;
  setTheme: (t: UiTheme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "sf:ui-theme";

function applyThemeToDom(theme: UiTheme) {
  if (typeof document !== "undefined") {
    document.documentElement.dataset.ui = theme;
  }
}

/**
 * Account-synced UI appearance (Classic frosted ↔ iOS-26 Liquid Glass).
 *
 * Source-of-truth order:
 *   1. A no-flash inline script in layout.tsx applies `localStorage` to
 *      `<html data-ui>` BEFORE paint (no FOUC).
 *   2. This provider hydrates React state from that value on mount.
 *   3. Once signed in, the DB value (`/api/profile.uiTheme`) is authoritative
 *      across devices and reconciled in — unless the user has already toggled
 *      this session (guarded by `touchedRef`).
 * Writes are optimistic: state + localStorage + DOM update instantly, then a
 * best-effort PATCH persists to the account.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { isSignedIn } = useAuth();
  // Start at a stable "classic" for SSR + first client render to avoid a
  // hydration mismatch; the effect below corrects it from DOM/localStorage.
  const [theme, setThemeState] = useState<UiTheme>("classic");
  const touchedRef = useRef(false);

  // Hydrate from the value the no-flash script already applied + gate refraction.
  useEffect(() => {
    const fromDom = document.documentElement.dataset.ui;
    let initial: UiTheme = fromDom === "liquid" ? "liquid" : "classic";
    if (fromDom !== "liquid" && fromDom !== "classic") {
      try {
        initial = localStorage.getItem(STORAGE_KEY) === "liquid" ? "liquid" : "classic";
      } catch {
        initial = "classic";
      }
    }
    setThemeState(initial);
    applyThemeToDom(initial);

    // Refraction (backdrop-filter: url(#svg)) only renders reliably in Chromium.
    // `navigator.userAgentData` exists in Chromium engines (Chrome/Edge/Brave/Opera)
    // and is absent in Safari/Firefox, which get the clean frosted fallback.
    if (typeof navigator !== "undefined" && "userAgentData" in navigator) {
      document.documentElement.dataset.refraction = "on";
    }
  }, []);

  // Reconcile the authoritative account value once signed in (fresh device).
  useEffect(() => {
    if (!isSignedIn) return;
    let cancelled = false;
    fetch("/api/profile")
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { uiTheme?: UiTheme } | null) => {
        if (cancelled || touchedRef.current || !data) return;
        const dbTheme = data.uiTheme;
        if (dbTheme === "liquid" || dbTheme === "classic") {
          setThemeState(dbTheme);
          applyThemeToDom(dbTheme);
          try {
            localStorage.setItem(STORAGE_KEY, dbTheme);
          } catch {
            /* storage unavailable — DOM/state still correct */
          }
        }
      })
      .catch(() => {
        /* offline / cold start — local value stands */
      });
    return () => {
      cancelled = true;
    };
  }, [isSignedIn]);

  const setTheme = useCallback((t: UiTheme) => {
    touchedRef.current = true;
    setThemeState(t);
    applyThemeToDom(t);
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {
      /* best-effort */
    }
    // Persist to the account (no-op / 401 when signed out — harmless).
    fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uiTheme: t }),
    }).catch(() => {});
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "liquid" ? "classic" : "liquid");
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
