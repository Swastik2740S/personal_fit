"use client";

import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Plus, 
  X, 
  Trash2, 
  Utensils, 
  Zap, 
  PieChart, 
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
}

const FoodLogger = () => {
  const { data: session } = useSession();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [qty, setQty] = useState(100);

  useEffect(() => {
    if (session) fetchLogs();
  }, [session]);

  const fetchLogs = async () => {
    try {
      const res = await fetch("/api/food/log", { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      if (Array.isArray(data)) setLogs(data);
    } catch (error) {
      console.error("Fetch logs error:", error);
    }
  };

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
        setQuery("");
        setResults([]);
        await fetchLogs();
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
      if (res.ok) {
        await fetchLogs();
      }
    } catch (error) {
      console.error("Delete log error:", error);
    }
  };

  const clearLogs = async () => {
    if (!confirm("Are you sure you want to clear all logs for today?")) return;
    try {
      const res = await fetch("/api/food/log?all=true", {
        method: "DELETE",
        cache: "no-store",
      });
      if (res.ok) {
        await fetchLogs();
      }
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
        <div className="page-title">Food Logger</div>
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
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="result-item" 
                onClick={() => setSelectedFood(food)}
              >
                <div>
                  <div className="result-name">{food.name}</div>
                  <div className="result-macros">
                    P: {Math.round(food.prot)}g · C: {Math.round(food.carb)}g · F: {Math.round(food.fat)}g
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div className="result-cal">{Math.round(food.cal)} kcal</div>
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
            Today's Log
          </div>
          <button className="btn-ghost" onClick={clearLogs} style={{ fontSize: 11, padding: '4px 10px' }}>
            <Trash2 size={12} style={{ marginRight: 4 }} /> Clear
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "12px", marginBottom: "24px" }}>
          {[
            { label: 'Calories', val: Math.round(totals.cal), unit: 'kcal', color: 'var(--accent)' },
            { label: 'Protein', val: Math.round(totals.prot), unit: 'g', color: 'var(--neon-cyan)' },
            { label: 'Carbs', val: Math.round(totals.carb), unit: 'g', color: 'var(--neon-amber)' },
            { label: 'Fat', val: Math.round(totals.fat), unit: 'g', color: 'var(--neon-purple)' },
          ].map((stat, i) => (
            <div key={i} style={{ background: "var(--bg3)", borderRadius: "var(--r)", padding: "12px", border: '1px solid var(--border)' }}>
              <div style={{ fontSize: "10px", color: "var(--text3)", textTransform: 'uppercase', fontWeight: 700 }}>{stat.label}</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 800, color: stat.color }}>
                {stat.val}<span style={{ fontSize: 12, opacity: 0.5, marginLeft: 2 }}>{stat.unit}</span>
              </div>
            </div>
          ))}
        </div>

        <div id="food-log-list">
          <AnimatePresence mode="popLayout">
            {logs.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="empty-state" 
                style={{ textAlign: 'center', padding: '40px 0', opacity: 0.5 }}
              >
                <Utensils size={40} style={{ marginBottom: 12, display: 'block', margin: '0 auto' }} />
                <div>No logs yet. Your nutrition journey starts here.</div>
              </motion.div>
            ) : (
              logs.map((log) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, x: 20 }}
                  key={log.id} 
                  className="log-entry"
                >
                  <div>
                    <div className="log-name">{log.name}</div>
                    <div className="log-qty">
                      {Math.round(log.qty)}g · P: {Math.round(log.prot)}g · C: {Math.round(log.carb)}g · F: {Math.round(log.fat)}g
                    </div>
                  </div>
                  <div className="log-right">
                    <div className="log-cal">{Math.round(log.cal)} kcal</div>
                    <button className="log-del" onClick={() => deleteLog(log.id)}><X size={16} /></button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedFood && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay" 
            onClick={() => setSelectedFood(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="modal" 
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-title">{selectedFood.name}</div>
              <div className="modal-sub">
                Adjust quantity to calculate precise macros.
              </div>
              <div className="qty-row">
                <input
                  className="qty-input"
                  type="number"
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  min="1"
                />
                <div className="qty-unit">grams (g)</div>
              </div>
              <div className="preview-macros">
                <div className="preview-macro">
                  <div className="preview-macro-val" style={{ color: "var(--accent)" }}>
                    {Math.round((selectedFood.cal * qty) / 100)}
                  </div>
                  <div className="preview-macro-label">kcal</div>
                </div>
                <div className="preview-macro">
                  <div className="preview-macro-val" style={{ color: "var(--neon-cyan)" }}>
                    {Math.round((selectedFood.prot * qty) / 100)}g
                  </div>
                  <div className="preview-macro-label">prot</div>
                </div>
                <div className="preview-macro">
                  <div className="preview-macro-val" style={{ color: "var(--neon-amber)" }}>
                    {Math.round((selectedFood.carb * qty) / 100)}g
                  </div>
                  <div className="preview-macro-label">carb</div>
                </div>
                <div className="preview-macro">
                  <div className="preview-macro-val" style={{ color: "var(--neon-purple)" }}>
                    {Math.round((selectedFood.fat * qty) / 100)}g
                  </div>
                  <div className="preview-macro-label">fat</div>
                </div>
              </div>
              <div className="modal-actions" style={{ display: 'flex', gap: 12 }}>
                <button className="btn" style={{ flex: 1 }} onClick={addToLog}>
                  Add to Diary
                </button>
                <button className="btn-ghost" onClick={() => setSelectedFood(null)}>
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FoodLogger;
