"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Target, Flame, Activity, Footprints, Save, User, RefreshCw, Loader } from "lucide-react";
import { calculateTDEE } from "@/lib/tdee";
import type { OnboardingProfile } from "@/lib/tdee";

interface Goals {
  calGoal: number;
  protGoal: number;
  carbGoal: number;
  fatGoal: number;
  stepGoal: number;
}

interface Profile extends Goals {
  heightCm?: number;
  startingWeightKg?: number;
  age?: number;
  sex?: string;
  activityLevel?: string;
  primaryGoal?: string;
  fitnessExperience?: string;
  dietaryPreference?: string;
  equipment?: string;
  onboardingComplete?: boolean;
}

const DEFAULT_GOALS: Goals = {
  calGoal: 2350,
  protGoal: 160,
  carbGoal: 245,
  fatGoal: 65,
  stepGoal: 8000,
};

const GOAL_FIELDS: { key: keyof Goals; label: string; unit: string; color: string }[] = [
  { key: "calGoal",  label: "Daily Calories", unit: "kcal",  color: "var(--accent)" },
  { key: "protGoal", label: "Protein",         unit: "g",    color: "var(--neon-cyan)" },
  { key: "carbGoal", label: "Carbs",           unit: "g",    color: "var(--neon-amber)" },
  { key: "fatGoal",  label: "Fat",             unit: "g",    color: "var(--neon-purple)" },
  { key: "stepGoal", label: "Daily Steps",     unit: "steps",color: "var(--accent)" },
];

const ACTIVITY_LABEL: Record<string, string> = {
  sedentary: "Sedentary", lightly: "Lightly Active", moderately: "Moderately Active",
  very: "Very Active", extremely: "Athlete",
};
const GOAL_LABEL: Record<string, string> = {
  fat_loss: "Fat Loss", muscle_gain: "Muscle Gain", recomposition: "Recomposition", maintain: "Maintain",
};
const EXPERIENCE_LABEL: Record<string, string> = {
  beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced",
};

const Settings = () => {
  const { isLoaded } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [goals, setGoals] = useState<Goals>(DEFAULT_GOALS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [recalculating, setRecalculating] = useState(false);
  const [recalcSaved, setRecalcSaved] = useState(false);

  const fetchProfile = useCallback(async () => {
    try {
      const res = await fetch("/api/profile", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
        setGoals({ ...DEFAULT_GOALS, ...data });
      }
    } catch (error) {
      console.error("Fetch profile error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) fetchProfile();
  }, [isLoaded, fetchProfile]);

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
      }
    } catch (error) {
      console.error("Save goals error:", error);
    } finally {
      setSaving(false);
    }
  };

  const recalculateFromProfile = async () => {
    if (!profile?.heightCm || !profile?.startingWeightKg || !profile?.age || !profile?.sex || !profile?.activityLevel || !profile?.primaryGoal) return;
    setRecalculating(true);
    setRecalcSaved(false);
    try {
      const tdee = calculateTDEE({
        heightCm:      profile.heightCm,
        weightKg:      profile.startingWeightKg,
        age:           profile.age,
        sex:           profile.sex as OnboardingProfile["sex"],
        activityLevel: profile.activityLevel as OnboardingProfile["activityLevel"],
        primaryGoal:   profile.primaryGoal as OnboardingProfile["primaryGoal"],
      });
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ calGoal: tdee.calGoal, protGoal: tdee.protGoal, carbGoal: tdee.carbGoal, fatGoal: tdee.fatGoal }),
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        setGoals((g) => ({ ...g, ...data }));
        setRecalcSaved(true);
      }
    } catch (error) {
      console.error("Recalc error:", error);
    } finally {
      setRecalculating(false);
    }
  };

  if (!isLoaded || loading) {
    return (
      <div style={{ display: "flex", height: "80vh", alignItems: "center", justifyContent: "center" }}>
        <div className="spinner" />
      </div>
    );
  }

  const hasProfile = profile?.onboardingComplete && profile?.heightCm;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="page active">
      <div className="page-header">
        <div className="page-title">Settings</div>
        <div className="page-sub">Manage your profile and daily targets.</div>
      </div>

      {/* Profile summary (only if onboarding complete) */}
      {hasProfile && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ maxWidth: 560, marginBottom: 24 }}>
          <div className="card-title" style={{ justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <User size={18} color="var(--neon-cyan)" />
              Your Profile
            </div>
            <button
              className="btn-ghost"
              style={{ fontSize: 11, padding: "4px 10px" }}
              onClick={() => router.push("/onboarding")}
            >
              Edit Profile
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 12, marginTop: 12 }}>
            {[
              { label: "Height", val: profile.heightCm ? `${profile.heightCm} cm` : "—" },
              { label: "Starting Weight", val: profile.startingWeightKg ? `${profile.startingWeightKg} kg` : "—" },
              { label: "Age", val: profile.age ? `${profile.age} yrs` : "—" },
              { label: "Sex", val: profile.sex ? (profile.sex === "male" ? "Male" : "Female") : "—" },
              { label: "Activity", val: ACTIVITY_LABEL[profile.activityLevel ?? ""] ?? "—" },
              { label: "Goal", val: GOAL_LABEL[profile.primaryGoal ?? ""] ?? "—" },
              { label: "Experience", val: EXPERIENCE_LABEL[profile.fitnessExperience ?? ""] ?? "—" },
            ].map((row) => (
              <div key={row.label} style={{ background: "var(--bg3)", borderRadius: "var(--r)", padding: "10px 14px" }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{row.label}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", marginTop: 2 }}>{row.val}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 12 }}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-ghost"
              onClick={recalculateFromProfile}
              disabled={recalculating}
              style={{ fontSize: 12 }}
            >
              {recalculating ? (
                <><Loader size={13} style={{ marginRight: 6, animation: "spin 1s linear infinite" }} /> Recalculating…</>
              ) : (
                <><RefreshCw size={13} style={{ marginRight: 6 }} /> Recalculate Goals from Profile</>
              )}
            </motion.button>
            {recalcSaved && (
              <span style={{ fontSize: 12, color: "var(--accent)", fontWeight: 600 }}>Updated ✓</span>
            )}
          </div>
        </motion.div>
      )}

      {/* Goals editor */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="card" style={{ maxWidth: 560 }}>
        <div className="card-title">
          <Target size={18} color="var(--accent)" />
          Daily Goals
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 8 }}>
          {GOAL_FIELDS.map((f) => (
            <div key={f.key}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>
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
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn" onClick={save} disabled={saving}>
            <Save size={14} style={{ marginRight: 6 }} />
            {saving ? "Saving..." : "Save Goals"}
          </motion.button>
          {saved && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontSize: 13, color: "var(--accent)", fontWeight: 600 }}>
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

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </motion.div>
  );
};

export default Settings;
