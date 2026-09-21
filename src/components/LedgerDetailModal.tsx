import React from 'react';
import { Transaction } from '../types';

interface LedgerDetailModalProps {
  tx: Transaction | null;
  onClose: () => void;
}

export const LedgerDetailModal: React.FC<LedgerDetailModalProps> = ({ tx, onClose }) => {
  if (!tx) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#060e20]/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#171f33] border border-[#2d3449] shadow-2xl p-6 overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute -top-20 -right-20 w-44 h-44 bg-[#4edea3]/15 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-center justify-between pb-3 border-b border-[#2d3449] mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#4edea3]/20 flex items-center justify-center text-[#4edea3]">
              <span className="material-symbols-outlined text-xl">verified</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-lg font-bold text-[#dae2fd]">
                Cryptographic Audit Proof
              </h3>
              <p className="text-xs text-[#bbcabf]">
                Zero-Knowledge verified telemetry record
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

        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#131b2e] border border-[#2d3449] flex items-center justify-between">
            <div>
              <span className="text-xs text-[#bbcabf] block">Activity Type</span>
              <span className="text-sm font-bold text-[#dae2fd] capitalize">
                {tx.type} • {tx.category}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs text-[#bbcabf] block">Vault Impact</span>
              <span
                className={`text-xl font-mono font-bold ${
                  tx.amount > 0 ? 'text-[#4edea3]' : 'text-[#dae2fd]'
                }`}
              >
                {tx.amount > 0 ? `+${tx.amount}` : tx.amount} $ECO
              </span>
            </div>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="p-3 rounded-lg bg-[#131b2e] border border-[#2d3449]/70 space-y-2">
              <div>
                <span className="text-[#bbcabf] block text-[11px]">LOCATION / CAN</span>
                <span className="text-[#dae2fd] font-semibold">{tx.title}</span>
              </div>
              <div>
                <span className="text-[#bbcabf] block text-[11px]">TELEMETRY SUMMARY</span>
                <span className="text-[#dae2fd]">{tx.details}</span>
              </div>
              {tx.sensorId && (
                <div>
                  <span className="text-[#bbcabf] block text-[11px]">HARDWARE SENSOR ID</span>
                  <span className="text-[#4edea3]">{tx.sensorId}</span>
                </div>
              )}
              {tx.weightKg && (
                <div>
                  <span className="text-[#bbcabf] block text-[11px]">CERTIFIED MASS</span>
                  <span className="text-[#dae2fd]">{tx.weightKg} KG Diverted</span>
                </div>
              )}
              <div>
                <span className="text-[#bbcabf] block text-[11px]">TIMESTAMP</span>
                <span className="text-[#dae2fd]">{tx.timestamp}</span>
              </div>
              <div>
                <span className="text-[#bbcabf] block text-[11px]">ZK-HASH (SHA-256)</span>
                <span className="text-[#6ffbbe] break-all select-all font-bold">
                  {tx.txHash}
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#222a3d]/50 border border-[#4edea3]/20 flex items-center gap-3">
            <span className="material-symbols-outlined text-[#4edea3] text-xl">
              security
            </span>
            <p className="text-xs text-[#bbcabf]">
              This drop has been cryptographically signed by the IoT node controller and permanently anchored to the municipal green ledger.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-lg bg-[#222a3d] text-[#dae2fd] hover:text-[#4edea3] font-mono text-xs font-bold transition-colors"
          >
            Close Proof Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
