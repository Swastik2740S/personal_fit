"use client";

import { motion } from "framer-motion";
import { 
  Lightbulb, 
  Scale, 
  TrendingUp, 
  Moon, 
  Droplets,
  ChevronRight,
  Target,
  Dumbbell
} from "lucide-react";

const tips = [
  { icon: <Target size={20} />, title: "The Egg Factor", desc: "Target 4–6 eggs daily. They are your highest leverage protein source on a vegetarian diet. Boiled > Fried.", color: "var(--accent)" },
  { icon: <Scale size={20} />, title: "Weekly Averages", desc: "Weigh yourself daily but only track the weekly average. Weight fluctuates by 1–2kg due to water; trends matter.", color: "var(--neon-cyan)" },
  { icon: <TrendingUp size={20} />, title: "Roti Calibration", desc: "1 Roti = ~100 kcal. If fat loss stalls, reduce dinner by 1 roti first. Keep pre-workout carbs high.", color: "var(--neon-amber)" },
  { icon: <Moon size={20} />, title: "Sleep Architecture", desc: "7.5–9 hours is non-negotiable. Muscle is built in deep sleep, not in the gym. Sleep before midnight.", color: "var(--neon-purple)" },
  { icon: <Dumbbell size={20} />, title: "Progressive Overload", desc: "Log every lift. Adding even 2.5kg every 2 weeks on bench/deadlift is the only way to preserve muscle.", color: "var(--red)" },
  { icon: <Droplets size={20} />, title: "Hydration Logic", desc: "3L+ water daily. Creatine draws water into muscles—dehydration tanks your performance and pump.", color: "var(--neon-cyan)" }
];

const CoachTipsPage = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1 }
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="page active">
      <motion.div variants={item} className="page-header">
        <div className="page-title">Elite Performance Tips</div>
        <div className="page-sub">Small adjustments that drive disproportionate results.</div>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {tips.map((tip, i) => (
          <motion.div 
            variants={item} 
            key={i} 
            className="card" 
            style={{ display: 'flex', gap: 20, alignItems: 'center', padding: '24px 28px' }}
            whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.2)' }}
          >
            <div style={{ width: 52, height: 52, borderRadius: 16, background: 'var(--bg3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: tip.color, flexShrink: 0, boxShadow: `0 0 20px ${tip.color}10` }}>
              {tip.icon}
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 17, color: 'var(--text)', marginBottom: 6 }}>{tip.title}</div>
              <div style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.6 }}>{tip.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CoachTipsPage;
