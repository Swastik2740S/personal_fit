"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, X } from "lucide-react";
import { useEffect } from "react";
import { ALL_NAV } from "@/lib/nav";
import { EASE } from "@/lib/motion";

export default function Drawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  // Lock body scroll and close on Escape while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.aside
            className="drawer"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", ease: EASE, duration: 0.3 }}
          >
            <div className="logo" style={{ marginBottom: 28, justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div className="logo-mark">S</div>
                <div className="logo-text">SwastikFit</div>
              </div>
              <button className="hamburger" onClick={onClose} aria-label="Close menu">
                <X size={18} />
              </button>
            </div>

            <nav>
              {ALL_NAV.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`nav-item ${active ? "active" : ""}`}
                    onClick={onClose}
                  >
                    <Icon size={18} className="nav-icon" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {session && (
              <div className="drawer-footer">
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, padding: "0 8px" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={session.user?.image || `https://ui-avatars.com/api/?name=${session.user?.name}`}
                    alt=""
                    style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid var(--glass-border)", flexShrink: 0 }}
                  />
                  <div style={{ overflow: "hidden" }}>
                    <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {session.user?.name}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--text3)" }}>Pro Member</div>
                  </div>
                </div>
                <button
                  className="nav-item"
                  onClick={() => signOut()}
                  style={{ width: "100%", border: "none", background: "none" }}
                >
                  <LogOut size={18} className="nav-icon" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
