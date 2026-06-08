"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, RefreshCw, AlertCircle, Loader, Sparkles } from "lucide-react";
import { containerStagger as container, fadeUpItem as item } from "@/lib/motion";
import type { WorkoutDay } from "@/lib/planGenerator";

const DAY_COLORS = [
  "var(--accent)",
  "var(--neon-cyan)",
  "var(--neon-purple)",
  "var(--neon-amber)",
  "var(--accent)",
  "var(--neon-cyan)",
  "var(--neon-purple)",
];

export default function TrainingPage() {
  const router = useRouter();
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutDay[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [noPlan, setNoPlan] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeDay, setActiveDay] = useState(0);

  const fetchPlan = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/plan", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      if (!data.plan) {
        setNoPlan(true);
      } else {
        setWorkoutPlan(data.plan.workoutPlan);
      }
    } catch {
      setError("Could not load your workout plan.");
    } finally {
      setLoading(false);
    }
  };

  const regenerate = async () => {
    setRegenerating(true);
    setError(null);
    try {
      const res = await fetch("/api/plan", { method: "POST", cache: "no-store" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setError(err.error || "Regeneration failed.");
        return;
      }
      const data = await res.json();
      setWorkoutPlan(data.plan.workoutPlan);
      setActiveDay(0);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setRegenerating(false);
    }
  };

  useEffect(() => { fetchPlan(); }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", height: "80vh", alignItems: "center", justifyContent: "center" }}>
        <div className="spinner" />
      </div>
    );
  }

  if (noPlan) {
    return (
      <motion.div variants={container} initial="hidden" animate="show" className="page active">
        <motion.div variants={item} className="card" style={{ textAlign: "center", padding: "60px 32px" }}>
          <Sparkles size={48} color="var(--accent)" style={{ marginBottom: 20, display: "block", marginInline: "auto" }} />
          <div className="card-title" style={{ justifyContent: "center", fontSize: 22, marginBottom: 12 }}>
            No plan yet
          </div>
          <p style={{ color: "var(--text3)", marginBottom: 28, maxWidth: 380, marginInline: "auto" }}>
            Complete your onboarding to get a personalized workout plan built for your goals, experience, and equipment.
          </p>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="btn"
            onClick={() => router.push("/onboarding")}
          >
            Complete Onboarding
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  const activeWorkout = workoutPlan?.[activeDay];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="page active">
      <motion.div variants={item} className="page-header">
        <div>
          <div className="page-title">Training Protocol</div>
          <div className="page-sub">Your AI-personalized weekly workout plan.</div>
        </div>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="btn-ghost"
          onClick={regenerate}
          disabled={regenerating}
          style={{ fontSize: 13 }}
        >
          {regenerating ? (
            <><Loader size={14} style={{ marginRight: 6, animation: "spin 1s linear infinite" }} /> Regenerating…</>
          ) : (
            <><RefreshCw size={14} style={{ marginRight: 6 }} /> Regenerate</>
          )}
        </motion.button>
      </motion.div>

      {error && (
        <motion.div variants={item} style={{ background: "rgba(255,90,90,0.12)", border: "1px solid rgba(255,90,90,0.35)", color: "#ff9a9a", fontSize: 13, fontWeight: 600, padding: "10px 14px", borderRadius: "var(--r-pill)", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <AlertCircle size={14} /> {error}
        </motion.div>
      )}

      {/* Day tabs */}
      {workoutPlan && (
        <motion.div variants={item} style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
          {workoutPlan.map((day, i) => (
            <button
              key={i}
              onClick={() => setActiveDay(i)}
              className={`day-tab ${activeDay === i ? "active" : ""}`}
            >
              {day.day.slice(0, 3)}
            </button>
          ))}
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {activeWorkout && (
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="card"
          >
            <div className="card-title" style={{ marginBottom: 4 }}>
              <Dumbbell size={18} color={DAY_COLORS[activeDay % DAY_COLORS.length]} />
              <span style={{ color: DAY_COLORS[activeDay % DAY_COLORS.length] }}>{activeWorkout.day}</span>
              <span style={{ color: "var(--text2)", fontWeight: 600, fontSize: 14 }}>— {activeWorkout.focus}</span>
            </div>

            {activeWorkout.exercises.length === 0 ? (
              <div className="note-box" style={{ marginTop: 20, textAlign: "center", padding: "24px" }}>
                <div style={{ fontSize: 13, color: "var(--text3)" }}>Rest & Recovery Day — no training scheduled.</div>
              </div>
            ) : (
              <div style={{ marginTop: 16 }}>
                {activeWorkout.exercises.map((ex, j) => (
                  <div
                    key={j}
                    className="stat-row"
                    style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "14px 0", borderBottom: j < activeWorkout.exercises.length - 1 ? "1px solid var(--border)" : "none" }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text)" }}>{ex.name}</div>
                      {ex.note && <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 2 }}>{ex.note}</div>}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: DAY_COLORS[activeDay % DAY_COLORS.length], whiteSpace: "nowrap", marginLeft: 16, flexShrink: 0 }}>
                      {ex.sets} × {ex.reps}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </motion.div>
  );
}
