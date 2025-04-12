export interface MealPlan {
  breakfast: Meal[];
  lunch: Meal[];
  dinner: Meal[];
  totalCalories: number;
}

export interface Meal {
  name: string;
  calories: number;
  ingredients: string[];
  type: 'breakfast' | 'lunch' | 'dinner';
}

export interface WorkoutSplit {
  [key: string]: MuscleGroup[];
}

export type MuscleGroup = 
  | 'chest'
  | 'back'
  | 'shoulders'
  | 'legs'
  | 'biceps'
  | 'triceps'
  | 'abs'
  | 'rest';

export const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
] as const;