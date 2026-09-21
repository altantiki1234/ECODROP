import React, { useState } from 'react';
import { SmartBin } from '../types';

interface BinLocatorViewProps {
  bins: SmartBin[];
  onSelectBinForDeposit: (bin: SmartBin) => void;
}

export const BinLocatorView: React.FC<BinLocatorViewProps> = ({
  bins,
  onSelectBinForDeposit,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  const filteredBins = bins.filter((bin) => {
    const matchSearch =
      bin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bin.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter =
      filterType === 'all' || bin.acceptedTypes.includes(filterType as any);
    return matchSearch && matchFilter;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#222a3d] text-xs font-mono text-[#4edea3] mb-2">
            <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse"></span>
            <span>14,290 ACTIVE IOT HUBS ONLINE</span>
          </div>
          <h1 className="font-display text-4xl font-extrabold text-[#dae2fd] tracking-tight">
            Smart Bin <span className="text-[#4edea3]">Locator</span>
          </h1>
          <p className="text-sm text-[#bbcabf] mt-1">
            Real-time optical chute capacity, accepted recyclables, and neighborhood telemetry
          </p>
        </div>

        {/* Quick Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <input
            type="text"
            placeholder="Search borough or street..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 rounded-lg bg-[#171f33] border border-[#2d3449] text-sm text-[#dae2fd] placeholder:text-[#556377] focus:outline-none focus:border-[#4edea3]"
          />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 rounded-lg bg-[#171f33] border border-[#2d3449] text-sm text-[#dae2fd] focus:outline-none focus:border-[#4edea3]"
          >
            <option value="all">All Recyclables</option>
            <option value="PET Plastic">PET Plastic</option>
            <option value="Aluminum">Aluminum</option>
            <option value="Glass">Glass</option>
            <option value="E-Waste">E-Waste</option>
          </select>
        </div>
      </div>

      {/* Grid of Bins */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBins.map((bin) => (
          <div
            key={bin.id}
            className="bg-[#171f33] border border-[#2d3449] hover:border-[#4edea3]/40 rounded-2xl p-6 shadow-sm flex flex-col justify-between transition-all group"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#222a3d] flex items-center justify-center text-[#4edea3] group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-2xl">
                      delete_sweep
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#dae2fd] group-hover:text-[#4edea3] transition-colors">
                      {bin.name}
                    </h3>
                    <span className="text-xs font-mono text-[#bbcabf]">
                      {bin.distance}
                    </span>
                  </div>
                </div>

                <span
                  className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                    bin.status === 'online'
                      ? 'bg-[#10b981]/20 text-[#4edea3]'
                      : 'bg-amber-900/30 text-amber-400'
                  }`}
                >
                  {bin.status === 'online' ? 'Online' : 'High Cap'}
                </span>
              </div>

              <p className="text-xs text-[#bbcabf] mb-4">{bin.location}</p>

              {/* Chute Capacity */}
              <div className="mb-4">
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-[#bbcabf]">Chute Capacity:</span>
                  <span
                    className={
                      bin.capacityPct > 80 ? 'text-amber-400' : 'text-[#4edea3]'
                    }
                  >
                    {bin.capacityPct}% Full
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#131b2e] overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      bin.capacityPct > 80 ? 'bg-amber-400' : 'bg-[#4edea3]'
                    }`}
                    style={{ width: `${bin.capacityPct}%` }}
                  ></div>
                </div>
              </div>

              {/* Accepted materials */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {bin.acceptedTypes.map((type) => (
                  <span
                    key={type}
                    className="px-2 py-0.5 rounded-md bg-[#131b2e] border border-[#2d3449] text-[11px] font-mono text-[#bbcabf]"
                  >
                    {type}
                  </span>
                ))}
                {bin.bonusMultiplier && (
                  <span className="px-2 py-0.5 rounded-md bg-[#4edea3]/20 text-[11px] font-mono font-bold text-[#4edea3]">
                    {bin.bonusMultiplier}x Bonus
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={() => onSelectBinForDeposit(bin)}
              className="w-full py-2.5 rounded-lg bg-[#222a3d] text-[#dae2fd] hover:text-[#00422b] hover:bg-[#4edea3] font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">sensors</span>
              <span>Deposit At This Bin</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
