"use client";

import { useSession } from "next-auth/react";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import MobileHeader from "./MobileHeader";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { usePathname } from "next/navigation";
import { pageVariants } from "@/lib/motion";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <MotionConfig reducedMotion="user">
      <div className="shell">
        {session && <Sidebar />}
        {session && <MobileHeader />}
        <main className="main" style={!session ? { margin: 0, padding: 0, maxWidth: "none" } : {}}>
          <AnimatePresence mode="wait">
            <motion.div key={pathname} variants={pageVariants} initial="hidden" animate="show" exit="exit">
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
        {session && <MobileNav />}
      </div>
    </MotionConfig>
  );
}
