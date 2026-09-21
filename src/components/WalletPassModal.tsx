import React, { useState } from 'react';

interface WalletPassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerNFCTest: () => void;
}

export const WalletPassModal: React.FC<WalletPassModalProps> = ({
  isOpen,
  onClose,
  onTriggerNFCTest,
}) => {
  const [added, setAdded] = useState(false);

  if (!isOpen) return null;

  const handleAddWallet = (walletType: 'apple' | 'google') => {
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#060e20]/80 backdrop-blur-md">
      <div className="relative w-full max-w-sm rounded-2xl bg-[#171f33] border border-[#2d3449] shadow-2xl p-6 overflow-hidden text-center">
        {/* Ambient Top Glow */}
        <div className="absolute -top-20 -right-20 w-44 h-44 bg-[#4edea3]/15 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4edea3] animate-pulse"></span>
            <span className="text-xs font-mono font-bold text-[#4edea3] uppercase tracking-wider">
              NFC Hardware Pass
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#131b2e] text-[#bbcabf] hover:text-[#dae2fd]"
          >
            <span className="material-symbols-outlined text-base leading-none">close</span>
          </button>
        </div>

        {/* Big Eco-Pass Card */}
        <div className="bg-gradient-to-br from-[#10b981]/20 via-[#171f33] to-[#0b1326] border border-[#4edea3]/40 rounded-xl p-5 shadow-inner mb-4">
          <div className="flex justify-between items-center mb-3">
            <span className="font-bold text-sm text-[#dae2fd]">EcoDrop Pass</span>
            <span className="material-symbols-outlined text-[#4edea3] text-2xl">
              contactless
            </span>
          </div>

          <div className="w-40 h-40 mx-auto bg-[#0b1326] p-3 rounded-xl border border-[#2d3449] flex items-center justify-center mb-3 relative">
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
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="w-3 h-3 rounded-full bg-[#4edea3] animate-ping"></span>
            </div>
          </div>

          <div className="text-left space-y-1 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-[#bbcabf]">Passholder:</span>
              <span className="text-[#dae2fd] font-bold">Altan</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#bbcabf]">Smart Vault:</span>
              <span className="text-[#4edea3]">0x82...3219</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#bbcabf]">Auto-Credit:</span>
              <span className="text-[#62dcad]">Immediate Live NFC</span>
            </div>
          </div>
        </div>

        {added ? (
          <div className="p-3 rounded-lg bg-[#10b981]/20 text-[#4edea3] text-xs font-mono font-bold flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-base">check_circle</span>
            Pass Added to Device Wallet!
          </div>
        ) : (
          <div className="space-y-2">
            <button
              onClick={() => handleAddWallet('apple')}
              className="w-full py-2.5 rounded-lg bg-black text-white font-mono text-xs font-bold hover:bg-neutral-900 transition-all flex items-center justify-center gap-2 border border-[#2d3449]"
            >
              <span className="material-symbols-outlined text-base">add_card</span>
              <span>Add to Apple Wallet</span>
            </button>
            <button
              onClick={() => handleAddWallet('google')}
              className="w-full py-2.5 rounded-lg bg-[#222a3d] text-[#dae2fd] font-mono text-xs font-bold hover:bg-[#2d3449] transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-base">account_balance_wallet</span>
              <span>Save to Google Wallet</span>
            </button>
            <button
              onClick={() => {
                onTriggerNFCTest();
                onClose();
              }}
              className="w-full py-2 rounded-lg bg-transparent text-[#4edea3] text-xs font-mono hover:underline mt-1"
            >
              ⚡ Test NFC Touch-Drop Simulation
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
