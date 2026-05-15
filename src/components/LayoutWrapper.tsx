"use client";

import { useSession } from "next-auth/react";
import Sidebar from "@/components/Sidebar";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();

  return (
    <div className="shell">
      {session && <Sidebar />}
      <main className="main" style={!session ? { margin: 0, maxWidth: "100%" } : {}}>
        {children}
      </main>
    </div>
  );
};

export default LayoutWrapper;
