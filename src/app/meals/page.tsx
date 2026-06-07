"use client";

import { motion } from "framer-motion";
import { Coffee, Sun, Zap, Moon, Info, TrendingUp } from "lucide-react";
import { containerStagger as container, fadeUpItem as item } from "@/lib/motion";

const meals = [
  {
    id: 1,
    title: "Morning Fuel",
    time: "08:30 AM",
    icon: <Coffee size={18} />,
    color: "var(--accent)",
    menu: "4 boiled eggs + 2 rotis + 1 glass milk",
    desc: "Sets your protein baseline early. Boiled eggs are optimal.",
    macros: "P: 40g · C: 45g · F: 18g · 500 kcal",
  },
  {
    id: 2,
    title: "Desk Snack",
    time: "11:00 AM",
    icon: <Sun size={18} />,
    color: "var(--neon-cyan)",
    menu: "Roasted chana (1 cup) OR paneer cubes (100g)",
    desc: "High fibre and protein to stay full through work hours.",
    macros: "P: 15g · C: 20g · 200 kcal",
  },
  {
    id: 3,
    title: "Pre-Workout Lunch",
    time: "03:45 PM",
    icon: <Zap size={18} />,
    color: "var(--neon-purple)",
    menu: "3 eggs omelette + 3 rotis + curd",
    desc: "Carb-heavy to fuel your evening gym session.",
    macros: "P: 45g · C: 60g · F: 14g · 560 kcal",
  },
  {
    id: 4,
    title: "Anabolic Window",
    time: "07:30 PM",
    icon: <TrendingUp size={18} />,
    color: "var(--accent)",
    menu: "1 scoop whey + 1 banana",
    desc: "Fast absorption post-training for recovery.",
    macros: "P: 30g · C: 30g · F: 4g · 280 kcal",
  },
  {
    id: 5,
    title: "Night Recovery",
    time: "08:45 PM",
    icon: <Moon size={18} />,
    color: "var(--neon-amber)",
    menu: "1.5 cups dal (thick) + 2 rotis + sabzi",
    desc: "Dal is your MVP. Thick dal has double the protein.",
    macros: "P: 35g · C: 55g · F: 8g · 450 kcal",
  },
];

const targets = [
  { label: "Calories", val: "2350", unit: "kcal", color: "var(--accent)" },
  { label: "Protein", val: "160", unit: "g", color: "var(--neon-cyan)" },
  { label: "Carbs", val: "245", unit: "g", color: "var(--neon-amber)" },
  { label: "Fats", val: "65", unit: "g", color: "var(--neon-purple)" },
];

const MealPlanPage = () => {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="page active">
      <motion.div variants={item} className="page-header">
        <div>
          <div className="page-title">Nutrition Blueprint</div>
          <div className="page-sub">Vegetarian + Eggs focus · 2,350 kcal Daily.</div>
        </div>
      </motion.div>

      <div className="layout-aside">
        <div className="stack">
          {meals.map((meal) => (
            <motion.div variants={item} key={meal.id} className="card" style={{ padding: "20px 24px" }}>
              <div style={{ display: "flex", gap: 20 }}>
                <div className="icon-tile" style={{ "--tile-color": meal.color } as React.CSSProperties}>
                  {meal.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{meal.title}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text3)", flexShrink: 0 }}>{meal.time}</div>
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>{meal.menu}</div>
                  <div style={{ fontSize: 13, color: "var(--text2)", marginBottom: 12 }}>{meal.desc}</div>
                  <div className="chip-row">
                    {meal.macros.split(" · ").map((m, j) => (
                      <span key={j} className="chip">{m}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="stack-lg" style={{ height: "fit-content" }}>
          <motion.div variants={item} className="card">
            <div className="card-title">
              <Info size={18} color="var(--accent)" />
              Daily Targets
            </div>
            <div className="stack" style={{ gap: 12 }}>
              {targets.map((t, i) => (
                <div key={i} className="stat-row">
                  <span style={{ fontSize: 13, color: "var(--text2)", fontWeight: 600 }}>{t.label}</span>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: t.color }}>
                    {t.val}<span style={{ fontSize: 11, opacity: 0.5 }}>{t.unit}</span>
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={item} className="note-box">
            <div style={{ display: "flex", gap: 12 }}>
              <TrendingUp size={20} color="var(--accent)" style={{ flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 800, fontSize: 14, color: "var(--accent)", marginBottom: 4 }}>Macro-Tip</div>
                <div style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.5 }}>
                  Hit your protein goal first. If you miss calories, it&apos;s fine. If you miss protein, muscle recovery stalls.
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default MealPlanPage;
