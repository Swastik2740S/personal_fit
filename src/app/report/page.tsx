"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { 
  Flame, 
  Activity, 
  Footprints,
  Calendar,
  ChevronLeft
} from "lucide-react";
import Link from "next/link";

interface DailyData {
  date: string;
  label: string;
  cal: number;
  prot: number;
  carb: number;
  fat: number;
  steps: number;
}

const WeeklyReport = () => {
  const { data: session } = useSession();
  const [data, setData] = useState<DailyData[]>([]);
  const [loading, setLoading] = useState(true);

  const getLocalStartOfDay = () => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d.toISOString();
  };

  const fetchWeeklyData = useCallback(async () => {
    try {
      const res = await fetch(`/api/dashboard/weekly?localStart=${getLocalStartOfDay()}`, { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (error) {
      console.error("Weekly report fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (session) fetchWeeklyData();
  }, [session, fetchWeeklyData]);

  const averages = data.reduce(
    (acc, day) => {
      acc.cal += day.cal;
      acc.prot += day.prot;
      acc.steps += day.steps;
      return acc;
    },
    { cal: 0, prot: 0, steps: 0 }
  );

  const count = data.length || 1;
  const avgCal = Math.round(averages.cal / count);
  const avgProt = Math.round(averages.prot / count);
  const avgSteps = Math.round(averages.steps / count);

  const maxCal = Math.max(...data.map(d => d.cal), 1);
  const maxProt = Math.max(...data.map(d => d.prot), 1);
  const maxSteps = Math.max(...data.map(d => d.steps), 1);

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

  if (loading) {
    return (
      <div style={{ display: 'flex', height: '80vh', alignItems: 'center', justifyContent: 'center' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="page active">
      <motion.div variants={item} className="page-header">
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text3)', textDecoration: 'none', fontSize: 13, marginBottom: 12 }}>
          <ChevronLeft size={14} /> Back to Dashboard
        </Link>
        <div className="page-title">Weekly Performance <span style={{ fontSize: 12, opacity: 0.3 }}>v1.0</span></div>
        <div className="page-sub">Analyzing your progress over the last 7 days.</div>
      </motion.div>

      <div className="metric-grid" style={{ marginBottom: 32 }}>
        <motion.div variants={item} className="metric-card">
          <div className="metric-label">Avg. Calories</div>
          <div className="metric-val">{avgCal}<span className="metric-unit">kcal</span></div>
          <div className="metric-sub">Daily Average</div>
          <div style={{ position: 'absolute', right: 20, bottom: 20, opacity: 0.1 }}><Flame size={48} color="var(--accent)" /></div>
        </motion.div>
        <motion.div variants={item} className="metric-card">
          <div className="metric-label">Avg. Protein</div>
          <div className="metric-val">{avgProt}<span className="metric-unit">g</span></div>
          <div className="metric-sub">Daily Average</div>
          <div style={{ position: 'absolute', right: 20, bottom: 20, opacity: 0.1 }}><Activity size={48} color="var(--neon-cyan)" /></div>
        </motion.div>
        <motion.div variants={item} className="metric-card">
          <div className="metric-label">Avg. Steps</div>
          <div className="metric-val">{avgSteps.toLocaleString()}<span className="metric-unit">steps</span></div>
          <div className="metric-sub">Daily Average</div>
          <div style={{ position: 'absolute', right: 20, bottom: 20, opacity: 0.1 }}><Footprints size={48} color="var(--neon-purple)" /></div>
        </motion.div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Calories Chart */}
        <motion.div variants={item} className="card">
          <div className="card-title">
            <Flame size={18} color="var(--accent)" />
            7-Day Calorie Trend
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 200, padding: '20px 0' }}>
            {data.map((day, i) => (
              <div key={day.date} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{ height: 140, width: '60%', background: 'var(--bg3)', borderRadius: 4, position: 'relative', overflow: 'hidden' }}>
                   <motion.div 
                     initial={{ height: 0 }}
                     animate={{ height: `${(day.cal / maxCal) * 100}%` }}
                     transition={{ duration: 1, delay: i * 0.1 }}
                     style={{ position: 'absolute', bottom: 0, width: '100%', background: 'var(--accent)', borderRadius: 2 }}
                   />
                </div>
                <div style={{ fontSize: 10, color: 'var(--text3)', fontWeight: 700 }}>{day.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Protein Chart */}
        <motion.div variants={item} className="card">
          <div className="card-title">
            <Activity size={18} color="var(--neon-cyan)" />
            7-Day Protein Trend
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 200, padding: '20px 0' }}>
            {data.map((day, i) => (
              <div key={day.date} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{ height: 140, width: '60%', background: 'var(--bg3)', borderRadius: 4, position: 'relative', overflow: 'hidden' }}>
                   <motion.div 
                     initial={{ height: 0 }}
                     animate={{ height: `${(day.prot / maxProt) * 100}%` }}
                     transition={{ duration: 1, delay: i * 0.1 }}
                     style={{ position: 'absolute', bottom: 0, width: '100%', background: 'var(--neon-cyan)', borderRadius: 2 }}
                   />
                </div>
                <div style={{ fontSize: 10, color: 'var(--text3)', fontWeight: 700 }}>{day.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Steps Chart */}
        <motion.div variants={item} className="card" style={{ gridColumn: 'span 2' }}>
          <div className="card-title">
            <Footprints size={18} color="var(--neon-purple)" />
            7-Day Step Count Trend
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 200, padding: '20px 0' }}>
            {data.map((day, i) => (
              <div key={day.date} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{ height: 140, width: '40%', background: 'var(--bg3)', borderRadius: 4, position: 'relative', overflow: 'hidden' }}>
                   <motion.div 
                     initial={{ height: 0 }}
                     animate={{ height: `${(day.steps / maxSteps) * 100}%` }}
                     transition={{ duration: 1, delay: i * 0.1 }}
                     style={{ position: 'absolute', bottom: 0, width: '100%', background: 'var(--neon-purple)', borderRadius: 2 }}
                   />
                </div>
                <div style={{ fontSize: 10, color: 'var(--text3)', fontWeight: 700 }}>{day.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div variants={item} className="card" style={{ marginTop: 24 }}>
        <div className="card-title">
          <Calendar size={18} color="var(--accent)" />
          Weekly Summary
        </div>
        <div style={{ overflowX: 'auto' }}>
           <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
             <thead>
               <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
                 <th style={{ padding: '12px 8px', fontSize: 12, color: 'var(--text3)', textTransform: 'uppercase' }}>Day</th>
                 <th style={{ padding: '12px 8px', fontSize: 12, color: 'var(--text3)', textTransform: 'uppercase' }}>Calories</th>
                 <th style={{ padding: '12px 8px', fontSize: 12, color: 'var(--text3)', textTransform: 'uppercase' }}>Protein</th>
                 <th style={{ padding: '12px 8px', fontSize: 12, color: 'var(--text3)', textTransform: 'uppercase' }}>Steps</th>
               </tr>
             </thead>
             <tbody>
               {data.map((day) => (
                 <tr key={day.date} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                   <td style={{ padding: '16px 8px', fontSize: 14, fontWeight: 700 }}>{day.label}</td>
                   <td style={{ padding: '16px 8px', fontSize: 14, color: 'var(--accent)' }}>{Math.round(day.cal)} kcal</td>
                   <td style={{ padding: '16px 8px', fontSize: 14, color: 'var(--neon-cyan)' }}>{Math.round(day.prot)}g</td>
                   <td style={{ padding: '16px 8px', fontSize: 14, color: 'var(--neon-purple)' }}>{day.steps.toLocaleString()}</td>
                 </tr>
               ))}
             </tbody>
           </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WeeklyReport;
