/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { BinLocatorView } from './components/BinLocatorView';
import { RewardsShopView } from './components/RewardsShopView';
import { Footer } from './components/Footer';
import { ScanDepositModal } from './components/ScanDepositModal';
import { SendEcoModal } from './components/SendEcoModal';
import { CashOutModal } from './components/CashOutModal';
import { WalletPassModal } from './components/WalletPassModal';
import { YieldDetailsModal } from './components/YieldDetailsModal';
import { ExtendedLeaderboardModal } from './components/ExtendedLeaderboardModal';
import { LedgerDetailModal } from './components/LedgerDetailModal';
import {
  INITIAL_TRANSACTIONS,
  SMART_BINS_DATA,
  REWARDS_CATALOG,
} from './data';
import { Transaction, SmartBin, RewardItem } from './types';

export default function App() {
  // Core State
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'locator' | 'rewards' | 'deposit'>('dashboard');
  const [balance, setBalance] = useState<number>(1420);
  const [wasteDivertedKg, setWasteDivertedKg] = useState<number>(48.6);
  const [carbonMitigatedKg, setCarbonMitigatedKg] = useState<number>(112.4);
  const [xp, setXp] = useState<number>(340);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [bins] = useState<SmartBin[]>(SMART_BINS_DATA);
  const [catalog] = useState<RewardItem[]>(REWARDS_CATALOG);

  // Modals
  const [isDepositOpen, setIsDepositOpen] = useState<boolean>(false);
  const [isSendOpen, setIsSendOpen] = useState<boolean>(false);
  const [isCashOutOpen, setIsCashOutOpen] = useState<boolean>(false);
  const [isWalletPassOpen, setIsWalletPassOpen] = useState<boolean>(false);
  const [isYieldOpen, setIsYieldOpen] = useState<boolean>(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState<boolean>(false);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  // Quick Toast Notification
  const [toast, setToast] = useState<{
    title: string;
    description: string;
    icon?: string;
  } | null>(null);

  const showToast = (title: string, description: string, icon = 'electric_bolt') => {
    setToast({ title, description, icon });
    setTimeout(() => {
      setToast(null);
    }, 5000);
  };

  // Handlers
  const handleDepositComplete = (data: {
    binName: string;
    category: 'plastic' | 'aluminum' | 'glass' | 'ewaste';
    itemDescription: string;
    weightKg: number;
    ecoReward: number;
  }) => {
    // 1. Update Vault Balance
    setBalance((prev) => prev + data.ecoReward);

    // 2. Update Mass Diverted & CO2 Mitigated
    setWasteDivertedKg((prev) => Number((prev + data.weightKg).toFixed(1)));
    const co2Rate = data.category === 'plastic' ? 2.5 : data.category === 'aluminum' ? 9.0 : 1.2;
    setCarbonMitigatedKg((prev) => Number((prev + data.weightKg * co2Rate).toFixed(1)));

    // 3. Update XP
    setXp((prev) => Math.min(500, prev + Math.floor(data.ecoReward * 0.4)));

    // 4. Prepend Transaction to Ledger
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      type: 'deposit',
      title: `${data.binName}`,
      details: data.itemDescription,
      amount: data.ecoReward,
      timestamp: 'Just now',
      category: data.category,
      txHash: '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      sensorId: 'OPT-402-NY',
      weightKg: data.weightKg,
    };
    setTransactions((prev) => [newTx, ...prev]);

    // 5. Toast
    showToast(
      `+${data.ecoReward} $ECO Credited!`,
      `Smart Bin sensor confirmed ${data.weightKg} kg dropoff.`,
      'check_circle'
    );
  };

  const handleSendEco = (recipient: string, amount: number, note: string) => {
    setBalance((prev) => prev - amount);
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      type: 'transfer_out',
      title: `Transfer to ${recipient}`,
      details: note || 'P2P EcoDrop Zero-Gas Transfer',
      amount: -amount,
      timestamp: 'Just now',
      category: 'p2p',
      txHash: '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
    };
    setTransactions((prev) => [newTx, ...prev]);
    showToast(
      'EcoTransfer Complete',
      `Sent ${amount} $ECO to ${recipient} with zero gas fees.`,
      'send'
    );
  };

  const handleCashOut = (method: string, amount: number, destination: string) => {
    setBalance((prev) => prev - amount);
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      type: 'redemption',
      title: `Cash Out via ${method.toUpperCase()}`,
      details: `Settled ${(amount * 0.01).toFixed(2)} USD to ${destination}`,
      amount: -amount,
      timestamp: 'Just now',
      category: 'reward',
      txHash: '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
    };
    setTransactions((prev) => [newTx, ...prev]);
    showToast(
      'Payout Initiated',
      `Withdrew $${(amount * 0.01).toFixed(2)} USD via ${method.toUpperCase()}.`,
      'payments'
    );
  };

  const handleRedeemReward = (item: RewardItem) => {
    setBalance((prev) => prev - item.costEco);
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      type: 'redemption',
      title: `Redeemed ${item.title}`,
      details: `Marketplace Order #WF-${Math.floor(1000 + Math.random() * 9000)} • Digital Barcode Active`,
      amount: -item.costEco,
      timestamp: 'Just now',
      category: 'reward',
      txHash: '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
    };
    setTransactions((prev) => [newTx, ...prev]);
    showToast(
      'Voucher Redeemed!',
      `Successfully purchased ${item.title} for ${item.costEco} $ECO.`,
      'shopping_bag'
    );
  };

  const handleNFCTouchDrop = () => {
    showToast(
      'NFC Handshake Verified',
      'Smart Can #402 chute unlocked via ECO-PASS #892-NY-ALTAN.',
      'contactless'
    );
    setTimeout(() => {
      setIsDepositOpen(true);
    }, 600);
  };

  return (
    <div className="bg-[#0b1326] min-h-screen flex flex-col selection:bg-[#4edea3] selection:text-[#002113]">
      {/* Navigation Header */}
      <Header
        currentTab={currentTab}
        onNavigate={(tab) => {
          if (tab === 'deposit') {
            setIsDepositOpen(true);
          } else {
            setCurrentTab(tab);
          }
        }}
        balance={balance}
        onOpenDeposit={() => setIsDepositOpen(true)}
      />

      {/* Main Content Area */}
      <main className="w-full pt-20 bg-[#0b1326] flex-1 flex flex-col">
        {currentTab === 'dashboard' && (
          <DashboardView
            balance={balance}
            wasteDivertedKg={wasteDivertedKg}
            carbonMitigatedKg={carbonMitigatedKg}
            xp={xp}
            transactions={transactions}
            onOpenScanDeposit={() => setIsDepositOpen(true)}
            onOpenSendEco={() => {
              showToast(
                'P2P EcoTransfer Ready',
                'Wallet bridge is primed for instant token forwarding.',
                'electric_bolt'
              );
              setIsSendOpen(true);
            }}
            onOpenCashOut={() => setIsCashOutOpen(true)}
            onOpenWalletPass={() => setIsWalletPassOpen(true)}
            onOpenYieldDetails={() => setIsYieldOpen(true)}
            onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
            onSelectTransaction={(tx) => setSelectedTx(tx)}
            onNavigateLocator={() => setCurrentTab('locator')}
          />
        )}

        {currentTab === 'locator' && (
          <BinLocatorView
            bins={bins}
            onSelectBinForDeposit={(_bin) => {
              setIsDepositOpen(true);
            }}
          />
        )}

        {currentTab === 'rewards' && (
          <RewardsShopView
            balance={balance}
            catalog={catalog}
            onRedeem={handleRedeemReward}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <ScanDepositModal
        isOpen={isDepositOpen}
        onClose={() => setIsDepositOpen(false)}
        onCompleteDeposit={handleDepositComplete}
        bins={bins}
      />

      <SendEcoModal
        isOpen={isSendOpen}
        onClose={() => setIsSendOpen(false)}
        balance={balance}
        onSend={handleSendEco}
      />

      <CashOutModal
        isOpen={isCashOutOpen}
        onClose={() => setIsCashOutOpen(false)}
        balance={balance}
        onCashOut={handleCashOut}
      />

      <WalletPassModal
        isOpen={isWalletPassOpen}
        onClose={() => setIsWalletPassOpen(false)}
        onTriggerNFCTest={handleNFCTouchDrop}
      />

      <YieldDetailsModal
        isOpen={isYieldOpen}
        onClose={() => setIsYieldOpen(false)}
      />

      <ExtendedLeaderboardModal
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
      />

      <LedgerDetailModal
        tx={selectedTx}
        onClose={() => setSelectedTx(null)}
      />

      {/* Floating Interactive Toast Notification (Exact from prototype) */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
          <div className="bg-[#222a3d] border border-[#2d3449] p-4 rounded-xl shadow-2xl flex items-center gap-4 max-w-sm">
            <div className="w-10 h-10 rounded-full bg-[#4edea3]/20 flex items-center justify-center text-[#4edea3] shrink-0">
              <span className="material-symbols-outlined text-xl">
                {toast.icon || 'electric_bolt'}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-sm font-bold text-[#dae2fd] block truncate">
                {toast.title}
              </span>
              <span className="text-xs text-[#bbcabf] line-clamp-2">
                {toast.description}
              </span>
            </div>
            <button
              onClick={() => setToast(null)}
              className="text-[#bbcabf] hover:text-[#dae2fd] p-1"
            >
              <span className="material-symbols-outlined text-base">close</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
