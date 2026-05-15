"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";

const Sidebar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const navItems = [
    { label: "Overview", items: [
      { label: "Dashboard", href: "/", icon: "⚡" },
    ]},
    { label: "Daily", items: [
      { label: "Food Logger", href: "/food", icon: "🍽" },
      { label: "Steps", href: "/steps", icon: "🦶" },
    ]},
    { label: "Plan", items: [
      { label: "Meal Plan", href: "/meals", icon: "🥗" },
      { label: "Training", href: "/training", icon: "💪" },
      { label: "Supplements", href: "/supplements", icon: "⚗️" },
      { label: "Coach Tips", href: "/tips", icon: "🧠" },
    ]}
  ];

  return (
    <nav className="sidebar">
      <div className="logo">
        <div className="logo-mark">S</div>
        <div>
          <div className="logo-text">SwastikFit</div>
          <div className="logo-sub">Fat Loss Command Center</div>
        </div>
      </div>

      {navItems.map((section) => (
        <div key={section.label} className="nav-section">
          <div className="nav-label">{section.label}</div>
          {section.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-item ${pathname === item.href ? "active" : ""}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      ))}

      <div className="sidebar-footer">
        {session ? (
          <div className="stat-pill" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            {session.user?.image && (
              <img src={session.user.image} alt="Profile" style={{ width: "32px", height: "32px", borderRadius: "50%" }} />
            )}
            <div style={{ flex: 1 }}>
              <div className="stat-pill-label" style={{ fontSize: "10px" }}>Logged in as</div>
              <div className="stat-pill-val" style={{ fontSize: "14px" }}>{session.user?.name}</div>
            </div>
            <button 
              onClick={() => signOut()} 
              style={{ background: "none", border: "none", color: "var(--red)", cursor: "pointer", fontSize: "16px" }}
              title="Logout"
            >
              ✕
            </button>
          </div>
        ) : (
          <button 
            className="btn" 
            style={{ width: "100%", marginBottom: "16px" }}
            onClick={() => signIn("github")}
          >
            Login with GitHub
          </button>
        )}

        <div className="stat-pill">
          <div className="stat-pill-label">Daily target</div>
          <div className="stat-pill-val">
            2,350 <span style={{ fontSize: "13px", color: "var(--text3)", fontFamily: "var(--font-body)", fontWeight: 400 }}>kcal</span>
          </div>
          <div className="stat-pill-sub">Moderate deficit</div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
