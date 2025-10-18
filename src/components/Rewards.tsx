import { ArrowLeft, Gift, Bell, ShoppingBag, Sparkles } from 'lucide-react';

interface RewardsProps {
  onBack: () => void;
}

interface Reward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  value: string;
  available: boolean;
  image: string;
}

export function Rewards({ onBack }: RewardsProps) {
  const currentPoints = 1250;
  const nextRewardUpdate = '3 days';

  const rewards: Reward[] = [
    {
      id: '1',
      name: 'Flipkart Voucher',
      description: '₹100 Flipkart Gift Card',
      pointsCost: 500,
      value: '₹100',
      available: true,
      image: '🎁',
    },
    {
      id: '2',
      name: 'Flipkart Voucher',
      description: '₹250 Flipkart Gift Card',
      pointsCost: 1200,
      value: '₹250',
      available: true,
      image: '🎁',
    },
    {
      id: '3',
      name: 'Flipkart Voucher',
      description: '₹500 Flipkart Gift Card',
      pointsCost: 2300,
      value: '₹500',
      available: false,
      image: '🎁',
    },
    {
      id: '4',
      name: 'Premium Upgrade',
      description: '1 month of premium features',
      pointsCost: 800,
      value: 'Premium',
      available: true,
      image: '⭐',
    },
    {
      id: '5',
      name: 'Flipkart Voucher',
      description: '₹1000 Flipkart Gift Card',
      pointsCost: 4500,
      value: '₹1000',
      available: false,
      image: '🎁',
    },
    {
      id: '6',
      name: 'Custom Themes',
      description: 'Unlock exclusive app themes',
      pointsCost: 600,
      value: 'Themes',
      available: true,
      image: '🎨',
    },
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
          <h1 className="text-2xl font-bold text-slate-900">Rewards Store</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl p-6 text-white shadow-xl">
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="w-6 h-6" />
              <span className="text-sm font-medium opacity-90">Your Balance</span>
            </div>
            <div className="text-5xl font-bold mb-2">{currentPoints}</div>
            <div className="text-sm opacity-90">Incentive Points</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200">
            <div className="flex items-center space-x-2 mb-4 text-amber-600">
              <Bell className="w-6 h-6" />
              <span className="text-sm font-semibold text-slate-900">Next Update</span>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-2">In {nextRewardUpdate}</div>
            <div className="text-sm text-slate-600">Your next points notification</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200">
            <div className="flex items-center space-x-2 mb-4 text-blue-600">
              <Gift className="w-6 h-6" />
              <span className="text-sm font-semibold text-slate-900">Total Earned</span>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-2">3,470</div>
            <div className="text-sm text-slate-600">Lifetime points earned</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 mb-8 border border-blue-200">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center text-white flex-shrink-0">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-2">How Points Work</h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                You earn points for each completed activity session. Instead of instant notifications,
                we'll update you every 7-10 days with your accumulated points. This approach helps you
                focus on the journey, not just the rewards. Points never expire and can be redeemed
                anytime for Flipkart vouchers and other exciting rewards.
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Available Rewards</h2>
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <ShoppingBag className="w-4 h-4" />
              <span>{rewards.filter(r => r.available).length} items available</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rewards.map((reward) => (
              <RewardCard
                key={reward.id}
                reward={reward}
                currentPoints={currentPoints}
              />
            ))}
          </div>
        </div>

        <div className="mt-12 bg-white rounded-xl p-8 shadow-md border border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <FAQItem
              question="When will I receive my points?"
              answer="Points are credited immediately after completing a session, but notifications are sent every 7-10 days to keep you focused on your growth journey."
            />
            <FAQItem
              question="Do points expire?"
              answer="No! Your points never expire. Accumulate them at your own pace and redeem whenever you're ready."
            />
            <FAQItem
              question="How do I redeem rewards?"
              answer="Once you have enough points, click 'Redeem Now' on any available reward. You'll receive your Flipkart voucher code via email within 24 hours."
            />
            <FAQItem
              question="Where do the points come from?"
              answer="We display relevant advertisements in the app. Revenue from these ads funds your rewards, creating a win-win ecosystem."
            />
          </div>
        </div>
      </main>
    </div>
  );
}

interface RewardCardProps {
  reward: Reward;
  currentPoints: number;
}

function RewardCard({ reward, currentPoints }: RewardCardProps) {
  const canAfford = currentPoints >= reward.pointsCost && reward.available;
  const pointsNeeded = reward.pointsCost - currentPoints;

  return (
    <div className={`bg-white rounded-xl p-6 shadow-md border-2 transition-all ${
      reward.available ? 'border-slate-200 hover:shadow-xl' : 'border-slate-200 opacity-60'
    }`}>
      <div className="text-6xl mb-4 text-center">{reward.image}</div>

      <h3 className="font-bold text-slate-900 mb-1 text-lg">{reward.name}</h3>
      <p className="text-slate-600 text-sm mb-4">{reward.description}</p>

      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-2xl font-bold text-emerald-600">{reward.pointsCost}</div>
          <div className="text-xs text-slate-500">points required</div>
        </div>
        <div className="bg-slate-100 px-3 py-1 rounded-full">
          <div className="text-sm font-semibold text-slate-900">{reward.value}</div>
        </div>
      </div>

      {reward.available ? (
        canAfford ? (
          <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3 px-4 rounded-lg transition-all transform hover:scale-[1.02]">
            Redeem Now
          </button>
        ) : (
          <div className="w-full bg-slate-100 text-slate-600 font-semibold py-3 px-4 rounded-lg text-center text-sm">
            Need {pointsNeeded} more points
          </div>
        )
      ) : (
        <div className="w-full bg-slate-100 text-slate-500 font-semibold py-3 px-4 rounded-lg text-center text-sm">
          Coming Soon
        </div>
      )}
    </div>
  );
}

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  return (
    <div className="border-b border-slate-200 last:border-0 pb-4 last:pb-0">
      <h4 className="font-semibold text-slate-900 mb-2">{question}</h4>
      <p className="text-slate-600 text-sm leading-relaxed">{answer}</p>
    </div>
  );
}
