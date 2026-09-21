import React, { useState } from 'react';
import { SmartBin } from '../types';

interface ScanDepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleteDeposit: (depositData: {
    binName: string;
    category: 'plastic' | 'aluminum' | 'glass' | 'ewaste';
    itemDescription: string;
    weightKg: number;
    ecoReward: number;
  }) => void;
  bins: SmartBin[];
}

export const ScanDepositModal: React.FC<ScanDepositModalProps> = ({
  isOpen,
  onClose,
  onCompleteDeposit,
  bins,
}) => {
  const [selectedBinId, setSelectedBinId] = useState<string>(bins[0]?.id || 'bin-402');
  const [materialType, setMaterialType] = useState<'plastic' | 'aluminum' | 'glass' | 'ewaste'>('plastic');
  const [quantity, setQuantity] = useState<number>(3);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanStep, setScanStep] = useState<'config' | 'analyzing' | 'minting' | 'complete'>('config');
  const [mintedInfo, setMintedInfo] = useState<{
    eco: number;
    weightKg: number;
    hash: string;
  } | null>(null);

  if (!isOpen) return null;

  const materialConfig = {
    plastic: {
      name: 'PET Plastic Bottles',
      unitWeight: 0.06,
      unitEco: 15,
      icon: 'delete_sweep',
      color: '#4edea3',
      hazard: 'Low',
    },
    aluminum: {
      name: 'Aluminum Soda Cans',
      unitWeight: 0.04,
      unitEco: 20,
      icon: 'inventory_2',
      color: '#62dcad',
      hazard: 'Low',
    },
    glass: {
      name: 'Glass Jars / Bottles',
      unitWeight: 0.25,
      unitEco: 30,
      icon: 'liquor',
      color: '#7bd0ff',
      hazard: 'Low',
    },
    ewaste: {
      name: 'Lithium / E-Waste Batteries',
      unitWeight: 0.15,
      unitEco: 150,
      icon: 'battery_charging_full',
      color: '#19aee8',
      hazard: 'High Hazard',
    },
  };

  const currentMat = materialConfig[materialType];
  const totalWeight = Number((currentMat.unitWeight * quantity).toFixed(2));
  const totalEco = currentMat.unitEco * quantity;

  const handleStartDeposit = () => {
    setIsScanning(true);
    setScanStep('analyzing');

    // Simulated optical scan sequence
    setTimeout(() => {
      setScanStep('minting');
      setTimeout(() => {
        const txHash = '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
        setMintedInfo({
          eco: totalEco,
          weightKg: totalWeight,
          hash: txHash,
        });
        setScanStep('complete');
        setIsScanning(false);

        const selectedBin = bins.find((b) => b.id === selectedBinId) || bins[0];
        onCompleteDeposit({
          binName: selectedBin.name,
          category: materialType,
          itemDescription: `${quantity}x ${currentMat.name} • ${totalWeight} kg verified via Optical Sensor`,
          weightKg: totalWeight,
          ecoReward: totalEco,
        });
      }, 1200);
    }, 1400);
  };

  const handleReset = () => {
    setScanStep('config');
    setMintedInfo(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#060e20]/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#171f33] border border-[#2d3449] shadow-2xl p-6 overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 -left-24 w-60 h-60 bg-[#4edea3]/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-[#7bd0ff]/15 rounded-full blur-3xl pointer-events-none"></div>

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#2d3449] mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#4edea3]/20 flex items-center justify-center text-[#4edea3]">
              <span className="material-symbols-outlined text-xl">qr_code_scanner</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-lg font-bold text-[#dae2fd]">
                Smart Bin Deposit & Telemetry
              </h3>
              <p className="text-xs text-[#bbcabf]">
                Optical recognition • Spectrometry weight verification
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#131b2e] text-[#bbcabf] hover:text-[#dae2fd] hover:bg-[#222a3d] transition-colors"
          >
            <span className="material-symbols-outlined text-lg leading-none">close</span>
          </button>
        </div>

        {scanStep === 'config' && (
          <div className="space-y-4">
            {/* Bin Selection */}
            <div>
              <label className="text-xs font-mono text-[#bbcabf] uppercase tracking-wider block mb-1.5">
                Target Smart Bin Node
              </label>
              <select
                value={selectedBinId}
                onChange={(e) => setSelectedBinId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#131b2e] border border-[#2d3449] text-sm text-[#dae2fd] focus:outline-none focus:border-[#4edea3]"
              >
                {bins.map((bin) => (
                  <option key={bin.id} value={bin.id}>
                    {bin.name} — {bin.location} ({bin.distance})
                  </option>
                ))}
              </select>
            </div>

            {/* Waste Material Selector */}
            <div>
              <label className="text-xs font-mono text-[#bbcabf] uppercase tracking-wider block mb-1.5">
                Select Waste Material
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {(['plastic', 'aluminum', 'glass', 'ewaste'] as const).map((type) => {
                  const cfg = materialConfig[type];
                  const isSelected = materialType === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setMaterialType(type)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                        isSelected
                          ? 'bg-[#222a3d] border-[#4edea3] shadow-[0_0_16px_rgba(78,222,163,0.2)]'
                          : 'bg-[#131b2e] border-[#2d3449] hover:bg-[#1f2940]'
                      }`}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${cfg.color}25`, color: cfg.color }}
                      >
                        <span className="material-symbols-outlined text-lg">{cfg.icon}</span>
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-[#dae2fd] block truncate">
                          {cfg.name}
                        </span>
                        <span className="text-[11px] text-[#4edea3] font-mono">
                          +{cfg.unitEco} $ECO / unit
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-mono text-[#bbcabf] uppercase tracking-wider">
                  Item Count
                </span>
                <span className="text-xs text-[#4edea3] font-mono font-bold">
                  {quantity} units
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg bg-[#222a3d] text-[#dae2fd] font-bold text-lg hover:bg-[#2d3449] transition-colors"
                >
                  -
                </button>
                <div className="flex-1 py-2 px-4 rounded-lg bg-[#131b2e] border border-[#2d3449] text-center font-mono font-bold text-lg text-[#4edea3]">
                  {quantity}
                </div>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg bg-[#222a3d] text-[#dae2fd] font-bold text-lg hover:bg-[#2d3449] transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Deposit Calculation Summary */}
            <div className="p-3.5 rounded-xl bg-[#131b2e] border border-[#2d3449] flex items-center justify-between">
              <div>
                <span className="text-xs text-[#bbcabf] block">Estimated Weight</span>
                <span className="text-sm font-bold text-[#dae2fd] font-mono">
                  {totalWeight} KG
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-[#bbcabf] block">Telemetry Reward</span>
                <span className="text-lg font-bold text-[#4edea3] font-mono">
                  +{totalEco} $ECO
                </span>
              </div>
            </div>

            {/* Deposit Action */}
            <button
              type="button"
              onClick={handleStartDeposit}
              className="w-full py-3 rounded-lg bg-[#4edea3] text-[#00422b] font-mono font-bold text-sm hover:bg-[#6ffbbe] hover:text-[#003824] transition-all eco-glow-btn flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">sensors</span>
              <span>Open Chute & Verify Dropoff</span>
            </button>
          </div>
        )}

        {scanStep === 'analyzing' && (
          <div className="py-8 flex flex-col items-center text-center space-y-4">
            {/* Viewfinder simulation */}
            <div className="relative w-48 h-48 rounded-2xl bg-[#0b1326] border-2 border-[#4edea3] overflow-hidden flex items-center justify-center shadow-[0_0_32px_rgba(78,222,163,0.3)]">
              {/* Laser scan sweep */}
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#4edea3] to-transparent shadow-[0_0_12px_#4edea3] animate-pulse"></div>
              <div className="w-16 h-16 rounded-full bg-[#4edea3]/10 flex items-center justify-center text-[#4edea3]">
                <span className="material-symbols-outlined text-4xl animate-spin">
                  filter_center_focus
                </span>
              </div>
              <div className="absolute bottom-2 inset-x-2 text-[10px] font-mono text-[#4edea3] bg-[#060e20]/80 py-0.5 rounded">
                Spectrometry: 99.8% match
              </div>
            </div>

            <div>
              <h4 className="font-bold text-base text-[#dae2fd]">
                Optical Telemetry Scanning...
              </h4>
              <p className="text-xs text-[#bbcabf] mt-1">
                Calibrating mass spectrometer & AI material classification
              </p>
            </div>
          </div>
        )}

        {scanStep === 'minting' && (
          <div className="py-8 flex flex-col items-center text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-[#10b981]/20 flex items-center justify-center text-[#4edea3] animate-pulse">
              <span className="material-symbols-outlined text-4xl">
                currency_exchange
              </span>
            </div>
            <div>
              <h4 className="font-bold text-base text-[#dae2fd]">
                Minting On-Chain $ECO Proof...
              </h4>
              <p className="text-xs text-[#bbcabf] mt-1">
                Zero-Knowledge waste verification broadcasted to node network
              </p>
            </div>
          </div>
        )}

        {scanStep === 'complete' && mintedInfo && (
          <div className="py-6 flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#4edea3]/20 flex items-center justify-center text-[#4edea3] shadow-[0_0_24px_rgba(78,222,163,0.5)]">
              <span className="material-symbols-outlined text-3xl">verified</span>
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#4edea3] font-bold">
                Verification Successful!
              </span>
              <h4 className="font-display text-3xl font-extrabold text-[#4edea3] mt-1">
                +{mintedInfo.eco} $ECO
              </h4>
              <p className="text-xs text-[#bbcabf] mt-1">
                Credited directly to Vault #0x82...3219
              </p>
            </div>

            <div className="w-full p-3 rounded-xl bg-[#131b2e] border border-[#2d3449] text-left space-y-1.5 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-[#bbcabf]">Mass Diverted:</span>
                <span className="text-[#dae2fd]">{mintedInfo.weightKg} KG</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#bbcabf]">Tx Hash:</span>
                <span className="text-[#4edea3] truncate max-w-[220px]">
                  {mintedInfo.hash}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="w-full py-2.5 rounded-lg bg-[#4edea3] text-[#00422b] font-mono font-bold text-sm hover:bg-[#6ffbbe] transition-all cursor-pointer"
            >
              Done & Return to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
