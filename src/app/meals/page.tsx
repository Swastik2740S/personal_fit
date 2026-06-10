"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Utensils, RefreshCw, AlertCircle, Loader, Sparkles } from "lucide-react";
import { containerStagger as container, fadeUpItem as item } from "@/lib/motion";
import type { MealPlanItem, WorkoutDay } from "@/lib/planGenerator";

export default function MealsPage() {
  const router = useRouter();
  const [mealPlan, setMealPlan] = useState<MealPlanItem[] | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [generatedAt, setGeneratedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [noPlan, setNoPlan] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Regenerating rebuilds the workout plan too — warn if it has swapped exercises.
  const [hasSwaps, setHasSwaps] = useState(false);
  const [confirmRegen, setConfirmRegen] = useState(false);

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
        setMealPlan(data.plan.mealPlan);
        setSummary(data.plan.summary);
        setGeneratedAt(data.plan.generatedAt);
        const workout: WorkoutDay[] = data.plan.workoutPlan ?? [];
        setHasSwaps(workout.some((d) => d.exercises.some((e) => e.swapped)));
      }
    } catch {
      setError("Could not load your meal plan.");
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
      setMealPlan(data.plan.mealPlan);
      setSummary(data.plan.summary);
      setGeneratedAt(data.plan.generatedAt);
      setHasSwaps(false);
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
            No meal plan yet
          </div>
          <p style={{ color: "var(--text3)", marginBottom: 28, maxWidth: 380, marginInline: "auto" }}>
            Complete your onboarding to get a personalized meal plan tailored to your calorie targets and dietary preferences.
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

  const totals = mealPlan?.reduce(
    (acc, m) => ({ cal: acc.cal + m.cal, prot: acc.prot + m.prot, carb: acc.carb + m.carb, fat: acc.fat + m.fat }),
    { cal: 0, prot: 0, carb: 0, fat: 0 }
  );

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="page active">
      <motion.div variants={item} className="page-header">
        <div>
          <div className="page-title">Meal Plan</div>
          <div className="page-sub">
            Your AI-personalized daily nutrition blueprint.
            {generatedAt && (
              <span style={{ marginLeft: 8, opacity: 0.5, fontSize: 11 }}>
                Generated {new Date(generatedAt).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="btn-ghost"
          onClick={() => (hasSwaps ? setConfirmRegen(true) : regenerate())}
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
        <motion.div variants={item} className="alert-error" style={{ marginBottom: 16 }}>
          <AlertCircle size={14} /> {error}
        </motion.div>
      )}

      {/* Daily totals */}
      {totals && (
        <motion.div variants={item} className="metric-grid" style={{ marginBottom: 24 }}>
          {[
            { label: "Daily Calories", val: Math.round(totals.cal), unit: "kcal", color: "var(--accent)" },
            { label: "Protein", val: Math.round(totals.prot), unit: "g", color: "var(--neon-cyan)" },
            { label: "Carbs", val: Math.round(totals.carb), unit: "g", color: "var(--neon-amber)" },
            { label: "Fat", val: Math.round(totals.fat), unit: "g", color: "var(--neon-purple)" },
          ].map((m) => (
            <div key={m.label} className="metric-card">
              <div className="metric-label">{m.label}</div>
              <div className="metric-val" style={{ color: m.color }}>
                {m.val}<span className="metric-unit">{m.unit}</span>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Coaching summary */}
      {summary && (
        <motion.div variants={item} className="card" style={{ marginBottom: 24 }}>
          <div className="card-title">
            <Sparkles size={18} color="var(--accent)" />
            Your Coaching Summary
          </div>
          <div style={{ fontSize: 14, lineHeight: 1.7, color: "var(--text2)", whiteSpace: "pre-line", marginTop: 8 }}>
            {summary}
          </div>
        </motion.div>
      )}

      {/* Meals */}
      {mealPlan?.map((meal, i) => (
        <motion.div key={i} variants={item} className="card" style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {meal.time}
              </div>
              <div className="card-title" style={{ marginBottom: 0, marginTop: 4, alignItems: "flex-start" }}>
                <Utensils size={16} color="var(--text3)" />
                {meal.name}
              </div>
            </div>
            <div style={{ fontSize: 15, fontWeight: 800, color: "var(--accent)", whiteSpace: "nowrap" }}>
              {Math.round(meal.cal)} kcal
            </div>
          </div>

          <div style={{ fontSize: 13, color: "var(--text3)", marginBottom: 16, lineHeight: 1.5 }}>
            {meal.description}
          </div>

          <div className="chip-row">
            {[
              { label: `P: ${Math.round(meal.prot)}g`, color: "var(--neon-cyan)" },
              { label: `C: ${Math.round(meal.carb)}g`, color: "var(--neon-amber)" },
              { label: `F: ${Math.round(meal.fat)}g`, color: "var(--neon-purple)" },
            ].map((chip) => (
              <span
                key={chip.label}
                className="chip"
                style={{ fontSize: 12, fontWeight: 700, color: chip.color, background: "var(--bg3)", border: "none" }}
              >
                {chip.label}
              </span>
            ))}
          </div>
        </motion.div>
      ))}

      {/* Regenerate confirm (workout plan has swapped exercises) */}
      <AnimatePresence>
        {confirmRegen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal-overlay" onClick={() => setConfirmRegen(false)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-title">Regenerate plan?</div>
              <div className="modal-sub">
                This rebuilds both your meal and workout plans from your profile — the exercises you swapped in on the Training page will be discarded.
              </div>
              <div className="modal-actions" style={{ display: "flex", gap: 10, marginTop: 8 }}>
                <button className="btn-ghost" style={{ flex: 1 }} onClick={() => setConfirmRegen(false)}>Cancel</button>
                <button className="btn" style={{ flex: 1 }} onClick={() => { setConfirmRegen(false); regenerate(); }}>
                  <RefreshCw size={14} style={{ marginRight: 6 }} /> Regenerate
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
