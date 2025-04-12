import React, { useState } from "react";
import { RefreshCw, Download } from "lucide-react";
import { MealPlan, Meal } from "../types";
import { KENYAN_MEALS } from "../data/meals";

const generateMealPlan = (targetCalories: number): MealPlan => {
  const breakfastCalories = targetCalories * 0.25;
  const lunchCalories = targetCalories * 0.45;
  const dinnerCalories = targetCalories * 0.3;

  /*const getRandomMeal = (
    type: "breakfast" | "lunch" | "dinner",
    targetCal: number
  ) => {
    const meals = KENYAN_MEALS.filter((meal) => meal.type === type);
    const closestMeal = meals.reduce((prev, curr) => {
      return Math.abs(curr.calories - targetCal) <
        Math.abs(prev.calories - targetCal)
        ? curr
        : prev;
    });
    return closestMeal;
  };*/

  const getRandomMeal = (
    type: "breakfast" | "lunch" | "dinner",
    targetCal: number
  ) => {
    const meals = KENYAN_MEALS.filter((meal) => meal.type === type);
    const sortedMeals = meals.sort(
      (a, b) =>
        Math.abs(a.calories - targetCal) - Math.abs(b.calories - targetCal)
    );
    const topMatches = sortedMeals.slice(0, 3); // Top 3 closest meals
    return topMatches[Math.floor(Math.random() * topMatches.length)];
  };

  return {
    breakfast: [getRandomMeal("breakfast", breakfastCalories)],
    lunch: [getRandomMeal("lunch", lunchCalories)],
    dinner: [getRandomMeal("dinner", dinnerCalories)],
    totalCalories: targetCalories,
  };
};

const MealPlanGenerator: React.FC = () => {
  const [calories, setCalories] = useState<number>(2000);
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);

  // const handleGenerate = () => {
  //   setMealPlan(generateMealPlan(calories));
  // };

  const [hasGenerated, setHasGenerated] = useState(false);

  const handleGenerate = () => {
    setMealPlan(generateMealPlan(calories));
    setHasGenerated(true);
  };

  const handleDownload = () => {
    if (!mealPlan) return;

    const content = `
Kenyan Meal Plan - ${mealPlan.totalCalories} calories

Breakfast (${Math.round(mealPlan.totalCalories * 0.25)} calories):
${mealPlan.breakfast
  .map(
    (meal) => `${meal.name} (${meal.calories} cal)
Portions:
${meal.ingredients.map((ingredient) => `• ${ingredient}`).join("\n")}`
  )
  .join("\n")}

Lunch (${Math.round(mealPlan.totalCalories * 0.45)} calories):
${mealPlan.lunch
  .map(
    (meal) => `${meal.name} (${meal.calories} cal)
Portions:
${meal.ingredients.map((ingredient) => `• ${ingredient}`).join("\n")}`
  )
  .join("\n")}

Dinner (${Math.round(mealPlan.totalCalories * 0.3)} calories):
${mealPlan.dinner
  .map(
    (meal) => `${meal.name} (${meal.calories} cal)
Portions:
${meal.ingredients.map((ingredient) => `• ${ingredient}`).join("\n")}`
  )
  .join("\n")}

Total Daily Calories: ${mealPlan.totalCalories}
    `;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "meal-plan.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderMeal = (meal: Meal) => (
    <div key={meal.name} className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-green-800">{meal.name}</h3>
      <p className="text-gray-600 font-medium mt-1">{meal.calories} calories</p>
      <div className="mt-4">
        <h4 className="font-medium text-gray-800 mb-2">Portions:</h4>
        <ul className="space-y-2">
          {meal.ingredients.map((ingredient, index) => (
            <li key={index} className="flex items-center text-gray-700">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              {ingredient}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Kenyan Meal Plan Generator</h2>
        <div className="flex gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Daily Calorie Target
            </label>
            <input
              type="number"
              value={calories}
              onChange={(e) => setCalories(Number(e.target.value))}
              className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              min="1000"
              max="5000"
              step="100"
            />
          </div>

          <button
            onClick={handleGenerate}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center gap-2"
          >
            <RefreshCw size={20} />
            {hasGenerated ? "Regenerate Plan" : "Generate Plan"}
          </button>
        </div>
      </div>

      {mealPlan && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Your Meal Plan</h3>
            <div className="flex items-center gap-2">
              <p className="text-gray-600 font-medium">
                Total: {mealPlan.totalCalories} calories
              </p>
              <button
                onClick={handleDownload}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 flex items-center gap-2"
              >
                <Download size={20} />
                Download Plan
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Breakfast
                <span className="text-gray-600 text-sm ml-2">
                  ({Math.round(mealPlan.totalCalories * 0.25)} cal)
                </span>
              </h3>
              {mealPlan.breakfast.map(renderMeal)}
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Lunch
                <span className="text-gray-600 text-sm ml-2">
                  ({Math.round(mealPlan.totalCalories * 0.45)} cal)
                </span>
              </h3>
              {mealPlan.lunch.map(renderMeal)}
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Dinner
                <span className="text-gray-600 text-sm ml-2">
                  ({Math.round(mealPlan.totalCalories * 0.3)} cal)
                </span>
              </h3>
              {mealPlan.dinner.map(renderMeal)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlanGenerator;
