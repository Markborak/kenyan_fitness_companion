import React, { useState } from 'react';
import { Dumbbell, Utensils } from 'lucide-react';
import MealPlanGenerator from './components/MealPlanGenerator';
import WorkoutPlanner from './components/WorkoutPlanner';

function App() {
  const [activeTab, setActiveTab] = useState<'meals' | 'workout'>('meals');

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-green-600 text-white py-6">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-3xl font-bold">Kenyan Fitness Companion</h1>
          <p className="mt-2 text-green-100">Your personalized meal and workout planner</p>
        </div>
      </header>

      <nav className="bg-white shadow-md">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('meals')}
              className={`py-4 px-6 flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === 'meals'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-600 hover:text-green-600'
              }`}
            >
              <Utensils size={20} />
              Meal Planner
            </button>
            <button
              onClick={() => setActiveTab('workout')}
              className={`py-4 px-6 flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === 'workout'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-600 hover:text-green-600'
              }`}
            >
              <Dumbbell size={20} />
              Workout Planner
            </button>
          </div>
        </div>
      </nav>

      <main className="py-8">
        {activeTab === 'meals' ? <MealPlanGenerator /> : <WorkoutPlanner />}
      </main>
    </div>
  );
}

export default App;