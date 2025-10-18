import { useState } from 'react';
import { BookOpen, Calendar, Compass, Sparkles, ArrowLeft, Check } from 'lucide-react';
import type { Activity } from '../App';

interface DailySelectionProps {
  onActivitySelected: (activity: Activity) => void;
  onBack: () => void;
}

interface ActivityOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  description: string;
  remaining: number;
  total: number;
  points: number;
  duration: number;
}

export function DailySelection({ onActivitySelected, onBack }: DailySelectionProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const activities: ActivityOption[] = [
    {
      id: 'journal',
      name: 'Journaling',
      icon: <BookOpen className="w-8 h-8" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-500',
      description: 'Reflect on your thoughts, emotions, and daily experiences',
      remaining: 22,
      total: 30,
      points: 50,
      duration: 30,
    },
    {
      id: 'reading',
      name: 'Reading',
      icon: <Calendar className="w-8 h-8" />,
      color: 'text-amber-600',
      bgColor: 'bg-amber-500',
      description: 'Dive into books and expand your knowledge',
      remaining: 25,
      total: 30,
      points: 50,
      duration: 30,
    },
    {
      id: 'directional',
      name: 'Directional Journal/Drawing',
      icon: <Compass className="w-8 h-8" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-500',
      description: 'Set goals, plan ahead, and chart your path forward',
      remaining: 28,
      total: 30,
      points: 75,
      duration: 30,
    },
    {
      id: 'meditation',
      name: 'Meditation & Wellness',
      icon: <Sparkles className="w-8 h-8" />,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-500',
      description: 'Practice mindfulness, meditation, and self-care',
      remaining: 30,
      total: 30,
      points: 60,
      duration: 30,
    },
  ];

  const handleSelect = (activity: ActivityOption) => {
    setSelectedId(activity.id);
  };

  const handleConfirm = () => {
    const selected = activities.find(a => a.id === selectedId);
    if (selected) {
      onActivitySelected({
        id: selected.id,
        name: selected.name,
        duration: selected.duration,
        points: selected.points,
      });
    }
  };

  return (
    <div className="min-h-screen">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center">
          <button
            onClick={onBack}
            className="mr-4 p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-slate-700" />
          </button>
          <h1 className="text-2xl font-bold text-slate-900">Choose Today's Activity</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <p className="text-lg text-slate-600">
            Select one activity to focus on for the next 30 minutes. Each session brings you closer to your rewards.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {activities.map((activity) => (
            <ActivitySelectionCard
              key={activity.id}
              activity={activity}
              isSelected={selectedId === activity.id}
              onSelect={() => handleSelect(activity)}
            />
          ))}
        </div>

        {selectedId && (
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-emerald-500">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">Ready to start?</h3>
                <p className="text-slate-600">
                  You've selected {activities.find(a => a.id === selectedId)?.name}
                </p>
              </div>
              <button
                onClick={handleConfirm}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3 px-8 rounded-xl transition-all transform hover:scale-105 flex items-center space-x-2 shadow-lg"
              >
                <span>Begin Session</span>
                <Check className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

interface ActivitySelectionCardProps {
  activity: ActivityOption;
  isSelected: boolean;
  onSelect: () => void;
}

function ActivitySelectionCard({ activity, isSelected, onSelect }: ActivitySelectionCardProps) {
  const progressPercentage = ((activity.total - activity.remaining) / activity.total) * 100;

  return (
    <button
      onClick={onSelect}
      className={`text-left bg-white rounded-xl p-6 border-2 transition-all transform hover:scale-[1.02] ${
        isSelected
          ? 'border-emerald-500 shadow-xl'
          : 'border-slate-200 hover:border-slate-300 shadow-md'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`${activity.bgColor} w-14 h-14 rounded-xl flex items-center justify-center text-white`}>
          {activity.icon}
        </div>
        {isSelected && (
          <div className="bg-emerald-500 text-white w-8 h-8 rounded-full flex items-center justify-center">
            <Check className="w-5 h-5" />
          </div>
        )}
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-2">{activity.name}</h3>
      <p className="text-slate-600 text-sm mb-4">{activity.description}</p>

      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-600">Monthly Progress</span>
            <span className="font-semibold text-slate-900">
              {activity.total - activity.remaining}/{activity.total}
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className={`${activity.bgColor} h-2 rounded-full transition-all`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-200">
          <div className="flex items-center space-x-4 text-sm">
            <div>
              <span className="text-slate-500">Duration:</span>
              <span className="ml-1 font-semibold text-slate-900">{activity.duration} min</span>
            </div>
            <div>
              <span className="text-slate-500">Earn:</span>
              <span className="ml-1 font-semibold text-emerald-600">+{activity.points} pts</span>
            </div>
          </div>
          <div className="text-xs font-medium text-slate-500">
            {activity.remaining} left
          </div>
        </div>
      </div>
    </button>
  );
}
