"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Utensils, 
  Footprints, 
  TrendingUp, 
  Dumbbell 
} from "lucide-react";
import { motion } from "framer-motion";

const MobileNav = () => {
  const pathname = usePathname();

  const items = [
    { name: "Dash", href: "/", icon: LayoutDashboard },
    { name: "Food", href: "/food", icon: Utensils },
    { name: "Steps", href: "/steps", icon: Footprints },
    { name: "Report", href: "/report", icon: TrendingUp },
    { name: "Plan", href: "/training", icon: Dumbbell },
  ];

  return (
    <nav className="mobile-nav">
      {items.map((item) => {
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
                  position: 'absolute',
                  top: -1,
                  width: 20,
                  height: 2,
                  background: 'var(--accent)',
                  borderRadius: 2
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
