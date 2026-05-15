"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Plus, 
  X, 
  Trash2, 
  Utensils, 
  History 
} from "lucide-react";

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
  mealType: string;
}

const mealTypes = ["Breakfast", "Lunch", "Snack", "Dinner"];

const FoodLogger = () => {
  const { data: session } = useSession();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [viewingLog, setViewingLog] = useState<LogEntry | null>(null);
  const [qty, setQty] = useState(100);
  const [mealType, setMealType] = useState<string>("Snack");
  const [modalStep, setModalStep] = useState(1);

  const getLocalStartOfDay = () => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d.toISOString();
  };

  const fetchLogs = useCallback(async () => {
    try {
      const res = await fetch(`/api/food/log?localStart=${getLocalStartOfDay()}`, { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      console.log("DEBUG: Fetched logs:", data);
      if (Array.isArray(data)) setLogs(data);
    } catch (error) {
      console.error("Fetch logs error:", error);
    }
  }, []);

  const setDefaultMealType = useCallback(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 11) setMealType("Breakfast");
    else if (hour >= 11 && hour < 16) setMealType("Lunch");
    else if (hour >= 16 && hour < 22) setMealType("Dinner");
    else setMealType("Snack");
  }, []);

  useEffect(() => {
    console.log("DEBUG: FoodLogger Version 4.0 Loaded");
    setDefaultMealType();
  }, [setDefaultMealType]);

  useEffect(() => {
    if (session) fetchLogs();
  }, [session, fetchLogs]);

  const searchFood = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/food/search?q=${encodeURIComponent(query)}`, { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      if (Array.isArray(data)) setResults(data);
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
      mealType: mealType || "Snack",
    };

    try {
      const res = await fetch("/api/food/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
        cache: "no-store",
      });
      if (res.ok) {
        setSelectedFood(null);
        setModalStep(1);
        setDefaultMealType();
        setQuery("");
        setResults([]);
        await fetchLogs();
      } else {
        const err = await res.json();
        alert(`Error adding food: ${err.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Add log error:", error);
    }
  };

  const deleteLog = async (id: string) => {
    try {
      const res = await fetch(`/api/food/log?id=${id}`, {
        method: "DELETE",
        cache: "no-store",
      });
      if (res.ok) await fetchLogs();
    } catch (error) {
      console.error("Delete log error:", error);
    }
  };

  const clearLogs = async () => {
    if (!confirm("Are you sure you want to clear all logs for today?")) return;
    try {
      const res = await fetch(`/api/food/log?all=true&localStart=${getLocalStartOfDay()}`, {
        method: "DELETE",
        cache: "no-store",
      });
      if (res.ok) await fetchLogs();
    } catch (error) {
      console.error("Clear logs error:", error);
    }
  };

  const totals = logs.reduce(
    (acc, log) => {
      acc.cal += log.cal || 0;
      acc.prot += log.prot || 0;
      acc.carb += log.carb || 0;
      acc.fat += log.fat || 0;
      return acc;
    },
    { cal: 0, prot: 0, carb: 0, fat: 0 }
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="page active">
      <motion.div variants={item} className="page-header">
        <div className="page-title">Food Logger <span style={{ fontSize: 12, opacity: 0.3 }}>v4.0</span></div>
        <div className="page-sub">Track your nutrition with AI-powered search.</div>
      </motion.div>

      <motion.div variants={item} className="card" style={{ marginBottom: "24px" }}>
        <div className="card-title">
          <Search size={18} color="var(--accent)" />
          Quick Search
        </div>
        <div className="search-bar">
          <input
            className="search-input"
            type="text"
            placeholder="Search e.g. '2 boiled eggs', 'chicken salad'..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && searchFood()}
          />
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn" 
            onClick={searchFood} 
            disabled={loading}
          >
            {loading ? "Searching..." : "Find Food"}
          </motion.button>
        </div>

        <div className="results-list">
          <AnimatePresence>
            {results.map((food, i) => (
              <motion.div 
                key={`${food.name}-${i}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="result-item" 
                onClick={() => {
                  setSelectedFood(food);
                  setModalStep(1);
                }}
              >
                <div>
                  <div className="result-name">{food.name}</div>
                  <div className="result-macros">
                    P: {Math.round(food.prot)}g · C: {Math.round(food.carb)}g · F: {Math.round(food.fat)}g
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div className="result-cal" style={{ color: 'var(--accent)', fontWeight: 700 }}>{Math.round(food.cal)} kcal</div>
                  <Plus size={16} color="var(--text3)" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.div variants={item} className="card">
        <div className="card-title" style={{ justifyContent: "space-between" }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <History size={18} color="var(--neon-cyan)" />
            Today&apos;s Log
          </div>
          <button className="btn-ghost" onClick={clearLogs} style={{ fontSize: 11, padding: '4px 10px' }}>
            <Trash2 size={12} style={{ marginRight: 4 }} /> Clear
          </button>
        </div>

        <div className="metric-grid" style={{ gridTemplateColumns: "repeat(4,1fr)", marginBottom: "32px", display: "grid", gap: "16px" }}>
          {[
            { label: 'Calories', val: Math.round(totals.cal), unit: 'kcal', color: 'var(--accent)' },
            { label: 'Protein', val: Math.round(totals.prot), unit: 'g', color: 'var(--neon-cyan)' },
            { label: 'Carbs', val: Math.round(totals.carb), unit: 'g', color: 'var(--neon-amber)' },
            { label: 'Fat', val: Math.round(totals.fat), unit: 'g', color: 'var(--neon-purple)' },
          ].map((stat, i) => (
            <div key={i} className="metric-card" style={{ padding: '16px', background: 'var(--bg3)', borderRadius: 'var(--r)', border: '1px solid var(--border)' }}>
              <div className="metric-label" style={{ fontSize: '10px', color: 'var(--text3)', textTransform: 'uppercase', fontWeight: 700, marginBottom: 4 }}>{stat.label}</div>
              <div className="metric-val" style={{ fontSize: '20px', fontWeight: 800, color: stat.color }}>
                {stat.val}<span className="metric-unit" style={{ fontSize: '12px', opacity: 0.5, marginLeft: 2 }}>{stat.unit}</span>
              </div>
            </div>
          ))}
        </div>

        <div id="food-log-list">
          {logs.length === 0 ? (
            <div className="empty-state" style={{ textAlign: 'center', padding: '40px 0', opacity: 0.5 }}>
              <Utensils size={40} style={{ marginBottom: 12, display: 'block', margin: '0 auto' }} />
              <div>No logs yet. Start by searching for food.</div>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {/* Process standard meal types */}
              {mealTypes.map((type) => {
                const mealLogs = logs.filter(l => l.mealType === type);
                if (mealLogs.length === 0) return null;
                const mealCal = mealLogs.reduce((sum, log) => sum + log.cal, 0);

                return (
                  <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={type} style={{ marginBottom: 32 }}>
                    <div style={{ 
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                      paddingBottom: 12, borderBottom: '1px solid var(--border)', marginBottom: 12 
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 4, height: 16, background: 'var(--accent)', borderRadius: 2 }}></div>
                        <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                          {type}
                        </div>
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text2)', background: 'var(--bg3)', padding: '4px 12px', borderRadius: 20, border: '1px solid var(--border)' }}>
                        {Math.round(mealCal)} kcal
                      </div>
                    </div>
                    {mealLogs.map((log) => (
                      <motion.div 
                        layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, x: 20 }}
                        key={log.id} className="log-entry"
                        style={{ borderBottom: '1px solid var(--border)', padding: '12px 0', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                        onClick={() => {
                          console.log("DEBUG: Viewing log:", log);
                          setViewingLog(log);
                        }}
                      >
                        <div>
                          <div className="log-name" style={{ fontSize: 15, fontWeight: 600 }}>{log.name}</div>
                          <div className="log-qty" style={{ fontSize: 12, color: 'var(--text3)', marginTop: 2 }}>
                            {Math.round(log.qty)}g · P: {Math.round(log.prot)}g · C: {Math.round(log.carb)}g · F: {Math.round(log.fat)}g
                          </div>
                        </div>
                        <div className="log-right" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                          <div className="log-cal" style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{Math.round(log.cal)} kcal</div>
                          <button className="log-del" onClick={(e) => { e.stopPropagation(); deleteLog(log.id); }} style={{ background: 'transparent', border: 'none', color: 'var(--text3)', cursor: 'pointer', padding: 4 }}>
                            <X size={16} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                );
              })}

              {/* Process logs that don't match any standard meal type */}
              {(() => {
                const uncategorized = logs.filter(l => !mealTypes.includes(l.mealType || ""));
                if (uncategorized.length === 0) return null;
                const totalCal = uncategorized.reduce((sum, log) => sum + log.cal, 0);

                return (
                  <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} key="Other" style={{ marginBottom: 32 }}>
                    <div style={{ 
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                      paddingBottom: 12, borderBottom: '1px solid var(--border)', marginBottom: 12 
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 4, height: 16, background: 'var(--text3)', borderRadius: 2 }}></div>
                        <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                          Other
                        </div>
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text2)', background: 'var(--bg3)', padding: '4px 12px', borderRadius: 20, border: '1px solid var(--border)' }}>
                        {Math.round(totalCal)} kcal
                      </div>
                    </div>
                    {uncategorized.map((log) => (
                      <motion.div 
                        layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, x: 20 }}
                        key={log.id} className="log-entry"
                        style={{ borderBottom: '1px solid var(--border)', padding: '12px 0', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                        onClick={() => {
                          console.log("DEBUG: Viewing log (uncategorized):", log);
                          setViewingLog(log);
                        }}
                      >
                        <div>
                          <div className="log-name" style={{ fontSize: 15, fontWeight: 600 }}>{log.name}</div>
                          <div className="log-qty" style={{ fontSize: 12, color: 'var(--text3)', marginTop: 2 }}>
                            {Math.round(log.qty)}g · {log.mealType || "No Type"}
                          </div>
                        </div>
                        <div className="log-right" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                          <div className="log-cal" style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{Math.round(log.cal)} kcal</div>
                          <button className="log-del" onClick={(e) => { e.stopPropagation(); deleteLog(log.id); }} style={{ background: 'transparent', border: 'none', color: 'var(--text3)', cursor: 'pointer', padding: 4 }}>
                            <X size={16} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                );
              })()}
            </AnimatePresence>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedFood && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal-overlay" onClick={() => setSelectedFood(null)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-title">{selectedFood.name}</div>
              
              {modalStep === 1 ? (
                <>
                  <div className="modal-sub">Step 1: Select meal category.</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                    {mealTypes.map((type) => (
                      <button
                        key={type} 
                        onClick={() => {
                          setMealType(type);
                          setModalStep(2);
                        }}
                        className="btn-ghost"
                        style={{ 
                          width: '100%', padding: '16px', fontSize: 15, fontWeight: 700,
                          textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                        }}
                      >
                        {type}
                        <Plus size={16} />
                      </button>
                    ))}
                  </div>
                  <button className="btn-ghost" style={{ width: '100%' }} onClick={() => setSelectedFood(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <div className="modal-sub">Step 2: Adjust quantity (grams).</div>
                  <div style={{ marginBottom: 24 }}>
                    <div className="qty-row">
                      <input className="qty-input" type="number" value={qty} onChange={(e) => setQty(Number(e.target.value))} min="1" autoFocus />
                      <div className="qty-unit">grams (g)</div>
                    </div>
                  </div>

                  <div className="preview-macros">
                    <div className="preview-macro">
                      <div className="preview-macro-val" style={{ color: "var(--accent)" }}>{Math.round((selectedFood.cal * qty) / 100)}</div>
                      <div className="preview-macro-label">kcal</div>
                    </div>
                    <div className="preview-macro">
                      <div className="preview-macro-val" style={{ color: "var(--neon-cyan)" }}>{Math.round((selectedFood.prot * qty) / 100)}g</div>
                      <div className="preview-macro-label">prot</div>
                    </div>
                    <div className="preview-macro">
                      <div className="preview-macro-val" style={{ color: "var(--neon-amber)" }}>{Math.round((selectedFood.carb * qty) / 100)}g</div>
                      <div className="preview-macro-label">carb</div>
                    </div>
                    <div className="preview-macro">
                      <div className="preview-macro-val" style={{ color: "var(--neon-purple)" }}>{Math.round((selectedFood.fat * qty) / 100)}g</div>
                      <div className="preview-macro-label">fat</div>
                    </div>
                  </div>

                  <div className="modal-actions" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <button className="btn" style={{ width: '100%' }} onClick={addToLog}>Add to {mealType}</button>
                    <div style={{ display: 'flex', gap: 10 }}>
                      <button className="btn-ghost" style={{ flex: 1 }} onClick={() => setModalStep(1)}>Back</button>
                      <button className="btn-ghost" style={{ flex: 1 }} onClick={() => setSelectedFood(null)}>Cancel</button>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {viewingLog && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal-overlay" onClick={() => setViewingLog(null)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-title">{viewingLog.name}</div>
              <div className="modal-sub">Nutritional breakdown for this entry.</div>
              
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', marginBottom: 12, letterSpacing: '0.05em' }}>Log Details</div>
                <div style={{ background: 'var(--bg3)', padding: '16px', borderRadius: 'var(--r)', display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--text3)', textTransform: 'uppercase', fontWeight: 700 }}>Meal</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--accent)' }}>{viewingLog.mealType}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 11, color: 'var(--text3)', textTransform: 'uppercase', fontWeight: 700 }}>Quantity</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>{Math.round(viewingLog.qty)}g</div>
                  </div>
                </div>
              </div>

              <div className="preview-macros">
                <div className="preview-macro">
                  <div className="preview-macro-val" style={{ color: "var(--accent)" }}>{Math.round(viewingLog.cal)}</div>
                  <div className="preview-macro-label">kcal</div>
                </div>
                <div className="preview-macro">
                  <div className="preview-macro-val" style={{ color: "var(--neon-cyan)" }}>{Math.round(viewingLog.prot)}g</div>
                  <div className="preview-macro-label">prot</div>
                </div>
                <div className="preview-macro">
                  <div className="preview-macro-val" style={{ color: "var(--neon-amber)" }}>{Math.round(viewingLog.carb)}g</div>
                  <div className="preview-macro-label">carb</div>
                </div>
                <div className="preview-macro">
                  <div className="preview-macro-val" style={{ color: "var(--neon-purple)" }}>{Math.round(viewingLog.fat)}g</div>
                  <div className="preview-macro-label">fat</div>
                </div>
              </div>

              <div className="modal-actions">
                <button className="btn" style={{ width: '100%', background: 'var(--bg3)', color: 'var(--text)', border: '1px solid var(--card-border)' }} onClick={() => setViewingLog(null)}>Close Window</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FoodLogger;
