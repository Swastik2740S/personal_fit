const SupplementsPage = () => {
  return (
    <div className="page active">
      <div className="page-header">
        <div className="page-title">Supplements</div>
        <div className="page-sub">Your current stack with optimal timing. No fluff added.</div>
      </div>

      <div className="supp-grid" style={{ marginBottom: "16px" }}>
        <div className="supp-card">
          <div className="supp-name">Whey Protein</div>
          <span className="supp-badge badge-keep">✓ Keep</span>
          <div className="supp-timing">Post-workout, within 30 minutes</div>
          <div className="supp-desc">1 scoop in water or milk. Timing matters here — the 30-min window after training maximises muscle protein synthesis. Mix with banana for better uptake.</div>
        </div>
        <div className="supp-card">
          <div className="supp-name">Creatine Monohydrate</div>
          <span className="supp-badge badge-keep">✓ Keep</span>
          <div className="supp-timing">3–5g daily, any consistent time</div>
          <div className="supp-desc">Take it daily at the same time — with meals is fine. No loading phase needed. Creatine works by saturation over weeks, not by timing. Drink 3L+ water daily with it.</div>
        </div>
        <div className="supp-card">
          <div className="supp-name">Multivitamin</div>
          <span className="supp-badge badge-opt">Optional</span>
          <div className="supp-timing">With breakfast</div>
          <div className="supp-desc">On a calorie deficit, micronutrient gaps are common. A basic multivitamin covers zinc, magnesium, B12, and iron — all critical for energy and recovery on a vegetarian diet.</div>
        </div>
        <div className="supp-card">
          <div className="supp-name">Vitamin D3</div>
          <span className="supp-badge badge-opt">Optional</span>
          <div className="supp-timing">1,000–2,000 IU with morning meal</div>
          <div className="supp-desc">Most Indians are deficient due to indoor lifestyles. D3 directly supports testosterone levels, muscle recovery, mood, and immune function. Take with a fat-containing meal for absorption.</div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">⚠️ What not to take</div>
        <div style={{ fontSize: "13px", color: "var(--text2)", lineHeight: "1.7" }}>
          Pre-workouts with caffeine over 200mg are unnecessary at your stage and disrupt sleep if taken post-4 PM. Fat burners are a waste of money — your deficit and training already do that job. BCAAs are redundant when you're hitting 160g protein daily from whole foods and whey. Save the money.
        </div>
      </div>
    </div>
  );
};

export default SupplementsPage;
