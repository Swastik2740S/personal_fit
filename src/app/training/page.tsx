"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dumbbell, RefreshCw, AlertCircle, Loader, Sparkles,
  TrendingUp, ChevronDown, ChevronUp, History, X, Trophy, ArrowLeftRight,
} from "lucide-react";
import { containerStagger as container, fadeUpItem as item } from "@/lib/motion";
import type { Exercise, WorkoutDay } from "@/lib/planGenerator";
import { getSuggestions, type EquipmentTier } from "@/lib/exerciseLibrary";
import type { LiftTarget, TargetsResponse } from "@/app/api/lifts/targets/route";

// ── Types ─────────────────────────────────────────────────────────────────────

interface LiftEntry {
  id:        string;
  exercise:  string;
  weightKg:  number;
  sets:      number;
  reps:      number;
  notes:     string | null;
  date:      string;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const DAY_COLORS = [
  "var(--accent)",
  "var(--neon-cyan)",
  "var(--neon-purple)",
  "var(--neon-amber)",
  "var(--accent)",
  "var(--neon-cyan)",
  "var(--neon-purple)",
];

function todayPlanIndex() {
  const js = new Date().getDay(); // 0=Sun
  return js === 0 ? 6 : js - 1;  // Mon=0 … Sun=6
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

// ── Log form (inline per exercise) ───────────────────────────────────────────

interface LogFormProps {
  exercise:  string;
  target:    LiftTarget | undefined;
  dayColor:  string;
  onSaved:   (isPR: boolean) => void;
  onCancel:  () => void;
}

function LogForm({ exercise, target, dayColor, onSaved, onCancel }: LogFormProps) {
  const [weight, setWeight] = useState(
    target?.targetWeightKg != null ? String(target.targetWeightKg) : ""
  );
  const [sets,  setSets]  = useState(target?.plannedSets ?? "");
  const [reps,  setReps]  = useState(
    target?.targetReps != null ? String(target.targetReps) : ""
  );
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function save() {
    const w = parseFloat(weight);
    const s = parseInt(sets, 10);
    const r = parseInt(reps, 10);
    if (!w || !s || !r || w <= 0 || s <= 0 || r <= 0) {
      setErr("Weight, sets and reps are required.");
      return;
    }
    setSaving(true);
    setErr(null);
    try {
      const res = await fetch("/api/lifts", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ exercise, weightKg: w, sets: s, reps: r, notes: notes || undefined }),
      });
      const data = await res.json();
      if (!res.ok) { setErr(data.error ?? "Failed to save."); return; }
      onSaved(data.isPR);
    } catch {
      setErr("Network error.");
    } finally {
      setSaving(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    background: "var(--surface-2)",
    border: "1px solid var(--border)",
    borderRadius: "var(--r-pill)",
    color: "var(--text)",
    padding: "8px 14px",
    fontSize: 13,
    width: "100%",
    outline: "none",
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      style={{ overflow: "hidden" }}
    >
      <div style={{ padding: "14px 0 4px", display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 11, color: "var(--text3)", display: "block", marginBottom: 4 }}>WEIGHT (kg)</label>
            <input
              style={inputStyle}
              type="number"
              min="0"
              step="0.5"
              placeholder="e.g. 80"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 11, color: "var(--text3)", display: "block", marginBottom: 4 }}>SETS</label>
            <input
              style={inputStyle}
              type="number"
              min="1"
              max="20"
              placeholder={target?.plannedSets ?? "4"}
              value={sets}
              onChange={(e) => setSets(e.target.value)}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 11, color: "var(--text3)", display: "block", marginBottom: 4 }}>REPS</label>
            <input
              style={inputStyle}
              type="number"
              min="1"
              placeholder={target?.plannedReps ?? "8"}
              value={reps}
              onChange={(e) => setReps(e.target.value)}
            />
          </div>
        </div>
        <input
          style={inputStyle}
          type="text"
          placeholder="Notes (optional)"
          maxLength={300}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        {err && (
          <div style={{ fontSize: 12, color: "#ff9a9a", display: "flex", gap: 6, alignItems: "center" }}>
            <AlertCircle size={12} /> {err}
          </div>
        )}
        <div style={{ display: "flex", gap: 8 }}>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="btn"
            style={{ flex: 1, fontSize: 13, padding: "9px 16px", background: dayColor, color: "#000" }}
            onClick={save}
            disabled={saving}
          >
            {saving ? <Loader size={13} style={{ animation: "spin 1s linear infinite" }} /> : "Save Set"}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="btn-ghost"
            style={{ fontSize: 13, padding: "9px 16px" }}
            onClick={onCancel}
          >
            Cancel
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ── History modal ─────────────────────────────────────────────────────────────

interface HistoryModalProps {
  exercise: string;
  dayColor: string;
  onClose:  () => void;
}

function HistoryModal({ exercise, dayColor, onClose }: HistoryModalProps) {
  const [entries, setEntries] = useState<LiftEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/lifts?exercise=${encodeURIComponent(exercise)}&limit=20`)
      .then((r) => r.json())
      .then((d) => setEntries(d.entries ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [exercise]);

  async function deleteEntry(id: string) {
    setDeleting(id);
    await fetch(`/api/lifts/${id}`, { method: "DELETE" });
    setEntries((prev) => prev.filter((e) => e.id !== id));
    setDeleting(null);
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: "fixed", inset: 0, zIndex: 999,
          background: "rgba(0,0,0,0.6)",
          display: "flex", alignItems: "flex-end", justifyContent: "center",
          padding: "0 0 env(safe-area-inset-bottom)",
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 300 }}
          className="modal"
          style={{ width: "100%", maxWidth: 560, maxHeight: "85vh", overflow: "hidden", display: "flex", flexDirection: "column" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 20px 0" }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: 16, color: dayColor }}>{exercise}</div>
              <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 2 }}>Last 20 sessions</div>
            </div>
            <button className="btn-ghost" style={{ padding: "6px 10px" }} onClick={onClose}>
              <X size={16} />
            </button>
          </div>

          <div style={{ overflowY: "auto", padding: "12px 20px 20px", flex: 1 }}>
            {loading ? (
              <div style={{ display: "flex", justifyContent: "center", padding: 32 }}>
                <div className="spinner" />
              </div>
            ) : entries.length === 0 ? (
              <div style={{ textAlign: "center", color: "var(--text3)", fontSize: 13, padding: "32px 0" }}>
                No logs yet — be the first to log this exercise.
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {entries.map((e, i) => (
                  <motion.div
                    key={e.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="stat-row"
                    style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0" }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text)" }}>
                        {e.weightKg} kg &times; {e.sets} &times; {e.reps}
                        {i === 0 && (
                          <span style={{
                            marginLeft: 8, fontSize: 10, fontWeight: 800,
                            background: "rgba(200,245,66,0.15)", color: "var(--accent)",
                            border: "1px solid rgba(200,245,66,0.3)",
                            borderRadius: "var(--r-pill)", padding: "1px 6px", verticalAlign: "middle",
                          }}>LATEST</span>
                        )}
                      </div>
                      {e.notes && <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 2 }}>{e.notes}</div>}
                    </div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <div style={{ fontSize: 12, color: "var(--text3)" }}>{fmtDate(e.date)}</div>
                      <button
                        className="btn-ghost"
                        style={{ padding: "4px 8px", fontSize: 11 }}
                        onClick={() => deleteEntry(e.id)}
                        disabled={deleting === e.id}
                      >
                        {deleting === e.id ? <Loader size={11} style={{ animation: "spin 1s linear infinite" }} /> : <X size={11} />}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Swap modal ────────────────────────────────────────────────────────────────

interface SwapReplacement {
  name: string;
  sets: string;
  reps: string;
  note: string;
}

interface SwapModalProps {
  exercise: Exercise;
  equipment: EquipmentTier;
  excludeNames: string[];
  dayColor: string;
  onSwap: (replacement: SwapReplacement) => void;
  onClose: () => void;
}

const EQUIP_CHIP: Record<EquipmentTier, string> = {
  none: "bodyweight",
  home_gym: "home gym",
  full_gym: "gym",
};

function SwapModal({ exercise, equipment, excludeNames, dayColor, onSwap, onClose }: SwapModalProps) {
  const suggestions = getSuggestions(exercise.name, equipment, excludeNames);
  const [customOpen, setCustomOpen] = useState(suggestions.length === 0);
  const [name, setName] = useState("");
  const [sets, setSets] = useState(exercise.sets);
  const [reps, setReps] = useState(exercise.reps);
  const [err, setErr] = useState<string | null>(null);

  function saveCustom() {
    if (!name.trim() || !sets.trim() || !reps.trim()) {
      setErr("Name, sets and reps are required.");
      return;
    }
    onSwap({ name: name.trim(), sets: sets.trim(), reps: reps.trim(), note: "" });
  }

  const inputStyle: React.CSSProperties = {
    background: "var(--surface-2)",
    border: "1px solid var(--border)",
    borderRadius: "var(--r-pill)",
    color: "var(--text)",
    padding: "8px 14px",
    fontSize: 13,
    width: "100%",
    outline: "none",
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: "fixed", inset: 0, zIndex: 999,
          background: "rgba(0,0,0,0.6)",
          display: "flex", alignItems: "flex-end", justifyContent: "center",
          padding: "0 0 env(safe-area-inset-bottom)",
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 300 }}
          className="modal"
          style={{ width: "100%", maxWidth: 560, maxHeight: "85vh", overflow: "hidden", display: "flex", flexDirection: "column" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 20px 0" }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: 16, color: dayColor }}>Replace {exercise.name}</div>
              <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 2 }}>
                Same movement pattern, matched to your equipment.
              </div>
            </div>
            <button className="btn-ghost" style={{ padding: "6px 10px" }} onClick={onClose}>
              <X size={16} />
            </button>
          </div>

          <div style={{ overflowY: "auto", padding: "12px 20px 20px", flex: 1 }}>
            {suggestions.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {suggestions.map((s, i) => (
                  <motion.button
                    key={s.name}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => onSwap({ name: s.name, sets: s.sets, reps: s.reps, note: s.note })}
                    style={{
                      display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12,
                      padding: "12px 4px", background: "transparent", border: "none",
                      borderBottom: "1px solid var(--border)", cursor: "pointer", textAlign: "left", width: "100%",
                    }}
                  >
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text)" }}>{s.name}</div>
                      <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 2 }}>{s.note}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                      <span style={{
                        fontSize: 10, fontWeight: 700, padding: "2px 8px",
                        background: "rgba(255,255,255,0.06)", color: "var(--text3)",
                        borderRadius: "var(--r-pill)", border: "1px solid var(--border)",
                      }}>
                        {EQUIP_CHIP[s.equipment[0]]}
                      </span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: dayColor, whiteSpace: "nowrap" }}>
                        {s.sets} × {s.reps}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {suggestions.length === 0 && (
              <div style={{ fontSize: 13, color: "var(--text3)", padding: "8px 0 4px" }}>
                No matched substitutes for this one — enter your own below.
              </div>
            )}

            {/* Custom exercise */}
            <div style={{ marginTop: 16 }}>
              {!customOpen ? (
                <button className="btn-ghost" style={{ fontSize: 12, width: "100%" }} onClick={() => setCustomOpen(true)}>
                  Or enter a custom exercise
                </button>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Custom exercise
                  </div>
                  <input
                    style={inputStyle}
                    type="text"
                    placeholder="Exercise name"
                    maxLength={80}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <div style={{ display: "flex", gap: 8 }}>
                    <input style={inputStyle} type="text" placeholder="Sets (e.g. 3)" maxLength={20} value={sets} onChange={(e) => setSets(e.target.value)} />
                    <input style={inputStyle} type="text" placeholder="Reps (e.g. 8-12)" maxLength={30} value={reps} onChange={(e) => setReps(e.target.value)} />
                  </div>
                  {err && (
                    <div style={{ fontSize: 12, color: "#ff9a9a", display: "flex", gap: 6, alignItems: "center" }}>
                      <AlertCircle size={12} /> {err}
                    </div>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn"
                    style={{ fontSize: 13, background: dayColor, color: "#000" }}
                    onClick={saveCustom}
                  >
                    Swap in custom exercise
                  </motion.button>
                </div>
              )}
            </div>

            <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 16 }}>
              Your lift history for “{exercise.name}” stays saved under its name.
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Suggestion chip ───────────────────────────────────────────────────────────

function SuggestionChip({ target, dayColor }: { target: LiftTarget; dayColor: string }) {
  if (target.suggestion === "first") {
    return (
      <span style={{
        fontSize: 11, fontWeight: 700, padding: "3px 9px",
        background: "rgba(255,255,255,0.06)", color: "var(--text3)",
        borderRadius: "var(--r-pill)", border: "1px solid var(--border)",
      }}>
        first session
      </span>
    );
  }

  const isIncrease = target.suggestion === "increase";
  return (
    <span style={{
      fontSize: 11, fontWeight: 800, padding: "3px 9px",
      background: isIncrease ? `rgba(200,245,66,0.12)` : "rgba(255,255,255,0.06)",
      color: isIncrease ? "var(--accent)" : "var(--text2)",
      borderRadius: "var(--r-pill)",
      border: isIncrease ? "1px solid rgba(200,245,66,0.3)" : "1px solid var(--border)",
      display: "inline-flex", alignItems: "center", gap: 4,
    }}>
      {isIncrease && <TrendingUp size={10} />}
      {target.targetWeightKg} kg &times; {target.targetReps}
      {isIncrease ? " ↑" : " →"}
    </span>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function TrainingPage() {
  const router = useRouter();

  // Plan state
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutDay[] | null>(null);
  const [loading,     setLoading]     = useState(true);
  const [noPlan,      setNoPlan]      = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [planError,   setPlanError]   = useState<string | null>(null);
  const [activeDay,   setActiveDay]   = useState(todayPlanIndex());

  // Targets state (today only)
  const [targets,     setTargets]     = useState<TargetsResponse | null>(null);
  const [targetsLoading, setTargetsLoading] = useState(false);

  // UI state
  const [expandedLog,  setExpandedLog]  = useState<string | null>(null); // exercise name with open log form
  const [historyFor,   setHistoryFor]   = useState<string | null>(null); // exercise name for history modal
  const [prFlash,      setPrFlash]      = useState<string | null>(null); // exercise name for PR flash

  // Swap state
  const [equipment,    setEquipment]    = useState<EquipmentTier>("none");
  const [swapFor,      setSwapFor]      = useState<{ day: number; idx: number } | null>(null);
  const [confirmRegen, setConfirmRegen] = useState(false);

  const fetchPlan = useCallback(async () => {
    setLoading(true);
    setPlanError(null);
    try {
      const res = await fetch("/api/plan", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      if (data.equipment) setEquipment(data.equipment as EquipmentTier);
      if (!data.plan) { setNoPlan(true); }
      else { setWorkoutPlan(data.plan.workoutPlan); }
    } catch {
      setPlanError("Could not load your workout plan.");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTargets = useCallback(async () => {
    setTargetsLoading(true);
    try {
      const res = await fetch("/api/lifts/targets", { cache: "no-store" });
      if (res.ok) setTargets(await res.json());
    } catch { /* non-fatal */ }
    finally { setTargetsLoading(false); }
  }, []);

  useEffect(() => { fetchPlan(); }, [fetchPlan]);
  // Fetch targets whenever the user views today's tab
  useEffect(() => {
    if (workoutPlan && activeDay === todayPlanIndex()) {
      fetchTargets();
    }
  }, [workoutPlan, activeDay, fetchTargets]);

  const regenerate = async () => {
    setRegenerating(true);
    setPlanError(null);
    try {
      const res = await fetch("/api/plan", { method: "POST", cache: "no-store" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setPlanError(err.error || "Regeneration failed.");
        return;
      }
      const data = await res.json();
      setWorkoutPlan(data.plan.workoutPlan);
      setActiveDay(todayPlanIndex());
    } catch {
      setPlanError("Network error. Please try again.");
    } finally {
      setRegenerating(false);
    }
  };

  function handleLogSaved(exercise: string, isPR: boolean) {
    setExpandedLog(null);
    fetchTargets();
    if (isPR) {
      setPrFlash(exercise);
      setTimeout(() => setPrFlash(null), 3000);
    }
  }

  // Optimistic swap: replace locally first, PATCH, roll back on failure.
  async function applySwap(replacement: SwapReplacement) {
    if (!swapFor || !workoutPlan) return;
    const { day, idx } = swapFor;
    const expectedName = workoutPlan[day]?.exercises?.[idx]?.name;
    if (!expectedName) return;

    const prevPlan = workoutPlan;
    setWorkoutPlan(
      workoutPlan.map((d, i) =>
        i !== day
          ? d
          : { ...d, exercises: d.exercises.map((e, j) => (j !== idx ? e : { ...replacement, swapped: true })) }
      )
    );
    setSwapFor(null);
    setPlanError(null);

    try {
      const res = await fetch("/api/plan/exercise", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dayIndex: day, exerciseIndex: idx, expectedName, replacement }),
        cache: "no-store",
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setWorkoutPlan(prevPlan);
        setPlanError(err.error || "Couldn't swap the exercise. Please try again.");
        return;
      }
      // Exercise names changed — refresh today's progression targets.
      if (day === todayPlanIndex()) fetchTargets();
    } catch {
      setWorkoutPlan(prevPlan);
      setPlanError("Network error. Please try again.");
    }
  }

  const hasCustomizations = workoutPlan?.some((d) => d.exercises.some((e) => e.swapped)) ?? false;

  // ── Loading / no-plan screens ──────────────────────────────────────────────

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
          <div className="card-title" style={{ justifyContent: "center", fontSize: 22, marginBottom: 12 }}>No plan yet</div>
          <p style={{ color: "var(--text3)", marginBottom: 28, maxWidth: 380, marginInline: "auto" }}>
            Complete your onboarding to get a personalized workout plan.
          </p>
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="btn" onClick={() => router.push("/onboarding")}>
            Complete Onboarding
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  const activeWorkout  = workoutPlan?.[activeDay];
  const isToday        = activeDay === todayPlanIndex();
  const dayColor       = DAY_COLORS[activeDay % DAY_COLORS.length];

  // Build target map for quick lookup (only used on today's tab)
  const targetMap = new Map<string, LiftTarget>(
    (targets?.targets ?? []).map((t) => [t.exercise, t])
  );

  // ── Main render ────────────────────────────────────────────────────────────

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="page active">
      {/* Header */}
      <motion.div variants={item} className="page-header">
        <div>
          <div className="page-title">Training Protocol</div>
          <div className="page-sub">Progressive overload — log every lift.</div>
        </div>
        <motion.button
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
          className="btn-ghost"
          onClick={() => (hasCustomizations ? setConfirmRegen(true) : regenerate())}
          disabled={regenerating}
          style={{ fontSize: 13 }}
        >
          {regenerating
            ? <><Loader size={14} style={{ marginRight: 6, animation: "spin 1s linear infinite" }} /> Regenerating…</>
            : <><RefreshCw size={14} style={{ marginRight: 6 }} /> Regenerate</>
          }
        </motion.button>
      </motion.div>

      {planError && (
        <motion.div variants={item} className="alert-error" style={{ marginBottom: 16 }}>
          <AlertCircle size={14} /> {planError}
        </motion.div>
      )}

      {/* Day tabs */}
      {workoutPlan && (
        <motion.div variants={item} style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
          {workoutPlan.map((day, i) => (
            <button
              key={i}
              onClick={() => { setActiveDay(i); setExpandedLog(null); }}
              className={`day-tab ${activeDay === i ? "active" : ""}`}
              style={activeDay === i ? { borderColor: DAY_COLORS[i % DAY_COLORS.length], color: DAY_COLORS[i % DAY_COLORS.length] } : {}}
            >
              {day.day.slice(0, 3)}
              {i === todayPlanIndex() && (
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: DAY_COLORS[i % DAY_COLORS.length], display: "inline-block", marginLeft: 4, verticalAlign: "middle" }} />
              )}
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
          >
            {/* Day card */}
            <div className="card">
              <div className="card-title" style={{ marginBottom: 4 }}>
                <Dumbbell size={18} color={dayColor} />
                <span style={{ color: dayColor }}>{activeWorkout.day}</span>
                <span style={{ color: "var(--text2)", fontWeight: 600, fontSize: 14 }}>— {activeWorkout.focus}</span>
                {isToday && (
                  <span style={{ marginLeft: "auto", fontSize: 11, fontWeight: 800, color: dayColor, background: `rgba(200,245,66,0.08)`, border: `1px solid ${dayColor}33`, borderRadius: "var(--r-pill)", padding: "2px 8px" }}>
                    TODAY
                  </span>
                )}
              </div>

              {/* Targets loading indicator */}
              {isToday && targetsLoading && (
                <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
                  <Loader size={10} style={{ animation: "spin 1s linear infinite" }} /> Loading targets…
                </div>
              )}

              {activeWorkout.exercises.length === 0 ? (
                <div className="note-box" style={{ marginTop: 20, textAlign: "center", padding: "24px" }}>
                  <div style={{ fontSize: 13, color: "var(--text3)" }}>Rest & Recovery Day — no training scheduled.</div>
                </div>
              ) : (
                <div style={{ marginTop: 16 }}>
                  {activeWorkout.exercises.map((ex, j) => {
                    const target    = isToday ? targetMap.get(ex.name) : undefined;
                    const isExpanded = expandedLog === ex.name;
                    const isPRing    = prFlash === ex.name;

                    return (
                      <div key={j}>
                        <div
                          style={{
                            padding: "14px 0",
                            borderBottom: j < activeWorkout.exercises.length - 1 || isExpanded ? "1px solid var(--border)" : "none",
                          }}
                        >
                          {/* Exercise row */}
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                                <span style={{ fontWeight: 700, fontSize: 14, color: "var(--text)" }}>{ex.name}</span>
                                {ex.swapped && (
                                  <span style={{
                                    fontSize: 9, fontWeight: 800, padding: "1px 7px",
                                    background: "rgba(34,211,238,0.1)", color: "var(--neon-cyan)",
                                    border: "1px solid rgba(34,211,238,0.3)",
                                    borderRadius: "var(--r-pill)", textTransform: "uppercase", letterSpacing: "0.05em",
                                  }}>
                                    swapped
                                  </span>
                                )}
                                {isPRing && (
                                  <motion.span
                                    initial={{ scale: 0.6, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    style={{
                                      fontSize: 10, fontWeight: 800, padding: "2px 8px",
                                      background: "rgba(255,200,50,0.15)", color: "#ffd700",
                                      border: "1px solid rgba(255,200,50,0.4)",
                                      borderRadius: "var(--r-pill)", display: "inline-flex", alignItems: "center", gap: 4,
                                    }}
                                  >
                                    <Trophy size={9} /> NEW PR
                                  </motion.span>
                                )}
                              </div>

                              {ex.note && <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 2 }}>{ex.note}</div>}

                              {/* Target row */}
                              {isToday && target && !targetsLoading && (
                                <div style={{ marginTop: 6, display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
                                  <SuggestionChip target={target} dayColor={dayColor} />
                                  {target.lastWeightKg != null && (
                                    <span style={{ fontSize: 11, color: "var(--text3)" }}>
                                      Last: {target.lastWeightKg} kg × {target.lastReps} · {fmtDate(target.lastDate!)}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>

                            {/* Right: sets×reps + buttons */}
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0 }}>
                              <div style={{ fontSize: 13, fontWeight: 700, color: dayColor, whiteSpace: "nowrap" }}>
                                {ex.sets} × {ex.reps}
                              </div>
                              <div style={{ display: "flex", gap: 6 }}>
                                <button
                                  className="btn-ghost"
                                  style={{ fontSize: 11, padding: "4px 10px", display: "flex", alignItems: "center", gap: 4 }}
                                  onClick={() => setSwapFor({ day: activeDay, idx: j })}
                                >
                                  <ArrowLeftRight size={11} /> Swap
                                </button>
                                {isToday && (
                                  <>
                                    <button
                                      className="btn-ghost"
                                      style={{ fontSize: 11, padding: "4px 10px", display: "flex", alignItems: "center", gap: 4 }}
                                      onClick={() => setHistoryFor(ex.name)}
                                    >
                                      <History size={11} /> History
                                    </button>
                                    <button
                                      className="btn"
                                      style={{ fontSize: 11, padding: "4px 12px", background: isExpanded ? "var(--surface-2)" : dayColor, color: isExpanded ? "var(--text2)" : "#000", display: "flex", alignItems: "center", gap: 4 }}
                                      onClick={() => setExpandedLog(isExpanded ? null : ex.name)}
                                    >
                                      {isExpanded ? <><ChevronUp size={11} /> Close</> : <><ChevronDown size={11} /> Log</>}
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Inline log form */}
                          <AnimatePresence>
                            {isExpanded && (
                              <LogForm
                                exercise={ex.name}
                                target={target}
                                dayColor={dayColor}
                                onSaved={(isPR) => handleLogSaved(ex.name, isPR)}
                                onCancel={() => setExpandedLog(null)}
                              />
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Today's progress note */}
            {isToday && !activeWorkout.exercises.length === false && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="note-box"
                style={{ marginTop: 12, fontSize: 12, color: "var(--text3)" }}
              >
                <strong style={{ color: "var(--text2)" }}>Progressive overload rule:</strong> hit all reps at the target weight → next session add 2.5 kg. Short of the top rep? Beat your rep count first.
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* History modal */}
      <AnimatePresence>
        {historyFor && (
          <HistoryModal
            exercise={historyFor}
            dayColor={dayColor}
            onClose={() => setHistoryFor(null)}
          />
        )}
      </AnimatePresence>

      {/* Swap modal */}
      {swapFor && workoutPlan?.[swapFor.day]?.exercises?.[swapFor.idx] && (
        <SwapModal
          exercise={workoutPlan[swapFor.day].exercises[swapFor.idx]}
          equipment={equipment}
          excludeNames={workoutPlan[swapFor.day].exercises.map((e) => e.name)}
          dayColor={dayColor}
          onSwap={applySwap}
          onClose={() => setSwapFor(null)}
        />
      )}

      {/* Regenerate confirm (plan has swapped exercises) */}
      <AnimatePresence>
        {confirmRegen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal-overlay" onClick={() => setConfirmRegen(false)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-title">Regenerate plan?</div>
              <div className="modal-sub">
                This rebuilds your plan from your profile and discards the exercises you swapped in.
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
