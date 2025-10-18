import { useState } from 'react';
import { Home } from './components/Home';
import { DailySelection } from './components/DailySelection';
import { ActivitySession } from './components/ActivitySession';
import { Dashboard } from './components/Dashboard';
import { Rewards } from './components/Rewards';

type View = 'home' | 'selection' | 'session' | 'dashboard' | 'rewards';

export interface Activity {
  id: string;
  name: string;
  duration: number;
  points: number;
}

function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const handleStartSelection = () => {
    setCurrentView('selection');
  };

  const handleActivitySelected = (activity: Activity) => {
    setSelectedActivity(activity);
    setCurrentView('session');
  };

  const handleSessionComplete = () => {
    setCurrentView('home');
    setSelectedActivity(null);
  };

  const handleNavigate = (view: View) => {
    setCurrentView(view);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {currentView === 'home' && (
        <Home onStartSelection={handleStartSelection} onNavigate={handleNavigate} />
      )}
      {currentView === 'selection' && (
        <DailySelection onActivitySelected={handleActivitySelected} onBack={() => setCurrentView('home')} />
      )}
      {currentView === 'session' && selectedActivity && (
        <ActivitySession activity={selectedActivity} onComplete={handleSessionComplete} />
      )}
      {currentView === 'dashboard' && (
        <Dashboard onBack={() => setCurrentView('home')} />
      )}
      {currentView === 'rewards' && (
        <Rewards onBack={() => setCurrentView('home')} />
      )}
    </div>
  );
}

export default App;
