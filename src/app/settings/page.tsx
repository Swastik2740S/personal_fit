"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Target, Flame, Activity, Footprints, Save } from "lucide-react";

interface Goals {
  calGoal: number;
  protGoal: number;
  carbGoal: number;
  fatGoal: number;
  stepGoal: number;
}

const DEFAULT_GOALS: Goals = {
  calGoal: 2350,
  protGoal: 160,
  carbGoal: 245,
  fatGoal: 65,
  stepGoal: 8000,
};

const fields: { key: keyof Goals; label: string; unit: string; color: string }[] = [
  { key: "calGoal", label: "Daily Calories", unit: "kcal", color: "var(--accent)" },
  { key: "protGoal", label: "Protein", unit: "g", color: "var(--neon-cyan)" },
  { key: "carbGoal", label: "Carbs", unit: "g", color: "var(--neon-amber)" },
  { key: "fatGoal", label: "Fat", unit: "g", color: "var(--neon-purple)" },
  { key: "stepGoal", label: "Daily Steps", unit: "steps", color: "var(--accent)" },
];

const Settings = () => {
  const { data: session } = useSession();
  const [goals, setGoals] = useState<Goals>(DEFAULT_GOALS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const fetchGoals = useCallback(async () => {
    try {
      const res = await fetch("/api/profile", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setGoals({ ...DEFAULT_GOALS, ...data });
      }
    } catch (error) {
      console.error("Fetch goals error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (session) fetchGoals();
  }, [session, fetchGoals]);

  const handleChange = (key: keyof Goals, value: string) => {
    setSaved(false);
    setGoals((g) => ({ ...g, [key]: value === "" ? 0 : Number(value) }));
  };

  const save = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(goals),
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        setGoals({ ...DEFAULT_GOALS, ...data });
        setSaved(true);
      } else {
        const err = await res.json();
        alert(`Error saving goals: ${err.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Save goals error:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", height: "80vh", alignItems: "center", justifyContent: "center" }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="page active">
      <div className="page-header">
        <div className="page-title">Settings</div>
        <div className="page-sub">Set your daily nutrition and activity targets.</div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
        style={{ maxWidth: 560 }}
      >
        <div className="card-title">
          <Target size={18} color="var(--accent)" />
          Daily Goals
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 8 }}>
          {fields.map((f) => (
            <div key={f.key}>
              <label
                style={{
                  display: "block",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "var(--text3)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: 8,
                }}
              >
                {f.label}
              </label>
              <div className="qty-row">
                <input
                  className="qty-input"
                  type="number"
                  min="1"
                  value={goals[f.key]}
                  onChange={(e) => handleChange(f.key, e.target.value)}
                />
                <div className="qty-unit" style={{ color: f.color }}>{f.unit}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 28 }}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn"
            onClick={save}
            disabled={saving}
          >
            <Save size={14} style={{ marginRight: 6 }} />
            {saving ? "Saving..." : "Save Goals"}
          </motion.button>
          {saved && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ fontSize: 13, color: "var(--accent)", fontWeight: 600 }}
            >
              Saved ✓
            </motion.span>
          )}
        </div>
      </motion.div>

      <div style={{ display: "flex", gap: 16, marginTop: 20, opacity: 0.5, fontSize: 12 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Flame size={14} /> Calories</span>
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Activity size={14} /> Macros</span>
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Footprints size={14} /> Steps</span>
      </div>
    </motion.div>
  );
};

export default Settings;
