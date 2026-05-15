"use client";

import { motion } from "framer-motion";
import { 
  Pill, 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  Info,
  CheckCircle2,
  Zap,
  Sun
} from "lucide-react";

const supplements = [
  { 
    name: "Whey Protein", 
    status: "CRITICAL", 
    statusColor: "var(--accent)",
    timing: "Post-workout (within 30m)",
    desc: "1 scoop in water/milk. Maximises muscle protein synthesis immediately after training stress.",
    icon: <Pill size={20} />
  },
  { 
    name: "Creatine Monohydrate", 
    status: "CRITICAL", 
    statusColor: "var(--neon-cyan)",
    timing: "3–5g daily, any time",
    desc: "Works by saturation. No loading needed. Take it daily to improve strength and muscle fullness.",
    icon: <Zap size={20} />
  },
  { 
    name: "Multivitamin", 
    status: "OPTIONAL", 
    statusColor: "var(--text3)",
    timing: "With breakfast",
    desc: "Covers micronutrient gaps common during a calorie deficit. Critical for energy metabolism.",
    icon: <ShieldCheck size={20} />
  },
  { 
    name: "Vitamin D3", 
    status: "RECOMMENDED", 
    statusColor: "var(--neon-amber)",
    timing: "Morning with fats",
    desc: "Directly supports testosterone, recovery, and mood. Take with a fat-containing meal.",
    icon: <Sun size={20} />
  }
];

const SupplementsPage = () => {
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
        <div className="page-title">Supplement Stack</div>
        <div className="page-sub">Evidence-based essentials. No fluff, just results.</div>
      </motion.div>

      <div className="supp-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '32px' }}>
        {supplements.map((supp, i) => (
          <motion.div variants={item} key={i} className="card" style={{ display: 'flex', gap: 20 }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: 'var(--bg3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: supp.statusColor, flexShrink: 0 }}>
              {supp.icon}
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <div style={{ fontWeight: 800, fontSize: 17, color: 'var(--text)' }}>{supp.name}</div>
                <span style={{ fontSize: 9, fontWeight: 900, padding: '2px 6px', borderRadius: 4, background: 'var(--bg3)', color: supp.statusColor, border: `1px solid ${supp.statusColor}20` }}>{supp.status}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: supp.statusColor, fontWeight: 700, marginBottom: 8 }}>
                <Clock size={12} /> {supp.timing}
              </div>
              <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.5 }}>{supp.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div variants={item} className="card" style={{ borderLeft: '4px solid var(--red)', background: 'rgba(239, 68, 68, 0.05)' }}>
        <div className="card-title" style={{ color: 'var(--red)' }}>
          <AlertTriangle size={18} />
          Avoid List
        </div>
        <div style={{ fontSize: "14px", color: "var(--text2)", lineHeight: "1.7" }}>
          Skip expensive pre-workouts with {'>'}200mg caffeine; they ruin sleep post-4 PM. BCAAs are redundant if protein intake is {'>'}140g. Fat burners are marketing gimmicks—your deficit is the only burner that works.
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SupplementsPage;
