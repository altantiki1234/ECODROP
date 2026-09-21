export interface Transaction {
  id: string;
  type: 'deposit' | 'redemption' | 'transfer_in' | 'transfer_out';
  title: string;
  location?: string;
  hazardLevel?: 'Low' | 'Medium' | 'High Hazard';
  details: string;
  amount: number; // positive for gain, negative for spent
  timestamp: string;
  category: 'plastic' | 'aluminum' | 'glass' | 'ewaste' | 'reward' | 'p2p';
  txHash: string;
  sensorId?: string;
  weightKg?: number;
}

export interface LeaderboardEntry {
  rank: number;
  initials: string;
  name: string;
  amount: number;
  badge?: string;
  isUser?: boolean;
}

export interface SmartBin {
  id: string;
  name: string;
  location: string;
  distance: string;
  status: 'online' | 'servicing' | 'high_capacity';
  capacityPct: number;
  acceptedTypes: ('PET Plastic' | 'Aluminum' | 'Glass' | 'E-Waste')[];
  bonusMultiplier?: number;
}

export interface RewardItem {
  id: string;
  title: string;
  category: string;
  costEco: number;
  usdValue: string;
  sponsor: string;
  stock: number;
  description: string;
  icon: string;
}
