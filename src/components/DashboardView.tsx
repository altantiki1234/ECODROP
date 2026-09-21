import React, { useState } from 'react';
import { Transaction } from '../types';

interface DashboardViewProps {
  balance: number;
  wasteDivertedKg: number;
  carbonMitigatedKg: number;
  xp: number;
  transactions: Transaction[];
  onOpenScanDeposit: () => void;
  onOpenSendEco: () => void;
  onOpenCashOut: () => void;
  onOpenWalletPass: () => void;
  onOpenYieldDetails: () => void;
  onOpenLeaderboard: () => void;
  onSelectTransaction: (tx: Transaction) => void;
  onNavigateLocator: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  balance,
  wasteDivertedKg,
  carbonMitigatedKg,
  xp,
  transactions,
  onOpenScanDeposit,
  onOpenSendEco,
  onOpenCashOut,
  onOpenWalletPass,
  onOpenYieldDetails,
  onOpenLeaderboard,
  onSelectTransaction,
  onNavigateLocator,
}) => {
  const [velocityFilter, setVelocityFilter] = useState<'Daily' | 'Weekly' | 'Monthly'>('Daily');

  // Chart data for Mon - Sun
  const weeklyData = [
    { day: 'Mon', value: '45 $ECO', height: '48%', isThu: false, isToday: false },
    { day: 'Tue', value: '80 $ECO', height: '72%', isThu: false, isToday: false },
    { day: 'Wed', value: '30 $ECO', height: '35%', isThu: false, isToday: false },
    { day: 'Thu', value: '120 $ECO', height: '94%', isThu: true, isToday: false },
    { day: 'Fri', value: '60 $ECO', height: '58%', isThu: false, isToday: false },
    { day: 'Sat', value: '95 $ECO', height: '82%', isThu: false, isToday: false },
    { day: 'Sun', value: 'Today', height: '42%', isThu: false, isToday: true },
  ];

  const handleExportLedger = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(transactions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'ecodrop-telemetry-ledger.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Ambient Glow */}
      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-12 py-8 overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-96 h-96 bg-[#4edea3]/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute top-1/2 -right-32 w-80 h-80 bg-[#7bd0ff]/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

        {/* Executive Greeting & Action Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#222a3d] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-ping"></span>
              <span className="font-mono text-[10px] text-[#4edea3] tracking-wider uppercase font-semibold">
                Decentralized Telemetry Active
              </span>
              <span className="text-[#86948a] text-xs">•</span>
              <span className="font-mono text-[10px] text-[#bbcabf]">
                IoT Node #US-NYC-084
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[56px] lg:leading-[64px] font-extrabold text-[#dae2fd] tracking-tight">
              Welcome back, <span className="text-[#4edea3]">Altan!</span>
            </h1>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#2d3449]">
                <span className="material-symbols-outlined text-[#62dcad] text-base">
                  local_fire_department
                </span>
                <span className="text-sm font-bold text-[#62dcad]">12-Day Streak</span>
              </div>
              <p className="text-xs sm:text-sm text-[#bbcabf]">
                Top 4% citywide contributor • Next multiplier unlock in 2 days
              </p>
            </div>
          </div>

          {/* Quick Actions Group */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenScanDeposit}
              className="flex items-center gap-2 px-5 py-3 rounded-lg bg-[#4edea3] text-[#00422b] font-mono text-sm font-bold tracking-wide transition-all eco-glow-btn cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl leading-none">
                qr_code_scanner
              </span>
              <span>Scan Smart Bin</span>
            </button>

            <button
              onClick={onOpenSendEco}
              className="flex items-center gap-2 px-4 py-3 rounded-lg bg-[#222a3d] text-[#4edea3] font-mono text-sm font-semibold tracking-wide hover:bg-[#2d3449] transition-all eco-dark-btn cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl leading-none">
                send_money
              </span>
              <span>Send $ECO</span>
            </button>

            <button
              onClick={onOpenCashOut}
              className="flex items-center gap-2 px-4 py-3 rounded-lg bg-[#222a3d] text-[#dae2fd] font-mono text-sm font-semibold tracking-wide hover:bg-[#2d3449] transition-all eco-neutral-btn cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl leading-none">
                account_balance
              </span>
              <span>Cash Out</span>
            </button>
          </div>
        </div>

        {/* Macro Stat Grid (4-Column Bento Structure) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Card 1: Balance with Real-time Token Chart */}
          <div className="bg-[#171f33] rounded-xl p-5 relative overflow-hidden flex flex-col justify-between shadow-sm border border-[#222a3d]/50">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono text-[10px] text-[#bbcabf] uppercase tracking-wider block mb-1">
                  Total Vault Balance
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-4xl font-extrabold text-[#4edea3] tracking-tight">
                    {balance.toLocaleString()}
                  </span>
                  <span className="font-mono text-xs font-bold text-[#dae2fd]">
                    $ECO
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="font-mono text-[10px] text-[#bbcabf]">
                    ≈ ${(balance * 0.01).toFixed(2)} USD
                  </span>
                  <span className="inline-flex items-center text-[#4edea3] font-mono text-[10px] font-semibold">
                    <span className="material-symbols-outlined text-xs">arrow_drop_up</span>
                    +18.4%
                  </span>
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#222a3d] text-[#4edea3]">
                <span className="material-symbols-outlined text-2xl">
                  account_balance_wallet
                </span>
              </div>
            </div>

            {/* Mini Sparkline SVG */}
            <div className="mt-4 pt-3">
              <div className="h-10 w-full flex items-end">
                <svg className="w-full h-10 overflow-visible" fill="none" viewBox="0 0 160 40">
                  <defs>
                    <linearGradient id="balanceGrad" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#4edea3" stopOpacity="0.35"></stop>
                      <stop offset="100%" stopColor="#4edea3" stopOpacity="0.0"></stop>
                    </linearGradient>
                  </defs>
                  <path
                    d="M0 34 Q 20 28, 40 30 T 80 18 T 120 12 T 160 4 L 160 40 L 0 40 Z"
                    fill="url(#balanceGrad)"
                  ></path>
                  <path
                    d="M0 34 Q 20 28, 40 30 T 80 18 T 120 12 T 160 4"
                    fill="none"
                    stroke="#4edea3"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                  ></path>
                  <circle className="animate-pulse" cx="160" cy="4" fill="#6ffbbe" r="3.5"></circle>
                </svg>
              </div>
              <div className="flex justify-between items-center mt-2 text-[#bbcabf] font-mono text-[10px]">
                <span>Last 7 Days Yield</span>
                <button
                  onClick={onOpenYieldDetails}
                  className="text-[#4edea3] font-medium hover:underline cursor-pointer"
                >
                  Yield Details →
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Waste Diverted Metrics Breakdown */}
          <div className="bg-[#171f33] rounded-xl p-5 flex flex-col justify-between shadow-sm border border-[#222a3d]/50">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono text-[10px] text-[#bbcabf] uppercase tracking-wider block mb-1">
                  Waste Diverted
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-4xl font-extrabold text-[#dae2fd] tracking-tight">
                    {wasteDivertedKg.toFixed(1)}
                  </span>
                  <span className="font-mono text-xs font-bold text-[#bbcabf]">
                    KG
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[#4edea3]">
                  All-time Certified Real Estate
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#222a3d] text-[#62dcad]">
                <span className="material-symbols-outlined text-2xl">recycling</span>
              </div>
            </div>

            {/* Categorical Fill Bar */}
            <div className="mt-4">
              <div className="w-full h-2.5 rounded-full bg-[#2d3449] flex overflow-hidden gap-0.5">
                <div className="bg-[#4edea3] h-full" style={{ width: '44%' }} title="PET Plastic: 44%"></div>
                <div className="bg-[#62dcad] h-full" style={{ width: '26%' }} title="Aluminum: 26%"></div>
                <div className="bg-[#7bd0ff] h-full" style={{ width: '18%' }} title="Glass: 18%"></div>
                <div className="bg-[#4edea3] opacity-70 h-full" style={{ width: '12%' }} title="E-Waste: 12%"></div>
              </div>
              <div className="grid grid-cols-2 gap-y-1 gap-x-2 mt-3 font-mono text-[10px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]"></span>
                  <span className="text-[#bbcabf] truncate">PET Plastic 44%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#62dcad]"></span>
                  <span className="text-[#bbcabf] truncate">Aluminum 26%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7bd0ff]"></span>
                  <span className="text-[#bbcabf] truncate">Glass 18%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]"></span>
                  <span className="text-[#bbcabf] truncate">E-Waste 12%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Carbon Offset Equivalents */}
          <div className="bg-[#171f33] rounded-xl p-5 flex flex-col justify-between shadow-sm border border-[#222a3d]/50">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono text-[10px] text-[#bbcabf] uppercase tracking-wider block mb-1">
                  Carbon Mitigated
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-4xl font-extrabold text-[#7bd0ff] tracking-tight">
                    {carbonMitigatedKg.toFixed(1)}
                  </span>
                  <span className="font-mono text-xs font-bold text-[#7bd0ff]">
                    KG CO₂e
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[#bbcabf]">
                  EPA Metric Standard
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#222a3d] text-[#7bd0ff]">
                <span className="material-symbols-outlined text-2xl">co2</span>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-lg bg-[#222a3d]/60 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#7bd0ff]/10 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[#7bd0ff] text-lg">
                  forest
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-[#dae2fd] font-semibold truncate">
                  ≈ 5 Urban Saplings
                </p>
                <p className="font-mono text-[10px] text-[#bbcabf] truncate">
                  Grown over 10 active years
                </p>
              </div>
            </div>
          </div>

          {/* Card 4: Tier Level & Progression XP */}
          <div className="bg-[#171f33] rounded-xl p-5 flex flex-col justify-between shadow-sm border border-[#222a3d]/50">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono text-[10px] text-[#bbcabf] uppercase tracking-wider block mb-1">
                  Network Standing
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-[#6ffbbe] tracking-tight">
                    Gold Warrior
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-[#4edea3]/20 text-[#4edea3] font-mono text-[10px] font-bold">
                    LVL 4
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[#bbcabf]">
                  1.25x Dynamic Boost Active
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#222a3d] text-[#6ffbbe]">
                <span className="material-symbols-outlined text-2xl">military_tech</span>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex justify-between items-center mb-1.5 font-mono text-[10px]">
                <span className="text-[#bbcabf]">XP Progress</span>
                <span className="text-[#4edea3] font-semibold">
                  {xp} / 500 XP
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#2d3449] overflow-hidden">
                <div
                  className="bg-[#4edea3] h-full rounded-full transition-all duration-500"
                  style={{ width: `${(xp / 500) * 100}%` }}
                ></div>
              </div>
              <p className="font-mono text-[10px] text-[#bbcabf] mt-2 text-right">
                {500 - xp} XP to{' '}
                <span className="text-[#dae2fd] font-semibold">Platinum Guild</span>
              </p>
            </div>
          </div>
        </div>

        {/* Main Workspace Split: Core Telemetry + Smart Pass / Leaderboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left 8 Columns: Interactive Weekly Chart & Activity Feed */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Weekly Deposit Telemetry & Interactive Visualizer */}
            <div className="bg-[#171f33] rounded-xl p-6 shadow-sm border border-[#222a3d]/50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-[#dae2fd]">
                      Weekly Deposit Velocity
                    </h2>
                    <span className="px-2 py-0.5 rounded-full bg-[#2d3449] text-[#62dcad] font-mono text-[10px]">
                      Verified On-Chain
                    </span>
                  </div>
                  <p className="text-xs text-[#bbcabf] mt-0.5">
                    Recycled units vs. Real-Time Token Generation
                  </p>
                </div>

                {/* Day Filter Selector */}
                <div className="flex items-center gap-1 p-1 rounded-lg bg-[#222a3d] font-mono text-xs">
                  {(['Daily', 'Weekly', 'Monthly'] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setVelocityFilter(filter)}
                      className={`px-3 py-1 rounded transition-all cursor-pointer ${
                        velocityFilter === filter
                          ? 'bg-[#4edea3] text-[#00422b] font-bold'
                          : 'text-[#bbcabf] hover:text-[#dae2fd]'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Weekly Visualizer Bars */}
              <div className="grid grid-cols-7 gap-2 sm:gap-4 h-48 items-end pt-4 pb-2 px-2">
                {weeklyData.map((d, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-2 h-full justify-end group cursor-pointer"
                  >
                    <div className="font-mono text-[10px] text-[#4edea3] opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                      {d.value}
                    </div>
                    <div
                      className="w-full max-w-[42px] bg-[#2d3449] rounded-t-lg relative flex flex-col justify-end overflow-hidden group-hover:bg-[#31394d] transition-all"
                      style={{ height: d.height }}
                    >
                      <div
                        className={`w-full rounded-t-lg transition-all ${
                          d.isThu
                            ? 'bg-[#4edea3] shadow-[0_0_16px_rgba(78,222,163,0.4)] h-full'
                            : d.isToday
                            ? 'bg-[#62dcad] h-full'
                            : 'bg-[#4edea3]/80 h-full group-hover:bg-[#4edea3]'
                        }`}
                      ></div>
                    </div>
                    <span
                      className={`font-mono text-xs ${
                        d.isThu
                          ? 'text-[#4edea3] font-bold'
                          : d.isToday
                          ? 'text-[#62dcad] font-bold'
                          : 'text-[#bbcabf] group-hover:text-[#dae2fd]'
                      }`}
                    >
                      {d.day}
                    </span>
                  </div>
                ))}
              </div>

              {/* Chart Footer Summary */}
              <div className="mt-6 pt-4 border-t-0 flex flex-wrap items-center justify-between gap-4 bg-[#131b2e] p-4 rounded-lg">
                <div className="flex items-center gap-6">
                  <div>
                    <span className="font-mono text-[10px] text-[#bbcabf] block">
                      Weekly Total
                    </span>
                    <span className="text-lg font-bold text-[#dae2fd]">
                      430 $ECO
                    </span>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-[#bbcabf] block">
                      Deposit Count
                    </span>
                    <span className="text-lg font-bold text-[#dae2fd]">
                      18 drops
                    </span>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-[#bbcabf] block">
                      Verification Rate
                    </span>
                    <span className="text-lg font-bold text-[#4edea3]">
                      100% Valid
                    </span>
                  </div>
                </div>

                <button
                  onClick={onNavigateLocator}
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-[#4edea3] hover:text-[#6ffbbe] transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">near_me</span>
                  <span>Find Nearby Smart Bins</span>
                </button>
              </div>
            </div>

            {/* Recent Deposit Activity Ledger */}
            <div className="bg-[#171f33] rounded-xl p-6 shadow-sm border border-[#222a3d]/50">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold text-[#dae2fd]">
                    Telemetry Activity Ledger
                  </h2>
                  <p className="text-xs text-[#bbcabf]">
                    Real-time cryptographic audit trail of your dropoffs
                  </p>
                </div>
                <button
                  onClick={handleExportLedger}
                  className="p-2 rounded-lg bg-[#222a3d] text-[#bbcabf] hover:text-[#dae2fd] hover:bg-[#2d3449] transition-colors cursor-pointer"
                  title="Export Ledger"
                >
                  <span className="material-symbols-outlined text-lg leading-none">
                    download
                  </span>
                </button>
              </div>

              <div className="space-y-3">
                {transactions.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onSelectTransaction(item)}
                    className="p-4 rounded-lg bg-[#131b2e] hover:bg-[#222a3d] transition-colors flex items-center justify-between gap-4 group cursor-pointer border border-transparent hover:border-[#4edea3]/20"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform ${
                          item.category === 'plastic'
                            ? 'bg-[#4edea3]/10 text-[#4edea3]'
                            : item.category === 'aluminum'
                            ? 'bg-[#62dcad]/10 text-[#62dcad]'
                            : item.category === 'ewaste'
                            ? 'bg-[#7bd0ff]/10 text-[#7bd0ff]'
                            : 'bg-[#2d3449] text-[#bbcabf]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-xl">
                          {item.category === 'plastic'
                            ? 'delete_sweep'
                            : item.category === 'aluminum'
                            ? 'inventory_2'
                            : item.category === 'ewaste'
                            ? 'battery_charging_full'
                            : 'shopping_bag'}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-[#dae2fd] truncate">
                            {item.title}
                          </span>
                          {item.category === 'plastic' && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]"></span>
                          )}
                          {item.category === 'aluminum' && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#62dcad]"></span>
                          )}
                          {item.hazardLevel === 'High Hazard' && (
                            <span className="px-1.5 py-0.5 rounded bg-[#7bd0ff]/20 text-[#7bd0ff] font-mono text-[10px]">
                              High Hazard
                            </span>
                          )}
                        </div>
                        <p className="font-mono text-[10px] text-[#bbcabf] truncate">
                          {item.details}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span
                        className={`text-base font-bold ${
                          item.amount > 0 ? 'text-[#4edea3]' : 'text-[#dae2fd]'
                        }`}
                      >
                        {item.amount > 0 ? `+${item.amount}` : item.amount} $ECO
                      </span>
                      <span className="font-mono text-[10px] text-[#bbcabf] block">
                        {item.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right 4 Columns: Smart Pass QR Card & Leaderboard */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Personal Smart Pass QR Card (Fintech / Access Token) */}
            <div className="bg-gradient-to-br from-[#171f33] to-[#222a3d] rounded-xl p-6 shadow-[0_0_32px_-8px_rgba(16,185,129,0.2)] relative overflow-hidden border border-[#2d3449]/50">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#4edea3]/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse"></span>
                  <span className="font-mono text-[10px] text-[#4edea3] uppercase tracking-widest font-bold">
                    NFC Handshake Ready
                  </span>
                </div>
                <span className="material-symbols-outlined text-[#4edea3] text-2xl">
                  contactless
                </span>
              </div>

              <div
                onClick={onOpenWalletPass}
                className="text-center py-4 bg-[#060e20]/80 rounded-xl p-4 shadow-inner mb-4 flex flex-col items-center justify-center cursor-pointer group"
                title="Click to expand pass & NFC actions"
              >
                {/* High Contrast Vector QR Graphic Representation */}
                <div className="w-44 h-44 bg-[#0b1326] p-3 rounded-lg flex flex-col items-center justify-center shadow-lg relative group-hover:scale-105 transition-transform">
                  <svg className="w-full h-full text-[#4edea3]" fill="currentColor" viewBox="0 0 100 100">
                    <rect height="28" rx="4" width="28" x="0" y="0"></rect>
                    <rect fill="#0b1326" height="18" rx="2" width="18" x="5" y="5"></rect>
                    <rect height="10" rx="1" width="10" x="9" y="9"></rect>
                    <rect height="28" rx="4" width="28" x="72" y="0"></rect>
                    <rect fill="#0b1326" height="18" rx="2" width="18" x="77" y="5"></rect>
                    <rect height="10" rx="1" width="10" x="81" y="9"></rect>
                    <rect height="28" rx="4" width="28" x="0" y="72"></rect>
                    <rect fill="#0b1326" height="18" rx="2" width="18" x="5" y="77"></rect>
                    <rect height="10" rx="1" width="10" x="9" y="81"></rect>
                    <rect height="6" rx="1" width="6" x="34" y="6"></rect>
                    <rect height="6" rx="1" width="14" x="46" y="6"></rect>
                    <rect height="8" rx="1" width="8" x="34" y="18"></rect>
                    <rect height="6" rx="1" width="6" x="48" y="18"></rect>
                    <rect height="8" rx="1" width="8" x="6" y="34"></rect>
                    <rect height="6" rx="1" width="6" x="20" y="38"></rect>
                    <rect fill="#6ffbbe" height="12" rx="2" width="12" x="34" y="34"></rect>
                    <rect height="6" rx="1" width="8" x="52" y="34"></rect>
                    <rect height="8" rx="1" width="10" x="68" y="34"></rect>
                    <rect height="6" rx="1" width="10" x="84" y="38"></rect>
                    <rect height="12" rx="1" width="6" x="34" y="52"></rect>
                    <rect height="6" rx="1" width="16" x="46" y="52"></rect>
                    <rect height="12" rx="1" width="6" x="68" y="48"></rect>
                    <rect height="8" rx="1" width="14" x="80" y="52"></rect>
                    <rect height="6" rx="1" width="10" x="6" y="48"></rect>
                    <rect height="10" rx="1" width="6" x="22" y="52"></rect>
                    <rect height="6" rx="1" width="10" x="34" y="72"></rect>
                    <rect height="8" rx="1" width="8" x="48" y="72"></rect>
                    <rect height="6" rx="1" width="14" x="62" y="72"></rect>
                    <rect height="12" rx="1" width="12" x="82" y="72"></rect>
                    <rect height="10" rx="1" width="16" x="34" y="84"></rect>
                    <rect height="10" rx="1" width="8" x="56" y="84"></rect>
                    <rect height="8" rx="1" width="6" x="70" y="86"></rect>
                  </svg>
                  {/* Center Glow Pin */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-8 h-8 rounded-full bg-[#060e20]/90 flex items-center justify-center shadow-lg">
                      <span className="w-3 h-3 rounded-full bg-[#4edea3] animate-ping"></span>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <span className="font-mono text-xs text-[#dae2fd] font-semibold tracking-wider block">
                    ECO-PASS #892-NY-ALTAN
                  </span>
                  <p className="font-mono text-[10px] text-[#bbcabf]">
                    Instant hardware authentication
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-[#bbcabf]">Status</span>
                  <span className="text-[#4edea3] font-bold">Live Sensor Link</span>
                </div>
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-[#bbcabf]">Auto-Credit Wallet</span>
                  <span className="text-[#dae2fd]">Vault #0x82...3219</span>
                </div>
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-[#bbcabf]">Zero-Touch Drop</span>
                  <span className="text-[#62dcad] font-semibold">Enabled</span>
                </div>
              </div>

              <button
                onClick={onOpenWalletPass}
                className="w-full mt-4 py-2.5 rounded-lg bg-[#2d3449] text-[#4edea3] font-mono text-xs font-semibold hover:bg-[#31394d] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">
                  add_to_home_screen
                </span>
                <span>Add to Apple / Google Wallet</span>
              </button>
            </div>

            {/* Community Leaderboard Teaser */}
            <div className="bg-[#171f33] rounded-xl p-6 shadow-sm border border-[#2d3449]/50 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h2 className="text-lg font-bold text-[#dae2fd]">
                    Brooklyn Leaderboard
                  </h2>
                  <span className="font-mono text-xs text-[#4edea3] font-semibold">
                    Zone 11211
                  </span>
                </div>
                <p className="text-xs text-[#bbcabf] mb-4">
                  You are ranked <span className="text-[#4edea3] font-bold">#14</span> this cycle
                </p>

                <div className="space-y-3">
                  {/* Leader 1 */}
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#131b2e]">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-[#4edea3] font-bold w-4 text-center">
                        1
                      </span>
                      <div className="w-8 h-8 rounded-full bg-[#222a3d] flex items-center justify-center text-[#dae2fd] font-bold text-xs">
                        JD
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-[#dae2fd] block leading-tight">
                          Julian D.
                        </span>
                        <span className="font-mono text-[10px] text-[#bbcabf]">
                          3,890 $ECO
                        </span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[#62dcad] text-lg">
                      workspace_premium
                    </span>
                  </div>

                  {/* Leader 2 */}
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#131b2e]">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-[#62dcad] font-bold w-4 text-center">
                        2
                      </span>
                      <div className="w-8 h-8 rounded-full bg-[#222a3d] flex items-center justify-center text-[#dae2fd] font-bold text-xs">
                        SL
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-[#dae2fd] block leading-tight">
                          Sarah Lin
                        </span>
                        <span className="font-mono text-[10px] text-[#bbcabf]">
                          3,410 $ECO
                        </span>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] text-[#bbcabf]">Top 1%</span>
                  </div>

                  {/* Leader 3 */}
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#131b2e]">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-[#bbcabf] font-bold w-4 text-center">
                        3
                      </span>
                      <div className="w-8 h-8 rounded-full bg-[#222a3d] flex items-center justify-center text-[#dae2fd] font-bold text-xs">
                        TK
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-[#dae2fd] block leading-tight">
                          Tyler K.
                        </span>
                        <span className="font-mono text-[10px] text-[#bbcabf]">
                          2,950 $ECO
                        </span>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] text-[#bbcabf]">Top 2%</span>
                  </div>

                  {/* Altan's Row */}
                  <div className="flex items-center justify-between p-3 rounded-lg bg-[#4edea3]/10 border border-[#4edea3]/30 shadow-sm">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-[#4edea3] font-bold w-4 text-center">
                        14
                      </span>
                      <div className="w-8 h-8 rounded-full bg-[#4edea3] text-[#002113] font-bold text-xs flex items-center justify-center">
                        A
                      </div>
                      <div>
                        <span className="text-xs text-[#4edea3] font-bold block leading-tight">
                          Altan (You)
                        </span>
                        <span className="font-mono text-[10px] text-[#bbcabf]">
                          {balance.toLocaleString()} $ECO
                        </span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[#4edea3]/20 text-[#4edea3] font-mono text-[10px] font-bold">
                      +80 to #13
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3">
                <button
                  onClick={onOpenLeaderboard}
                  className="w-full block text-center py-2 rounded-lg bg-[#222a3d] text-[#dae2fd] font-mono text-xs font-semibold hover:bg-[#2d3449] hover:text-[#4edea3] transition-all cursor-pointer"
                >
                  View Borough Rankings →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
