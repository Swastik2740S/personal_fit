"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Footprints, 
  Target, 
  TrendingUp, 
  Calendar,
  Clock,
  Compass,
  CheckCircle2
} from "lucide-react";

const StepTracker = () => {
  const { data: session } = useSession();
  const [steps, setSteps] = useState(0);
  const [inputVal, setInputVal] = useState("");
  const [loading, setLoading] = useState(false);
  const target = 8000;

  useEffect(() => {
    if (session) fetchSteps();
  }, [session]);

  const fetchSteps = async () => {
    try {
      const res = await fetch("/api/steps", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setSteps(data.count || 0);
      }
    } catch (error) {
      console.error("Fetch steps error:", error);
    }
  };

  const updateSteps = async () => {
    if (inputVal === "" || isNaN(Number(inputVal))) return;
    setLoading(true);
    try {
      const res = await fetch("/api/steps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ count: Number(inputVal) }),
        cache: "no-store",
      });
      if (res.ok) {
        setSteps(Number(inputVal));
        setInputVal("");
      }
    } catch (error) {
      console.error("Update steps error:", error);
    } finally {
      setLoading(false);
    }
  };

  const pct = Math.min(100, Math.round((steps / target) * 100));
  const circ = 427;
  const offset = circ - (circ * pct) / 100;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="page active">
      <motion.div variants={item} className="page-header">
        <div className="page-title">Step Tracker</div>
        <div className="page-sub">Monitor your daily movement and hit your activity goals.</div>
      </motion.div>

      <div className="grid-2" style={{ marginBottom: "24px" }}>
        <motion.div variants={item} className="card">
          <div className="card-title">
            <Footprints size={18} color="var(--accent)" />
            Today's Progress
          </div>
          <div className="step-display">
            <div className="step-ring-wrap">
              <div className="step-ring">
                <svg viewBox="0 0 160 160" width="160" height="160">
                  <circle className="ring-bg" cx="80" cy="80" r="68" />
                  <motion.circle
                    initial={{ strokeDashoffset: circ }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="ring-fill"
                    cx="80"
                    cy="80"
                    r="68"
                    strokeDasharray="427"
                  />
                </svg>
                <div className="ring-center">
                  <div className="ring-pct">{pct}%</div>
                  <div className="ring-sub">Daily Goal</div>
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800 }}>{steps.toLocaleString()}</div>
              <div style={{ fontSize: 13, color: 'var(--text3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Steps Walked</div>
            </div>
          </div>
          <div className="step-input-row" style={{ display: 'flex', gap: 10, marginTop: 24 }}>
            <input
              className="search-input"
              type="number"
              placeholder="Enter current steps"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              min="0"
              max="30000"
            />
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn" 
              onClick={updateSteps} 
              disabled={loading}
            >
              {loading ? "Syncing..." : "Update"}
            </motion.button>
          </div>
        </motion.div>

        <motion.div variants={item} className="card">
          <div className="card-title">
            <Target size={18} color="var(--neon-cyan)" />
            Activity Strategy
          </div>
          <div style={{ fontSize: "14px", color: "var(--text2)", marginBottom: "20px", padding: "16px", background: "var(--accent-dim)", borderRadius: "var(--r)", borderLeft: "4px solid var(--accent)" }}>
            Your baseline is ~2,000 steps by 5 PM. Target 6,000 more steps in the evening to optimize metabolic rate and recovery.
          </div>
          <div className="walk-tips">
            {[
              { icon: <TrendingUp size={16} />, title: "Post-Dinner Momentum", text: "A 25-minute walk after 9 PM adds ~2,500 steps and stabilizes blood sugar.", color: 'var(--accent)' },
              { icon: <Clock size={16} />, title: "Active Intervals", text: "Stand and pace for 10 mins during study or calls to add ~1,000 effortless steps.", color: 'var(--neon-cyan)' },
              { icon: <Compass size={16} />, title: "The Gym Bonus", text: "Walk to your workout session to bank an extra 800-1,200 steps daily.", color: 'var(--neon-purple)' },
              { icon: <CheckCircle2 size={16} />, title: "Micro-Movement", text: "Small household errands add up quickly to 1,000 steps. Stay mobile.", color: 'var(--neon-amber)' },
            ].map((tip, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 16 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--bg3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: tip.color, flexShrink: 0 }}>
                  <div style={{ margin: 'auto' }}>{tip.icon}</div>
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)' }}>{tip.title}</div>
                  <div style={{ fontSize: 13, color: 'var(--text3)', marginTop: 2 }}>{tip.text}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StepTracker;
