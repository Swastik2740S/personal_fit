"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Utensils, 
  Footprints, 
  Dumbbell, 
  Pill, 
  Lightbulb, 
  LogOut,
  ChevronRight,
  TrendingUp
} from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const navItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Food Logger", href: "/food", icon: Utensils },
    { name: "Step Tracker", href: "/steps", icon: Footprints },
    { name: "Weekly Report", href: "/report", icon: TrendingUp },
    { name: "Training Plan", href: "/training", icon: Dumbbell },
    { name: "Meal Plan", href: "/meals", icon: Utensils },
    { name: "Supplements", href: "/supplements", icon: Pill },
    { name: "Coach Tips", href: "/tips", icon: Lightbulb },
  ];

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
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
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
                        marginLeft: 'auto', 
                        width: 4, 
                        height: 4, 
                        borderRadius: 2, 
                        background: 'var(--accent)' 
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
        <div className="sidebar-footer" style={{ marginTop: 'auto', paddingTop: 20, borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, padding: '0 8px' }}>
            <img 
              src={session.user?.image || `https://ui-avatars.com/api/?name=${session.user?.name}`} 
              alt="User" 
              style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid var(--border)', flexShrink: 0 }}
            />
            <div className="logo-text" style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {session.user?.name}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text3)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Pro Member
              </div>
            </div>
          </div>
          <button 
            className="nav-item" 
            onClick={() => signOut()}
            style={{ width: '100%', border: 'none', background: 'none' }}
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
