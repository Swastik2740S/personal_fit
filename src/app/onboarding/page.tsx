"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { calculateTDEE } from "@/lib/tdee";
import type { OnboardingProfile } from "@/lib/tdee";
import { ChevronRight, ChevronLeft, Sparkles, Loader } from "lucide-react";

// ─── types ───────────────────────────────────────────────────────────────────

type Sex            = "male" | "female";
type ActivityLevel  = "sedentary" | "lightly" | "moderately" | "very" | "extremely";
type PrimaryGoal    = "fat_loss" | "muscle_gain" | "recomposition" | "maintain";
type Experience     = "beginner" | "intermediate" | "advanced";
type DietPref       = "none" | "vegetarian" | "vegan" | "high_protein" | "low_carb";
type Equipment      = "none" | "home_gym" | "full_gym";

interface FormData {
  // Step 1
  heightCm: string;
  weightKg: string;
  // Step 2
  age: string;
  sex: Sex | "";
  // Step 3
  activityLevel: ActivityLevel | "";
  // Step 4
  primaryGoal: PrimaryGoal | "";
  fitnessExperience: Experience | "";
  // Step 5
  dietaryPreference: DietPref | "";
  equipment: Equipment | "";
}

// ─── option sets ─────────────────────────────────────────────────────────────

const ACTIVITY_OPTIONS: { value: ActivityLevel; label: string; desc: string }[] = [
  { value: "sedentary",   label: "Sedentary",         desc: "Desk job, little to no exercise" },
  { value: "lightly",     label: "Lightly Active",    desc: "Light exercise 1–3 days/week" },
  { value: "moderately",  label: "Moderately Active", desc: "Moderate exercise 3–5 days/week" },
  { value: "very",        label: "Very Active",       desc: "Hard exercise 6–7 days/week" },
  { value: "extremely",   label: "Athlete",           desc: "Twice daily training or physical job" },
];

const GOAL_OPTIONS: { value: PrimaryGoal; label: string; desc: string }[] = [
  { value: "fat_loss",     label: "Fat Loss",            desc: "Burn body fat in a caloric deficit" },
  { value: "muscle_gain",  label: "Muscle Gain",         desc: "Build mass in a caloric surplus" },
  { value: "recomposition",label: "Recomposition",       desc: "Lose fat + build muscle simultaneously" },
  { value: "maintain",     label: "Maintain",            desc: "Keep current weight and improve fitness" },
];

const EXPERIENCE_OPTIONS: { value: Experience; label: string; desc: string }[] = [
  { value: "beginner",     label: "Beginner",     desc: "Less than 1 year of consistent training" },
  { value: "intermediate", label: "Intermediate", desc: "1–3 years of consistent training" },
  { value: "advanced",     label: "Advanced",     desc: "3+ years, familiar with advanced techniques" },
];

const DIET_OPTIONS: { value: DietPref; label: string; desc: string }[] = [
  { value: "none",         label: "No Restrictions",  desc: "All food groups welcome" },
  { value: "vegetarian",   label: "Vegetarian",       desc: "No meat, fish okay" },
  { value: "vegan",        label: "Vegan",            desc: "No animal products" },
  { value: "high_protein", label: "High-Protein",     desc: "Prioritise protein in every meal" },
  { value: "low_carb",     label: "Low-Carb",         desc: "Minimise carbohydrates" },
];

const EQUIPMENT_OPTIONS: { value: Equipment; label: string; desc: string }[] = [
  { value: "none",     label: "No Equipment",  desc: "Bodyweight training only" },
  { value: "home_gym", label: "Home Gym",      desc: "Dumbbells, resistance bands, pull-up bar" },
  { value: "full_gym", label: "Full Gym",      desc: "Commercial gym with all equipment" },
];

// ─── reusable sub-components ─────────────────────────────────────────────────

function OptionCard<T extends string>({
  option,
  selected,
  onSelect,
}: {
  option: { value: T; label: string; desc: string };
  selected: boolean;
  onSelect: (v: T) => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(option.value)}
      className="btn-ghost"
      style={{
        width: "100%",
        textAlign: "left",
        padding: "16px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border: selected ? "1px solid var(--accent)" : "1px solid var(--border)",
        background: selected ? "var(--accent-dim)" : "transparent",
        marginBottom: 10,
        borderRadius: "var(--r)",
      }}
    >
      <div>
        <div style={{ fontWeight: 700, fontSize: 14, color: selected ? "var(--accent)" : "var(--text)" }}>
          {option.label}
        </div>
        <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 2 }}>{option.desc}</div>
      </div>
      {selected && (
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--accent)", flexShrink: 0 }} />
      )}
    </motion.button>
  );
}

// ─── main component ───────────────────────────────────────────────────────────

const TOTAL_STEPS = 5;

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [form, setForm] = useState<FormData>({
    heightCm: "",
    weightKg: "",
    age: "",
    sex: "",
    activityLevel: "",
    primaryGoal: "",
    fitnessExperience: "",
    dietaryPreference: "",
    equipment: "",
  });

  const set = <K extends keyof FormData>(key: K, val: FormData[K]) =>
    setForm((f) => ({ ...f, [key]: val }));

  // Validate each step before advancing
  const canAdvance = () => {
    if (step === 1) return Number(form.heightCm) > 0 && Number(form.weightKg) > 0;
    if (step === 2) return Number(form.age) > 0 && form.sex !== "";
    if (step === 3) return form.activityLevel !== "";
    if (step === 4) return form.primaryGoal !== "" && form.fitnessExperience !== "";
    if (step === 5) return form.dietaryPreference !== "" && form.equipment !== "";
    return false;
  };

  // TDEE preview for the confirmation screen (step 5 complete)
  const tdeePreview = (() => {
    if (!canAdvance() || step < 5 || !form.sex || !form.activityLevel || !form.primaryGoal) return null;
    try {
      return calculateTDEE({
        heightCm:      Number(form.heightCm),
        weightKg:      Number(form.weightKg),
        age:           Number(form.age),
        sex:           form.sex as OnboardingProfile["sex"],
        activityLevel: form.activityLevel as OnboardingProfile["activityLevel"],
        primaryGoal:   form.primaryGoal as OnboardingProfile["primaryGoal"],
      });
    } catch {
      return null;
    }
  })();

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          heightCm:          Number(form.heightCm),
          weightKg:          Number(form.weightKg),
          age:               Number(form.age),
          sex:               form.sex,
          activityLevel:     form.activityLevel,
          primaryGoal:       form.primaryGoal,
          fitnessExperience: form.fitnessExperience,
          dietaryPreference: form.dietaryPreference,
          equipment:         form.equipment,
        }),
      });
      if (!res.ok) {
        // Read the body as text first so we can surface BOTH the route's JSON
        // error AND any non-JSON platform error (e.g. a Vercel 504 HTML page on
        // a DB timeout), which would otherwise be swallowed as a generic message.
        const raw = await res.text().catch(() => "");
        let msg = `Something went wrong (HTTP ${res.status}). Please try again.`;
        try {
          const parsed = raw ? JSON.parse(raw) : null;
          if (parsed?.error) msg = parsed.error;
        } catch {
          if (raw) console.error("[onboarding] non-JSON error response:", raw.slice(0, 500));
        }
        setSubmitError(msg);
        return;
      }
      router.push("/");
    } catch {
      setSubmitError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const stepVariants = {
    enter:  { opacity: 0, x: 30 },
    center: { opacity: 1, x: 0 },
    exit:   { opacity: 0, x: -30 },
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px 16px",
      background: "var(--bg)",
    }}>
      <div style={{ width: "100%", maxWidth: 520 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div className="logo" style={{ justifyContent: "center", marginBottom: 16 }}>
            <div className="logo-mark">S</div>
            <div className="logo-text">SwastikFit</div>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 800, color: "var(--text)", marginBottom: 8 }}>
            Let&apos;s build your plan
          </h1>
          <p style={{ fontSize: 14, color: "var(--text3)" }}>
            {TOTAL_STEPS - step + 1} {TOTAL_STEPS - step + 1 === 1 ? "step" : "steps"} remaining
          </p>
        </div>

        {/* Progress bar */}
        <div className="prog-track" style={{ marginBottom: 32, height: 6 }}>
          <motion.div
            className="prog-fill"
            initial={{ width: 0 }}
            animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            transition={{ ease: "easeOut", duration: 0.4 }}
          />
        </div>

        {/* Step content */}
        <div className="card" style={{ padding: "32px 28px", minHeight: 360 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              {/* STEP 1 — Body measurements */}
              {step === 1 && (
                <>
                  <div className="card-title" style={{ marginBottom: 8 }}>Body Measurements</div>
                  <p style={{ fontSize: 13, color: "var(--text3)", marginBottom: 24 }}>
                    Used to calculate your Total Daily Energy Expenditure (TDEE).
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 700, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: 8 }}>
                        Height (cm)
                      </label>
                      <input
                        className="qty-input"
                        type="number"
                        placeholder="e.g. 175"
                        value={form.heightCm}
                        onChange={(e) => set("heightCm", e.target.value)}
                        style={{ width: "100%" }}
                        min={100}
                        max={250}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 700, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: 8 }}>
                        Weight (kg)
                      </label>
                      <input
                        className="qty-input"
                        type="number"
                        placeholder="e.g. 80"
                        value={form.weightKg}
                        onChange={(e) => set("weightKg", e.target.value)}
                        style={{ width: "100%" }}
                        min={30}
                        max={300}
                      />
                    </div>
                  </div>
                </>
              )}

              {/* STEP 2 — Age + Sex */}
              {step === 2 && (
                <>
                  <div className="card-title" style={{ marginBottom: 8 }}>About You</div>
                  <p style={{ fontSize: 13, color: "var(--text3)", marginBottom: 24 }}>
                    Age and biological sex refine the BMR formula significantly.
                  </p>
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: 8 }}>
                      Age
                    </label>
                    <input
                      className="qty-input"
                      type="number"
                      placeholder="e.g. 25"
                      value={form.age}
                      onChange={(e) => set("age", e.target.value)}
                      style={{ width: "100%", maxWidth: 160 }}
                      min={10}
                      max={100}
                    />
                  </div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: 12 }}>
                    Biological Sex
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    {(["male", "female"] as Sex[]).map((s) => (
                      <motion.button
                        key={s}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => set("sex", s)}
                        className="btn-ghost"
                        style={{
                          padding: "16px",
                          fontWeight: 700,
                          fontSize: 15,
                          border: form.sex === s ? "1px solid var(--accent)" : "1px solid var(--border)",
                          background: form.sex === s ? "var(--accent-dim)" : "transparent",
                          color: form.sex === s ? "var(--accent)" : "var(--text)",
                          textTransform: "capitalize",
                        }}
                      >
                        {s}
                      </motion.button>
                    ))}
                  </div>
                </>
              )}

              {/* STEP 3 — Activity level */}
              {step === 3 && (
                <>
                  <div className="card-title" style={{ marginBottom: 8 }}>Activity Level</div>
                  <p style={{ fontSize: 13, color: "var(--text3)", marginBottom: 20 }}>
                    Be honest — this is the biggest multiplier in your TDEE.
                  </p>
                  {ACTIVITY_OPTIONS.map((opt) => (
                    <OptionCard
                      key={opt.value}
                      option={opt}
                      selected={form.activityLevel === opt.value}
                      onSelect={(v) => set("activityLevel", v)}
                    />
                  ))}
                </>
              )}

              {/* STEP 4 — Goal + Experience */}
              {step === 4 && (
                <>
                  <div className="card-title" style={{ marginBottom: 8 }}>Your Goals</div>
                  <p style={{ fontSize: 13, color: "var(--text3)", marginBottom: 16 }}>
                    Your primary goal sets your calorie target. Experience shapes workout complexity.
                  </p>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>
                    Primary Goal
                  </div>
                  {GOAL_OPTIONS.map((opt) => (
                    <OptionCard
                      key={opt.value}
                      option={opt}
                      selected={form.primaryGoal === opt.value}
                      onSelect={(v) => set("primaryGoal", v)}
                    />
                  ))}
                  <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.05em", margin: "20px 0 10px" }}>
                    Fitness Experience
                  </div>
                  {EXPERIENCE_OPTIONS.map((opt) => (
                    <OptionCard
                      key={opt.value}
                      option={opt}
                      selected={form.fitnessExperience === opt.value}
                      onSelect={(v) => set("fitnessExperience", v)}
                    />
                  ))}
                </>
              )}

              {/* STEP 5 — Diet + Equipment */}
              {step === 5 && (
                <>
                  <div className="card-title" style={{ marginBottom: 8 }}>Preferences</div>
                  <p style={{ fontSize: 13, color: "var(--text3)", marginBottom: 16 }}>
                    These shape your meal plan and workout exercise selection.
                  </p>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>
                    Dietary Preference
                  </div>
                  {DIET_OPTIONS.map((opt) => (
                    <OptionCard
                      key={opt.value}
                      option={opt}
                      selected={form.dietaryPreference === opt.value}
                      onSelect={(v) => set("dietaryPreference", v)}
                    />
                  ))}
                  <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.05em", margin: "20px 0 10px" }}>
                    Equipment Available
                  </div>
                  {EQUIPMENT_OPTIONS.map((opt) => (
                    <OptionCard
                      key={opt.value}
                      option={opt}
                      selected={form.equipment === opt.value}
                      onSelect={(v) => set("equipment", v)}
                    />
                  ))}

                  {/* TDEE preview */}
                  {tdeePreview && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="note-box"
                      style={{ marginTop: 24, borderColor: "rgba(200,245,66,0.2)", background: "var(--accent-dim)" }}
                    >
                      <div style={{ fontSize: 12, fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>
                        Your Calculated Targets
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, textAlign: "center" }}>
                        {[
                          { label: "Calories", val: `${tdeePreview.calGoal}`, unit: "kcal", color: "var(--accent)" },
                          { label: "Protein",  val: `${tdeePreview.protGoal}g`, unit: "", color: "var(--neon-cyan)" },
                          { label: "Carbs",    val: `${tdeePreview.carbGoal}g`, unit: "", color: "var(--neon-amber)" },
                          { label: "Fat",      val: `${tdeePreview.fatGoal}g`, unit: "", color: "var(--neon-purple)" },
                        ].map((m) => (
                          <div key={m.label}>
                            <div style={{ fontSize: 16, fontWeight: 800, color: m.color }}>{m.val}</div>
                            <div style={{ fontSize: 10, color: "var(--text3)", textTransform: "uppercase" }}>{m.label}</div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Error */}
        {submitError && (
          <div role="alert" style={{ background: "rgba(255,90,90,0.12)", border: "1px solid rgba(255,90,90,0.35)", color: "#ff9a9a", fontSize: 13, fontWeight: 600, padding: "10px 14px", borderRadius: "var(--r-pill)", marginTop: 16 }}>
            {submitError}
          </div>
        )}

        {/* Navigation */}
        <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
          {step > 1 && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-ghost"
              onClick={() => setStep((s) => s - 1)}
              style={{ flex: 1, padding: "14px" }}
              disabled={submitting}
            >
              <ChevronLeft size={16} style={{ marginRight: 6 }} />
              Back
            </motion.button>
          )}

          {step < TOTAL_STEPS ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn"
              onClick={() => setStep((s) => s + 1)}
              disabled={!canAdvance()}
              style={{ flex: 1, padding: "14px", opacity: canAdvance() ? 1 : 0.4 }}
            >
              Continue
              <ChevronRight size={16} style={{ marginLeft: 6 }} />
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn"
              onClick={handleSubmit}
              disabled={!canAdvance() || submitting}
              style={{ flex: 1, padding: "14px", opacity: canAdvance() && !submitting ? 1 : 0.4 }}
            >
              {submitting ? (
                <>
                  <Loader size={16} style={{ marginRight: 8, animation: "spin 1s linear infinite" }} />
                  Generating your plan…
                </>
              ) : (
                <>
                  <Sparkles size={16} style={{ marginRight: 8 }} />
                  Generate My Plan
                </>
              )}
            </motion.button>
          )}
        </div>

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}
