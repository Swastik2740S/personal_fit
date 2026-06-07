"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { PRIMARY_NAV } from "@/lib/nav";

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <nav className="mobile-nav">
      {PRIMARY_NAV.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link key={item.href} href={item.href} className={`m-nav-item ${isActive ? "active" : ""}`}>
            <Icon size={20} className="m-nav-icon" />
            <span>{item.name}</span>
            {isActive && (
              <motion.div
                layoutId="m-active-pill"
                style={{
                  position: "absolute",
                  inset: "8px 10px",
                  background: "var(--accent-dim)",
                  borderRadius: "var(--r-pill)",
                  zIndex: 0,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
};

export default MobileNav;
