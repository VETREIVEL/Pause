import { BookOpen, Calendar, Compass, Sparkles, Award, BarChart3, ArrowRight } from 'lucide-react';

interface HomeProps {
  onStartSelection: () => void;
  onNavigate: (view: 'dashboard' | 'rewards') => void;
}

export function Home({ onStartSelection, onNavigate }: HomeProps) {
  return (
    <div className="min-h-screen">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-8 h-8 text-emerald-600" />
            <h1 className="text-2xl font-bold text-slate-900">Pause</h1>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-4 py-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors flex items-center space-x-2"
            >
              <BarChart3 className="w-5 h-5" />
              <span className="hidden sm:inline">Progress</span>
            </button>
            <button
              onClick={() => onNavigate('rewards')}
              className="px-4 py-2 text-emerald-700 hover:text-emerald-900 hover:bg-emerald-50 rounded-lg transition-colors flex items-center space-x-2"
            >
              <Award className="w-5 h-5" />
              <span className="hidden sm:inline">Rewards</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Your Daily Growth Journey
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Dedicate 30 minutes each day to build lasting habits. Choose from journaling, reading, directional planning, and mindfulness practices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <ActivityCard
            icon={<BookOpen className="w-8 h-8" />}
            title="Journaling"
            description="Reflect on your day and emotions"
            color="bg-blue-500"
            allocation="10 sessions/month"
          />
          <ActivityCard
            icon={<Calendar className="w-8 h-8" />}
            title="Reading"
            description="Expand your knowledge daily"
            color="bg-amber-500"
            allocation="10 sessions/month"
          />
          <ActivityCard
            icon={<Compass className="w-8 h-8" />}
            title="Directional Journal/Drawing"
            description="Plan and set your goals"
            color="bg-purple-500"
            allocation="5 sessions/month"
          />
          <ActivityCard
            icon={<Sparkles className="w-8 h-8" />}
            title="Meditation & More"
            description="Mindfulness and wellness"
            color="bg-emerald-500"
            allocation="5 sessions/month"
          />
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Today's Session</h3>
              <p className="text-slate-600">Pick your activity and start growing</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-emerald-600">1,250</div>
              <div className="text-sm text-slate-500">Total Points</div>
            </div>
          </div>
          <button
            onClick={onStartSelection}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02] flex items-center justify-center space-x-2 shadow-lg"
          >
            <span>Start Today's Activity</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-200">
          <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center space-x-2">
            <Award className="w-6 h-6 text-emerald-600" />
            <span>How Rewards Work</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <RewardStep
              number="1"
              title="Complete Activities"
              description="Earn points for each 30-minute session you complete"
            />
            <RewardStep
              number="2"
              title="Build Your Streak"
              description="Get notified every 7-10 days with bonus point updates"
            />
            <RewardStep
              number="3"
              title="Redeem Rewards"
              description="Exchange points for Flipkart coupons and exclusive offers"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

interface ActivityCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  allocation: string;
}

function ActivityCard({ icon, title, description, color, allocation }: ActivityCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow border border-slate-200">
      <div className={`${color} w-14 h-14 rounded-xl flex items-center justify-center text-white mb-4`}>
        {icon}
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 text-sm mb-3">{description}</p>
      <div className="text-xs font-medium text-slate-500">{allocation}</div>
    </div>
  );
}

interface RewardStepProps {
  number: string;
  title: string;
  description: string;
}

function RewardStep({ number, title, description }: RewardStepProps) {
  return (
    <div className="flex space-x-4">
      <div className="flex-shrink-0 w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
        {number}
      </div>
      <div>
        <h4 className="font-semibold text-slate-900 mb-1">{title}</h4>
        <p className="text-sm text-slate-600">{description}</p>
      </div>
    </div>
  );
}
