import { z } from "zod";

const nonNegNumber = z.number().finite().nonnegative();

export const foodLogSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  qty: z.number().finite().positive(),
  cal: nonNegNumber,
  prot: nonNegNumber.default(0),
  carb: nonNegNumber.default(0),
  fat: nonNegNumber.default(0),
  mealType: z
    .enum(["Breakfast", "Lunch", "Snack", "Dinner"])
    .default("Snack"),
});

export const stepSchema = z.object({
  count: z.number().int().min(0).max(100000),
});

// Daily water intake total in ml (absolute value, upserted like steps).
export const waterSchema = z.object({
  ml: z.number().int().min(0).max(20000),
});

// A saved quick-add food. Macros are per 100g (same basis as search results).
export const favoriteFoodSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  cal: nonNegNumber,
  prot: nonNegNumber.default(0),
  carb: nonNegNumber.default(0),
  fat: nonNegNumber.default(0),
});

const goalField = z.number().int().positive();

export const goalsSchema = z
  .object({
    calGoal: goalField,
    protGoal: goalField,
    carbGoal: goalField,
    fatGoal: goalField,
    stepGoal: goalField,
    weightGoal: z.number().finite().positive().max(1000),
  })
  .partial();

// Bodyweight in kg.
export const weightSchema = z.object({
  weight: z.number().finite().positive().max(1000),
});

export type FoodLogInput = z.infer<typeof foodLogSchema>;
export type GoalsInput = z.infer<typeof goalsSchema>;
export type FavoriteFoodInput = z.infer<typeof favoriteFoodSchema>;
