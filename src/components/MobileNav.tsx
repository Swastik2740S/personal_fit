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
                layoutId="m-active-indicator"
                style={{
                  position: "absolute",
                  top: -1,
                  width: 20,
                  height: 2,
                  background: "var(--accent)",
                  borderRadius: 2,
                }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
};

export default MobileNav;
