import { useState, useEffect } from 'react';
import { Play, Pause, X, Check } from 'lucide-react';
import type { Activity } from '../App';

interface ActivitySessionProps {
  activity: Activity;
  onComplete: () => void;
}

export function ActivitySession({ activity, onComplete }: ActivitySessionProps) {
  const [timeRemaining, setTimeRemaining] = useState(activity.duration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let interval: number | undefined;

    if (isRunning && timeRemaining > 0) {
      interval = window.setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsCompleted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeRemaining]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = ((activity.duration * 60 - timeRemaining) / (activity.duration * 60)) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {!isCompleted ? (
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">{activity.name}</h2>
                <p className="text-slate-600">Focus on your practice</p>
              </div>
              <button
                onClick={onComplete}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-slate-500" />
              </button>
            </div>

            <div className="mb-12">
              <div className="relative w-64 h-64 mx-auto">
                <svg className="transform -rotate-90 w-64 h-64">
                  <circle
                    cx="128"
                    cy="128"
                    r="120"
                    stroke="#e2e8f0"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="128"
                    cy="128"
                    r="120"
                    stroke="#10b981"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 120}`}
                    strokeDashoffset={`${2 * Math.PI * 120 * (1 - progressPercentage / 100)}`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-6xl font-bold text-slate-900 mb-2">
                    {formatTime(timeRemaining)}
                  </div>
                  <div className="text-sm text-slate-500 font-medium">
                    {Math.round(progressPercentage)}% Complete
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center mb-8">
              <button
                onClick={toggleTimer}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white w-20 h-20 rounded-full transition-all transform hover:scale-110 flex items-center justify-center shadow-xl"
              >
                {isRunning ? (
                  <Pause className="w-10 h-10" />
                ) : (
                  <Play className="w-10 h-10 ml-1" />
                )}
              </button>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-600 mb-1">You'll earn</div>
                  <div className="text-3xl font-bold text-emerald-600">+{activity.points} points</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-slate-600 mb-1">Session Duration</div>
                  <div className="text-2xl font-bold text-slate-900">{activity.duration} min</div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center text-sm text-slate-500">
              {isRunning ? 'Stay focused and present' : 'Press play to start your session'}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-12 h-12 text-white" />
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mb-3">Session Complete!</h2>
            <p className="text-lg text-slate-600 mb-8">
              Great work on completing your {activity.name} session
            </p>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-8 mb-8 border border-emerald-200">
              <div className="text-sm text-slate-600 mb-2">Points Earned</div>
              <div className="text-5xl font-bold text-emerald-600 mb-4">+{activity.points}</div>
              <div className="text-sm text-slate-500">
                Keep going! Your rewards are getting closer
              </div>
            </div>

            <button
              onClick={onComplete}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg"
            >
              Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
