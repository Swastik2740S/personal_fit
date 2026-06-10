/**
 * Exercise substitution library — rule-based, no external calls (same
 * philosophy as planGenerator). A good substitute = same movement pattern,
 * doable with the user's equipment. Used client-side for instant suggestions
 * and server-side to keep swap payloads sane.
 */

export type MovementPattern =
  | "horizontal_push"
  | "vertical_push"
  | "horizontal_pull"
  | "vertical_pull"
  | "squat"
  | "hinge"
  | "lunge"
  | "core"
  | "calf"
  | "biceps"
  | "triceps"
  | "shoulders"
  | "conditioning"
  | "mobility";

export type EquipmentTier = "none" | "home_gym" | "full_gym";

export interface LibraryExercise {
  name: string;
  pattern: MovementPattern;
  /** Equipment tiers where this exercise is realistically doable. */
  equipment: EquipmentTier[];
  sets: string;
  reps: string;
  note: string;
}

const ALL: EquipmentTier[] = ["none", "home_gym", "full_gym"];
const HOME_UP: EquipmentTier[] = ["home_gym", "full_gym"];
const GYM: EquipmentTier[] = ["full_gym"];

export const EXERCISE_LIBRARY: LibraryExercise[] = [
  // ── Horizontal push ────────────────────────────────────────────────────────
  { name: "Push-Up",                 pattern: "horizontal_push", equipment: ALL,     sets: "3", reps: "10-15", note: "Full range of motion, 2-sec descent" },
  { name: "Incline Push-Up",         pattern: "horizontal_push", equipment: ALL,     sets: "3", reps: "12-15", note: "Hands on chair or bench — easier variation" },
  { name: "Decline Push-Up",         pattern: "horizontal_push", equipment: ALL,     sets: "3", reps: "10-12", note: "Feet elevated — more chest and shoulders" },
  { name: "Wide Push-Up",            pattern: "horizontal_push", equipment: ALL,     sets: "3", reps: "12",    note: "Wide stance hits chest more" },
  { name: "Archer Push-Up",          pattern: "horizontal_push", equipment: ALL,     sets: "3", reps: "6 ea",  note: "Shift weight to one arm each rep" },
  { name: "Dumbbell Bench Press",    pattern: "horizontal_push", equipment: HOME_UP, sets: "4", reps: "8-10",  note: "Full ROM, controlled tempo" },
  { name: "Dumbbell Floor Press",    pattern: "horizontal_push", equipment: HOME_UP, sets: "3", reps: "10",    note: "Pause at chest for 1 sec" },
  { name: "Incline DB Press",        pattern: "horizontal_push", equipment: HOME_UP, sets: "3", reps: "10",    note: "30-45° incline" },
  { name: "Barbell Bench Press",     pattern: "horizontal_push", equipment: GYM,     sets: "4", reps: "6-8",   note: "90° elbow angle, arch natural" },
  { name: "Chest Fly Machine",       pattern: "horizontal_push", equipment: GYM,     sets: "3", reps: "15",    note: "Feel stretch in pecs" },
  { name: "Cable Fly",               pattern: "horizontal_push", equipment: GYM,     sets: "3", reps: "12",    note: "Full stretch at bottom" },
  { name: "Weighted Dip",            pattern: "horizontal_push", equipment: GYM,     sets: "3", reps: "8-10",  note: "Lean forward for chest emphasis" },

  // ── Vertical push ──────────────────────────────────────────────────────────
  { name: "Pike Push-Up",            pattern: "vertical_push",   equipment: ALL,     sets: "3", reps: "8-10",  note: "Hips high — targets shoulders" },
  { name: "Handstand Push-Up",       pattern: "vertical_push",   equipment: ALL,     sets: "4", reps: "5-8",   note: "Wall-assisted or freestanding" },
  { name: "Dumbbell Shoulder Press", pattern: "vertical_push",   equipment: HOME_UP, sets: "3", reps: "12",    note: "Seated or standing" },
  { name: "Arnold Press",            pattern: "vertical_push",   equipment: HOME_UP, sets: "3", reps: "10",    note: "Rotate palms out as you press" },
  { name: "Overhead Press",          pattern: "vertical_push",   equipment: GYM,     sets: "3", reps: "8-10",  note: "Bar in front, full lockout" },
  { name: "Shoulder Press Machine",  pattern: "vertical_push",   equipment: GYM,     sets: "3", reps: "12",    note: "Don't lock out at top" },

  // ── Shoulders (isolation) ──────────────────────────────────────────────────
  { name: "Reverse Snow Angel",      pattern: "shoulders",       equipment: ALL,     sets: "3", reps: "12",    note: "Lie prone, arms sweep overhead" },
  { name: "Lateral Raise",           pattern: "shoulders",       equipment: HOME_UP, sets: "3", reps: "15",    note: "Slight elbow bend, lead with elbows" },
  { name: "Rear Delt Fly",           pattern: "shoulders",       equipment: HOME_UP, sets: "3", reps: "15",    note: "Hinge forward, arms arc out" },
  { name: "Face Pull (band)",        pattern: "shoulders",       equipment: HOME_UP, sets: "3", reps: "15",    note: "Pull to forehead, elbows high" },
  { name: "Band Pull-Apart",         pattern: "shoulders",       equipment: HOME_UP, sets: "3", reps: "20",    note: "Keep arms straight, retract blades" },
  { name: "Cable Lateral Raise",     pattern: "shoulders",       equipment: GYM,     sets: "3", reps: "15",    note: "Unilateral, lead with elbow" },
  { name: "Cable Face Pull",         pattern: "shoulders",       equipment: GYM,     sets: "4", reps: "15",    note: "Thumbs to ears, external rotation" },
  { name: "Rear Delt Machine",       pattern: "shoulders",       equipment: GYM,     sets: "3", reps: "15",    note: "Elbows flare to sides" },
  { name: "DB Shrug",                pattern: "shoulders",       equipment: HOME_UP, sets: "4", reps: "15",    note: "Hold 2 sec at top" },

  // ── Horizontal pull ────────────────────────────────────────────────────────
  { name: "Door-Frame Row",          pattern: "horizontal_pull", equipment: ALL,     sets: "4", reps: "10-12", note: "Lean back and pull chest to door" },
  { name: "Inverted Row",            pattern: "horizontal_pull", equipment: ALL,     sets: "4", reps: "12",    note: "Table or bar at waist height" },
  { name: "Superman Hold",           pattern: "horizontal_pull", equipment: ALL,     sets: "3", reps: "12",    note: "Hold 2 sec at top for back engagement" },
  { name: "Dumbbell Row",            pattern: "horizontal_pull", equipment: HOME_UP, sets: "4", reps: "10 ea", note: "Elbow drives behind body" },
  { name: "Renegade Row",            pattern: "horizontal_pull", equipment: HOME_UP, sets: "3", reps: "8 ea",  note: "Hips square, brace core" },
  { name: "Barbell Row",             pattern: "horizontal_pull", equipment: GYM,     sets: "4", reps: "8",     note: "Slight forward lean, elbows back" },
  { name: "Cable Row",               pattern: "horizontal_pull", equipment: GYM,     sets: "3", reps: "12",    note: "Full extension, full retraction" },
  { name: "Seated Row Machine",      pattern: "horizontal_pull", equipment: GYM,     sets: "3", reps: "12",    note: "Full extension forward" },
  { name: "T-Bar Row",               pattern: "horizontal_pull", equipment: GYM,     sets: "3", reps: "10",    note: "Chest on pad, elbows at 45°" },

  // ── Vertical pull ──────────────────────────────────────────────────────────
  { name: "Pull-Up",                 pattern: "vertical_pull",   equipment: ALL,     sets: "4", reps: "6-10",  note: "Needs a bar — full dead hang each rep" },
  { name: "Chin-Up",                 pattern: "vertical_pull",   equipment: ALL,     sets: "3", reps: "8",     note: "Needs a bar — supinated grip, squeeze at top" },
  { name: "Band-Assisted Pull-Up",   pattern: "vertical_pull",   equipment: HOME_UP, sets: "4", reps: "8",     note: "Band under knee or foot" },
  { name: "Band Lat Pulldown",       pattern: "vertical_pull",   equipment: HOME_UP, sets: "3", reps: "15",    note: "Anchor band overhead, pull to chest" },
  { name: "Dumbbell Pullover",       pattern: "vertical_pull",   equipment: HOME_UP, sets: "3", reps: "12",    note: "Feel lat stretch at top" },
  { name: "Lat Pulldown",            pattern: "vertical_pull",   equipment: GYM,     sets: "3", reps: "12",    note: "Pull to upper chest, elbows down" },
  { name: "Cable Straight-Arm Pulldown", pattern: "vertical_pull", equipment: GYM,   sets: "3", reps: "15",    note: "Isolates lats" },

  // ── Squat (knee-dominant) ──────────────────────────────────────────────────
  { name: "Bodyweight Squat",        pattern: "squat",           equipment: ALL,     sets: "3", reps: "15-20", note: "Chest up, knees tracking toes" },
  { name: "Jump Squat",              pattern: "squat",           equipment: ALL,     sets: "3", reps: "10",    note: "Land softly, absorb impact" },
  { name: "Wall Sit",                pattern: "squat",           equipment: ALL,     sets: "3", reps: "45 sec",note: "Thighs parallel to floor" },
  { name: "Pistol Squat (assisted)", pattern: "squat",           equipment: ALL,     sets: "3", reps: "6 ea",  note: "Hold door frame for balance" },
  { name: "Goblet Squat",            pattern: "squat",           equipment: HOME_UP, sets: "4", reps: "12",    note: "Hold one dumbbell at chest" },
  { name: "Dumbbell Front Squat",    pattern: "squat",           equipment: HOME_UP, sets: "4", reps: "10",    note: "Elbows high, chest up" },
  { name: "Barbell Back Squat",      pattern: "squat",           equipment: GYM,     sets: "4", reps: "6-8",   note: "Below parallel if mobility allows" },
  { name: "Leg Press",               pattern: "squat",           equipment: GYM,     sets: "3", reps: "12",    note: "Press through heel, full ROM" },
  { name: "Hack Squat",              pattern: "squat",           equipment: GYM,     sets: "3", reps: "10",    note: "Machine or barbell" },
  { name: "Leg Extension",           pattern: "squat",           equipment: GYM,     sets: "3", reps: "15",    note: "Full extension, 1 sec squeeze" },

  // ── Hinge (hip-dominant) ───────────────────────────────────────────────────
  { name: "Glute Bridge",            pattern: "hinge",           equipment: ALL,     sets: "3", reps: "15-20", note: "Squeeze glutes at the top" },
  { name: "Single-Leg Glute Bridge", pattern: "hinge",           equipment: ALL,     sets: "3", reps: "10 ea", note: "Full hip extension at top" },
  { name: "Nordic Hamstring Curl",   pattern: "hinge",           equipment: ALL,     sets: "3", reps: "5-8",   note: "Anchor feet, lower slowly" },
  { name: "Dumbbell Romanian Deadlift", pattern: "hinge",        equipment: HOME_UP, sets: "4", reps: "10",    note: "Hamstrings stretch, back flat" },
  { name: "Dumbbell Swing",          pattern: "hinge",           equipment: HOME_UP, sets: "3", reps: "15",    note: "Hinge-driven, not a squat" },
  { name: "Hip Thrust (dumbbell)",   pattern: "hinge",           equipment: HOME_UP, sets: "4", reps: "12",    note: "Shoulders on bench or sofa" },
  { name: "Lying Hamstring Curl (band)", pattern: "hinge",       equipment: HOME_UP, sets: "3", reps: "12",    note: "Anchor band at ankle height" },
  { name: "Romanian Deadlift",       pattern: "hinge",           equipment: GYM,     sets: "4", reps: "10",    note: "Barbell or DB, push hips back" },
  { name: "Deadlift",                pattern: "hinge",           equipment: GYM,     sets: "4", reps: "6",     note: "Explosive pull, controlled descent" },
  { name: "Hip Thrust (barbell)",    pattern: "hinge",           equipment: GYM,     sets: "4", reps: "12",    note: "Full hip extension, glutes only" },
  { name: "Leg Curl Machine",        pattern: "hinge",           equipment: GYM,     sets: "4", reps: "12",    note: "Seated or lying version" },
  { name: "Back Extension Machine",  pattern: "hinge",           equipment: GYM,     sets: "3", reps: "12",    note: "Low back health, no hyperextension" },

  // ── Lunge (unilateral) ─────────────────────────────────────────────────────
  { name: "Reverse Lunge",           pattern: "lunge",           equipment: ALL,     sets: "3", reps: "10 ea", note: "Step back, lower knee to near floor" },
  { name: "Walking Lunge",           pattern: "lunge",           equipment: ALL,     sets: "3", reps: "12 ea", note: "Keep torso upright" },
  { name: "Jump Lunge",              pattern: "lunge",           equipment: ALL,     sets: "3", reps: "10 ea", note: "Alternate legs mid-air" },
  { name: "Lateral Lunge",           pattern: "lunge",           equipment: ALL,     sets: "3", reps: "10 ea", note: "Push hips back, knee over toes" },
  { name: "Bulgarian Split Squat",   pattern: "lunge",           equipment: ALL,     sets: "3", reps: "10 ea", note: "Rear foot elevated on chair or bench" },
  { name: "Dumbbell Lunge",          pattern: "lunge",           equipment: HOME_UP, sets: "3", reps: "10 ea", note: "Step forward, knee above ankle" },
  { name: "Dumbbell Step-Up",        pattern: "lunge",           equipment: HOME_UP, sets: "4", reps: "10 ea", note: "Full extension at top" },

  // ── Core ───────────────────────────────────────────────────────────────────
  { name: "Plank",                   pattern: "core",            equipment: ALL,     sets: "3", reps: "30-45 sec", note: "Brace abs as if taking a punch" },
  { name: "Side Plank",              pattern: "core",            equipment: ALL,     sets: "2", reps: "20-30 sec ea", note: "Stack feet or stagger" },
  { name: "Hollow Body Hold",        pattern: "core",            equipment: ALL,     sets: "3", reps: "30 sec",note: "Lower back flat on floor" },
  { name: "Leg Raises",              pattern: "core",            equipment: ALL,     sets: "3", reps: "12",    note: "Keep lower back flat" },
  { name: "Bicycle Crunches",        pattern: "core",            equipment: ALL,     sets: "3", reps: "20",    note: "Slow and controlled" },
  { name: "Russian Twist",           pattern: "core",            equipment: ALL,     sets: "3", reps: "20",    note: "Feet elevated for harder version" },
  { name: "V-Up",                    pattern: "core",            equipment: ALL,     sets: "3", reps: "12",    note: "Meet hands to feet in the middle" },
  { name: "Dead Bug",                pattern: "core",            equipment: ALL,     sets: "3", reps: "10 ea", note: "Opposite arm and leg, back flat" },
  { name: "Dumbbell Woodchop",       pattern: "core",            equipment: HOME_UP, sets: "3", reps: "12 ea", note: "Rotate from core, not arms" },
  { name: "Ab Rollout",              pattern: "core",            equipment: HOME_UP, sets: "3", reps: "10",    note: "Slow and controlled" },
  { name: "Cable Crunch",            pattern: "core",            equipment: GYM,     sets: "3", reps: "15",    note: "Round spine, don't just hip flex" },
  { name: "Hanging Leg Raise",       pattern: "core",            equipment: GYM,     sets: "3", reps: "10",    note: "No swinging, controlled lift" },

  // ── Calves ─────────────────────────────────────────────────────────────────
  { name: "Standing Calf Raise",     pattern: "calf",            equipment: ALL,     sets: "4", reps: "15-20", note: "Slow up, pause, slow down" },
  { name: "Single-Leg Calf Raise",   pattern: "calf",            equipment: ALL,     sets: "3", reps: "15 ea", note: "Hold wall for balance" },
  { name: "Seated Calf Raise",       pattern: "calf",            equipment: GYM,     sets: "4", reps: "15",    note: "Full ROM, 2 sec pause" },

  // ── Biceps ─────────────────────────────────────────────────────────────────
  { name: "Towel Bicep Curl",        pattern: "biceps",          equipment: ALL,     sets: "3", reps: "12",    note: "Use a heavy bag or backpack" },
  { name: "Dumbbell Curl",           pattern: "biceps",          equipment: HOME_UP, sets: "3", reps: "10-12", note: "Supinate at top, no swing" },
  { name: "Hammer Curl",             pattern: "biceps",          equipment: HOME_UP, sets: "3", reps: "12",    note: "Neutral grip for brachialis" },
  { name: "Incline DB Curl",         pattern: "biceps",          equipment: HOME_UP, sets: "3", reps: "10",    note: "Bench at 45°, strict form" },
  { name: "Band Curl",               pattern: "biceps",          equipment: HOME_UP, sets: "3", reps: "15",    note: "Constant tension through ROM" },
  { name: "EZ Bar Curl",             pattern: "biceps",          equipment: GYM,     sets: "4", reps: "10",    note: "Full supination" },
  { name: "Cable Curl",              pattern: "biceps",          equipment: GYM,     sets: "3", reps: "12",    note: "Constant tension through ROM" },
  { name: "Preacher Curl",           pattern: "biceps",          equipment: GYM,     sets: "3", reps: "10",    note: "Strict, no lean-back" },

  // ── Triceps ────────────────────────────────────────────────────────────────
  { name: "Diamond Push-Up",         pattern: "triceps",         equipment: ALL,     sets: "3", reps: "8-10",  note: "Elbows close to body" },
  { name: "Tricep Dips (chair)",     pattern: "triceps",         equipment: ALL,     sets: "3", reps: "10-12", note: "Legs straight for harder variation" },
  { name: "Tricep Push-Up",          pattern: "triceps",         equipment: ALL,     sets: "3", reps: "15",    note: "Elbows graze ribs" },
  { name: "Tricep Overhead Extension", pattern: "triceps",       equipment: HOME_UP, sets: "3", reps: "12",    note: "Use one heavy dumbbell" },
  { name: "Skull Crusher",           pattern: "triceps",         equipment: HOME_UP, sets: "3", reps: "10",    note: "EZ bar or dumbbells, lower to forehead" },
  { name: "Cable Tricep Pushdown",   pattern: "triceps",         equipment: GYM,     sets: "3", reps: "12",    note: "Elbows at sides throughout" },
  { name: "Close-Grip Bench Press",  pattern: "triceps",         equipment: GYM,     sets: "3", reps: "8-10",  note: "Hands shoulder-width, elbows tucked" },

  // ── Conditioning / cardio ──────────────────────────────────────────────────
  { name: "Jumping Jacks",           pattern: "conditioning",    equipment: ALL,     sets: "3", reps: "30",    note: "Cardio burst between sets" },
  { name: "High Knees",              pattern: "conditioning",    equipment: ALL,     sets: "3", reps: "40",    note: "Drive arms for intensity" },
  { name: "Burpee",                  pattern: "conditioning",    equipment: ALL,     sets: "3", reps: "10",    note: "Full push-up optional" },
  { name: "Mountain Climbers",       pattern: "conditioning",    equipment: ALL,     sets: "3", reps: "30",    note: "Keep hips low" },
  { name: "Sprint Intervals",        pattern: "conditioning",    equipment: ALL,     sets: "8", reps: "20 sec",note: "20s max effort / 40s walk" },
  { name: "Jump Rope",               pattern: "conditioning",    equipment: ALL,     sets: "4", reps: "60 sec",note: "Steady rhythm, soft knees" },
  { name: "Farmer's Carry",          pattern: "conditioning",    equipment: HOME_UP, sets: "4", reps: "30m",   note: "Heavy dumbbells, tall posture" },
  { name: "Box Jump",                pattern: "conditioning",    equipment: GYM,     sets: "4", reps: "10",    note: "Step down to protect knees" },
  { name: "Battle Ropes",            pattern: "conditioning",    equipment: GYM,     sets: "4", reps: "30 sec",note: "Max effort, alternating waves" },
  { name: "Sled Push",               pattern: "conditioning",    equipment: GYM,     sets: "4", reps: "20m",   note: "Drive through the balls of your feet" },
  { name: "Rowing Machine",          pattern: "conditioning",    equipment: GYM,     sets: "1", reps: "10 min",note: "Legs-hips-arms sequence" },
  { name: "Stationary Bike",         pattern: "conditioning",    equipment: GYM,     sets: "1", reps: "15 min",note: "Moderate resistance, consistent pace" },
  { name: "Treadmill Intervals",     pattern: "conditioning",    equipment: GYM,     sets: "6", reps: "2 min fast / 1 min walk", note: "Heart rate 75-85%" },

  // ── Mobility / recovery ────────────────────────────────────────────────────
  { name: "Light Walk or Cycling",   pattern: "mobility",        equipment: ALL,     sets: "1", reps: "20-30 min", note: "Easy pace — keep heart rate low" },
  { name: "Full-Body Stretching",    pattern: "mobility",        equipment: ALL,     sets: "1", reps: "10-15 min", note: "Focus on tight areas from the week" },
  { name: "Foam Rolling",            pattern: "mobility",        equipment: ALL,     sets: "1", reps: "5-10 min",  note: "Quads, hamstrings, upper back" },
  { name: "Yoga Flow",               pattern: "mobility",        equipment: ALL,     sets: "1", reps: "15-20 min", note: "Slow flow, focus on breathing" },
];

// Index by lowercase name for exact lookups.
const BY_NAME = new Map(EXERCISE_LIBRARY.map((e) => [e.name.toLowerCase(), e]));

// Keyword fallback for plan exercises not in the library (template variants,
// custom names). ORDER MATTERS: leg-specific rules must run before the
// generic arm rules ("Leg Curl" is a hinge, not biceps; "Leg Extension" is a
// squat-pattern move, not triceps).
const KEYWORD_RULES: [RegExp, MovementPattern][] = [
  [/stretch|foam roll|yoga|recovery|light walk/i, "mobility"],
  [/calf/i, "calf"],
  [/pull-?up|chin-?up|pulldown|pullover/i, "vertical_pull"],
  [/\brow\b|face pull|pull-apart|snow angel|superman/i, "horizontal_pull"],
  [/deadlift|rdl|romanian|hip thrust|glute|swing|good morning|hamstring|leg curl|nordic|back extension|hip abduction/i, "hinge"],
  [/lunge|split squat|step-?up|pistol|shrimp/i, "lunge"],
  [/squat|leg press|leg extension|hack|wall sit/i, "squat"],
  [/plank|crunch|sit-?up|leg raise|hollow|dragon|twist|woodchop|rollout|l-sit|v-up|dead bug|get-up|flag|ab\b/i, "core"],
  [/bicep|curl/i, "biceps"],
  [/tricep|skull|pushdown|close-grip|kickback/i, "triceps"],
  [/lateral|delt|shrug|upright/i, "shoulders"],
  [/pike|handstand|overhead|shoulder press|arnold|military/i, "vertical_push"],
  [/push-?up|bench|chest|fly|dip|press/i, "horizontal_push"],
  [/sprint|burpee|jump|climber|jack|rope|bike|treadmill|elliptical|sled|carry|battle|knees|complex|cardio|interval|thruster|clean/i, "conditioning"],
];

/** Resolve an exercise name to a movement pattern (null if unrecognisable). */
export function resolvePattern(name: string): MovementPattern | null {
  const exact = BY_NAME.get(name.toLowerCase());
  if (exact) return exact.pattern;
  for (const [re, pattern] of KEYWORD_RULES) {
    if (re.test(name)) return pattern;
  }
  return null;
}

/**
 * Substitutes for `name`: same movement pattern, doable with the user's
 * equipment, excluding the exercise itself and anything already in the day's
 * workout. Equipment-specific options rank first (a gym user swapping
 * Barbell Bench should see Cable Fly before Push-Up).
 */
export function getSuggestions(
  name: string,
  equipment: EquipmentTier,
  exclude: string[] = [],
  limit = 6
): LibraryExercise[] {
  const pattern = resolvePattern(name);
  if (!pattern) return [];

  const excluded = new Set([name.toLowerCase(), ...exclude.map((n) => n.toLowerCase())]);

  return EXERCISE_LIBRARY.filter(
    (e) =>
      e.pattern === pattern &&
      e.equipment.includes(equipment) &&
      !excluded.has(e.name.toLowerCase())
  )
    .sort((a, b) => a.equipment.length - b.equipment.length)
    .slice(0, limit);
}
