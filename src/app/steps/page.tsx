"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { getLocalStartOfDay, getLastNDays } from "@/lib/day";
import DayPills from "@/components/DayPills";
import { containerStagger as container, fadeUpItem as item, useCountUp } from "@/lib/motion";
import { Footprints, Target, TrendingUp, Clock, Compass, CheckCircle2 } from "lucide-react";

const StepTracker = () => {
  const { isSignedIn } = useAuth();
  const [steps, setSteps] = useState(0);
  const [inputVal, setInputVal] = useState("");
  const [loading, setLoading] = useState(false);
  const [target, setTarget] = useState(8000);
  const [selectedDate, setSelectedDate] = useState(getLocalStartOfDay());

  const todayIso = getLastNDays().at(-1)?.iso ?? getLocalStartOfDay();
  const isToday = selectedDate === todayIso;
  const dayLabel = isToday
    ? "Today's Progress"
    : new Date(selectedDate).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });

  const fetchSteps = useCallback(async () => {
    try {
      const res = await fetch(`/api/steps?localStart=${selectedDate}`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setSteps(data.count || 0);
      }
    } catch (error) {
      console.error("Fetch steps error:", error);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (isSignedIn) {
      fetchSteps();
      fetchGoal();
    }
  }, [isSignedIn, fetchSteps]);

  const fetchGoal = async () => {
    try {
      const res = await fetch("/api/profile", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data?.stepGoal) setTarget(data.stepGoal);
      }
    } catch (error) {
      console.error("Fetch goal error:", error);
    }
  };

  const updateSteps = async () => {
    if (inputVal === "" || isNaN(Number(inputVal))) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/steps?localStart=${selectedDate}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ count: Number(inputVal) }),
        cache: "no-store",
      });
      if (res.ok) {
        setSteps(Number(inputVal));
        setInputVal("");
      }
    } catch (error) {
      console.error("Update steps error:", error);
    } finally {
      setLoading(false);
    }
  };

  const pct = Math.min(100, Math.round((steps / target) * 100));
  const circ = 427;
  const offset = circ - (circ * pct) / 100;
  const animatedSteps = Math.round(useCountUp(steps));

  const strategyTips = [
    { icon: <TrendingUp size={16} />, title: "Post-Dinner Momentum", text: "A 25-minute walk after 9 PM adds ~2,500 steps and stabilizes blood sugar.", color: "var(--accent)" },
    { icon: <Clock size={16} />, title: "Active Intervals", text: "Stand and pace for 10 mins during study or calls to add ~1,000 effortless steps.", color: "var(--neon-cyan)" },
    { icon: <Compass size={16} />, title: "The Gym Bonus", text: "Walk to your workout session to bank an extra 800-1,200 steps daily.", color: "var(--neon-purple)" },
    { icon: <CheckCircle2 size={16} />, title: "Micro-Movement", text: "Small household errands add up quickly to 1,000 steps. Stay mobile.", color: "var(--neon-amber)" },
  ];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="page active">
      <motion.div variants={item} className="page-header">
        <div>
          <div className="page-title">Step Tracker</div>
          <div className="page-sub">Monitor your daily movement and hit your activity goals.</div>
        </div>
      </motion.div>

      <motion.div variants={item} style={{ marginBottom: 24 }}>
        <DayPills selected={selectedDate} onSelect={setSelectedDate} />
      </motion.div>

      <div className="grid-2" style={{ marginBottom: "24px" }}>
        <motion.div variants={item} className="card">
          <div className="card-title">
            <Footprints size={18} color="var(--accent)" />
            {dayLabel}
          </div>
          <div className="step-display">
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
                  <div className="ring-pct">{pct}%</div>
                  <div className="ring-sub">Daily Goal</div>
                </div>
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 800 }}>{animatedSteps.toLocaleString()}</div>
              <div style={{ fontSize: 13, color: "var(--text3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Steps Walked</div>
            </div>
          </div>
          <div className="step-input-row" style={{ display: "flex", gap: 10, marginTop: 24 }}>
            <input
              className="search-input"
              type="number"
              placeholder="Enter current steps"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              min="0"
              max="30000"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn"
              onClick={updateSteps}
              disabled={loading}
            >
              {loading ? "Syncing..." : "Update"}
            </motion.button>
          </div>
        </motion.div>

        <motion.div variants={item} className="card">
          <div className="card-title">
            <Target size={18} color="var(--neon-cyan)" />
            Activity Strategy
          </div>
          <div className="note-box" style={{ marginBottom: 20 }}>
            Your baseline is ~2,000 steps by 5 PM. Target 6,000 more steps in the evening to optimize metabolic rate and recovery.
          </div>
          <div className="walk-tips">
            {strategyTips.map((tip, i) => (
              <div key={i} style={{ display: "flex", gap: 14, marginBottom: 16 }}>
                <div className="icon-tile" style={{ "--tile-size": "32px", "--tile-color": tip.color } as React.CSSProperties}>
                  {tip.icon}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text)" }}>{tip.title}</div>
                  <div style={{ fontSize: 13, color: "var(--text3)", marginTop: 2 }}>{tip.text}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StepTracker;
