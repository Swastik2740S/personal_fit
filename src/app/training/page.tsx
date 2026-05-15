"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Dumbbell, 
  Zap, 
  Calendar, 
  Info,
  ChevronRight,
  TrendingUp,
  Moon,
  Coffee,
  Heart
} from "lucide-react";
import { useState } from "react";

const trainingDays = [
  { label: "Mon", name: "Push Focus", subtitle: "Chest, Shoulders, Triceps", tag: "train", color: "var(--accent)",
    exercises: [
      { n: "Bench Press", s: "4 x 6–8" },
      { n: "Incline DB Press", s: "3 x 8–10" },
      { n: "Overhead Press", s: "3 x 8–10" },
      { n: "Lateral Raises", s: "3 x 12–15" },
      { n: "Tricep Pushdowns", s: "3 x 10–12" },
      { n: "Pushups", s: "2 x Failure" }
    ],
    note: "Compound lifts first. Track your bench numbers. Even 1kg more per week counts."
  },
  { label: "Tue", name: "Pull Focus", subtitle: "Back and Biceps", tag: "train", color: "var(--neon-cyan)",
    exercises: [
      { n: "Pullups / Lat Pulldown", s: "4 x 6–10" },
      { n: "Barbell Row", s: "4 x 6–8" },
      { n: "Seated Cable Row", s: "3 x 10" },
      { n: "Face Pulls", s: "3 x 12–15" },
      { n: "Dumbbell Curls", s: "3 x 10–12" },
      { n: "Hammer Curls", s: "2 x 12" }
    ],
    note: "Face pulls for shoulder health. Barbell rows build the thickness you need for the cut."
  },
  { label: "Wed", name: "Legs + Core", subtitle: "Lower Body & Abs", tag: "train", color: "var(--neon-purple)",
    exercises: [
      { n: "Squats", s: "4 x 5–8" },
      { n: "Romanian Deadlift", s: "4 x 8" },
      { n: "Leg Press", s: "3 x 10" },
      { n: "Walking Lunges", s: "3 x 12" },
      { n: "Calf Raises", s: "4 x 15" },
      { n: "Plank / Leg Raises", s: "3 Rounds" }
    ],
    note: "Legs burn the most calories. An extra roti at lunch today is perfectly fine."
  },
  { label: "Thu", name: "Active Recovery", subtitle: "Walking & Mobility", tag: "rest", color: "var(--text3)",
    exercises: [
      { n: "Brisk Walking", s: "40 mins" },
      { n: "Light Cycling", s: "20 mins" },
      { n: "Full Body Stretch", s: "15 mins" }
    ],
    note: "No gym. Recovery is when muscle builds. Hit your step goal early today."
  },
  { label: "Fri", name: "Upper Strength", subtitle: "Power & Hypertrophy", tag: "train", color: "var(--neon-amber)",
    exercises: [
      { n: "Bench Press", s: "5 x 5" },
      { n: "Weighted Pullups", s: "5 x 5" },
      { n: "Overhead Press", s: "4 x 6" },
      { n: "Barbell Row", s: "4 x 6" },
      { n: "Incline DB Press", s: "3 x 10" }
    ],
    note: "Power day. Heavier weight, lower reps. Aim for 2.5kg more than last Friday."
  },
  { label: "Sat", name: "Lower Strength", subtitle: "Deadlifts & Cardio", tag: "train", color: "var(--red)",
    exercises: [
      { n: "Deadlifts", s: "4 x 5" },
      { n: "Bulgarian Split Squats", s: "3 x 10" },
      { n: "Hamstring Curls", s: "3 x 12" },
      { n: "Leg Extensions", s: "3 x 12" },
      { n: "Incline Walk", s: "15 mins" }
    ],
    note: "End strong. Deadlifts burn massive fat. The incline walk helps the cut."
  },
  { label: "Sun", name: "Full Rest", subtitle: "Rest and Refuel", tag: "rest", color: "var(--text3)",
    exercises: [
      { n: "Rest", s: "Full Day" },
      { n: "Light Movement", s: "Optional" }
    ],
    note: "Sleep in. Maintenance calories today. Prepare for the new week ahead."
  }
];

const TrainingPage = () => {
  const [activeDayIdx, setActiveDayIdx] = useState(0);
  const d = trainingDays[activeDayIdx];

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
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="page active">
      <motion.div variants={item} className="page-header">
        <div className="page-title">Training Protocol</div>
        <div className="page-sub">Push/Pull/Legs high-performance split.</div>
      </motion.div>

      <motion.div variants={item} className="card" style={{ padding: '8px' }}>
        <div className="day-tabs" style={{ marginBottom: 0, gap: 4 }}>
          {trainingDays.map((day, i) => (
            <button
              key={day.label}
              className={`day-tab ${i === activeDayIdx ? "active" : ""} ${day.tag === "rest" ? "rest-day" : ""}`}
              onClick={() => setActiveDayIdx(i)}
              style={{ flex: 1, padding: '12px 0', border: 'none' }}
            >
              <div style={{ fontSize: 10, opacity: 0.5, fontWeight: 700, textTransform: 'uppercase' }}>{day.label}</div>
              <div style={{ fontWeight: 800, fontSize: 13 }}>Day {i + 1}</div>
            </button>
          ))}
        </div>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px', marginTop: '24px' }}>
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeDayIdx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="card"
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                   <span className={`badge ${d.tag === "rest" ? "badge-rest" : "badge-train"}`} 
                         style={{ background: d.tag === "rest" ? 'var(--bg3)' : 'var(--accent-dim)', color: d.tag === "rest" ? 'var(--text3)' : 'var(--accent)', padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>
                     {d.tag}
                   </span>
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "24px", color: "var(--text)" }}>
                  {d.name}
                </div>
                <div style={{ fontSize: 14, color: 'var(--text3)', fontWeight: 600 }}>{d.subtitle}</div>
              </div>
              <Dumbbell size={32} color={d.tag === 'rest' ? 'var(--text3)' : 'var(--accent)'} style={{ opacity: 0.2 }} />
            </div>

            <div style={{ display: 'grid', gap: '2px' }}>
              {d.exercises.map((e, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={i} 
                  className="ex-row"
                  style={{ padding: '16px 0' }}
                >
                  <div className="ex-name" style={{ fontWeight: 600 }}>{e.n}</div>
                  <div className="ex-sets" style={{ color: d.color }}>{e.s}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.div variants={item} className="card" style={{ height: 'fit-content' }}>
          <div className="card-title">
            <Info size={18} color="var(--neon-cyan)" />
            Coach's Notes
          </div>
          <div className="day-note" style={{ background: 'var(--bg3)', borderLeft: `4px solid ${d.color}`, marginTop: 0 }}>
            {d.note}
          </div>
          
          <div style={{ marginTop: 32 }}>
            <div className="nav-label" style={{ padding: 0 }}>Protocol Essentials</div>
            {[
              { icon: <Zap size={14} />, text: "90s rest between sets" },
              { icon: <Calendar size={14} />, text: "Log every lift" },
              { icon: <Heart size={14} />, text: "Focus on form" },
            ].map((ess, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 12, fontSize: 13, color: 'var(--text2)' }}>
                <div style={{ color: 'var(--accent)' }}>{ess.icon}</div>
                {ess.text}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TrainingPage;
