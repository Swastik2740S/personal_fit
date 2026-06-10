"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { getLocalStartOfDay, getLastNDays } from "@/lib/day";
import DayPills from "@/components/DayPills";
import { containerStagger as container, fadeUpItem as item } from "@/lib/motion";
import { Scale, Target, TrendingDown, TrendingUp } from "lucide-react";

interface WeightEntry {
  date: string;
  weight: number;
}

const sameDay = (a: string, b: string) =>
  new Date(a).toDateString() === new Date(b).toDateString();

const WeightLogger = () => {
  const { isSignedIn } = useAuth();
  const [history, setHistory] = useState<WeightEntry[]>([]);
  const [range, setRange] = useState(30);
  const [selectedDate, setSelectedDate] = useState(getLocalStartOfDay());
  const [inputVal, setInputVal] = useState("");
  const [loading, setLoading] = useState(false);
  const [goal, setGoal] = useState<number | null>(null);
  const [goalInput, setGoalInput] = useState("");

  const todayIso = getLastNDays().at(-1)?.iso ?? getLocalStartOfDay();
  const isToday = selectedDate === todayIso;
  const dayLabel = isToday
    ? "Today"
    : new Date(selectedDate).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });

  const fetchHistory = useCallback(async () => {
    try {
      const res = await fetch(`/api/weight?days=${range}`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) setHistory(data);
      }
    } catch (error) {
      console.error("Fetch weight error:", error);
    }
  }, [range]);

  const fetchGoal = useCallback(async () => {
    try {
      const res = await fetch("/api/profile", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data?.weightGoal != null) {
          setGoal(data.weightGoal);
          setGoalInput(String(data.weightGoal));
        }
      }
    } catch (error) {
      console.error("Fetch goal error:", error);
    }
  }, []);

  useEffect(() => {
    if (isSignedIn) fetchHistory();
  }, [isSignedIn, fetchHistory]);

  useEffect(() => {
    if (isSignedIn) fetchGoal();
  }, [isSignedIn, fetchGoal]);

  // Prefill the input with the selected day's logged weight (if any).
  useEffect(() => {
    const existing = history.find((h) => sameDay(h.date, selectedDate));
    setInputVal(existing ? String(existing.weight) : "");
  }, [selectedDate, history]);

  const saveWeight = async () => {
    const weight = Number(inputVal);
    if (inputVal === "" || isNaN(weight) || weight <= 0) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/weight?localStart=${selectedDate}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weight }),
        cache: "no-store",
      });
      if (res.ok) {
        await fetchHistory();
      } else {
        const err = await res.json();
        alert(`Error saving weight: ${err.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Save weight error:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveGoal = async () => {
    const weightGoal = Number(goalInput);
    if (goalInput === "" || isNaN(weightGoal) || weightGoal <= 0) return;
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weightGoal }),
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.weightGoal != null) setGoal(data.weightGoal);
      }
    } catch (error) {
      console.error("Save goal error:", error);
    }
  };

  // Headline stats.
  const latest = history.length ? history[history.length - 1].weight : null;
  const prev = history.length >= 2 ? history[history.length - 2].weight : null;
  const delta = latest != null && prev != null ? latest - prev : null;
  const toGoal = latest != null && goal != null ? latest - goal : null;

  // Trend intelligence: 7-entry moving average (raw daily weights are noisy),
  // least-squares rate over the last 14 entries, and a goal-date projection.
  const movingAvg = history.map((_, i) => {
    const win = history.slice(Math.max(0, i - 6), i + 1);
    return win.reduce((s, e) => s + e.weight, 0) / win.length;
  });

  let ratePerWeek: number | null = null;
  const trendWindow = history.slice(-14);
  if (trendWindow.length >= 3) {
    const t0 = new Date(trendWindow[0].date).getTime();
    const pts = trendWindow.map((h) => ({
      x: (new Date(h.date).getTime() - t0) / 86400000,
      y: h.weight,
    }));
    const n = pts.length;
    const sx = pts.reduce((s, p) => s + p.x, 0);
    const sy = pts.reduce((s, p) => s + p.y, 0);
    const sxy = pts.reduce((s, p) => s + p.x * p.y, 0);
    const sxx = pts.reduce((s, p) => s + p.x * p.x, 0);
    const denom = n * sxx - sx * sx;
    if (denom !== 0) ratePerWeek = ((n * sxy - sx * sy) / denom) * 7;
  }

  let projection: string | null = null;
  if (ratePerWeek != null && goal != null && latest != null) {
    const diff = goal - latest;
    const perDay = ratePerWeek / 7;
    if (Math.abs(diff) < 0.2) projection = "Goal reached 🎉";
    else if (Math.abs(ratePerWeek) < 0.05) projection = "Holding steady — adjust intake to move toward your goal";
    else if (Math.sign(diff) === Math.sign(perDay)) {
      const days = Math.round(diff / perDay);
      if (days <= 730) {
        const d = new Date();
        d.setDate(d.getDate() + days);
        projection = `On track to reach ${goal.toFixed(1)} kg around ${d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: d.getFullYear() !== new Date().getFullYear() ? "numeric" : undefined })}`;
      } else {
        projection = "Over 2 years away at the current rate";
      }
    } else {
      projection = "Trending away from your goal right now";
    }
  }

  // Chart geometry.
  const W = 320, H = 120, pad = 12;
  const weights = history.map((h) => h.weight);
  const lo = Math.min(...weights, goal ?? Infinity);
  const hi = Math.max(...weights, goal ?? -Infinity);
  const span = hi - lo || 1;
  const xy = (i: number, w: number) => {
    const x = history.length <= 1 ? W / 2 : pad + (i / (history.length - 1)) * (W - 2 * pad);
    const y = pad + (1 - (w - lo) / span) * (H - 2 * pad);
    return { x, y };
  };
  const points = history.map((h, i) => xy(i, h.weight));
  const polyline = points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const maPolyline = movingAvg
    .map((w, i) => {
      const p = xy(i, w);
      return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
    })
    .join(" ");
  const goalY = goal != null ? pad + (1 - (goal - lo) / span) * (H - 2 * pad) : null;

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="page active">
      <motion.div variants={item} className="page-header">
        <div>
          <div className="page-title">Weight Log</div>
          <div className="page-sub">Track your bodyweight trend toward your goal.</div>
        </div>
      </motion.div>

      <motion.div variants={item} style={{ marginBottom: 24 }}>
        <DayPills selected={selectedDate} onSelect={setSelectedDate} />
      </motion.div>

      <div className="grid-2" style={{ marginBottom: 24 }}>
        {/* Log card */}
        <motion.div variants={item} className="card">
          <div className="card-title">
            <Scale size={18} color="var(--accent)" />
            {isToday ? "Log Today's Weight" : `Log Weight — ${dayLabel}`}
          </div>

          <div style={{ textAlign: "center", padding: "12px 0 20px" }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 40, fontWeight: 800 }}>
              {latest != null ? latest.toFixed(1) : "—"}
              <span style={{ fontSize: 16, color: "var(--text3)", fontWeight: 600, marginLeft: 6 }}>kg</span>
            </div>
            <div style={{ fontSize: 13, color: "var(--text3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginTop: 4 }}>
              Latest Weight
            </div>
            {delta != null && (
              <div style={{ display: "inline-flex", alignItems: "center", gap: 4, marginTop: 8, fontSize: 13, fontWeight: 700, color: delta <= 0 ? "var(--accent)" : "var(--neon-amber)" }}>
                {delta <= 0 ? <TrendingDown size={14} /> : <TrendingUp size={14} />}
                {delta > 0 ? "+" : ""}{delta.toFixed(1)} kg vs previous
              </div>
            )}
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <input
              className="search-input"
              type="number"
              placeholder="Enter weight (kg)"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              min="1"
              max="1000"
              step="0.1"
              onKeyDown={(e) => e.key === "Enter" && saveWeight()}
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn"
              onClick={saveWeight}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </motion.button>
          </div>
        </motion.div>

        {/* Goal card */}
        <motion.div variants={item} className="card">
          <div className="card-title">
            <Target size={18} color="var(--neon-cyan)" />
            Goal Weight
          </div>

          <div style={{ textAlign: "center", padding: "12px 0 20px" }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 40, fontWeight: 800 }}>
              {goal != null ? goal.toFixed(1) : "—"}
              <span style={{ fontSize: 16, color: "var(--text3)", fontWeight: 600, marginLeft: 6 }}>kg</span>
            </div>
            <div style={{ fontSize: 13, color: "var(--text3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginTop: 4 }}>
              Target
            </div>
            {toGoal != null && (
              <div style={{ marginTop: 8, fontSize: 13, fontWeight: 700, color: "var(--text2)" }}>
                {Math.abs(toGoal).toFixed(1)} kg {toGoal > 0 ? "to lose" : toGoal < 0 ? "to gain" : "— goal reached 🎉"}
              </div>
            )}
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <input
              className="search-input"
              type="number"
              placeholder="Set goal (kg)"
              value={goalInput}
              onChange={(e) => setGoalInput(e.target.value)}
              min="1"
              max="1000"
              step="0.1"
              onKeyDown={(e) => e.key === "Enter" && saveGoal()}
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn"
              onClick={saveGoal}
            >
              Set
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Trend chart */}
      <motion.div variants={item} className="card">
        <div className="card-title" style={{ justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <TrendingDown size={18} color="var(--accent)" />
            Weight Trend
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {[7, 30, 90].map((d) => (
              <button
                key={d}
                className={`day-tab${range === d ? " active" : ""}`}
                style={{ flex: "none", minWidth: 0, padding: "6px 14px", fontSize: 12, fontWeight: 700 }}
                onClick={() => setRange(d)}
              >
                {d}d
              </button>
            ))}
          </div>
        </div>

        {history.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 0", opacity: 0.5 }}>
            <Scale size={40} style={{ marginBottom: 12, display: "block", margin: "0 auto" }} />
            <div>No weight entries yet. Log your weight to see the trend.</div>
          </div>
        ) : (
          <div style={{ padding: "12px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text3)", marginBottom: 6 }}>
              <span>{hi.toFixed(1)} kg</span>
              <span>{lo.toFixed(1)} kg</span>
            </div>
            <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="160" preserveAspectRatio="none">
              {goalY != null && (
                <line
                  x1={pad} y1={goalY} x2={W - pad} y2={goalY}
                  stroke="var(--neon-cyan)" strokeWidth="1" strokeDasharray="4 4" opacity="0.6"
                />
              )}
              {history.length > 1 && (
                <polyline
                  points={polyline}
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              )}
              {history.length > 2 && (
                <polyline
                  points={maPolyline}
                  fill="none"
                  stroke="var(--neon-purple)"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  opacity="0.75"
                />
              )}
              {points.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r="2.5" fill="var(--accent)" />
              ))}
            </svg>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text3)", marginTop: 6 }}>
              <span>{new Date(history[0].date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
              <span style={{ color: "var(--neon-purple)" }}>— 7-day average</span>
              <span>{new Date(history[history.length - 1].date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
            </div>

            {history.length >= 3 && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10, marginTop: 16 }}>
                <div style={{ background: "var(--bg3)", borderRadius: "var(--r)", padding: "12px 14px" }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.05em" }}>7-Day Average</div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: "var(--neon-purple)", marginTop: 2 }}>
                    {movingAvg[movingAvg.length - 1].toFixed(1)} kg
                  </div>
                </div>
                {ratePerWeek != null && (
                  <div style={{ background: "var(--bg3)", borderRadius: "var(--r)", padding: "12px 14px" }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Trend</div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: ratePerWeek <= 0 ? "var(--accent)" : "var(--neon-amber)", marginTop: 2 }}>
                      {ratePerWeek > 0 ? "+" : ""}{ratePerWeek.toFixed(2)} kg/week
                    </div>
                  </div>
                )}
                {projection && (
                  <div style={{ background: "var(--bg3)", borderRadius: "var(--r)", padding: "12px 14px" }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Projection</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text2)", marginTop: 4, lineHeight: 1.4 }}>
                      {projection}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default WeightLogger;
