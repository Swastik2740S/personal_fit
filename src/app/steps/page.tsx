"use client";

import { useState } from "react";

const StepTracker = () => {
  const [steps, setSteps] = useState(0);
  const [inputVal, setInputVal] = useState("");
  const target = 8000;

  const pct = Math.min(100, Math.round((steps / target) * 100));
  const circ = 427;
  const offset = circ - (circ * pct) / 100;

  return (
    <div className="page active">
      <div className="page-header">
        <div className="page-title">Step Tracker</div>
        <div className="page-sub">Target: 8,000 steps. Your desk job gives you ~2,000 by 5 PM — here's how to close the gap.</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
        <div className="card">
          <div className="card-title">🦶 Log today's steps</div>
          <div className="step-display">
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
                  <div className="ring-pct">{pct}%</div>
                  <div className="ring-sub">of {target.toLocaleString()}</div>
                </div>
              </div>
            </div>
            <div className="step-num">{steps.toLocaleString()}</div>
            <div className="step-label">steps today</div>
          </div>
          <div className="step-input-row">
            <input
              className="step-input"
              type="number"
              placeholder="Enter steps"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              min="0"
              max="30000"
            />
            <button className="btn" onClick={() => {
              setSteps(Number(inputVal));
              setInputVal("");
            }}>
              Update
            </button>
          </div>
        </div>

        <div className="card">
          <div className="card-title">🗓 Desk job step plan</div>
          <div style={{ fontSize: "13px", color: "var(--text2)", marginBottom: "14px", padding: "12px", background: "var(--amber-dim)", borderRadius: "var(--r)", borderLeft: "3px solid var(--amber)" }}>
            Since you're seated until 5 PM (~2,000 steps by then), you need 6,000 more steps after gym. Here's exactly how to hit it without trying hard.
          </div>
          <div className="walk-tips">
            <div className="walk-tip">
              <div className="walk-tip-icon">🏋️</div>
              <div>
                <div className="walk-tip-title">Walk to/from gym (500–800 steps)</div>
                <div className="walk-tip-text">If your gym is walkable, ditch the ride. Even a 5 min walk each way adds up.</div>
              </div>
            </div>
            <div className="walk-tip">
              <div className="walk-tip-icon">🌙</div>
              <div>
                <div className="walk-tip-title">Post-dinner walk — 25 min (2,500 steps)</div>
                <div className="walk-tip-text">This is your biggest lever. After dinner at 9 PM, a 25-minute walk gets you 2,000–2,500 steps. Also helps digestion and sleep.</div>
              </div>
            </div>
            <div className="walk-tip">
              <div className="walk-tip-icon">☕</div>
              <div>
                <div className="walk-tip-title">Stand + pace during study/calls (1,000 steps)</div>
                <div className="walk-tip-text">Pace while reading or on calls. Even walking inside your room for 10 minutes = ~1,000 steps.</div>
              </div>
            </div>
            <div className="walk-tip">
              <div className="walk-tip-icon">🏠</div>
              <div>
                <div className="walk-tip-title">Around the house errands (500–1,000 steps)</div>
                <div className="walk-tip-text">Water trips, bathroom breaks, going to another room — intentionally move more at home and it adds up to 1,000 steps easily.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepTracker;
