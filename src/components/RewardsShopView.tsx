import React, { useState } from 'react';
import { RewardItem } from '../types';

interface RewardsShopViewProps {
  balance: number;
  catalog: RewardItem[];
  onRedeem: (item: RewardItem) => void;
}

export const RewardsShopView: React.FC<RewardsShopViewProps> = ({
  balance,
  catalog,
  onRedeem,
}) => {
  const [redeemedItem, setRedeemedItem] = useState<RewardItem | null>(null);
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = ['All', 'Groceries & Organic', 'Clean Transit', 'Impact Donation', 'Sustainable Apparel', 'Outdoor & Gear'];

  const filteredItems = catalog.filter(
    (item) => filterCategory === 'All' || item.category === filterCategory
  );

  const handleRedeemClick = (item: RewardItem) => {
    onRedeem(item);
    setRedeemedItem(item);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#222a3d] text-xs font-mono text-[#4edea3] mb-2">
            <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse"></span>
            <span>ZERO-WASTE REWARD MARKETPLACE</span>
          </div>
          <h1 className="font-display text-4xl font-extrabold text-[#dae2fd] tracking-tight">
            Rewards <span className="text-[#4edea3]">Shop</span>
          </h1>
          <p className="text-sm text-[#bbcabf] mt-1">
            Exchange your verified recycling tokens for sustainable brands, public transit, and park restoration
          </p>
        </div>

        {/* User Balance Card */}
        <div className="p-4 rounded-xl bg-[#171f33] border border-[#2d3449] flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-[#4edea3]/20 flex items-center justify-center text-[#4edea3]">
            <span className="material-symbols-outlined text-2xl">
              account_balance_wallet
            </span>
          </div>
          <div>
            <span className="text-xs text-[#bbcabf] font-mono block">Spendable Vault Balance</span>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-xl font-bold text-[#4edea3]">
                {balance.toLocaleString()} $ECO
              </span>
              <span className="text-xs text-[#bbcabf]">
                (≈ ${(balance * 0.01).toFixed(2)} USD)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-colors cursor-pointer ${
              filterCategory === cat
                ? 'bg-[#4edea3] text-[#003824] font-bold shadow-[0_0_16px_rgba(78,222,163,0.3)]'
                : 'bg-[#171f33] text-[#bbcabf] hover:text-[#dae2fd] hover:bg-[#222a3d]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const canAfford = balance >= item.costEco;
          return (
            <div
              key={item.id}
              className="bg-[#171f33] border border-[#2d3449] hover:border-[#4edea3]/40 rounded-2xl p-6 shadow-sm flex flex-col justify-between transition-all group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-[#222a3d] flex items-center justify-center text-[#4edea3] group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-2xl">
                      {item.icon}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#131b2e] border border-[#2d3449] text-[11px] font-mono text-[#bbcabf]">
                    {item.sponsor}
                  </span>
                </div>

                <div className="mb-2">
                  <h3 className="font-bold text-base text-[#dae2fd] group-hover:text-[#4edea3] transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-xs font-mono text-[#bbcabf] block mt-0.5">
                    {item.category} • Value {item.usdValue}
                  </span>
                </div>

                <p className="text-xs text-[#bbcabf] mb-4 line-clamp-2">
                  {item.description}
                </p>
              </div>

              <div>
                <div className="flex justify-between items-baseline pt-4 border-t border-[#2d3449] mb-4">
                  <span className="text-xs text-[#bbcabf]">Cost</span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-mono text-xl font-extrabold text-[#4edea3]">
                      {item.costEco.toLocaleString()}
                    </span>
                    <span className="font-mono text-xs text-[#bbcabf]">$ECO</span>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={!canAfford}
                  onClick={() => handleRedeemClick(item)}
                  className={`w-full py-2.5 rounded-lg font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    canAfford
                      ? 'bg-[#4edea3] text-[#00422b] hover:bg-[#6ffbbe] eco-glow-btn'
                      : 'bg-[#222a3d] text-[#6b7b8a] cursor-not-allowed opacity-60'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">
                    {canAfford ? 'shopping_bag' : 'lock'}
                  </span>
                  <span>{canAfford ? 'Redeem Voucher' : 'Insufficient $ECO'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Redemption Success Modal */}
      {redeemedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#060e20]/80 backdrop-blur-md">
          <div className="relative w-full max-w-sm rounded-2xl bg-[#171f33] border border-[#2d3449] shadow-2xl p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-[#4edea3]/20 flex items-center justify-center text-[#4edea3] mx-auto mb-4">
              <span className="material-symbols-outlined text-3xl">check_circle</span>
            </div>
            <h3 className="font-bold text-lg text-[#dae2fd]">Voucher Redeemed!</h3>
            <p className="text-xs text-[#bbcabf] mt-1 mb-4">
              {redeemedItem.title} is ready. Order #ECO-
              {Math.floor(1000 + Math.random() * 9000)} is saved in your Telemetry Ledger.
            </p>
            {/* Barcode Simulator */}
            <div className="p-4 bg-white rounded-lg mb-4 flex flex-col items-center">
              <div className="w-48 h-12 flex justify-between items-center gap-1">
                {Array.from({ length: 32 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-black h-full"
                    style={{
                      width: i % 3 === 0 ? '4px' : i % 2 === 0 ? '2px' : '1px',
                    }}
                  ></div>
                ))}
              </div>
              <span className="text-[10px] font-mono text-black font-bold tracking-widest mt-1">
                ECO-{redeemedItem.id.toUpperCase()}-892-NY
              </span>
            </div>
            <button
              onClick={() => setRedeemedItem(null)}
              className="w-full py-2.5 rounded-lg bg-[#4edea3] text-[#00422b] font-mono font-bold text-xs hover:bg-[#6ffbbe]"
            >
              Return to Shop
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
