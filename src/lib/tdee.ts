export interface OnboardingProfile {
  heightCm: number;
  weightKg: number;
  age: number;
  sex: "male" | "female";
  activityLevel: "sedentary" | "lightly" | "moderately" | "very" | "extremely";
  primaryGoal: "fat_loss" | "muscle_gain" | "recomposition" | "maintain";
}

export interface TDEEResult {
  tdee: number;
  calGoal: number;
  protGoal: number;
  carbGoal: number;
  fatGoal: number;
}

const ACTIVITY_MULTIPLIERS: Record<string, number> = {
  sedentary:   1.2,
  lightly:     1.375,
  moderately:  1.55,
  very:        1.725,
  extremely:   1.9,
};

export function calculateTDEE(profile: OnboardingProfile): TDEEResult {
  const { heightCm, weightKg, age, sex, activityLevel, primaryGoal } = profile;

  // Mifflin-St Jeor BMR
  const bmr = sex === "male"
    ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
    : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;

  const tdee = Math.round(bmr * (ACTIVITY_MULTIPLIERS[activityLevel] ?? 1.375));

  // Calorie target adjusted for goal
  const calGoal =
    primaryGoal === "fat_loss"    ? tdee - 500 :
    primaryGoal === "muscle_gain" ? tdee + 300 :
    tdee;

  // Protein: 2.2g per kg bodyweight (rounded)
  const protGoal = Math.round(weightKg * 2.2);

  // Fat: 25% of calories (9 kcal/g)
  const fatGoal = Math.round((calGoal * 0.25) / 9);

  // Carbs: remaining calories (4 kcal/g), minimum 0
  const carbGoal = Math.max(0, Math.round((calGoal - protGoal * 4 - fatGoal * 9) / 4));

  return { tdee, calGoal: Math.round(calGoal), protGoal, carbGoal, fatGoal };
}
