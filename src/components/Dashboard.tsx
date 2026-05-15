"use client";

import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";

const Dashboard = () => {
  const { data: session, status } = useSession();
  
  const [stats, setStats] = useState({
    cal: 0,
    prot: 0,
    carb: 0,
    fat: 0,
    steps: 0,
  });

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/dashboard/stats", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    }
  };

  useEffect(() => {
    if (session) {
      fetchStats();
    }
  }, [session]);

  const targets = {
    cal: 2350,
    prot: 160,
    carb: 245,
    fat: 65,
    steps: 8000,
  };

  const stepPct = Math.min(100, Math.round((stats.steps / targets.steps) * 100));
  const circ = 427;
  const offset = circ - (circ * stepPct) / 100;

  if (status === "loading") {
    return <div className="page active"><div className="page-header"><div className="page-title">Loading...</div></div></div>;
  }

  if (!session) {
    return (
      <div className="page active">
        <div className="page-header">
          <div className="page-title">Welcome to SwastikFit ⚡</div>
          <div className="page-sub">Please login to view your personalized dashboard and track your progress.</div>
        </div>
        <div className="card" style={{ textAlign: "center", padding: "40px" }}>
          <div style={{ fontSize: "48px", marginBottom: "20px" }}>🔐</div>
          <button className="btn" onClick={() => signIn("github")}>Login with GitHub to Start</button>
        </div>
      </div>
    );
  }

  return (
    <div id="page-dashboard" className="page active">
      <div className="page-header">
        <div className="page-title">Good evening, Swastik 👋</div>
        <div className="page-sub">Here's your day at a glance — stay in the green and you're winning.</div>
      </div>

      <div className="metric-grid">
        <div className="metric-card">
          <div className="metric-label">Calories eaten</div>
          <div className="metric-val">
            {Math.round(stats.cal)}
            <span className="metric-unit">kcal</span>
          </div>
          <div className="metric-sub">Target: {targets.cal} kcal</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Protein</div>
          <div className="metric-val">
            {Math.round(stats.prot)}
            <span className="metric-unit">g</span>
          </div>
          <div className="metric-sub">Target: {targets.prot}g</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Steps today</div>
          <div className="metric-val">
            {stats.steps.toLocaleString()}
            <span className="metric-unit">steps</span>
          </div>
          <div className="metric-sub">Target: {targets.steps.toLocaleString()}</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Remaining</div>
          <div className="metric-val">
            {Math.max(0, targets.cal - Math.round(stats.cal))}
            <span className="metric-unit">kcal</span>
          </div>
          <div className="metric-sub">Budget left today</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div className="card">
          <div className="card-title">📊 Today's macros</div>
          <div>
            <div className="prog-wrap prog-green">
              <div className="prog-label">
                <span className="prog-name">Calories</span>
                <span className="prog-nums">
                  {Math.round(stats.cal)} / {targets.cal} kcal
                </span>
              </div>
              <div className="prog-track">
                <div className="prog-fill" style={{ width: `${(stats.cal / targets.cal) * 100}%` }}></div>
              </div>
            </div>
            <div className="prog-wrap prog-blue" style={{ marginTop: "14px" }}>
              <div className="prog-label">
                <span className="prog-name">Protein</span>
                <span className="prog-nums">
                  {Math.round(stats.prot)} / {targets.prot}g
                </span>
              </div>
              <div className="prog-track">
                <div className="prog-fill" style={{ width: `${(stats.prot / targets.prot) * 100}%` }}></div>
              </div>
            </div>
            <div className="prog-wrap prog-amber" style={{ marginTop: "14px" }}>
              <div className="prog-label">
                <span className="prog-name">Carbs</span>
                <span className="prog-nums">
                  {Math.round(stats.carb)} / {targets.carb}g
                </span>
              </div>
              <div className="prog-track">
                <div className="prog-fill" style={{ width: `${(stats.carb / targets.carb) * 100}%` }}></div>
              </div>
            </div>
            <div className="prog-wrap prog-purple" style={{ marginTop: "14px" }}>
              <div className="prog-label">
                <span className="prog-name">Fat</span>
                <span className="prog-nums">
                  {Math.round(stats.fat)} / {targets.fat}g
                </span>
              </div>
              <div className="prog-track">
                <div className="prog-fill" style={{ width: `${(stats.fat / targets.fat) * 100}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-title">🦶 Step progress</div>
          <div className="step-ring-wrap">
            <div className="step-ring">
              <svg viewBox="0 0 160 160" width="160" height="160">
                <circle className="ring-bg" cx="80" cy="80" r="68" />
                <circle
                  className="ring-fill"
                  cx="80"
                  cy="80"
                  r="68"
                  strokeDasharray="427"
                  strokeDashoffset={offset}
                />
              </svg>
              <div className="ring-center">
                <div className="ring-pct">{stepPct}%</div>
                <div className="ring-sub">of {targets.steps.toLocaleString()}</div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
            <div style={{ textAlign: "center", background: "var(--bg3)", borderRadius: "var(--r)", padding: "8px 14px" }}>
              <div style={{ fontSize: "11px", color: "var(--text3)" }}>Desk hours (2k)</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--text2)" }}>~2,000</div>
            </div>
            <div style={{ textAlign: "center", background: "var(--bg3)", borderRadius: "var(--r)", padding: "8px 14px" }}>
              <div style={{ fontSize: "11px", color: "var(--text3)" }}>Needed after 5pm</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--accent)" }}>~6,000</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
