import React, { useState } from 'react';
import { Download, Save } from 'lucide-react';
import { WorkoutSplit, MuscleGroup, DAYS_OF_WEEK } from '../types';

const MUSCLE_GROUPS: MuscleGroup[] = [
  'chest',
  'back',
  'shoulders',
  'legs',
  'biceps',
  'triceps',
  'abs',
  'rest'
];

const WorkoutPlanner: React.FC = () => {
  const [workoutSplit, setWorkoutSplit] = useState<WorkoutSplit>(() => {
    const initialSplit: WorkoutSplit = {};
    DAYS_OF_WEEK.forEach(day => {
      initialSplit[day] = [];
    });
    return initialSplit;
  });

  const handleMuscleGroupToggle = (day: string, muscleGroup: MuscleGroup) => {
    setWorkoutSplit(prev => {
      const currentGroups = prev[day];
      
      if (currentGroups.includes(muscleGroup)) {
        return {
          ...prev,
          [day]: currentGroups.filter(group => group !== muscleGroup)
        };
      }
      
      if (currentGroups.length >= 3) {
        return prev;
      }
      
      return {
        ...prev,
        [day]: [...currentGroups, muscleGroup]
      };
    });
  };

  const handleDownload = () => {
    const content = `Weekly Workout Split

${DAYS_OF_WEEK.map(day => `${day}:
${workoutSplit[day].length > 0 ? workoutSplit[day].join(', ') : 'Rest'}`).join('\n\n')}`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'workout-split.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSave = () => {
    localStorage.setItem('workoutSplit', JSON.stringify(workoutSplit));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Weekly Workout Split Planner</h2>
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
          >
            <Save size={20} />
            Save Split
          </button>
          <button
            onClick={handleDownload}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 flex items-center gap-2"
          >
            <Download size={20} />
            Download Split
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        {DAYS_OF_WEEK.map(day => (
          <div key={day} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-3">{day}</h3>
            <div className="flex flex-wrap gap-2">
              {MUSCLE_GROUPS.map(group => (
                <button
                  key={group}
                  onClick={() => handleMuscleGroupToggle(day, group)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
                    ${workoutSplit[day].includes(group)
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  {group.charAt(0).toUpperCase() + group.slice(1)}
                </button>
              ))}
            </div>
            {workoutSplit[day].length > 0 && (
              <div className="mt-2 text-sm text-gray-600">
                Selected: {workoutSplit[day].join(', ')}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutPlanner;