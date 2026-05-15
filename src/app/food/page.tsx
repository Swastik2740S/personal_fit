"use client";

import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";

interface FoodItem {
  name: string;
  cal: number;
  prot: number;
  carb: number;
  fat: number;
}

interface LogEntry extends FoodItem {
  id: string;
  qty: number;
}

const FoodLogger = () => {
  const { data: session, status } = useSession();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [qty, setQty] = useState(100);

  useEffect(() => {
    if (session) fetchLogs();
  }, [session]);

  if (status === "loading") {
    return <div className="page active"><div className="page-header"><div className="page-title">Loading...</div></div></div>;
  }

  if (!session) {
    return (
      <div className="page active">
        <div className="page-header">
          <div className="page-title">Food Logger 🍽</div>
          <div className="page-sub">Login to track your meals and hit your protein goals.</div>
        </div>
        <div className="card" style={{ textAlign: "center", padding: "40px" }}>
          <div style={{ fontSize: "48px", marginBottom: "20px" }}>🥗</div>
          <button className="btn" onClick={() => signIn("github")}>Login with GitHub to Start</button>
        </div>
      </div>
    );
  }

  const fetchLogs = async () => {
    try {
      const res = await fetch("/api/food/log");
      const data = await res.json();
      setLogs(data);
    } catch (error) {
      console.error("Fetch logs error:", error);
    }
  };

  const searchFood = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/food/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToLog = async () => {
    if (!selectedFood) return;
    const factor = qty / 100;
    const entry = {
      name: selectedFood.name,
      qty,
      cal: selectedFood.cal * factor,
      prot: selectedFood.prot * factor,
      carb: selectedFood.carb * factor,
      fat: selectedFood.fat * factor,
    };

    try {
      const res = await fetch("/api/food/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });
      if (res.ok) {
        setSelectedFood(null);
        setQuery("");
        setResults([]);
        fetchLogs();
      }
    } catch (error) {
      console.error("Add log error:", error);
    }
  };

  // Totals
  const totals = logs.reduce(
    (acc, log) => {
      acc.cal += log.cal;
      acc.prot += log.prot;
      acc.carb += log.carb;
      acc.fat += log.fat;
      return acc;
    },
    { cal: 0, prot: 0, carb: 0, fat: 0 }
  );

  return (
    <div className="page active">
      <div className="page-header">
        <div className="page-title">Food Logger</div>
        <div className="page-sub">Search any food — powered by Edamam. Data is saved to your account.</div>
      </div>

      <div className="card" style={{ marginBottom: "16px" }}>
        <div className="card-title">🔍 Search food</div>
        <div className="search-bar">
          <input
            className="search-input"
            type="text"
            placeholder="e.g. boiled egg, dal, paneer, roti..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && searchFood()}
          />
          <button className="btn" onClick={searchFood} disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        <div className="results-list">
          {results.map((food, i) => (
            <div key={i} className="result-item" onClick={() => setSelectedFood(food)}>
              <div>
                <div className="result-name">{food.name}</div>
                <div className="result-macros">
                  per 100g · P: {Math.round(food.prot)}g · C: {Math.round(food.carb)}g · F: {Math.round(food.fat)}g
                </div>
              </div>
              <div className="result-cal">{Math.round(food.cal)} kcal</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-title" style={{ justifyContent: "space-between" }}>
          <span>📋 Today's log</span>
          <button className="btn-ghost">Clear all</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "10px", marginBottom: "16px" }}>
          <div style={{ background: "var(--bg3)", borderRadius: "var(--r)", padding: "10px", textAlign: "center" }}>
            <div style={{ fontSize: "11px", color: "var(--text3)" }}>Calories</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 800, color: "var(--accent)" }}>
              {Math.round(totals.cal)}
            </div>
          </div>
          <div style={{ background: "var(--bg3)", borderRadius: "var(--r)", padding: "10px", textAlign: "center" }}>
            <div style={{ fontSize: "11px", color: "var(--text3)" }}>Protein</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 800, color: "var(--blue)" }}>
              {Math.round(totals.prot)}g
            </div>
          </div>
          <div style={{ background: "var(--bg3)", borderRadius: "var(--r)", padding: "10px", textAlign: "center" }}>
            <div style={{ fontSize: "11px", color: "var(--text3)" }}>Carbs</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 800, color: "var(--amber)" }}>
              {Math.round(totals.carb)}g
            </div>
          </div>
          <div style={{ background: "var(--bg3)", borderRadius: "var(--r)", padding: "10px", textAlign: "center" }}>
            <div style={{ fontSize: "11px", color: "var(--text3)" }}>Fat</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 800, color: "var(--purple)" }}>
              {Math.round(totals.fat)}g
            </div>
          </div>
        </div>

        <div id="food-log-list">
          {logs.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🍽</div>
              <div>No food logged yet. Search for foods above to start tracking.</div>
            </div>
          ) : (
            logs.map((log) => (
              <div key={log.id} className="log-entry">
                <div>
                  <div className="log-name">{log.name}</div>
                  <div className="log-qty">
                    {log.qty}g · P: {Math.round(log.prot)}g · C: {Math.round(log.carb)}g · F: {Math.round(log.fat)}g
                  </div>
                </div>
                <div className="log-right">
                  <div className="log-cal">{Math.round(log.cal)} kcal</div>
                  <button className="log-del">✕</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* QTY MODAL */}
      {selectedFood && (
        <div className="modal-overlay open" onClick={() => setSelectedFood(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-title">{selectedFood.name}</div>
            <div className="modal-sub">
              Per 100g: {Math.round(selectedFood.cal)} kcal · {Math.round(selectedFood.prot)}g protein
            </div>
            <div className="qty-row">
              <input
                className="qty-input"
                type="number"
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                min="1"
              />
              <div className="qty-unit">grams</div>
            </div>
            <div className="preview-macros">
              <div className="preview-macro">
                <div className="preview-macro-val" style={{ color: "var(--accent)" }}>
                  {Math.round((selectedFood.cal * qty) / 100)}
                </div>
                <div className="preview-macro-label">calories</div>
              </div>
              <div className="preview-macro">
                <div className="preview-macro-val" style={{ color: "var(--blue)" }}>
                  {Math.round((selectedFood.prot * qty) / 100)}g
                </div>
                <div className="preview-macro-label">protein</div>
              </div>
              <div className="preview-macro">
                <div className="preview-macro-val" style={{ color: "var(--amber)" }}>
                  {Math.round((selectedFood.carb * qty) / 100)}g
                </div>
                <div className="preview-macro-label">carbs</div>
              </div>
              <div className="preview-macro">
                <div className="preview-macro-val" style={{ color: "var(--purple)" }}>
                  {Math.round((selectedFood.fat * qty) / 100)}g
                </div>
                <div className="preview-macro-label">fat</div>
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn" style={{ flex: 1 }} onClick={addToLog}>
                Add to log
              </button>
              <button className="btn-ghost" onClick={() => setSelectedFood(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodLogger;
