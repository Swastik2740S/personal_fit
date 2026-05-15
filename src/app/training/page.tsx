"use client";

import { useState } from "react";

const trainingDays = [
  { label: "Mon", name: "Push — Chest, Shoulders, Triceps", tag: "train",
    exercises: [
      { n: "Bench Press", s: "4 x 6–8" },
      { n: "Incline Dumbbell Press", s: "3 x 8–10" },
      { n: "Overhead Shoulder Press", s: "3 x 8–10" },
      { n: "Lateral Raises", s: "3 x 12–15" },
      { n: "Tricep Pushdowns or Dips", s: "3 x 10–12" },
      { n: "Pushups", s: "2 sets near failure" }
    ],
    note: "Compound lifts first — bench and OHP before isolation work. Track your bench numbers every week. Even 1 kg more per week compounds significantly over 3 months."
  },
  { label: "Tue", name: "Pull — Back and Biceps", tag: "train",
    exercises: [
      { n: "Pullups / Lat Pulldown", s: "4 x 6–10" },
      { n: "Barbell Row", s: "4 x 6–8" },
      { n: "Seated Cable Row", s: "3 x 10" },
      { n: "Face Pulls", s: "3 x 12–15" },
      { n: "Dumbbell Curls", s: "3 x 10–12" },
      { n: "Hammer Curls", s: "2 x 12" }
    ],
    note: "Face pulls are for shoulder health — never skip them. Barbell rows build the thickness that makes your back look wide when you cut down."
  },
  { label: "Wed", name: "Legs + Core", tag: "train",
    exercises: [
      { n: "Squats", s: "4 x 5–8" },
      { n: "Romanian Deadlift", s: "4 x 8" },
      { n: "Leg Press", s: "3 x 10" },
      { n: "Walking Lunges", s: "3 x 12 each leg" },
      { n: "Calf Raises", s: "4 x 15" },
      { n: "Plank", s: "3 rounds" },
      { n: "Hanging Leg Raises", s: "3 sets" }
    ],
    note: "Legs are your biggest calorie-burning day. Eat slightly more carbs today — an extra roti at lunch is fine. Squats and RDLs are the priority."
  },
  { label: "Thu", name: "Active Recovery", tag: "rest",
    exercises: [
      { n: "Walking", s: "30–40 mins" },
      { n: "Light Cycling", s: "Optional" },
      { n: "Stretching and Mobility", s: "15–20 mins" }
    ],
    note: "No gym today. This is where muscle is actually built. Use the extra time for a longer walk — Thursday is your best day to close the step gap."
  },
  { label: "Fri", name: "Upper Body Strength", tag: "train",
    exercises: [
      { n: "Bench Press", s: "5 x 5" },
      { n: "Weighted Pullups / Pulldown", s: "5 x 5" },
      { n: "Overhead Press", s: "4 x 6" },
      { n: "Barbell Row", s: "4 x 6" },
      { n: "Incline Dumbbell Press", s: "3 x 10" },
      { n: "Bicep + Tricep Superset", s: "3 rounds" }
    ],
    note: "Strength day. Lower reps, heavier weight. This is progressive overload — log what you lift. Go 2.5 kg heavier than last Friday whenever possible."
  },
  { label: "Sat", name: "Lower Body + Cardio", tag: "train",
    exercises: [
      { n: "Deadlift", s: "4 x 5" },
      { n: "Bulgarian Split Squats", s: "3 x 10" },
      { n: "Hamstring Curl", s: "3 x 12" },
      { n: "Leg Extension", s: "3 x 12" },
      { n: "Core Circuit", s: "10 mins" },
      { n: "Incline Walk or Cycling", s: "15–20 mins" }
    ],
    note: "End the week strong. Deadlift is the single best exercise for full-body fat burning. The incline walk at the end burns extra fat without touching muscle."
  },
  { label: "Sun", name: "Full Rest", tag: "rest",
    exercises: [
      { n: "Complete Rest", s: "No training" },
      { n: "Light walk if possible", s: "Optional 20 mins" }
    ],
    note: "Sleep in. Eat at close to maintenance today — an extra roti is fine. Recovery is when your body consolidates the whole week of work."
  }
];

const TrainingPage = () => {
  const [activeDayIdx, setActiveDayIdx] = useState(0);

  const d = trainingDays[activeDayIdx];

  return (
    <div className="page active">
      <div className="page-header">
        <div className="page-title">Training Plan</div>
        <div className="page-sub">Push/Pull/Legs split. Mon–Sat. Evening sessions 5–7 PM.</div>
      </div>

      <div className="card">
        <div className="day-tabs">
          {trainingDays.map((day, i) => (
            <button
              key={day.label}
              className={`day-tab ${i === activeDayIdx ? "active" : ""} ${day.tag === "rest" ? "rest-day" : ""}`}
              onClick={() => setActiveDayIdx(i)}
            >
              {day.label}
            </button>
          ))}
        </div>

        <div id="day-content">
          <div className="tag-row">
            {d.tag === "rest" ? (
              <span className="badge badge-rest">Rest</span>
            ) : (
              <span className="badge badge-train">Training</span>
            )}
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "17px", color: "var(--text)", marginBottom: "16px" }}>
            {d.name}
          </div>
          {d.exercises.map((e, i) => (
            <div key={i} className="ex-row">
              <div className="ex-name">{e.n}</div>
              <div className="ex-sets">{e.s}</div>
            </div>
          ))}
          <div className="day-note">{d.note}</div>
        </div>
      </div>
    </div>
  );
};

export default TrainingPage;
