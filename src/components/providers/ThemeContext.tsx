"use client";

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useAuth } from "@clerk/nextjs";

export type UiTheme = "classic" | "glass";

interface ThemeContextType {
  theme: UiTheme;
  setTheme: (t: UiTheme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "sf:ui-theme";

/**
 * Normalize any stored/legacy value to a current theme. The previous opt-in
 * theme was `"liquid"` (iOS-26 Liquid Glass); it has been replaced by the calmer
 * `"glass"` (glassmorphism), so we alias legacy `"liquid"` → `"glass"` wherever
 * a value is read (DOM, localStorage, DB). Anything unrecognized → `"classic"`.
 */
function coerceTheme(v: string | null | undefined): UiTheme {
  return v === "glass" || v === "liquid" ? "glass" : "classic";
}

function applyThemeToDom(theme: UiTheme) {
  if (typeof document !== "undefined") {
    document.documentElement.dataset.ui = theme;
  }
}

/**
 * Account-synced UI appearance (Classic frosted ↔ glassmorphism "Glass").
 *
 * Source-of-truth order:
 *   1. A no-flash inline script in layout.tsx applies `localStorage` to
 *      `<html data-ui>` BEFORE paint (no FOUC), mapping legacy `liquid`→`glass`.
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

  // Hydrate from the value the no-flash script already applied.
  useEffect(() => {
    const fromDom = document.documentElement.dataset.ui;
    let initial: UiTheme = coerceTheme(fromDom);
    if (fromDom !== "glass" && fromDom !== "classic" && fromDom !== "liquid") {
      try {
        initial = coerceTheme(localStorage.getItem(STORAGE_KEY));
      } catch {
        initial = "classic";
      }
    }
    setThemeState(initial);
    applyThemeToDom(initial);
  }, []);

  // Reconcile the authoritative account value once signed in (fresh device).
  useEffect(() => {
    if (!isSignedIn) return;
    let cancelled = false;
    fetch("/api/profile")
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { uiTheme?: string } | null) => {
        if (cancelled || touchedRef.current || !data) return;
        const dbTheme = coerceTheme(data.uiTheme);
        setThemeState(dbTheme);
        applyThemeToDom(dbTheme);
        try {
          localStorage.setItem(STORAGE_KEY, dbTheme);
        } catch {
          /* storage unavailable — DOM/state still correct */
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
    setTheme(theme === "glass" ? "classic" : "glass");
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
