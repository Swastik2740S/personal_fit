"use client";

import { useSession } from "next-auth/react";
import Sidebar from "./Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <div className="shell">
      {session && <Sidebar />}
      <main className="main" style={!session ? { margin: 0, padding: 0, maxWidth: 'none' } : {}}>
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
