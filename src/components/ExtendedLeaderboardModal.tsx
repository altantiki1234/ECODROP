import React, { useState } from 'react';
import { EXTENDED_LEADERBOARD } from '../data';

interface ExtendedLeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExtendedLeaderboardModal: React.FC<ExtendedLeaderboardModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeZone, setActiveZone] = useState('11211');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#060e20]/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl max-h-[85vh] rounded-2xl bg-[#171f33] border border-[#2d3449] shadow-2xl p-6 flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#2d3449] mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#4edea3]/20 flex items-center justify-center text-[#4edea3]">
              <span className="material-symbols-outlined text-xl">leaderboard</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-lg font-bold text-[#dae2fd]">
                Brooklyn Borough Leaderboard
              </h3>
              <p className="text-xs text-[#bbcabf]">
                Live municipal recycling rankings • Weekly reward cycle
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

        {/* Zone Selector */}
        <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
          {['11211 (Williamsburg)', '11201 (DUMBO / Hts)', '11215 (Park Slope)', 'All Brooklyn'].map(
            (zone, idx) => {
              const code = zone.split(' ')[0];
              const isSelected = activeZone === code;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveZone(code)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-colors ${
                    isSelected
                      ? 'bg-[#4edea3] text-[#003824] font-bold'
                      : 'bg-[#131b2e] text-[#bbcabf] hover:text-[#dae2fd] hover:bg-[#222a3d]'
                  }`}
                >
                  {zone}
                </button>
              );
            }
          )}
        </div>

        {/* List of Rankings */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {EXTENDED_LEADERBOARD.map((item) => (
            <div
              key={item.rank}
              className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                item.isUser
                  ? 'bg-[#4edea3]/15 border border-[#4edea3]/40 shadow-sm'
                  : 'bg-[#131b2e] hover:bg-[#222a3d]'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`font-mono text-xs font-bold w-5 text-center ${
                    item.rank === 1
                      ? 'text-[#4edea3]'
                      : item.rank === 2
                      ? 'text-[#62dcad]'
                      : item.rank === 3
                      ? 'text-[#7bd0ff]'
                      : 'text-[#bbcabf]'
                  }`}
                >
                  {item.rank}
                </span>

                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                    item.isUser
                      ? 'bg-[#4edea3] text-[#002113]'
                      : 'bg-[#222a3d] text-[#dae2fd]'
                  }`}
                >
                  {item.initials}
                </div>

                <div>
                  <span
                    className={`font-body-sm text-sm font-semibold block leading-tight ${
                      item.isUser ? 'text-[#4edea3] font-bold' : 'text-[#dae2fd]'
                    }`}
                  >
                    {item.name}
                  </span>
                  <span className="font-mono text-xs text-[#bbcabf]">
                    {item.amount.toLocaleString()} $ECO
                  </span>
                </div>
              </div>

              <div>
                {item.rank === 1 ? (
                  <span className="material-symbols-outlined text-[#4edea3] text-xl">
                    workspace_premium
                  </span>
                ) : (
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-mono font-semibold ${
                      item.isUser
                        ? 'bg-[#4edea3]/20 text-[#4edea3]'
                        : 'bg-[#222a3d] text-[#bbcabf]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="pt-4 mt-2 border-t border-[#2d3449] flex items-center justify-between text-xs text-[#bbcabf]">
          <span>Top 10 contributors receive weekly bonus yield.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#222a3d] text-[#dae2fd] hover:text-[#4edea3] font-mono font-bold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
