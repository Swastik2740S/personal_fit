"use client";

import { useAuth } from "@clerk/nextjs";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import MobileHeader from "./MobileHeader";
import DynamicMesh from "./DynamicMesh";
import GlassFilters from "./GlassFilters";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { usePathname } from "next/navigation";
import { pageVariants } from "@/lib/motion";
import { TimeProvider } from "./providers/TimeContext";
import { PrivacyProvider } from "./providers/PrivacyContext";
import { ThemeProvider } from "./providers/ThemeContext";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { isSignedIn, isLoaded } = useAuth();
  const pathname = usePathname();

  // On protected routes (non-landing, non-auth pages), keep nav visible while
  // Clerk hydrates to prevent a layout flash where sidebar disappears then reappears.
  const isPublicPath = pathname === "/" || pathname.startsWith("/sign");
  const showNav = isSignedIn === true || (!isLoaded && !isPublicPath);

  return (
    <ThemeProvider>
      <TimeProvider>
        <PrivacyProvider>
          <MotionConfig reducedMotion="user">
            <DynamicMesh />
            <GlassFilters />
            <div className="shell">
            {showNav && <Sidebar />}
            {showNav && <MobileHeader />}
            <main className="main" style={!showNav ? { margin: 0, padding: 0, maxWidth: "none" } : {}}>
              <AnimatePresence mode="wait">
                <motion.div key={pathname} variants={pageVariants} initial="hidden" animate="show" exit="exit">
                  {children}
                </motion.div>
              </AnimatePresence>
            </main>
            {showNav && <MobileNav />}
            </div>
          </MotionConfig>
        </PrivacyProvider>
      </TimeProvider>
    </ThemeProvider>
  );
}
