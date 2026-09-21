import React, { useState } from 'react';

interface SendEcoModalProps {
  isOpen: boolean;
  onClose: () => void;
  balance: number;
  onSend: (recipient: string, amount: number, note: string) => void;
}

export const SendEcoModal: React.FC<SendEcoModalProps> = ({
  isOpen,
  onClose,
  balance,
  onSend,
}) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const numAmount = Number(amount) || 0;

  const handleQuickPreset = (val: number) => {
    setAmount(val.toString());
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient.trim()) {
      setError('Please enter a recipient wallet address or EcoTag.');
      return;
    }
    if (numAmount <= 0) {
      setError('Amount must be greater than 0.');
      return;
    }
    if (numAmount > balance) {
      setError('Insufficient $ECO vault balance.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      onSend(recipient.trim(), numAmount, note.trim());
      setIsSubmitting(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#060e20]/80 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-2xl bg-[#171f33] border border-[#2d3449] shadow-2xl p-6 overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#4edea3]/15 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-center justify-between pb-3 border-b border-[#2d3449] mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#4edea3]/20 flex items-center justify-center text-[#4edea3]">
              <span className="material-symbols-outlined text-xl">send_money</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-lg font-bold text-[#dae2fd]">
                Send $ECO Tokens
              </h3>
              <p className="text-xs text-[#bbcabf]">Instant P2P EcoDrop L2 Zero-Gas Bridge</p>
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

          <div>
            <label className="text-xs font-mono text-[#bbcabf] uppercase tracking-wider block mb-1">
              Recipient Address / EcoTag
            </label>
            <input
              type="text"
              placeholder="e.g. sarahlin.eco or 0x38b...9021"
              value={recipient}
              onChange={(e) => {
                setRecipient(e.target.value);
                setError('');
              }}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#131b2e] border border-[#2d3449] text-sm text-[#dae2fd] placeholder:text-[#556377] focus:outline-none focus:border-[#4edea3]"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-mono text-[#bbcabf] uppercase tracking-wider">
                Amount ($ECO)
              </label>
              <span className="text-xs text-[#bbcabf]">
                Available:{' '}
                <span className="text-[#4edea3] font-mono font-bold">
                  {balance.toLocaleString()} $ECO
                </span>
              </span>
            </div>
            <div className="relative">
              <input
                type="number"
                placeholder="0"
                min="1"
                max={balance}
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setError('');
                }}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#131b2e] border border-[#2d3449] text-sm font-mono font-bold text-[#dae2fd] focus:outline-none focus:border-[#4edea3]"
              />
              <button
                type="button"
                onClick={() => handleQuickPreset(balance)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded bg-[#222a3d] text-[11px] font-mono text-[#4edea3] hover:bg-[#2d3449]"
              >
                MAX
              </button>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-2">
            {[50, 100, 250, 500].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => handleQuickPreset(preset)}
                className="flex-1 py-1 rounded-md bg-[#131b2e] border border-[#2d3449] text-xs font-mono text-[#bbcabf] hover:text-[#4edea3] hover:border-[#4edea3]/50 transition-colors"
              >
                +{preset}
              </button>
            ))}
          </div>

          <div>
            <label className="text-xs font-mono text-[#bbcabf] uppercase tracking-wider block mb-1">
              Transfer Memo (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Thanks for community park cleanup!"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-[#131b2e] border border-[#2d3449] text-sm text-[#dae2fd] placeholder:text-[#556377] focus:outline-none focus:border-[#4edea3]"
            />
          </div>

          <div className="p-3 rounded-xl bg-[#131b2e] border border-[#2d3449] space-y-1 text-xs">
            <div className="flex justify-between text-[#bbcabf]">
              <span>Network Gas Fee:</span>
              <span className="text-[#4edea3] font-mono font-semibold">
                0.00 $ECO (Free L2)
              </span>
            </div>
            <div className="flex justify-between text-[#bbcabf]">
              <span>Settlement Time:</span>
              <span className="text-[#dae2fd] font-mono">&lt; 1.5 seconds</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-lg bg-[#4edea3] text-[#00422b] font-mono font-bold text-sm hover:bg-[#6ffbbe] transition-all eco-glow-btn flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Broadcasting Transaction...</span>
            ) : (
              <>
                <span className="material-symbols-outlined text-xl">send</span>
                <span>Send {numAmount > 0 ? `${numAmount} $ECO` : 'Tokens'}</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
