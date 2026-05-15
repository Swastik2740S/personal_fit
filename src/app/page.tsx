"use client";

import { useSession } from "next-auth/react";
import Dashboard from "@/components/Dashboard";
import LandingPage from "@/components/LandingPage";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div style={{ display: "flex", height: "80vh", alignItems: "center", justifyContent: "center" }}>
        <div className="spinner"></div>
      </div>
    );
  }

  if (session) {
    return <Dashboard />;
  }

  return <LandingPage />;
}
