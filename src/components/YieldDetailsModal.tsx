import React from 'react';

interface YieldDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const YieldDetailsModal: React.FC<YieldDetailsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#060e20]/80 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-2xl bg-[#171f33] border border-[#2d3449] shadow-2xl p-6 overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute -top-20 -right-20 w-44 h-44 bg-[#4edea3]/15 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-center justify-between pb-3 border-b border-[#2d3449] mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#4edea3]/20 flex items-center justify-center text-[#4edea3]">
              <span className="material-symbols-outlined text-xl">trending_up</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-lg font-bold text-[#dae2fd]">
                Yield & Reward Mechanics
              </h3>
              <p className="text-xs text-[#bbcabf]">
                Algorithmic token reward and staking breakdown
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#131b2e] text-[#bbcabf] hover:text-[#dae2fd] transition-colors"
          >
            <span className="material-symbols-outlined text-lg leading-none">close</span>
          </button>
        </div>

        <div className="space-y-3">
          <div className="p-3.5 rounded-xl bg-[#131b2e] border border-[#2d3449] flex items-center justify-between">
            <div>
              <span className="text-xs text-[#bbcabf] block">7-Day Net Yield</span>
              <span className="text-xl font-bold font-mono text-[#4edea3]">+18.4%</span>
            </div>
            <div className="text-right">
              <span className="text-xs text-[#bbcabf] block">Base APY Multiplier</span>
              <span className="text-sm font-bold font-mono text-[#dae2fd]">1.25x Active</span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-lg bg-[#131b2e] flex justify-between items-center">
              <div>
                <span className="font-bold text-[#dae2fd] block">12-Day Continuous Drop Streak</span>
                <span className="text-[#bbcabf]">Consecutive daily recycling bonus</span>
              </div>
              <span className="text-[#4edea3] font-mono font-bold">+10.0%</span>
            </div>

            <div className="p-3 rounded-lg bg-[#131b2e] flex justify-between items-center">
              <div>
                <span className="font-bold text-[#dae2fd] block">Zone 11211 Peak Hour Bonus</span>
                <span className="text-[#bbcabf]">Broadway & Central Park bins load balancing</span>
              </div>
              <span className="text-[#4edea3] font-mono font-bold">+5.4%</span>
            </div>

            <div className="p-3 rounded-lg bg-[#131b2e] flex justify-between items-center">
              <div>
                <span className="font-bold text-[#dae2fd] block">E-Waste Safety Surcharge</span>
                <span className="text-[#bbcabf]">Securing heavy metals & lithium hazards</span>
              </div>
              <span className="text-[#4edea3] font-mono font-bold">+3.0%</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full mt-2 py-2.5 rounded-lg bg-[#222a3d] text-[#dae2fd] hover:text-[#4edea3] font-mono text-xs font-bold transition-colors"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
