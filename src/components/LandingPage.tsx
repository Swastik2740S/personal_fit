"use client";

import { signIn } from "next-auth/react";

const LandingPage = () => {
  return (
    <div style={{ 
      minHeight: "80vh", 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center",
      textAlign: "center",
      padding: "20px"
    }}>
      <div style={{ 
        width: "80px", 
        height: "80px", 
        borderRadius: "20px", 
        background: "var(--accent)", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        fontSize: "40px",
        marginBottom: "32px",
        boxShadow: "0 20px 40px rgba(200, 245, 66, 0.2)"
      }}>
        S
      </div>

      <h1 style={{ 
        fontFamily: "var(--font-display)", 
        fontSize: "64px", 
        fontWeight: 800, 
        lineHeight: 1.1,
        marginBottom: "24px",
        background: "linear-gradient(to right, #fff, var(--text2))",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent"
      }}>
        Your Ultimate <br/> Fat Loss Command Center.
      </h1>

      <p style={{ 
        fontSize: "18px", 
        color: "var(--text2)", 
        maxWidth: "600px", 
        marginBottom: "40px",
        lineHeight: 1.6
      }}>
        Track your calories, hit your protein goals, and crush your PPL training split. 
        All in one sleek, high-performance dashboard built for your results.
      </p>

      <div style={{ display: "flex", gap: "16px" }}>
        <button 
          className="btn" 
          style={{ padding: "16px 40px", fontSize: "16px" }}
          onClick={() => signIn("github")}
        >
          Get Started with GitHub
        </button>
      </div>

      <div style={{ 
        marginTop: "80px", 
        display: "grid", 
        gridTemplateColumns: "repeat(3, 1fr)", 
        gap: "40px",
        maxWidth: "900px"
      }}>
        <div>
          <div style={{ fontSize: "24px", marginBottom: "12px" }}>🍽</div>
          <div style={{ fontWeight: 600, color: "var(--text)" }}>Smart Food Logger</div>
          <div style={{ fontSize: "14px", color: "var(--text3)", marginTop: "4px" }}>Powered by Edamam with instant DB caching.</div>
        </div>
        <div>
          <div style={{ fontSize: "24px", marginBottom: "12px" }}>💪</div>
          <div style={{ fontWeight: 600, color: "var(--text)" }}>PPL Training Split</div>
          <div style={{ fontSize: "14px", color: "var(--text3)", marginTop: "4px" }}>Optimized 6-day split for muscle retention.</div>
        </div>
        <div>
          <div style={{ fontSize: "24px", marginBottom: "12px" }}>🦶</div>
          <div style={{ fontWeight: 600, color: "var(--text)" }}>Step Tracking</div>
          <div style={{ fontSize: "14px", color: "var(--text3)", marginTop: "4px" }}>Beat the desk-job plateau with daily goals.</div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
