const MealPlanPage = () => {
  return (
    <div className="page active">
      <div className="page-header">
        <div className="page-title">Meal Plan</div>
        <div className="page-sub">Built for your home-cooked food, vegetarian + eggs diet. 2,350 kcal / 160g protein daily.</div>
      </div>

      <div className="card" style={{ marginBottom: "16px" }}>
        <div className="card-title">🌅 Breakfast — 8–9 AM</div>
        <div className="meal-item">
          <div className="meal-dot" style={{ background: "var(--accent)" }}></div>
          <div className="meal-body">
            <div className="meal-head">
              <div className="meal-name">4 boiled eggs + 2 rotis + 1 glass milk</div>
              <div className="meal-time">~8:30 AM</div>
            </div>
            <div className="meal-desc">Boil eggs, not fry. Milk adds casein protein. Sets your protein baseline early so you're not scrambling later.</div>
            <div className="meal-macros">
              <span className="macro-tag">~40g protein</span>
              <span className="macro-tag">~45g carbs</span>
              <span className="macro-tag">~18g fat</span>
              <span className="macro-tag">~500 kcal</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: "16px" }}>
        <div className="card-title">🍎 Mid-morning snack — 11 AM</div>
        <div className="meal-item">
          <div className="meal-dot" style={{ background: "var(--amber)" }}></div>
          <div className="meal-body">
            <div className="meal-head">
              <div className="meal-name">Roasted chana (1 cup) OR paneer cubes (100g)</div>
              <div className="meal-time">~11 AM</div>
            </div>
            <div className="meal-desc">High protein, zero prep. Avoid biscuits, chips, bread. Chana also has fibre which keeps you full through the desk hours.</div>
            <div className="meal-macros">
              <span className="macro-tag">~15g protein</span>
              <span className="macro-tag">~20g carbs</span>
              <span className="macro-tag">~200 kcal</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: "16px" }}>
        <div className="card-title">☀️ Pre-workout lunch — 3:30–4 PM</div>
        <div className="meal-item">
          <div className="meal-dot" style={{ background: "var(--purple)" }}></div>
          <div className="meal-body">
            <div className="meal-head">
              <div className="meal-name">3 eggs omelette + 3 rotis + curd</div>
              <div className="meal-time">~3:45 PM (1–1.5 hrs before gym)</div>
            </div>
            <div className="meal-desc">Carb-heavy to fuel your evening gym session. Curd adds extra protein. Ask mom to make sabzi on the side — it adds volume without many calories.</div>
            <div className="meal-macros">
              <span className="macro-tag">~45g protein</span>
              <span className="macro-tag">~60g carbs</span>
              <span className="macro-tag">~14g fat</span>
              <span className="macro-tag">~560 kcal</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: "16px" }}>
        <div className="card-title">⚡ Post-workout shake — 7–7:30 PM</div>
        <div className="meal-item">
          <div className="meal-dot" style={{ background: "var(--blue)" }}></div>
          <div className="meal-body">
            <div className="meal-head">
              <div className="meal-name">1 scoop whey + 1 banana</div>
              <div className="meal-time">Within 30 min of finishing gym</div>
            </div>
            <div className="meal-desc">Banana spikes insulin which drives protein into muscle. The fastest recovery window is the 30 min post-workout — don't miss this.</div>
            <div className="meal-macros">
              <span className="macro-tag">~30g protein</span>
              <span className="macro-tag">~30g carbs</span>
              <span className="macro-tag">~4g fat</span>
              <span className="macro-tag">~280 kcal</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">🌙 Dinner — 8:30–9 PM</div>
        <div className="meal-item">
          <div className="meal-dot" style={{ background: "var(--red)" }}></div>
          <div className="meal-body">
            <div className="meal-head">
              <div className="meal-name">1.5 cups cooked dal + 2 rotis + sabzi + curd</div>
              <div className="meal-time">~8:45 PM</div>
            </div>
            <div className="meal-desc">Dal is your MVP. Ask mom to cook it thick, not watery — thin dal has half the protein. Add curd if available. This is your last protein top-up before overnight recovery.</div>
            <div className="meal-macros">
              <span className="macro-tag">~35g protein</span>
              <span className="macro-tag">~55g carbs</span>
              <span className="macro-tag">~8g fat</span>
              <span className="macro-tag">~450 kcal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealPlanPage;
