"use client";

import { useSession, signIn } from "next-auth/react";
import Sidebar from "@/components/Sidebar";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center", background: "var(--bg)" }}>
        <div className="spinner"></div>
      </div>
    );
  }

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
