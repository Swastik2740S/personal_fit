"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import useSWR from "swr";
import { getLocalStartOfDay } from "@/lib/day";
import { fetcher, readSnapshot, saveSnapshot } from "@/lib/fetcher";
import { containerStagger as container, fadeUpItem as item, useCountUp } from "@/lib/motion";
import { useTimePhase, type TimePhase } from "./providers/TimeContext";
import { usePrivacy } from "./providers/PrivacyContext";
import Celebration from "./Celebration";
import {
  Zap,
  Target,
  TrendingUp,
  Flame,
  Footprints,
  Activity,
  ArrowUpRight,
  Award,
  Droplets,
  Utensils,
  Plus,
  Minus,
} from "lucide-react";

interface Insights {
  streak: number;
  days: number;
  loggedToday: boolean;
  calHit: number;
  protHit: number;
  stepHit: number;
}

interface DashboardData {
  stats: { cal: number; prot: number; carb: number; fat: number; steps: number; water: number };
  goals: {
    calGoal: number;
    protGoal: number;
    carbGoal: number;
    fatGoal: number;
    stepGoal: number;
    onboardingComplete: boolean;
  } | null;
  insights: Insights;
}

const DEFAULT_TARGETS = { cal: 2350, prot: 160, carb: 245, fat: 65, steps: 8000 };
const EMPTY_STATS = { cal: 0, prot: 0, carb: 0, fat: 0, steps: 0, water: 0 };

const WATER_GOAL_ML = 2500;
const WATER_MAX_ML = 20000;
const STREAK_MILESTONES = [3, 7, 14, 30, 50, 100];

// Contextual coaching line: turns raw numbers into the one thing worth knowing
// right now, based on time of day.
function buildNarrative(
  phase: TimePhase,
  stats: DashboardData["stats"],
  targets: typeof DEFAULT_TARGETS
): string {
  const calLeft = Math.max(0, Math.round(targets.cal - stats.cal));
  const protLeft = Math.max(0, Math.round(targets.prot - stats.prot));
  const stepsLeft = Math.max(0, targets.steps - stats.steps);

  if (phase === "morning") {
    if (stats.cal === 0)
      return `Fresh day — ${targets.cal} kcal and ${targets.prot}g protein on the board. Start with breakfast.`;
    return `Morning so far: ${Math.round(stats.cal)} kcal in · ${protLeft}g protein and ${calLeft} kcal to go.`;
  }
  if (protLeft === 0 && calLeft > 0) return `Protein goal hit 💪 — ${calLeft} kcal still in budget.`;
  if (protLeft > 0)
    return `Evening check-in: ${protLeft}g protein left${
      stepsLeft > 0 ? ` · ${stepsLeft.toLocaleString()} steps to goal` : ""
    }.`;
  return "All targets closed out — strong day.";
}

const DashboardSkeleton = () => (
  <div className="page active">
    <div className="page-header">
      <div style={{ width: "100%" }}>
        <div className="skeleton" style={{ height: 34, width: "min(260px, 70%)", marginBottom: 10 }} />
        <div className="skeleton" style={{ height: 16, width: "min(340px, 90%)" }} />
      </div>
    </div>
    <div className="metric-grid">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="skeleton" style={{ height: 140 }} />
      ))}
    </div>
    <div className="skeleton" style={{ height: 180, marginTop: 24 }} />
    <div className="dashboard-grid" style={{ marginTop: 24 }}>
      <div className="skeleton" style={{ height: 320 }} />
      <div className="skeleton" style={{ height: 320 }} />
    </div>
  </div>
);

const Dashboard = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const { phase } = useTimePhase();
  const { isPrivate } = usePrivacy();

  // One round trip for stats + goals + insights (was two separate calls).
  const url = user ? `/api/dashboard?localStart=${getLocalStartOfDay()}` : null;
  const { data, mutate } = useSWR<DashboardData>(url, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 30_000,
  });

  // Last good payload from localStorage: instant paint on revisit while SWR
  // revalidates (read in an effect to avoid SSR/hydration mismatch).
  const [snap, setSnap] = useState<DashboardData | null>(null);
  useEffect(() => {
    if (user && !data) setSnap(readSnapshot<DashboardData>("dashboard", user.id));
  }, [user, data]);
  useEffect(() => {
    // Never snapshot a pre-onboarding payload — it would paint a default-goals
    // dashboard for users who belong on /onboarding.
    if (user && data && data.goals?.onboardingComplete !== false) {
      saveSnapshot("dashboard", user.id, data);
    }
  }, [user, data]);

  // Gate: a signed-in user who hasn't finished onboarding has no real
  // plan/goals yet — send them to complete it (skeleton keeps showing).
  const needsOnboarding = data?.goals?.onboardingComplete === false;
  useEffect(() => {
    if (needsOnboarding) router.replace("/onboarding");
  }, [needsOnboarding, router]);

  const view = data ?? snap;
  const stats = view?.stats ?? EMPTY_STATS;
  const insights = view?.insights ?? null;
  const targets = view?.goals
    ? {
        cal: view.goals.calGoal,
        prot: view.goals.protGoal,
        carb: view.goals.carbGoal,
        fat: view.goals.fatGoal,
        steps: view.goals.stepGoal,
      }
    : DEFAULT_TARGETS;

  // Streak milestone celebration — once per milestone per user.
  const [celebrating, setCelebrating] = useState(false);
  useEffect(() => {
    const streak = data?.insights?.streak;
    if (!user || !streak || !STREAK_MILESTONES.includes(streak)) return;
    const key = `sf:celebrated:${user.id}:${streak}`;
    try {
      if (localStorage.getItem(key)) return;
      localStorage.setItem(key, "1");
    } catch {
      return;
    }
    setCelebrating(true);
    const t = setTimeout(() => setCelebrating(false), 3500);
    return () => clearTimeout(t);
  }, [data, user]);

  // Optimistic water logging: bump the number instantly, reconcile after POST.
  const setWater = async (ml: number) => {
    if (!view) return;
    const clamped = Math.max(0, Math.min(WATER_MAX_ML, ml));
    mutate({ ...view, stats: { ...view.stats, water: clamped } }, false);
    try {
      await fetch(`/api/water?localStart=${getLocalStartOfDay()}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ml: clamped }),
      });
    } catch (error) {
      console.error("Water log error:", error);
    } finally {
      mutate();
    }
  };

  const stepPct = Math.min(100, Math.round((stats.steps / targets.steps) * 100));
  const circ = 427;
  const offset = circ - (circ * stepPct) / 100;

  // Smooth count-up for headline metric numbers.
  const calCount = Math.round(useCountUp(stats.cal));
  const protCount = Math.round(useCountUp(stats.prot));
  const stepCount = Math.round(useCountUp(stats.steps));
  const remainingCount = Math.max(0, targets.cal - calCount);

  if (!isLoaded || !view || needsOnboarding) {
    return <DashboardSkeleton />;
  }

  const pBlur = isPrivate ? "privacy-blur" : "";
  const nothingLoggedToday = stats.cal === 0 && stats.steps === 0 && !insights?.loggedToday;
  const waterPct = Math.min(100, Math.round((stats.water / WATER_GOAL_ML) * 100));

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
      {celebrating && <Celebration />}

      <motion.div variants={item} className="page-header">
        <div>
          <div className="page-title">Welcome back, {user?.firstName ?? user?.fullName?.split(' ')[0]} 👋</div>
          <div className="page-sub">{buildNarrative(phase, stats, targets)}</div>
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

      {/* EMPTY-DAY CTA */}
      {nothingLoggedToday && (
        <motion.div
          variants={item}
          className="card"
          style={{ marginBottom: 24, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <Utensils size={22} color="var(--accent)" />
            <div>
              <div style={{ fontWeight: 700 }}>Nothing logged yet today</div>
              <div style={{ fontSize: 13, color: "var(--text3)", marginTop: 2 }}>
                Logging your first meal takes about 10 seconds.
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <Link href="/food"><button className="btn" style={{ fontSize: 13 }}>Log a meal</button></Link>
            <Link href="/steps"><button className="btn-ghost" style={{ fontSize: 13 }}>Log steps</button></Link>
          </div>
        </motion.div>
      )}

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

      {/* HYDRATION */}
      <motion.div variants={item} className="card" style={{ marginTop: 24 }}>
        <div className="card-title" style={{ justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Droplets size={18} color="var(--neon-cyan)" />
            Hydration
          </div>
          <div className={`badge ${pBlur}`} style={{ color: "var(--neon-cyan)" }}>
            {(stats.water / 1000).toFixed(2)} L / {(WATER_GOAL_ML / 1000).toFixed(1)} L
          </div>
        </div>
        <div className="prog-track" style={{ marginTop: 8 }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${waterPct}%` }}
            className="prog-fill"
            style={{ background: "var(--neon-cyan)" }}
          />
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
          <button className="btn-ghost" style={{ fontSize: 13 }} onClick={() => setWater(stats.water + 250)}>
            <Plus size={14} style={{ marginRight: 4 }} /> 250 ml
          </button>
          <button className="btn-ghost" style={{ fontSize: 13 }} onClick={() => setWater(stats.water + 500)}>
            <Plus size={14} style={{ marginRight: 4 }} /> 500 ml
          </button>
          <button
            className="btn-ghost"
            style={{ fontSize: 13, opacity: stats.water === 0 ? 0.4 : 1 }}
            onClick={() => setWater(stats.water - 250)}
            disabled={stats.water === 0}
          >
            <Minus size={14} style={{ marginRight: 4 }} /> 250 ml
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
