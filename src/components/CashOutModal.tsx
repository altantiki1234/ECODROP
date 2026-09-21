import React, { useState } from 'react';

interface CashOutModalProps {
  isOpen: boolean;
  onClose: () => void;
  balance: number;
  onCashOut: (method: string, amount: number, destination: string) => void;
}

export const CashOutModal: React.FC<CashOutModalProps> = ({
  isOpen,
  onClose,
  balance,
  onCashOut,
}) => {
  const [method, setMethod] = useState<'bank' | 'usdc' | 'voucher'>('bank');
  const [amount, setAmount] = useState<number>(Math.min(1000, balance));
  const [destination, setDestination] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  if (!isOpen) return null;

  const usdValue = (amount * 0.01).toFixed(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0 || amount > balance) {
      setError('Invalid withdrawal amount.');
      return;
    }
    if (!destination.trim()) {
      setError('Please provide the account or destination address.');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      onCashOut(method, amount, destination);
      setIsProcessing(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#060e20]/80 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-2xl bg-[#171f33] border border-[#2d3449] shadow-2xl p-6 overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-[#7bd0ff]/15 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-center justify-between pb-3 border-b border-[#2d3449] mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#222a3d] flex items-center justify-center text-[#dae2fd]">
              <span className="material-symbols-outlined text-xl">account_balance</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-lg font-bold text-[#dae2fd]">
                Cash Out Vault
              </h3>
              <p className="text-xs text-[#bbcabf]">
                Exchange verified $ECO for USD or digital assets
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

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-2.5 rounded-lg bg-red-950/60 border border-red-800/50 text-xs text-red-300 font-mono">
              {error}
            </div>
          )}

          {/* Cash out methods */}
          <div>
            <label className="text-xs font-mono text-[#bbcabf] uppercase tracking-wider block mb-1.5">
              Payout Route
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  setMethod('bank');
                  setError('');
                }}
                className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                  method === 'bank'
                    ? 'bg-[#222a3d] border-[#4edea3] text-[#4edea3]'
                    : 'bg-[#131b2e] border-[#2d3449] text-[#bbcabf]'
                }`}
              >
                <span className="material-symbols-outlined text-xl block mb-1">
                  account_balance
                </span>
                <span className="text-xs font-bold block">Direct ACH</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMethod('usdc');
                  setError('');
                }}
                className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                  method === 'usdc'
                    ? 'bg-[#222a3d] border-[#4edea3] text-[#4edea3]'
                    : 'bg-[#131b2e] border-[#2d3449] text-[#bbcabf]'
                }`}
              >
                <span className="material-symbols-outlined text-xl block mb-1">
                  currency_bitcoin
                </span>
                <span className="text-xs font-bold block">USDC Coin</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMethod('voucher');
                  setError('');
                }}
                className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                  method === 'voucher'
                    ? 'bg-[#222a3d] border-[#4edea3] text-[#4edea3]'
                    : 'bg-[#131b2e] border-[#2d3449] text-[#bbcabf]'
                }`}
              >
                <span className="material-symbols-outlined text-xl block mb-1">
                  card_giftcard
                </span>
                <span className="text-xs font-bold block">Gift Card</span>
              </button>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-mono text-[#bbcabf] uppercase tracking-wider">
                Cash Out Amount ($ECO)
              </label>
              <span className="text-xs text-[#bbcabf]">
                Max: <span className="text-[#4edea3] font-mono">{balance} $ECO</span>
              </span>
            </div>
            <input
              type="range"
              min={100}
              max={balance}
              step={50}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full accent-[#4edea3] cursor-pointer"
            />
            <div className="flex justify-between items-baseline mt-2 p-3 rounded-lg bg-[#131b2e] border border-[#2d3449]">
              <span className="text-lg font-mono font-bold text-[#4edea3]">
                {amount.toLocaleString()} $ECO
              </span>
              <span className="text-sm font-bold text-[#dae2fd]">
                ≈ ${usdValue} USD
              </span>
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-[#bbcabf] uppercase tracking-wider block mb-1">
              {method === 'bank'
                ? 'Routing & Account / IBAN'
                : method === 'usdc'
                ? 'USDC Wallet Address (Ethereum / Base / Solana)'
                : 'Delivery Email Address'}
            </label>
            <input
              type="text"
              placeholder={
                method === 'bank'
                  ? 'e.g. Chase Checkings ending in 4920'
                  : method === 'usdc'
                  ? '0x...'
                  : 'youremail@domain.com'
              }
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                setError('');
              }}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#131b2e] border border-[#2d3449] text-sm text-[#dae2fd] placeholder:text-[#556377] focus:outline-none focus:border-[#4edea3]"
            />
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-3 rounded-lg bg-surface-container-high text-[#dae2fd] hover:text-[#4edea3] font-mono font-bold text-sm hover:bg-[#2d3449] transition-all eco-neutral-btn flex items-center justify-center gap-2 cursor-pointer"
          >
            {isProcessing ? (
              <span>Executing Settlement...</span>
            ) : (
              <>
                <span className="material-symbols-outlined text-xl">payments</span>
                <span>Withdraw ${usdValue} USD</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
