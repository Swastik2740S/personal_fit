"use client";

import { useSession, signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { LogIn, Zap, Shield, Rocket, Target, Activity } from "lucide-react";

const LandingPage = () => {
  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center",
      background: "var(--bg)",
      position: "relative",
      overflow: "hidden",
      padding: "20px"
    }}>
      {/* Animated Background Elements */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{ 
          position: "absolute", top: "-10%", right: "-10%", width: "40vw", height: "40vw", 
          borderRadius: "50%", background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)", 
          filter: "blur(60px)", zIndex: 0 
        }} 
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.2, 0.1],
          rotate: [0, -90, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ 
          position: "absolute", bottom: "-10%", left: "-10%", width: "50vw", height: "50vw", 
          borderRadius: "50%", background: "radial-gradient(circle, var(--neon-cyan-glow) 0%, transparent 70%)", 
          filter: "blur(80px)", zIndex: 0 
        }} 
      />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: "800px" }}
      >
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "8px 16px", background: "var(--bg3)", borderRadius: "99px", border: "1px solid var(--border)", marginBottom: "32px" }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 10px var(--accent)" }}></span>
          <span style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text2)" }}>Now in Private Beta</span>
        </div>

        <h1 style={{ 
          fontFamily: "var(--font-display)", 
          fontSize: "clamp(48px, 8vw, 84px)", 
          fontWeight: 800, 
          lineHeight: 1, 
          letterSpacing: "-0.04em",
          marginBottom: "24px",
          color: "var(--text)"
        }}>
          Transform Your <br />
          <span style={{ color: "var(--accent)" }}>Body & Mind.</span>
        </h1>

        <p style={{ 
          fontSize: "clamp(16px, 2vw, 20px)", 
          color: "var(--text2)", 
          marginBottom: "48px",
          lineHeight: 1.6,
          maxWidth: "600px",
          marginInline: "auto"
        }}>
          The ultimate high-performance fitness tracker designed for the modern elite. Precision logging, AI-driven nutrition, and professional protocols.
        </p>

        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px var(--accent-glow)" }}
            whileTap={{ scale: 0.95 }}
            className="btn" 
            onClick={() => signIn("github")}
            style={{ fontSize: "16px", padding: "16px 32px", height: "auto" }}
          >
            <LogIn size={20} /> Get Started with GitHub
          </motion.button>
          
          <motion.button 
            whileHover={{ background: "var(--bg3)" }}
            className="btn-ghost"
            style={{ fontSize: "16px", padding: "16px 32px", height: "auto", border: "1px solid var(--border)" }}
          >
            Watch Demo
          </motion.button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", marginTop: "84px" }}>
          {[
            { icon: <Target />, title: "Precision Tracking", desc: "Every gram and step accounted for." },
            { icon: <Rocket />, title: "Elite Protocols", desc: "Built on professional science." },
            { icon: <Activity />, title: "Real-time Stats", desc: "Live dashboard of your progress." }
          ].map((feature, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ color: "var(--accent)", marginBottom: "12px", display: "flex", justifyContent: "center" }}>{feature.icon}</div>
              <div style={{ fontWeight: 700, fontSize: "16px", marginBottom: "4px" }}>{feature.title}</div>
              <div style={{ fontSize: "13px", color: "var(--text3)" }}>{feature.desc}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LandingPage;
