import React, { useState } from 'react';

export const Footer: React.FC = () => {
  const [modalTitle, setModalTitle] = useState<string | null>(null);

  const renderModalContent = () => {
    switch (modalTitle) {
      case 'Privacy Policy':
        return 'EcoDrop utilizes zero-knowledge cryptography to verify waste dropoff telemetry without recording personally identifiable facial or biometric data. All location pings are anonymized to municipal neighborhood zones.';
      case 'Terms of Protocol':
        return 'The EcoDrop decentralized protocol governs token distribution for municipal waste reclamation. Token generation requires hardware sensor consensus and anti-tamper optical validation.';
      case 'Hardware Specifications':
        return 'EcoDrop Smart Cans feature dual multi-spectral optical cameras, high-precision strain-gauge mass sensors, secure element crypto chips (NFC ISO 14443A), and LTE-M telemetry transceivers.';
      case 'Network Node Status':
        return 'All 14,290 NYC metropolitan nodes operational. Global network latency: 28ms. Consensus block height: #4,910,219. Zero-Knowledge proofs verified today: 142,890.';
      default:
        return '';
    }
  };

  return (
    <footer className="w-full bg-[#060e20] shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-t border-[#171f33] mt-auto">
      {/* Telemetry Ticker */}
      <div className="w-full bg-[#131b2e]/60 px-6 lg:px-12 py-2.5 border-b border-[#171f33]/60">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-ping"></span>
            <span className="font-mono text-[10px] text-[#bbcabf] uppercase tracking-wider whitespace-nowrap">
              Telemetry Stream:
            </span>
            <span className="font-mono text-[10px] text-[#dae2fd] whitespace-nowrap">
              Global Network: 2,481,200 kg plastic diverted • 14,290 active smart cans • Zero-Knowledge Waste Verification
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-block w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
            <span className="font-mono text-xs text-[#4edea3] tracking-wide font-medium">
              Smart Grid Online
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-[#dae2fd] tracking-tight">
            EcoDrop
          </span>
          <span className="font-mono text-xs text-[#bbcabf]">
            © 2024 EcoDrop Network Foundation. Protocol v2.4.1
          </span>
        </div>

        <div className="flex items-center gap-6">
          {['Privacy Policy', 'Terms of Protocol', 'Hardware Specifications', 'Network Node Status'].map(
            (link) => (
              <button
                key={link}
                onClick={() => setModalTitle(link)}
                className="font-mono text-xs text-[#bbcabf] hover:text-[#dae2fd] transition-colors cursor-pointer"
              >
                {link}
              </button>
            )
          )}
        </div>
      </div>

      {/* Protocol Info Modal */}
      {modalTitle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#060e20]/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-2xl bg-[#171f33] border border-[#2d3449] shadow-2xl p-6">
            <div className="flex justify-between items-center pb-3 border-b border-[#2d3449] mb-4">
              <h3 className="font-bold text-base text-[#dae2fd]">{modalTitle}</h3>
              <button
                onClick={() => setModalTitle(null)}
                className="p-1 rounded-lg bg-[#131b2e] text-[#bbcabf] hover:text-[#dae2fd]"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>
            <p className="text-sm text-[#bbcabf] leading-relaxed mb-6">
              {renderModalContent()}
            </p>
            <button
              onClick={() => setModalTitle(null)}
              className="w-full py-2.5 rounded-lg bg-[#222a3d] text-[#dae2fd] hover:text-[#4edea3] font-mono text-xs font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};
