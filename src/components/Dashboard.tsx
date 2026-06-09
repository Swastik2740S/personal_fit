"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { getLocalStartOfDay } from "@/lib/day";
import { containerStagger as container, fadeUpItem as item, useCountUp } from "@/lib/motion";
import { useTimePhase } from "./providers/TimeContext";
import { usePrivacy } from "./providers/PrivacyContext";
import {
  Zap,
  Target,
  TrendingUp,
  Flame,
  Footprints,
  Activity,
  ArrowUpRight,
  Award,
} from "lucide-react";

interface Insights {
  streak: number;
  days: number;
  loggedToday: boolean;
  calHit: number;
  protHit: number;
  stepHit: number;
}

const Dashboard = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const { phase } = useTimePhase();
  const { isPrivate } = usePrivacy();
  // Hold rendering until we've confirmed onboarding status, so incomplete users
  // are redirected to /onboarding instead of flashing a default-goals dashboard.
  const [gateChecked, setGateChecked] = useState(false);

  const [stats, setStats] = useState({
    cal: 0,
    prot: 0,
    carb: 0,
    fat: 0,
    steps: 0,
  });

  const DEFAULT_TARGETS = {
    cal: 2350,
    prot: 160,
    carb: 245,
    fat: 65,
    steps: 8000,
  };

  const [targets, setTargets] = useState(DEFAULT_TARGETS);
  const [insights, setInsights] = useState<Insights | null>(null);

  const fetchInsights = async () => {
    try {
      const res = await fetch(`/api/insights?localStart=${getLocalStartOfDay()}`, { cache: "no-store" });
      if (res.ok) setInsights(await res.json());
    } catch (error) {
      console.error("Insights fetch error:", error);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch(`/api/dashboard/stats?localStart=${getLocalStartOfDay()}`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        const { goals, ...totals } = data;
        // Gate: a signed-in user who hasn't finished onboarding has no real
        // plan/goals yet — send them to complete it (keep the spinner showing
        // during navigation by returning before setGateChecked).
        if (goals && goals.onboardingComplete === false) {
          router.replace("/onboarding");
          return;
        }
        setStats(totals);
        if (goals) {
          setTargets({
            cal: goals.calGoal,
            prot: goals.protGoal,
            carb: goals.carbGoal,
            fat: goals.fatGoal,
            steps: goals.stepGoal,
          });
        }
      }
      setGateChecked(true);
    } catch (error) {
      console.error("Dashboard fetch error:", error);
      setGateChecked(true);
    }
  };

  useEffect(() => {
    if (user) {
      fetchStats();
      fetchInsights();
    }
  }, [user]);

  const stepPct = Math.min(100, Math.round((stats.steps / targets.steps) * 100));
  const circ = 427;
  const offset = circ - (circ * stepPct) / 100;

  // Smooth count-up for headline metric numbers.
  const calCount = Math.round(useCountUp(stats.cal));
  const protCount = Math.round(useCountUp(stats.prot));
  const stepCount = Math.round(useCountUp(stats.steps));
  const remainingCount = Math.max(0, targets.cal - calCount);

  if (!isLoaded || !gateChecked) {
    return (
      <div style={{ display: 'flex', height: '80vh', alignItems: 'center', justifyContent: 'center' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  const pBlur = isPrivate ? "privacy-blur" : "";

  // TEMPORAL LAYOUT PROJECTION
  // In morning: generic/recovery (Steps, Remaining) come first.
  // In evening: caloric expenditure (Calories, Protein) come first.
  const metricCards = [
    { id: "cal", label: "Calories", count: calCount, unit: "kcal", sub: `Budget: ${targets.cal}`, Icon: Flame, color: "var(--accent)" },
    { id: "prot", label: "Protein", count: protCount, unit: "g", sub: `Goal: ${targets.prot}g`, Icon: Activity, color: "var(--neon-cyan)" },
    { id: "steps", label: "Steps", count: stepCount.toLocaleString(), unit: "steps", sub: `Target: ${targets.steps}`, Icon: Footprints, color: "var(--neon-purple)" },
    { id: "rem", label: "Remaining", count: remainingCount, unit: "kcal", sub: "Daily balance", Icon: Target, color: "var(--neon-amber)" },
  ];

  const orderedCards = phase === "morning" 
    ? [...metricCards].reverse() // Steps/Rem first
    : metricCards; // Cal/Prot first

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      id="page-dashboard" 
      className="page active"
    >
      <motion.div variants={item} className="page-header">
        <div>
          <div className="page-title">Welcome back, {user?.firstName ?? user?.fullName?.split(' ')[0]} 👋</div>
          <div className="page-sub">Your performance summary for today. ({phase} phase active)</div>
        </div>
        <Link href="/report">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn" 
            style={{ fontSize: 13 }}
          >
            View Weekly Report <ArrowUpRight size={14} />
          </motion.button>
        </Link>
      </motion.div>

      {/* METRIC GRID */}
      <motion.div variants={item} className="metric-grid">
        {orderedCards.map((c) => (
          <motion.div
            key={c.id}
            className="metric-card"
            whileHover={{ scale: 1.02 }}
          >
            <div className="metric-label">{c.label}</div>
            <div className={`metric-val ${pBlur}`}>
              {c.count}
              <span className="metric-unit">{c.unit}</span>
            </div>
            <div className={`metric-sub ${pBlur}`}>{c.sub}</div>
            <div style={{ position: 'absolute', right: 20, bottom: 20, opacity: 0.1 }}>
              <c.Icon size={48} color={c.color} />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {insights && (
        <motion.div variants={item} className="card" style={{ marginTop: 24 }}>
          <div className="card-title" style={{ justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Award size={18} color="var(--accent)" />
              Consistency
            </div>
            <div className="badge badge-train" style={{ display: "flex", alignItems: "center", gap: 6 }}>
              🔥 {insights.streak} day{insights.streak === 1 ? "" : "s"} streak
            </div>
          </div>
          <div className="auto-grid" style={{ marginTop: 8 }}>
            {[
              { label: "Calories on target", hit: insights.calHit, color: "var(--accent)" },
              { label: "Protein goal", hit: insights.protHit, color: "var(--neon-cyan)" },
              { label: "Step goal", hit: insights.stepHit, color: "var(--neon-purple)" },
            ].map((a) => (
              <div key={a.label} className="metric-card">
                <div className="metric-label">{a.label}</div>
                <div className="metric-val" style={{ color: a.color }}>
                  {a.hit}<span className="metric-unit">/ {insights.days} days</span>
                </div>
                <div className="prog-track" style={{ marginTop: 10 }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(a.hit / insights.days) * 100}%` }}
                    className="prog-fill"
                    style={{ background: a.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      <div className="dashboard-grid" style={{ marginTop: 24 }}>
          <motion.div variants={item} className="card">
            <div className="card-title">
              <TrendingUp size={18} color="var(--accent)" />
              Macro Distribution
            </div>
            <div>
              <div className="prog-wrap prog-green">
                <div className="prog-label">
                  <span className="prog-name">Calories</span>
                  <span className={`prog-nums ${pBlur}`}>
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
                  <span className={`prog-nums ${pBlur}`}>
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
                  <span className={`prog-nums ${pBlur}`}>
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
                  <span className={`prog-nums ${pBlur}`}>
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
                  <div className={`ring-pct ${pBlur}`}>{stepPct}%</div>
                  <div className="ring-sub">Goal Reached</div>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <div style={{ textAlign: "center", background: "var(--bg3)", borderRadius: "var(--r)", padding: "12px", flex: 1 }}>
                <div style={{ fontSize: "11px", color: "var(--text3)", textTransform: 'uppercase', marginBottom: 4 }}>Logged</div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--text2)" }} className={pBlur}>{stats.steps.toLocaleString()}</div>
              </div>
              <div style={{ textAlign: "center", background: "var(--accent-dim)", borderRadius: "var(--r)", padding: "12px", flex: 1, border: '1px solid rgba(200, 245, 66, 0.1)' }}>
                <div style={{ fontSize: "11px", color: "var(--accent)", textTransform: 'uppercase', marginBottom: 4 }}>Required</div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--accent)" }} className={pBlur}>~{Math.max(0, targets.steps - stats.steps).toLocaleString()}</div>
              </div>
            </div>
          </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
