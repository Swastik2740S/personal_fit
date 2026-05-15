const CoachTipsPage = () => {
  const tips = [
    { icon: "🥚", title: "Eggs are your highest-leverage food", desc: "At 80kg on a vegetarian diet, 160g protein daily is genuinely hard. Eggs are your easiest path. Boiled is better than fried — same protein, far fewer calories. Target 4–6 eggs daily across meals.", color: "var(--accent-dim)" },
    { icon: "⚖️", title: "Weigh yourself weekly, not daily", desc: "Morning weight after using the bathroom, before eating. Average across 3 days of the week. Body weight fluctuates 1–2 kg daily from water and food. Weekly trends are what matter. Expect 0.3–0.5 kg loss per week on this plan.", color: "var(--blue-dim)" },
    { icon: "🍞", title: "Roti count is your calorie dial", desc: "1 medium roti is about 100 kcal and 18g carbs. If fat loss stalls after 3 weeks, reduce by 1 roti at dinner first — never at the pre-workout meal. Your training performance depends on carbs before gym.", color: "var(--amber-dim)" },
    { icon: "💤", title: "Sleep before midnight — non-negotiable", desc: "Growth hormone peaks in the first 2 hours of deep sleep. Poor sleep blunts fat loss even on a perfect diet. It also increases cortisol which causes muscle breakdown. 7.5–9 hours minimum.", color: "var(--purple-dim)" },
    { icon: "📈", title: "Log your lifts — progressive overload is how you keep muscle", desc: "Without tracking, you'll plateau after 3 weeks and not notice. Even adding 2.5 kg every 2 weeks on bench and deadlift is enough to preserve and build muscle while cutting. Use a notes app or notebook at minimum.", color: "var(--red-dim)" },
    { icon: "💧", title: "Drink 3–3.5L water daily", desc: "Creatine draws water into muscles — dehydration tanks your pump and performance. Start your morning with 500ml water before anything else. Carry a 1L bottle to your desk.", color: "var(--accent-dim)" }
  ];

  return (
    <div className="page active">
      <div className="page-header">
        <div className="page-title">Coach Tips</div>
        <div className="page-sub">The stuff that actually makes or breaks a cut. Read once, apply daily.</div>
      </div>

      {tips.map((tip, i) => (
        <div key={i} className="tip-card">
          <div className="tip-icon-circle" style={{ background: tip.color }}>{tip.icon}</div>
          <div>
            <div className="tip-title">{tip.title}</div>
            <div className="tip-desc">{tip.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CoachTipsPage;
