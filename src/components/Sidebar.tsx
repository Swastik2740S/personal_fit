"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { LogOut, Eye, EyeOff } from "lucide-react";
import { ALL_NAV } from "@/lib/nav";
import { usePrivacy } from "./providers/PrivacyContext";

const Sidebar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { isPrivate, togglePrivacy } = usePrivacy();

  return (
    <motion.aside
      initial={{ x: -260 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", damping: 20, stiffness: 100 }}
      className="sidebar"
    >
      <div className="logo">
        <div className="logo-mark">S</div>
        <div className="logo-text">SwastikFit</div>
      </div>

      <div className="nav-section">
        <div className="nav-label">Menu</div>
        <nav>
          {ALL_NAV.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} style={{ textDecoration: "none" }} title={item.name}>
                <motion.div
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`nav-item ${isActive ? "active" : ""}`}
                >
                  <Icon size={18} className="nav-icon" />
                  <span>{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="active-indicator"
                      style={{
                        marginLeft: "auto",
                        width: 4,
                        height: 4,
                        borderRadius: 2,
                        background: "var(--accent)",
                      }}
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </div>

      {session && (
        <div className="sidebar-footer" style={{ marginTop: "auto", paddingTop: 20, borderTop: "1px solid var(--border)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, padding: "0 8px" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={session.user?.image || `https://ui-avatars.com/api/?name=${session.user?.name}`}
              alt="User"
              style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid var(--glass-border)", flexShrink: 0 }}
            />
            <div className="logo-text" style={{ overflow: "hidden" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {session.user?.name}
              </div>
              <div style={{ fontSize: 11, color: "var(--text3)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Pro Member
              </div>
            </div>
          </div>
          
          <button
            className="nav-item"
            onClick={() => togglePrivacy()}
            style={{ width: "100%", border: "none", background: "none" }}
            title={isPrivate ? "Disable Privacy Mode" : "Enable Privacy Mode"}
          >
            {isPrivate ? <Eye size={18} className="nav-icon" /> : <EyeOff size={18} className="nav-icon" />}
            <span>{isPrivate ? "Show Data" : "Hide Data"}</span>
          </button>

          <button
            className="nav-item"
            onClick={() => signOut()}
            style={{ width: "100%", border: "none", background: "none" }}
            title="Logout"
          >
            <LogOut size={18} className="nav-icon" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </motion.aside>
  );
};

export default Sidebar;
