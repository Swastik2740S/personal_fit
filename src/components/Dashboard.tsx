"use client";

import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { 
  Zap, 
  Target, 
  TrendingUp, 
  Flame, 
  Footprints,
  Activity,
  ArrowUpRight
} from "lucide-react";

const Dashboard = () => {
  const { data: session, status } = useSession();
  
  const [stats, setStats] = useState({
    cal: 0,
    prot: 0,
    carb: 0,
    fat: 0,
    steps: 0,
  });

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/dashboard/stats", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    }
  };

  useEffect(() => {
    if (session) {
      fetchStats();
    }
  }, [session]);

  const targets = {
    cal: 2350,
    prot: 160,
    carb: 245,
    fat: 65,
    steps: 8000,
  };

  const stepPct = Math.min(100, Math.round((stats.steps / targets.steps) * 100));
  const circ = 427;
  const offset = circ - (circ * stepPct) / 100;

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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (status === "loading") {
    return (
      <div style={{ display: 'flex', height: '80vh', alignItems: 'center', justifyContent: 'center' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      id="page-dashboard" 
      className="page active"
    >
      <motion.div variants={item} className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div className="page-title">Welcome back, {session?.user?.name?.split(' ')[0]} 👋</div>
          <div className="page-sub">Your performance summary for today.</div>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn" 
          style={{ padding: '8px 16px', fontSize: 13, height: 'fit-content' }}
        >
          View Weekly Report <ArrowUpRight size={14} />
        </motion.button>
      </motion.div>

      <div className="metric-grid">
        <motion.div variants={item} className="metric-card">
          <div className="metric-label">Calories</div>
          <div className="metric-val">
            {Math.round(stats.cal)}
            <span className="metric-unit">kcal</span>
          </div>
          <div className="metric-sub">Budget: {targets.cal}</div>
          <div style={{ position: 'absolute', right: 20, bottom: 20, opacity: 0.1 }}>
            <Flame size={48} color="var(--accent)" />
          </div>
        </motion.div>

        <motion.div variants={item} className="metric-card">
          <div className="metric-label">Protein</div>
          <div className="metric-val">
            {Math.round(stats.prot)}
            <span className="metric-unit">g</span>
          </div>
          <div className="metric-sub">Goal: {targets.prot}g</div>
          <div style={{ position: 'absolute', right: 20, bottom: 20, opacity: 0.1 }}>
            <Activity size={48} color="var(--neon-cyan)" />
          </div>
        </motion.div>

        <motion.div variants={item} className="metric-card">
          <div className="metric-label">Steps</div>
          <div className="metric-val">
            {stats.steps.toLocaleString()}
            <span className="metric-unit">steps</span>
          </div>
          <div className="metric-sub">Target: {targets.steps}</div>
          <div style={{ position: 'absolute', right: 20, bottom: 20, opacity: 0.1 }}>
            <Footprints size={48} color="var(--neon-purple)" />
          </div>
        </motion.div>

        <motion.div variants={item} className="metric-card">
          <div className="metric-label">Remaining</div>
          <div className="metric-val">
            {Math.max(0, targets.cal - Math.round(stats.cal))}
            <span className="metric-unit">kcal</span>
          </div>
          <div className="metric-sub">Daily balance</div>
          <div style={{ position: 'absolute', right: 20, bottom: 20, opacity: 0.1 }}>
            <Target size={48} color="var(--neon-amber)" />
          </div>
        </motion.div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "24px" }}>
        <motion.div variants={item} className="card">
          <div className="card-title">
            <TrendingUp size={18} color="var(--accent)" />
            Macro Distribution
          </div>
          <div>
            <div className="prog-wrap prog-green">
              <div className="prog-label">
                <span className="prog-name">Calories</span>
                <span className="prog-nums">
                  {Math.round(stats.cal)} / {targets.cal}
                </span>
              </div>
              <div className="prog-track">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, (stats.cal / targets.cal) * 100)}%` }}
                  className="prog-fill" 
                />
              </div>
            </div>
            
            <div className="prog-wrap prog-cyan" style={{ marginTop: "20px" }}>
              <div className="prog-label">
                <span className="prog-name">Protein</span>
                <span className="prog-nums">
                  {Math.round(stats.prot)} / {targets.prot}g
                </span>
              </div>
              <div className="prog-track">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, (stats.prot / targets.prot) * 100)}%` }}
                  className="prog-fill" 
                />
              </div>
            </div>

            <div className="prog-wrap prog-amber" style={{ marginTop: "20px" }}>
              <div className="prog-label">
                <span className="prog-name">Carbs</span>
                <span className="prog-nums">
                  {Math.round(stats.carb)} / {targets.carb}g
                </span>
              </div>
              <div className="prog-track">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, (stats.carb / targets.carb) * 100)}%` }}
                  className="prog-fill" 
                />
              </div>
            </div>

            <div className="prog-wrap prog-purple" style={{ marginTop: "20px" }}>
              <div className="prog-label">
                <span className="prog-name">Fat</span>
                <span className="prog-nums">
                  {Math.round(stats.fat)} / {targets.fat}g
                </span>
              </div>
              <div className="prog-track">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, (stats.fat / targets.fat) * 100)}%` }}
                  className="prog-fill" 
                />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="card">
          <div className="card-title">
            <Zap size={18} color="var(--accent)" />
            Step Progress
          </div>
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
                <div className="ring-pct">{stepPct}%</div>
                <div className="ring-sub">Goal Reached</div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <div style={{ textAlign: "center", background: "var(--bg3)", borderRadius: "var(--r)", padding: "12px", flex: 1 }}>
              <div style={{ fontSize: "11px", color: "var(--text3)", textTransform: 'uppercase', marginBottom: 4 }}>Paced</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--text2)" }}>~2,000</div>
            </div>
            <div style={{ textAlign: "center", background: "var(--accent-dim)", borderRadius: "var(--r)", padding: "12px", flex: 1, border: '1px solid rgba(200, 245, 66, 0.1)' }}>
              <div style={{ fontSize: "11px", color: "var(--accent)", textTransform: 'uppercase', marginBottom: 4 }}>Required</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--accent)" }}>~{Math.max(0, targets.steps - stats.steps).toLocaleString()}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
