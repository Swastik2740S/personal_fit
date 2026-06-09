export interface PlanInput {
  heightCm: number;
  weightKg: number;
  age: number;
  sex: string;
  activityLevel: string;
  primaryGoal: string;
  fitnessExperience: string;
  dietaryPreference: string;
  equipment: string;
  calGoal: number;
  protGoal: number;
  carbGoal: number;
  fatGoal: number;
}

export interface MealPlanItem {
  time: string;
  name: string;
  description: string;
  cal: number;
  prot: number;
  carb: number;
  fat: number;
}

export interface Exercise {
  name: string;
  sets: string;
  reps: string;
  note: string;
}

export interface WorkoutDay {
  day: string;
  focus: string;
  exercises: Exercise[];
}

export interface GeneratedPlan {
  mealPlan: MealPlanItem[];
  workoutPlan: WorkoutDay[];
  summary: string;
}

// ---------------------------------------------------------------------------
// Meal templates — keyed by dietary preference
// Each entry is a "ratio" template: proportions of cal/prot/carb/fat that
// will be scaled to hit the user's exact macro targets.
// ---------------------------------------------------------------------------

interface MealTemplate {
  time: string;
  name: string;
  description: string;
  // share of daily totals (0–1), used to scale macros
  calShare: number;
  protShare: number;
  carbShare: number;
  fatShare: number;
}

const MEAL_TEMPLATES: Record<string, MealTemplate[]> = {
  none: [
    { time: "7:30 AM",  name: "Power Breakfast",    description: "3 scrambled eggs, 2 slices whole-grain toast, ½ avocado, black coffee or green tea",                      calShare: 0.22, protShare: 0.25, carbShare: 0.22, fatShare: 0.22 },
    { time: "10:30 AM", name: "Mid-Morning Snack",  description: "Greek yogurt (plain, full-fat) with a handful of mixed nuts and a drizzle of honey",                       calShare: 0.12, protShare: 0.14, carbShare: 0.10, fatShare: 0.14 },
    { time: "1:00 PM",  name: "Lean Protein Lunch", description: "Grilled chicken breast, brown rice, steamed broccoli and carrots, olive oil dressing",                     calShare: 0.28, protShare: 0.30, carbShare: 0.30, fatShare: 0.22 },
    { time: "4:00 PM",  name: "Pre-Workout Fuel",   description: "Banana with 2 tbsp peanut butter, or oat energy balls with dark chocolate chips",                          calShare: 0.12, protShare: 0.08, carbShare: 0.18, fatShare: 0.10 },
    { time: "7:30 PM",  name: "Recovery Dinner",    description: "Baked salmon fillet, sweet potato, sautéed spinach and garlic, lemon-herb seasoning",                      calShare: 0.26, protShare: 0.23, carbShare: 0.20, fatShare: 0.32 },
  ],
  high_protein: [
    { time: "7:00 AM",  name: "Protein-Packed Breakfast",  description: "6-egg white omelette with 2 whole eggs, turkey breast strips, feta, spinach; protein shake on the side",  calShare: 0.24, protShare: 0.26, carbShare: 0.16, fatShare: 0.22 },
    { time: "10:00 AM", name: "Cottage Cheese Bowl",       description: "Low-fat cottage cheese with pineapple chunks, flaxseeds, and a sprinkle of cinnamon",                       calShare: 0.12, protShare: 0.14, carbShare: 0.12, fatShare: 0.10 },
    { time: "1:00 PM",  name: "Double Protein Lunch",      description: "Tuna salad over mixed greens with boiled eggs, chickpeas, olive oil, and lemon dressing",                   calShare: 0.26, protShare: 0.24, carbShare: 0.30, fatShare: 0.24 },
    { time: "4:30 PM",  name: "Whey + Rice Cakes",         description: "Whey protein shake (1 scoop) blended with milk, 3 rice cakes with almond butter",                          calShare: 0.14, protShare: 0.14, carbShare: 0.20, fatShare: 0.16 },
    { time: "7:30 PM",  name: "Lean Meat Dinner",          description: "Grilled turkey tenderloin or lean beef, quinoa, roasted asparagus, cottage cheese side",                    calShare: 0.24, protShare: 0.22, carbShare: 0.22, fatShare: 0.28 },
  ],
  low_carb: [
    { time: "8:00 AM",  name: "Keto Breakfast",       description: "Bulletproof coffee, 3-egg omelette with bacon, cheese, and spinach, half an avocado",                       calShare: 0.26, protShare: 0.22, carbShare: 0.10, fatShare: 0.28 },
    { time: "11:00 AM", name: "Cheese & Nut Snack",   description: "Hard cheese cubes, macadamia or Brazil nuts, a few olives",                                                  calShare: 0.12, protShare: 0.08, carbShare: 0.10, fatShare: 0.16 },
    { time: "1:30 PM",  name: "Low-Carb Power Bowl",  description: "Grilled chicken thighs over cauliflower rice with roasted peppers, feta, and tahini drizzle",               calShare: 0.28, protShare: 0.30, carbShare: 0.30, fatShare: 0.22 },
    { time: "4:30 PM",  name: "Avocado Protein Snack",description: "½ avocado stuffed with canned salmon or tuna, lemon juice, red onion, capers",                               calShare: 0.10, protShare: 0.12, carbShare: 0.20, fatShare: 0.10 },
    { time: "7:30 PM",  name: "Fatty Fish Dinner",    description: "Pan-seared salmon or mackerel, zucchini noodles with pesto, side of sautéed mushrooms in butter",           calShare: 0.24, protShare: 0.28, carbShare: 0.30, fatShare: 0.24 },
  ],
  vegetarian: [
    { time: "7:30 AM",  name: "Veggie Egg Breakfast",     description: "Veggie scramble: 3 eggs, bell peppers, mushrooms, onions, and mozzarella on whole-grain toast",             calShare: 0.22, protShare: 0.24, carbShare: 0.22, fatShare: 0.22 },
    { time: "10:30 AM", name: "Fruit & Nut Yogurt",       description: "Greek yogurt with banana, walnuts, chia seeds, and a drizzle of maple syrup",                                calShare: 0.12, protShare: 0.12, carbShare: 0.14, fatShare: 0.12 },
    { time: "1:00 PM",  name: "Lentil Power Bowl",        description: "Cooked green or red lentils over brown rice with roasted veggies, tahini sauce, and fresh herbs",            calShare: 0.28, protShare: 0.26, carbShare: 0.32, fatShare: 0.22 },
    { time: "4:00 PM",  name: "Hummus & Veggie Plate",    description: "Hummus with carrot sticks, cucumber slices, whole-grain pita triangles, and a hard-boiled egg",              calShare: 0.12, protShare: 0.10, carbShare: 0.14, fatShare: 0.12 },
    { time: "7:30 PM",  name: "Paneer & Quinoa Dinner",   description: "Grilled paneer cubes, quinoa, sautéed kale and tomatoes, lemon-olive oil dressing",                         calShare: 0.26, protShare: 0.28, carbShare: 0.18, fatShare: 0.32 },
  ],
  vegan: [
    { time: "7:30 AM",  name: "Tofu Scramble",         description: "Firm tofu scrambled with turmeric, nutritional yeast, spinach, mushrooms, on sourdough toast",                calShare: 0.22, protShare: 0.22, carbShare: 0.24, fatShare: 0.18 },
    { time: "10:30 AM", name: "Berry Protein Smoothie", description: "Plant protein powder blended with oat milk, frozen berries, banana, flaxseeds, and almond butter",             calShare: 0.14, protShare: 0.18, carbShare: 0.16, fatShare: 0.10 },
    { time: "1:00 PM",  name: "Chickpea Buddha Bowl",   description: "Roasted chickpeas, farro or brown rice, roasted sweet potato, kale, tahini-lemon dressing",                   calShare: 0.28, protShare: 0.26, carbShare: 0.30, fatShare: 0.24 },
    { time: "4:00 PM",  name: "Edamame & Rice Cake",    description: "Steamed edamame with sea salt, 2 rice cakes with natural peanut butter",                                        calShare: 0.12, protShare: 0.12, carbShare: 0.12, fatShare: 0.12 },
    { time: "7:30 PM",  name: "Tempeh Stir-Fry",        description: "Marinated tempeh strips with broccoli, snap peas, bell pepper over soba noodles, tamari-ginger sauce",         calShare: 0.24, protShare: 0.22, carbShare: 0.18, fatShare: 0.36 },
  ],
};

// ---------------------------------------------------------------------------
// Workout templates — keyed by `${equipment}_${experience}_${goal}`
// Rest days are included in every split.
// ---------------------------------------------------------------------------

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

interface WorkoutTemplate {
  focus: string;
  exercises: Exercise[];
}

const REST_DAY: WorkoutTemplate = {
  focus: "Rest & Recovery",
  exercises: [],
};

const ACTIVE_RECOVERY: WorkoutTemplate = {
  focus: "Active Recovery",
  exercises: [
    { name: "Light Walk or Cycling", sets: "1", reps: "20-30 min", note: "Easy pace — keep heart rate low" },
    { name: "Full-Body Stretching",  sets: "1", reps: "10-15 min", note: "Focus on tight areas from the week" },
    { name: "Foam Rolling",          sets: "1", reps: "5-10 min",  note: "Quads, hamstrings, upper back" },
  ],
};

// BODYWEIGHT splits
const BW_BEGINNER_FAT_LOSS: WorkoutTemplate[] = [
  { focus: "Full Body A", exercises: [
    { name: "Bodyweight Squat",    sets: "3", reps: "15",    note: "Keep chest up, knees tracking toes" },
    { name: "Push-Up",             sets: "3", reps: "8-12",  note: "Modify on knees if needed" },
    { name: "Glute Bridge",        sets: "3", reps: "15",    note: "Squeeze glutes at the top" },
    { name: "Plank Hold",          sets: "3", reps: "20 sec",note: "Keep hips level" },
    { name: "Mountain Climbers",   sets: "3", reps: "20",    note: "Drive knees quickly for cardio effect" },
  ]},
  REST_DAY,
  { focus: "Full Body B", exercises: [
    { name: "Reverse Lunge",       sets: "3", reps: "10 each",note: "Step back, lower knee to near floor" },
    { name: "Incline Push-Up",     sets: "3", reps: "10-15",  note: "Hands on chair or bench" },
    { name: "Superman Hold",       sets: "3", reps: "12",     note: "Hold 2 sec at top for back engagement" },
    { name: "Side Plank",          sets: "2", reps: "20 sec ea",note: "Stack feet or stagger" },
    { name: "Jumping Jacks",       sets: "3", reps: "30",     note: "Cardio burst between sets" },
  ]},
  REST_DAY,
  { focus: "Full Body C + Cardio", exercises: [
    { name: "Jump Squat",          sets: "3", reps: "10",    note: "Land softly, absorb impact" },
    { name: "Pike Push-Up",        sets: "3", reps: "8-10",  note: "Targets shoulders" },
    { name: "Single-Leg Glute Bridge",sets:"3",reps:"10 ea", note: "Full hip extension at top" },
    { name: "Bicycle Crunches",    sets: "3", reps: "20",    note: "Slow and controlled" },
    { name: "High Knees",          sets: "3", reps: "40",    note: "Drive arms for intensity" },
  ]},
  ACTIVE_RECOVERY,
  REST_DAY,
];

const BW_BEGINNER_MUSCLE: WorkoutTemplate[] = [
  { focus: "Upper Body Push", exercises: [
    { name: "Push-Up",             sets: "4", reps: "10-15", note: "Full range of motion, 2-sec descent" },
    { name: "Diamond Push-Up",     sets: "3", reps: "8-10",  note: "Targets triceps" },
    { name: "Pike Push-Up",        sets: "3", reps: "8-10",  note: "Shoulders focus" },
    { name: "Dips (chair)",        sets: "3", reps: "10-12", note: "Elbows close to body" },
  ]},
  { focus: "Lower Body", exercises: [
    { name: "Squat",               sets: "4", reps: "15-20", note: "Go as deep as mobility allows" },
    { name: "Bulgarian Split Squat",sets:"3", reps: "10 ea", note: "Rear foot elevated on chair" },
    { name: "Glute Bridge",        sets: "3", reps: "20",    note: "Pause 1 sec at top" },
    { name: "Calf Raise",          sets: "3", reps: "20",    note: "Full range, slow tempo" },
  ]},
  REST_DAY,
  { focus: "Upper Body Pull", exercises: [
    { name: "Door-Frame Row",      sets: "4", reps: "10-12", note: "Lean back and pull chest to door" },
    { name: "Superman Hold",       sets: "3", reps: "15",    note: "Posterior chain — back and glutes" },
    { name: "Reverse Snow Angel",  sets: "3", reps: "12",    note: "Lie prone, arms sweep overhead" },
    { name: "Towel Bicep Curl",    sets: "3", reps: "12",    note: "Use a heavy bag or backpack" },
  ]},
  { focus: "Core & Cardio", exercises: [
    { name: "Plank",               sets: "3", reps: "30-45 sec",note: "Brace abs as if taking a punch" },
    { name: "Leg Raises",          sets: "3", reps: "12",    note: "Keep lower back flat" },
    { name: "Russian Twist",       sets: "3", reps: "20",    note: "Feet elevated for harder version" },
    { name: "Burpees",             sets: "3", reps: "8",     note: "Full push-up optional" },
  ]},
  ACTIVE_RECOVERY,
  REST_DAY,
];

const BW_INTERMEDIATE_FAT_LOSS: WorkoutTemplate[] = [
  { focus: "HIIT Full Body", exercises: [
    { name: "Burpee",              sets: "4", reps: "12",    note: "Max intensity, brief rest between sets" },
    { name: "Jump Squat",          sets: "4", reps: "15",    note: "Explode from the bottom" },
    { name: "Push-Up to T-Rotation",sets:"3",reps:"10",     note: "Rotate to side plank between reps" },
    { name: "Mountain Climbers",   sets: "4", reps: "30",    note: "2:1 work-to-rest ratio" },
    { name: "V-Up",                sets: "3", reps: "12",    note: "Meet hands to feet in the middle" },
  ]},
  { focus: "Lower Body Strength", exercises: [
    { name: "Pistol Squat (assisted)",sets:"3",reps:"6 ea",  note: "Hold door frame for balance" },
    { name: "Jump Lunge",          sets: "4", reps: "10 ea", note: "Alternate legs mid-air" },
    { name: "Nordic Hamstring Curl",sets:"3", reps:"5-8",    note: "Anchor feet, lower slowly" },
    { name: "Single-Leg Calf Raise",sets:"3",reps:"15 ea",   note: "Hold wall for balance" },
  ]},
  { focus: "Upper Body Push + Pull", exercises: [
    { name: "Archer Push-Up",      sets: "3", reps: "6 ea",  note: "Shift weight to one arm each rep" },
    { name: "Wide Push-Up",        sets: "3", reps: "12",    note: "Wide stance hits chest more" },
    { name: "Door-Frame Row",      sets: "4", reps: "12",    note: "Feet elevated to increase difficulty" },
    { name: "Pike Push-Up",        sets: "3", reps: "10",    note: "Slow 3-sec descent" },
    { name: "Tricep Dips",         sets: "3", reps: "15",    note: "Legs straight for harder variation" },
  ]},
  REST_DAY,
  { focus: "Cardio Intervals", exercises: [
    { name: "Sprint Intervals",    sets: "8", reps: "20 sec",note: "20s max effort / 40s walk" },
    { name: "Squat Jumps",         sets: "3", reps: "15",    note: "Between sprint sets" },
    { name: "Core Finisher: Plank Variations",sets:"3",reps:"40 sec ea",note:"Front, side L, side R" },
  ]},
  ACTIVE_RECOVERY,
  REST_DAY,
];

const BW_ADVANCED: WorkoutTemplate[] = [
  { focus: "Push Power", exercises: [
    { name: "Handstand Push-Up",   sets: "4", reps: "5-8",   note: "Wall-assisted or freestanding" },
    { name: "Clapping Push-Up",    sets: "4", reps: "8",     note: "Maximum explosive power" },
    { name: "Archer Push-Up",      sets: "3", reps: "8 ea",  note: "Full ROM on working arm" },
    { name: "L-Sit Hold",          sets: "3", reps: "15-20 sec",note: "Shoulders depressed, legs parallel" },
    { name: "Tricep Push-Up",      sets: "3", reps: "15",    note: "Elbows graze ribs" },
  ]},
  { focus: "Pull Strength", exercises: [
    { name: "Pull-Up (or neg.)",   sets: "4", reps: "8-10",  note: "Full dead hang each rep" },
    { name: "Inverted Row",        sets: "4", reps: "12",    note: "Table or bar at waist height" },
    { name: "Chin-Up",             sets: "3", reps: "8",     note: "Supinate grip, squeeze at top" },
    { name: "Face Pull (band/towel)",sets:"3",reps:"15",     note: "External rotation focus" },
  ]},
  { focus: "Legs & Glutes", exercises: [
    { name: "Pistol Squat",        sets: "4", reps: "6 ea",  note: "Counterweight if needed" },
    { name: "Shrimp Squat",        sets: "3", reps: "5 ea",  note: "One leg behind, knee to floor" },
    { name: "Jump Lunge",          sets: "4", reps: "12 ea", note: "Explosive switch mid-air" },
    { name: "Nordic Curl",         sets: "3", reps: "5",     note: "Slow descent, catch with hands" },
    { name: "Glute March",         sets: "3", reps: "20 ea", note: "Glute bridge with alternating knee drive" },
  ]},
  REST_DAY,
  { focus: "Core & Conditioning", exercises: [
    { name: "Dragon Flag",         sets: "3", reps: "5-6",   note: "Entire posterior chain rigid" },
    { name: "Hollow Body Hold",    sets: "3", reps: "30 sec",note: "Lower back flat on floor" },
    { name: "Human Flag Practice", sets: "3", reps: "5-10 sec",note: "Progress: tuck → tuck straddle → full" },
    { name: "Burpee Pull-Up",      sets: "3", reps: "8",     note: "Jump to pull-up bar from burpee" },
  ]},
  ACTIVE_RECOVERY,
  REST_DAY,
];

// HOME GYM splits (dumbbells + bands + pull-up bar)
const HOME_BEGINNER_FAT_LOSS: WorkoutTemplate[] = [
  { focus: "Full Body Circuit A", exercises: [
    { name: "Goblet Squat",        sets: "3", reps: "15",    note: "Hold one dumbbell at chest" },
    { name: "Dumbbell Row",        sets: "3", reps: "12 ea", note: "Brace knee on bench" },
    { name: "Dumbbell Shoulder Press",sets:"3",reps:"12",    note: "Seated or standing" },
    { name: "Resistance Band Kickback",sets:"3",reps:"15 ea",note: "Squeeze glute at full extension" },
    { name: "Plank",               sets: "3", reps: "30 sec",note: "Core tight, don't let hips sag" },
  ]},
  REST_DAY,
  { focus: "Full Body Circuit B", exercises: [
    { name: "Dumbbell Deadlift",   sets: "3", reps: "12",    note: "Hinge at hips, back flat" },
    { name: "Push-Up / Chest Press",sets:"3", reps:"12",     note: "Floor chest press with dumbbells" },
    { name: "Band Pull-Apart",     sets: "3", reps: "20",    note: "Retract shoulder blades" },
    { name: "Dumbbell Lunge",      sets: "3", reps: "10 ea", note: "Step forward, knee above ankle" },
    { name: "Bicycle Crunch",      sets: "3", reps: "20",    note: "Slow and controlled" },
  ]},
  REST_DAY,
  { focus: "Cardio + Abs", exercises: [
    { name: "Band Squat Jump",     sets: "3", reps: "12",    note: "Band above knees" },
    { name: "Dumbbell Swing",      sets: "3", reps: "15",    note: "Hinge-driven, not a squat" },
    { name: "Mountain Climbers",   sets: "3", reps: "30",    note: "Keep hips low" },
    { name: "Plank to Dumbbell Row",sets:"3", reps:"8 ea",   note: "Alternate arms, hips steady" },
    { name: "Leg Raise",           sets: "3", reps: "12",    note: "Slow descent" },
  ]},
  ACTIVE_RECOVERY,
  REST_DAY,
];

const HOME_INTERMEDIATE_MUSCLE: WorkoutTemplate[] = [
  { focus: "Upper Push", exercises: [
    { name: "Dumbbell Bench Press",sets: "4", reps: "8-10",  note: "Full ROM, controlled tempo" },
    { name: "Arnold Press",        sets: "3", reps: "10",    note: "Rotate palms out as you press" },
    { name: "Lateral Raise",       sets: "3", reps: "15",    note: "Slight bend in elbow, lead with elbows" },
    { name: "Tricep Overhead Extension",sets:"3",reps:"12",  note: "Use one heavy dumbbell" },
    { name: "Diamond Push-Up",     sets: "3", reps: "12",    note: "Elbows close to body" },
  ]},
  { focus: "Upper Pull", exercises: [
    { name: "Pull-Up (or band-assisted)",sets:"4",reps:"6-10",note:"Dead hang start each rep" },
    { name: "Dumbbell Row",        sets: "4", reps: "10 ea", note: "Elbow drives behind body" },
    { name: "Face Pull (band)",    sets: "3", reps: "15",    note: "Pull to forehead, elbows high" },
    { name: "Dumbbell Curl",       sets: "3", reps: "12",    note: "Supinate at top, no swing" },
    { name: "Rear Delt Fly",       sets: "3", reps: "15",    note: "Hinge forward, arms arc out" },
  ]},
  { focus: "Legs", exercises: [
    { name: "Dumbbell Romanian Deadlift",sets:"4",reps:"10", note: "Hamstrings stretch, back flat" },
    { name: "Goblet Squat",        sets: "4", reps: "12",    note: "Elbows inside knees at bottom" },
    { name: "Dumbbell Bulgarian Split Squat",sets:"3",reps:"10 ea",note:"Rear foot elevated" },
    { name: "Lying Hamstring Curl (band)",sets:"3",reps:"12",note:"Anchor band at ankle height" },
    { name: "Standing Calf Raise", sets: "4", reps: "20",    note: "Slow up, pause, slow down" },
  ]},
  REST_DAY,
  { focus: "Full Body Power", exercises: [
    { name: "Dumbbell Clean & Press",sets:"4",reps:"8",      note: "Full body explosive movement" },
    { name: "Renegade Row",        sets: "3", reps: "8 ea",  note: "Hips square, brace core" },
    { name: "Jump Squat",          sets: "3", reps: "10",    note: "Land softly, immediately squat again" },
    { name: "Push-Up",             sets: "3", reps: "15",    note: "Superset with rows" },
    { name: "Dumbbell Thruster",   sets: "3", reps: "10",    note: "Squat to press in one fluid motion" },
  ]},
  ACTIVE_RECOVERY,
  REST_DAY,
];

const HOME_ADVANCED: WorkoutTemplate[] = [
  { focus: "Push — Chest & Shoulders", exercises: [
    { name: "DB Incline Bench Press",sets:"4",reps: "8",     note: "Slow 3-sec descent" },
    { name: "Dumbbell Floor Press", sets: "3", reps: "10",   note: "Pause at chest for 1 sec" },
    { name: "Arnold Press",         sets: "4", reps: "10",   note: "Full rotation" },
    { name: "Cable Lateral (band)", sets: "3", reps: "15",   note: "Unilateral for stability" },
    { name: "Tricep Dip (parallel bars)",sets:"3",reps:"12 +",note:"Add weight in lap if easy" },
  ]},
  { focus: "Pull — Back & Biceps", exercises: [
    { name: "Weighted Pull-Up",     sets: "4", reps: "6-8",  note: "Add backpack with plates" },
    { name: "Dumbbell Pendlay Row", sets: "4", reps: "8",    note: "Full reset on floor each rep" },
    { name: "Incline Dumbbell Curl",sets: "3", reps: "10",   note: "Bench at 45°, strict form" },
    { name: "Band Pull-Apart",      sets: "4", reps: "20",   note: "Keep arms straight" },
    { name: "Dumbbell Reverse Curl",sets: "3", reps: "12",   note: "Overhand grip for forearms" },
  ]},
  { focus: "Legs — Quad Focus", exercises: [
    { name: "Dumbbell Front Squat", sets: "4", reps: "10",   note: "Elbows high, chest up" },
    { name: "Dumbbell Step-Up",     sets: "4", reps: "10 ea",note: "Full extension at top" },
    { name: "Walking Lunge",        sets: "3", reps: "12 ea",note: "Keep torso upright" },
    { name: "Calf Raise (single leg)",sets:"3",reps:"15 ea", note: "Full ROM, 2 sec pause at top" },
  ]},
  { focus: "Legs — Posterior Chain", exercises: [
    { name: "Dumbbell Romanian Deadlift",sets:"4",reps:"10", note: "Hamstrings should be on fire" },
    { name: "Hip Thrust (dumbbell)", sets: "4", reps: "12",  note: "Shoulders on bench or sofa" },
    { name: "Nordic Hamstring Curl", sets: "3", reps: "6",   note: "Anchor feet, 5-sec descent" },
    { name: "Glute Kickback (band)", sets: "3", reps: "15 ea",note: "Full hip extension, squeeze" },
  ]},
  { focus: "Core & Conditioning",exercises:[
    { name: "Turkish Get-Up",       sets: "3", reps: "3 ea", note: "Use a dumbbell, go slow" },
    { name: "Hollow Body Hold",     sets: "3", reps: "40 sec",note: "Lower back pressed down" },
    { name: "Dumbbell Woodchop",    sets: "3", reps: "12 ea",note: "Rotate from core, not arms" },
    { name: "Renegade Row",         sets: "3", reps: "10 ea",note: "Heavy dumbbells, hips square" },
  ]},
  ACTIVE_RECOVERY,
  REST_DAY,
];

// FULL GYM splits
const GYM_BEGINNER_FAT_LOSS: WorkoutTemplate[] = [
  { focus: "Full Body A", exercises: [
    { name: "Leg Press",            sets: "3", reps: "15",    note: "Feet shoulder-width, full ROM" },
    { name: "Lat Pulldown",         sets: "3", reps: "12",    note: "Pull to upper chest, elbows down" },
    { name: "Dumbbell Bench Press", sets: "3", reps: "12",    note: "Controlled tempo" },
    { name: "Cable Row",            sets: "3", reps: "12",    note: "Elbows back, squeeze shoulder blades" },
    { name: "Plank",                sets: "3", reps: "30 sec",note: "Core tight throughout" },
  ]},
  { focus: "Cardio + Core", exercises: [
    { name: "Treadmill Intervals",  sets: "6", reps: "2 min fast / 1 min walk",note: "Heart rate 75-85%" },
    { name: "Cable Crunch",         sets: "3", reps: "15",    note: "Crunch down to thighs" },
    { name: "Leg Raise (bench)",    sets: "3", reps: "12",    note: "Keep lower back flat" },
    { name: "Stationary Bike",      sets: "1", reps: "10 min",note: "Cool down, moderate pace" },
  ]},
  { focus: "Full Body B", exercises: [
    { name: "Goblet Squat (DB)",    sets: "3", reps: "12",    note: "Squat rack with light barbell OK too" },
    { name: "Dumbbell Deadlift",    sets: "3", reps: "12",    note: "Hinge, back flat" },
    { name: "Chest Fly Machine",    sets: "3", reps: "15",    note: "Feel stretch in pecs" },
    { name: "Shoulder Press Machine",sets:"3",reps:"12",      note: "Don't lock out at top" },
    { name: "Seated Row Machine",   sets: "3", reps: "12",    note: "Full extension forward" },
  ]},
  REST_DAY,
  { focus: "Cardio", exercises: [
    { name: "Elliptical",           sets: "1", reps: "25 min",note: "Moderate resistance, consistent pace" },
    { name: "Hip Abduction Machine",sets: "3", reps: "15",    note: "Targets glute medius" },
    { name: "Back Extension Machine",sets:"3", reps:"12",     note: "Low back health" },
  ]},
  ACTIVE_RECOVERY,
  REST_DAY,
];

const GYM_INTERMEDIATE_MUSCLE: WorkoutTemplate[] = [
  { focus: "Push — Chest & Shoulders", exercises: [
    { name: "Barbell Bench Press", sets: "4", reps: "6-8",   note: "90° elbow angle, arch natural" },
    { name: "Incline DB Press",    sets: "3", reps: "10",     note: "30-45° incline" },
    { name: "Cable Lateral Raise", sets: "3", reps: "15",     note: "Unilateral, lead with elbow" },
    { name: "Overhead Press",      sets: "3", reps: "8-10",   note: "Bar in front, full lockout" },
    { name: "Cable Tricep Pushdown",sets:"3", reps: "12",     note: "Elbows at sides throughout" },
  ]},
  { focus: "Pull — Back & Biceps", exercises: [
    { name: "Pull-Up / Assisted",  sets: "4", reps: "8",      note: "Dead hang, full pull" },
    { name: "Barbell Row",         sets: "4", reps: "8",      note: "Slight forward lean, elbows back" },
    { name: "Lat Pulldown (wide)", sets: "3", reps: "12",     note: "To upper chest, not behind neck" },
    { name: "Dumbbell Curl",       sets: "3", reps: "10-12",  note: "No momentum" },
    { name: "Hammer Curl",         sets: "3", reps: "12",     note: "Neutral grip for brachialis" },
  ]},
  { focus: "Legs — Squat Focus", exercises: [
    { name: "Barbell Back Squat",  sets: "4", reps: "6-8",    note: "Below parallel if mobility allows" },
    { name: "Leg Press",           sets: "3", reps: "12",     note: "High foot placement for glutes" },
    { name: "Walking Lunge (DB)",  sets: "3", reps: "12 ea",  note: "Keep front shin vertical" },
    { name: "Leg Extension",       sets: "3", reps: "15",     note: "Full extension, 1 sec squeeze" },
    { name: "Seated Calf Raise",   sets: "4", reps: "15",     note: "Full ROM, 2 sec pause" },
  ]},
  { focus: "Legs — Hinge Focus", exercises: [
    { name: "Romanian Deadlift",   sets: "4", reps: "10",     note: "Barbell or DB, push hips back" },
    { name: "Leg Curl Machine",    sets: "4", reps: "12",     note: "Both seated and lying versions" },
    { name: "Hip Thrust (barbell)",sets: "4", reps: "12",     note: "Full hip extension, glutes only" },
    { name: "Bulgarian Split Squat",sets:"3",reps: "8 ea",    note: "Rear foot on bench" },
    { name: "Standing Calf Raise", sets: "4", reps: "15",     note: "Single leg for harder version" },
  ]},
  { focus: "Arms & Abs", exercises: [
    { name: "Cable Curl",          sets: "3", reps: "12",     note: "Constant tension through ROM" },
    { name: "Skull Crusher",       sets: "3", reps: "10",     note: "EZ bar or dumbbells, lower to forehead" },
    { name: "Preacher Curl",       sets: "3", reps: "10",     note: "Strict, no lean-back" },
    { name: "Cable Crunch",        sets: "3", reps: "15",     note: "Round spine, don't just hip flex" },
    { name: "Ab Rollout",          sets: "3", reps: "10",     note: "Slow and controlled" },
  ]},
  ACTIVE_RECOVERY,
  REST_DAY,
];

const GYM_ADVANCED_MUSCLE: WorkoutTemplate[] = [
  { focus: "Chest — Heavy", exercises: [
    { name: "Barbell Bench Press", sets: "5", reps: "5",      note: "85-90% 1RM, full rest between sets" },
    { name: "DB Incline Press",    sets: "4", reps: "8",      note: "Slow eccentric, 3 sec down" },
    { name: "Cable Fly",           sets: "3", reps: "12",     note: "Full stretch at bottom" },
    { name: "Dips (weighted)",     sets: "3", reps: "8-10",   note: "Lean forward for chest" },
    { name: "Push-Up Finisher",    sets: "1", reps: "to failure",note:"Drop set after heavy work" },
  ]},
  { focus: "Back — Width & Thickness", exercises: [
    { name: "Weighted Pull-Up",    sets: "4", reps: "6",      note: "Full stretch, controlled pull" },
    { name: "Barbell Pendlay Row", sets: "4", reps: "6",      note: "Reset on floor every rep" },
    { name: "Cable Straight-Arm Pulldown",sets:"3",reps:"15",note:"Isolates lats" },
    { name: "T-Bar Row",           sets: "3", reps: "10",     note: "Chest on pad, elbows at 45°" },
    { name: "Dumbbell Pullover",   sets: "3", reps: "12",     note: "Feel lat stretch at top" },
  ]},
  { focus: "Legs — Strength", exercises: [
    { name: "Barbell Back Squat",  sets: "5", reps: "5",      note: "Competition depth, 3-min rest" },
    { name: "Leg Press (heavy)",   sets: "4", reps: "10",     note: "Press through heel, full ROM" },
    { name: "Hack Squat",          sets: "3", reps: "10",     note: "Machine or barbell" },
    { name: "Leg Extension",       sets: "3", reps: "15",     note: "Drop set on last set" },
    { name: "Romanian Deadlift",   sets: "3", reps: "10",     note: "Same day — light to moderate" },
  ]},
  { focus: "Shoulders & Traps", exercises: [
    { name: "Seated DB Overhead Press",sets:"4",reps:"8",     note: "90° elbow, full lockout" },
    { name: "Barbell Upright Row", sets: "3", reps: "10",     note: "Elbows above wrists always" },
    { name: "Cable Face Pull",     sets: "4", reps: "15",     note: "Thumbs to ears, external rotation" },
    { name: "DB Shrug",            sets: "4", reps: "15",     note: "Hold 2 sec at top" },
    { name: "Rear Delt Machine",   sets: "3", reps: "15",     note: "Elbows flare to sides" },
  ]},
  { focus: "Arms — Hypertrophy", exercises: [
    { name: "EZ Bar Curl",         sets: "4", reps: "10",     note: "Full supination" },
    { name: "Incline DB Curl",     sets: "3", reps: "10",     note: "Elbows behind body" },
    { name: "Cable Pushdown",      sets: "4", reps: "12",     note: "Straight bar, elbows pinned" },
    { name: "Overhead Tricep Extension",sets:"3",reps:"12",   note: "EZ bar behind head" },
    { name: "21s (curl variation)",sets: "3", reps: "21",     note: "7 bottom half / 7 top half / 7 full" },
  ]},
  ACTIVE_RECOVERY,
  REST_DAY,
];

const GYM_ADVANCED_FAT_LOSS: WorkoutTemplate[] = [
  { focus: "Upper Body — Strength + Superset", exercises: [
    { name: "Barbell Bench + DB Row (superset)",sets:"4",reps:"8 + 10",note:"Rest only after both" },
    { name: "Pull-Up + Shoulder Press (superset)",sets:"4",reps:"6 + 10",note:"Alternate, minimal rest" },
    { name: "Cable Fly",           sets: "3", reps: "15",     note: "High to low for lower pecs" },
    { name: "Face Pull",           sets: "3", reps: "15",     note: "Shoulder health and rear delts" },
  ]},
  { focus: "Lower Body — AMRAP Style", exercises: [
    { name: "Barbell Squat",       sets: "4", reps: "10",     note: "60-70% 1RM, fast concentric" },
    { name: "Romanian Deadlift",   sets: "3", reps: "12",     note: "Superset with leg curl" },
    { name: "Leg Curl (superset)", sets: "3", reps: "12",     note: "Immediately after RDL" },
    { name: "Leg Press",           sets: "3", reps: "15",     note: "Moderate weight, high reps" },
    { name: "Walking Lunge",       sets: "3", reps: "20 steps",note:"Length of gym, both legs" },
  ]},
  { focus: "Metabolic Circuit", exercises: [
    { name: "Barbell Complex",     sets: "4", reps: "6 each", note: "Row → Clean → Press → RDL, no putting bar down" },
    { name: "Battle Ropes",        sets: "4", reps: "30 sec", note: "Max effort, alternating waves" },
    { name: "Box Jump",            sets: "4", reps: "10",     note: "Step down to protect knees" },
    { name: "Sled Push",           sets: "4", reps: "20m",    note: "Or farmer's carry as substitute" },
  ]},
  REST_DAY,
  { focus: "Full Body + Core", exercises: [
    { name: "Deadlift",            sets: "4", reps: "6",      note: "Explosive pull, controlled descent" },
    { name: "Overhead Press",      sets: "3", reps: "8",      note: "Strict press, no leg drive" },
    { name: "Cable Row",           sets: "3", reps: "12",     note: "Full extension, full retraction" },
    { name: "Cable Crunch",        sets: "4", reps: "15",     note: "Weighted, focus on contraction" },
    { name: "Plank Variations",    sets: "3", reps: "45 sec ea",note:"Front, RKC, side, reverse" },
  ]},
  ACTIVE_RECOVERY,
  REST_DAY,
];

// ---------------------------------------------------------------------------
// Split selector
// ---------------------------------------------------------------------------

function selectWorkoutSplit(
  equipment: string,
  experience: string,
  goal: string
): WorkoutTemplate[] {
  const key = `${equipment}_${experience}_${goal}`;

  const map: Record<string, WorkoutTemplate[]> = {
    // Bodyweight
    none_beginner_fat_loss:         BW_BEGINNER_FAT_LOSS,
    none_beginner_muscle_gain:      BW_BEGINNER_MUSCLE,
    none_beginner_recomposition:    BW_BEGINNER_FAT_LOSS,
    none_beginner_maintain:         BW_BEGINNER_FAT_LOSS,
    none_intermediate_fat_loss:     BW_INTERMEDIATE_FAT_LOSS,
    none_intermediate_muscle_gain:  BW_ADVANCED,
    none_intermediate_recomposition:BW_INTERMEDIATE_FAT_LOSS,
    none_intermediate_maintain:     BW_INTERMEDIATE_FAT_LOSS,
    none_advanced_fat_loss:         BW_ADVANCED,
    none_advanced_muscle_gain:      BW_ADVANCED,
    none_advanced_recomposition:    BW_ADVANCED,
    none_advanced_maintain:         BW_ADVANCED,
    // Home gym
    home_gym_beginner_fat_loss:         HOME_BEGINNER_FAT_LOSS,
    home_gym_beginner_muscle_gain:      HOME_INTERMEDIATE_MUSCLE,
    home_gym_beginner_recomposition:    HOME_BEGINNER_FAT_LOSS,
    home_gym_beginner_maintain:         HOME_BEGINNER_FAT_LOSS,
    home_gym_intermediate_fat_loss:     HOME_BEGINNER_FAT_LOSS,
    home_gym_intermediate_muscle_gain:  HOME_INTERMEDIATE_MUSCLE,
    home_gym_intermediate_recomposition:HOME_INTERMEDIATE_MUSCLE,
    home_gym_intermediate_maintain:     HOME_INTERMEDIATE_MUSCLE,
    home_gym_advanced_fat_loss:         HOME_ADVANCED,
    home_gym_advanced_muscle_gain:      HOME_ADVANCED,
    home_gym_advanced_recomposition:    HOME_ADVANCED,
    home_gym_advanced_maintain:         HOME_ADVANCED,
    // Full gym
    full_gym_beginner_fat_loss:         GYM_BEGINNER_FAT_LOSS,
    full_gym_beginner_muscle_gain:      GYM_INTERMEDIATE_MUSCLE,
    full_gym_beginner_recomposition:    GYM_BEGINNER_FAT_LOSS,
    full_gym_beginner_maintain:         GYM_BEGINNER_FAT_LOSS,
    full_gym_intermediate_fat_loss:     GYM_BEGINNER_FAT_LOSS,
    full_gym_intermediate_muscle_gain:  GYM_INTERMEDIATE_MUSCLE,
    full_gym_intermediate_recomposition:GYM_INTERMEDIATE_MUSCLE,
    full_gym_intermediate_maintain:     GYM_INTERMEDIATE_MUSCLE,
    full_gym_advanced_fat_loss:         GYM_ADVANCED_FAT_LOSS,
    full_gym_advanced_muscle_gain:      GYM_ADVANCED_MUSCLE,
    full_gym_advanced_recomposition:    GYM_ADVANCED_MUSCLE,
    full_gym_advanced_maintain:         GYM_INTERMEDIATE_MUSCLE,
  };

  return map[key] ?? GYM_BEGINNER_FAT_LOSS;
}

// ---------------------------------------------------------------------------
// Macro scaling helpers
// ---------------------------------------------------------------------------

function scale(share: number, total: number) {
  return Math.round(share * total);
}

function buildMealPlan(input: PlanInput): MealPlanItem[] {
  const diet = (input.dietaryPreference in MEAL_TEMPLATES) ? input.dietaryPreference : "none";
  const templates = MEAL_TEMPLATES[diet];

  return templates.map((t) => ({
    time:        t.time,
    name:        t.name,
    description: t.description,
    cal:         scale(t.calShare,  input.calGoal),
    prot:        scale(t.protShare, input.protGoal),
    carb:        scale(t.carbShare, input.carbGoal),
    fat:         scale(t.fatShare,  input.fatGoal),
  }));
}

// ---------------------------------------------------------------------------
// Summary builder
// ---------------------------------------------------------------------------

const GOAL_TEXT: Record<string, string> = {
  fat_loss:     "fat loss",
  muscle_gain:  "muscle gain",
  recomposition:"body recomposition",
  maintain:     "maintaining your current physique",
};

const DIET_TEXT: Record<string, string> = {
  none:         "balanced",
  vegetarian:   "vegetarian",
  vegan:        "plant-based",
  high_protein: "high-protein",
  low_carb:     "low-carb",
};

const EQUIP_TEXT: Record<string, string> = {
  none:     "bodyweight training",
  home_gym: "home gym equipment",
  full_gym: "a full commercial gym",
};

const EXPERIENCE_TEXT: Record<string, string> = {
  beginner:     "beginner",
  intermediate: "intermediate",
  advanced:     "advanced",
};

function buildSummary(input: PlanInput): string {
  const goal      = GOAL_TEXT[input.primaryGoal]     ?? input.primaryGoal;
  const diet      = DIET_TEXT[input.dietaryPreference] ?? input.dietaryPreference;
  const equip     = EQUIP_TEXT[input.equipment]      ?? input.equipment;
  const exp       = EXPERIENCE_TEXT[input.fitnessExperience] ?? input.fitnessExperience;

  return (
    `Your plan is built around your goal of ${goal}, designed specifically for a ${exp}-level athlete using ${equip}. ` +
    `Based on your stats — ${input.weightKg}kg, ${input.heightCm}cm, age ${input.age} — your daily calorie target is ` +
    `${input.calGoal} kcal with ${input.protGoal}g protein, ${input.carbGoal}g carbs, and ${input.fatGoal}g fat.\n\n` +

    `Your ${diet} meal plan is structured into ${MEAL_TEMPLATES[(input.dietaryPreference in MEAL_TEMPLATES) ? input.dietaryPreference : "none"].length} eating occasions ` +
    `throughout the day to keep energy stable and support muscle protein synthesis. ` +
    (input.primaryGoal === "fat_loss"
      ? "The calorie deficit is set at a sustainable -500 kcal/day, enough to lose roughly 0.5 kg per week while preserving lean muscle. "
      : input.primaryGoal === "muscle_gain"
      ? "The calorie surplus is a lean +300 kcal/day, minimising fat gain while providing enough fuel for new muscle tissue. "
      : "Your calories are calibrated to your total daily energy expenditure, keeping you fuelled without excess. ") +
    `Protein is set high at ${input.protGoal}g to support recovery and body composition regardless of goal.\n\n` +

    `Your workout split is built for ${exp} athletes and leverages ${equip}. ` +
    `Training days include structured warm-up progressions, and rest or active-recovery days are built in to prevent overtraining. ` +
    `Track your weekly progress — aim for small improvements in reps, sets, or weight each week. ` +
    `Consistency is the most powerful variable in your results. You've got this.`
  );
}

// ---------------------------------------------------------------------------
// Main entry point — synchronous, no external calls
// ---------------------------------------------------------------------------

export function generatePlan(input: PlanInput): GeneratedPlan {
  const split = selectWorkoutSplit(input.equipment, input.fitnessExperience, input.primaryGoal);

  const workoutPlan: WorkoutDay[] = DAYS.map((day, i) => {
    const template = split[i % split.length];
    return {
      day,
      focus:     template.focus,
      exercises: template.exercises,
    };
  });

  return {
    mealPlan:    buildMealPlan(input),
    workoutPlan,
    summary:     buildSummary(input),
  };
}
