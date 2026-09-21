import React, { useState } from 'react';

interface HeaderProps {
  currentTab: 'dashboard' | 'locator' | 'rewards' | 'deposit';
  onNavigate: (tab: 'dashboard' | 'locator' | 'rewards' | 'deposit') => void;
  balance: number;
  onOpenDeposit: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  balance,
  onOpenDeposit,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifications = [
    {
      id: 1,
      title: 'Deposit Confirmed (+45 $ECO)',
      desc: 'Smart Can #402 optical scan verified 3x PET bottles.',
      time: '22m ago',
      unread: true,
    },
    {
      id: 2,
      title: 'Streak Multiplier Active!',
      desc: '12-Day Streak unlocked 1.25x Dynamic Token Boost.',
      time: '2h ago',
      unread: true,
    },
    {
      id: 3,
      title: 'Community Leaderboard Update',
      desc: 'You reached #14 in Brooklyn Zone 11211!',
      time: '1d ago',
      unread: false,
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#060e20]/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.3)] border-b border-[#171f33]">
      <div className="h-20 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-6">
        {/* Brand & Nav */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
          >
            {/* EcoDrop Logo Icon */}
            <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-[#10b981] to-[#00422b] p-1.5 flex items-center justify-center shadow-[0_0_16px_rgba(78,222,163,0.4)] group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[#dae2fd] text-xl">
                recycling
              </span>
            </div>
            <span className="font-headline-sm text-2xl font-bold text-[#dae2fd] tracking-tight group-hover:text-[#4edea3] transition-colors">
              EcoDrop
            </span>
          </button>

          <nav className="hidden lg:flex items-center gap-2">
            <button
              onClick={() => onNavigate('dashboard')}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                currentTab === 'dashboard'
                  ? 'bg-[#222a3d] text-[#4edea3] font-bold shadow-[0_0_24px_-4px_rgba(16,185,129,0.25)]'
                  : 'text-[#bbcabf] hover:text-[#dae2fd] hover:bg-[#171f33]'
              }`}
            >
              Dashboard
            </button>

            <button
              onClick={() => onNavigate('locator')}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                currentTab === 'locator'
                  ? 'bg-[#222a3d] text-[#4edea3] font-bold shadow-[0_0_24px_-4px_rgba(16,185,129,0.25)]'
                  : 'text-[#bbcabf] hover:text-[#dae2fd] hover:bg-[#171f33]'
              }`}
            >
              Bin Locator
            </button>

            <button
              onClick={() => onNavigate('rewards')}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                currentTab === 'rewards'
                  ? 'bg-[#222a3d] text-[#4edea3] font-bold shadow-[0_0_24px_-4px_rgba(16,185,129,0.25)]'
                  : 'text-[#bbcabf] hover:text-[#dae2fd] hover:bg-[#171f33]'
              }`}
            >
              Rewards Shop
            </button>

            <button
              onClick={onOpenDeposit}
              className="px-4 py-2 text-sm font-semibold rounded-lg text-[#bbcabf] hover:text-[#dae2fd] hover:bg-[#171f33] transition-all cursor-pointer eco-glow-btn text-white bg-[#10b981] font-bold"
            >
              Deposit Waste
            </button>
          </nav>
        </div>

        {/* User Balance & Actions */}
        <div className="flex items-center gap-4">
          {/* Balance Pill */}
          <div className="hidden sm:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#222a3d] shadow-[0_0_24px_-4px_rgba(16,185,129,0.25)] border border-[#2d3449]/50">
            <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse"></span>
            <span className="font-mono text-sm text-[#4edea3] font-bold">
              {balance.toLocaleString()} $ECO
            </span>
            <span className="font-mono text-xs text-[#bbcabf]">
              (~${(balance * 0.01).toFixed(2)} USD)
            </span>
          </div>

          {/* Deposit Button */}
          <button
            onClick={onOpenDeposit}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#4edea3] text-[#00422b] font-mono text-sm font-bold tracking-wide hover:bg-[#6ffbbe] hover:text-[#003824] transition-all eco-glow-btn cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg leading-none">add</span>
            <span>Deposit</span>
          </button>

          {/* Notifications Button & Dropdown */}
          <div className="relative">
            <button
              aria-label="Notifications"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg bg-[#171f33] text-[#bbcabf] hover:text-[#dae2fd] hover:bg-[#222a3d] transition-colors cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-xl">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-xl bg-[#171f33] border border-[#2d3449] shadow-2xl p-4 z-50">
                <div className="flex items-center justify-between pb-3 border-b border-[#2d3449]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#4edea3] text-lg">
                      notifications_active
                    </span>
                    <span className="font-bold text-sm text-[#dae2fd]">
                      Telemetry Notifications
                    </span>
                  </div>
                  <span className="text-xs text-[#4edea3] font-mono font-semibold">
                    3 New
                  </span>
                </div>
                <div className="space-y-2 mt-3 max-h-80 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="p-3 rounded-lg bg-[#131b2e] hover:bg-[#222a3d] transition-colors border border-transparent hover:border-[#4edea3]/30"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-[#dae2fd]">
                          {n.title}
                        </span>
                        <span className="text-[10px] text-[#bbcabf] font-mono">
                          {n.time}
                        </span>
                      </div>
                      <p className="text-xs text-[#bbcabf]">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar */}
          <div className="relative pl-2">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="relative flex items-center cursor-pointer rounded-full focus:outline-none focus:ring-2 focus:ring-[#4edea3]"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#10b981] to-[#7bd0ff] flex items-center justify-center font-bold text-xs text-[#002113] ring-1 ring-[#4edea3]/50">
                A
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#10b981] ring-2 ring-[#060e20]"></span>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-3 w-64 rounded-xl bg-[#171f33] border border-[#2d3449] shadow-2xl p-4 z-50">
                <div className="flex items-center gap-3 pb-3 border-b border-[#2d3449]">
                  <div className="w-10 h-10 rounded-full bg-[#4edea3] text-[#002113] font-bold flex items-center justify-center text-base">
                    A
                  </div>
                  <div>
                    <span className="font-bold text-sm text-[#dae2fd] block">
                      Altan
                    </span>
                    <span className="text-xs text-[#4edea3] font-mono">
                      Vault #0x82...3219
                    </span>
                  </div>
                </div>
                <div className="mt-3 space-y-1.5 text-xs text-[#bbcabf]">
                  <div className="flex justify-between py-1">
                    <span>Rank</span>
                    <span className="text-[#4edea3] font-bold">#14 Brooklyn</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Streak</span>
                    <span className="text-[#62dcad] font-bold">12 Days</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Standing</span>
                    <span className="text-[#6ffbbe] font-bold">Gold Warrior (Lv 4)</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
