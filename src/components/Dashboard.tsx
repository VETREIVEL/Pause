import { ArrowLeft, TrendingUp, Calendar, Flame, Target } from 'lucide-react';

interface DashboardProps {
  onBack: () => void;
}

export function Dashboard({ onBack }: DashboardProps) {
  const stats = {
    currentStreak: 7,
    totalSessions: 45,
    thisMonth: 18,
    totalPoints: 1250,
  };

  const activityData = [
    { name: 'Journaling', completed: 8, total: 10, color: 'bg-blue-500', points: 400 },
    { name: 'Reading', completed: 5, total: 10, color: 'bg-amber-500', points: 250 },
    { name: 'Directional Journal/Drawing', completed: 2, total: 5, color: 'bg-purple-500', points: 150 },
    { name: 'Meditation', completed: 3, total: 5, color: 'bg-emerald-500', points: 180 },
  ];

  const recentSessions = [
    { activity: 'Journaling', date: 'Today, 9:30 AM', points: 50, duration: 30 },
    { activity: 'Reading', date: 'Yesterday, 8:00 PM', points: 50, duration: 30 },
    { activity: 'Meditation', date: 'Yesterday, 7:00 AM', points: 60, duration: 30 },
    { activity: 'Journaling', date: '2 days ago, 10:00 AM', points: 50, duration: 30 },
  ];

  return (
    <div className="min-h-screen">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center">
          <button
            onClick={onBack}
            className="mr-4 p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-slate-700" />
          </button>
          <h1 className="text-2xl font-bold text-slate-900">Your Progress</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<Flame className="w-6 h-6" />}
            label="Current Streak"
            value={`${stats.currentStreak} days`}
            color="bg-orange-500"
          />
          <StatCard
            icon={<Target className="w-6 h-6" />}
            label="Total Sessions"
            value={stats.totalSessions.toString()}
            color="bg-blue-500"
          />
          <StatCard
            icon={<Calendar className="w-6 h-6" />}
            label="This Month"
            value={`${stats.thisMonth} sessions`}
            color="bg-purple-500"
          />
          <StatCard
            icon={<TrendingUp className="w-6 h-6" />}
            label="Total Points"
            value={stats.totalPoints.toString()}
            color="bg-emerald-500"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6 border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Monthly Activity Breakdown</h2>
            <div className="space-y-6">
              {activityData.map((activity) => (
                <ActivityProgress key={activity.name} activity={activity} />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Milestones</h2>
            <div className="space-y-4">
              <Milestone
                title="Week Warrior"
                description="Complete 7 days in a row"
                isCompleted={true}
                progress={100}
              />
              <Milestone
                title="Half Century"
                description="Reach 50 total sessions"
                isCompleted={false}
                progress={90}
              />
              <Milestone
                title="Points Master"
                description="Earn 2,000 points"
                isCompleted={false}
                progress={62.5}
              />
              <Milestone
                title="Balanced Growth"
                description="Complete 10 of each activity"
                isCompleted={false}
                progress={40}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Recent Sessions</h2>
          <div className="space-y-3">
            {recentSessions.map((session, index) => (
              <SessionItem key={index} session={session} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}

function StatCard({ icon, label, value, color }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200">
      <div className={`${color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4`}>
        {icon}
      </div>
      <div className="text-3xl font-bold text-slate-900 mb-1">{value}</div>
      <div className="text-sm text-slate-600">{label}</div>
    </div>
  );
}

interface ActivityProgressProps {
  activity: {
    name: string;
    completed: number;
    total: number;
    color: string;
    points: number;
  };
}

function ActivityProgress({ activity }: ActivityProgressProps) {
  const percentage = (activity.completed / activity.total) * 100;

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-slate-900">{activity.name}</span>
        <span className="text-sm text-slate-600">
          {activity.completed}/{activity.total}
        </span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-3 mb-2">
        <div
          className={`${activity.color} h-3 rounded-full transition-all`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="text-slate-500">{Math.round(percentage)}% complete</span>
        <span className="font-semibold text-emerald-600">{activity.points} pts earned</span>
      </div>
    </div>
  );
}

interface MilestoneProps {
  title: string;
  description: string;
  isCompleted: boolean;
  progress: number;
}

function Milestone({ title, description, isCompleted, progress }: MilestoneProps) {
  return (
    <div className={`p-4 rounded-lg border-2 ${isCompleted ? 'bg-emerald-50 border-emerald-500' : 'bg-slate-50 border-slate-200'}`}>
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="font-semibold text-slate-900">{title}</h3>
          <p className="text-sm text-slate-600">{description}</p>
        </div>
        {isCompleted && (
          <div className="bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded">
            ✓
          </div>
        )}
      </div>
      {!isCompleted && (
        <div className="mt-3">
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-emerald-500 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-xs text-slate-500 mt-1">{Math.round(progress)}%</div>
        </div>
      )}
    </div>
  );
}

interface SessionItemProps {
  session: {
    activity: string;
    date: string;
    points: number;
    duration: number;
  };
}

function SessionItem({ session }: SessionItemProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
      <div>
        <div className="font-semibold text-slate-900">{session.activity}</div>
        <div className="text-sm text-slate-500">{session.date}</div>
      </div>
      <div className="text-right">
        <div className="font-semibold text-emerald-600">+{session.points} pts</div>
        <div className="text-sm text-slate-500">{session.duration} min</div>
      </div>
    </div>
  );
}
