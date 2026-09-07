// Mock Initial Data for RyzeLog Platform

export const initialAccounts = [
  { id: 'acc-1', name: 'FTMO $100K Funded', broker: 'FTMO', balance: 108420, initialBalance: 100000, currency: 'USD', type: 'Prop Firm' },
  { id: 'acc-2', name: 'Personal Raw Spread', broker: 'IC Markets', balance: 24650, initialBalance: 20000, currency: 'USD', type: 'Personal' },
  { id: 'acc-3', name: 'FundedNext Evaluation', broker: 'FundedNext', balance: 52180, initialBalance: 50000, currency: 'USD', type: 'Prop Firm' }
];

export const initialTrades = [
  {
    id: 'tr-1',
    accountId: 'acc-1',
    symbol: 'EURUSD',
    direction: 'LONG',
    entryPrice: 1.08450,
    exitPrice: 1.09150,
    stopLoss: 1.08200,
    takeProfit: 1.09200,
    lots: 3.5,
    pnl: 2450.00,
    rr: 2.8,
    status: 'WIN',
    date: '2026-03-02 09:15',
    session: 'London',
    strategy: 'SMC Liquidity Sweep',
    emotions: 'Disciplined & Calm',
    followedRules: true,
    notes: 'Clean sweep of Asian lows during London open. Inverted FVG entry with confluence of 15m bullish order block.',
    screenshot: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: 'tr-2',
    accountId: 'acc-1',
    symbol: 'XAUUSD',
    direction: 'SHORT',
    entryPrice: 2845.50,
    exitPrice: 2815.20,
    stopLoss: 2855.00,
    takeProfit: 2810.00,
    lots: 2.0,
    pnl: 6060.00,
    rr: 3.19,
    status: 'WIN',
    date: '2026-03-03 14:30',
    session: 'New York',
    strategy: 'Order Block Rejection',
    emotions: 'Patient Execution',
    followedRules: true,
    notes: 'NY session retest of daily resistance. Fed speaker comments induced heavy institutional selling volume.',
    screenshot: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: 'tr-3',
    accountId: 'acc-1',
    symbol: 'NAS100',
    direction: 'LONG',
    entryPrice: 20650.00,
    exitPrice: 20580.00,
    stopLoss: 20580.00,
    takeProfit: 20850.00,
    lots: 1.5,
    pnl: -1050.00,
    rr: -1.0,
    status: 'LOSS',
    date: '2026-03-04 15:45',
    session: 'New York',
    strategy: 'Break & Retest',
    emotions: 'Slight FOMO',
    followedRules: false,
    notes: 'Entered slightly ahead of confirmation candle. Market chopped before breaking down into liquidity pocket.',
    screenshot: ''
  },
  {
    id: 'tr-4',
    accountId: 'acc-1',
    symbol: 'GBPUSD',
    direction: 'LONG',
    entryPrice: 1.29100,
    exitPrice: 1.29850,
    stopLoss: 1.28800,
    takeProfit: 1.30000,
    lots: 4.0,
    pnl: 3000.00,
    rr: 2.5,
    status: 'WIN',
    date: '2026-03-05 08:30',
    session: 'London',
    strategy: 'FVG Displacement',
    emotions: 'Disciplined',
    followedRules: true,
    notes: 'Clear displacement candle out of London accumulation. Retest into 1h Fair Value Gap and target high of week.',
    screenshot: ''
  },
  {
    id: 'tr-5',
    accountId: 'acc-1',
    symbol: 'US30',
    direction: 'SHORT',
    entryPrice: 43800.00,
    exitPrice: 43800.00,
    stopLoss: 43920.00,
    takeProfit: 43500.00,
    lots: 1.0,
    pnl: 0.00,
    rr: 0.0,
    status: 'BE',
    date: '2026-03-06 16:00',
    session: 'New York',
    strategy: 'Liquidity Sweep',
    emotions: 'Neutral',
    followedRules: true,
    notes: 'Took partial profit at +1.5R and moved stop loss to breakeven. News spike took out rest of position at BE.',
    screenshot: ''
  },
  {
    id: 'tr-6',
    accountId: 'acc-1',
    symbol: 'BTCUSD',
    direction: 'LONG',
    entryPrice: 88400.00,
    exitPrice: 91200.00,
    stopLoss: 87500.00,
    takeProfit: 91500.00,
    lots: 0.8,
    pnl: 2240.00,
    rr: 3.11,
    status: 'WIN',
    date: '2026-03-07 11:20',
    session: 'London',
    strategy: 'Order Block Rejection',
    emotions: 'High Confidence',
    followedRules: true,
    notes: 'Weekend consolidation breakout followed by aggressive retest of 4H demand zone.',
    screenshot: ''
  }
];

export const initialMindsetLogs = [
  {
    id: 'ms-1',
    date: '2026-03-07',
    sleepScore: 5,
    mentalState: 'Calm & Prepared',
    maxRiskLimit: '1.0% ($1,000)',
    preMarketPlan: 'Focus solely on GBPUSD and Gold London Open. Ignore chop before 8:00 AM UTC.',
    rulesFollowed: true,
    followedRiskLimit: true,
    avoidedFOMO: true,
    postMarketReview: 'Traded strictly within criteria. Exited according to plan. Zero emotional hesitation.'
  },
  {
    id: 'ms-2',
    date: '2026-03-06',
    sleepScore: 4,
    mentalState: 'Slightly Fatigued',
    maxRiskLimit: '0.75% ($750)',
    preMarketPlan: 'Reduced risk because of lower energy. Prioritize high timeframe setups only.',
    rulesFollowed: true,
    followedRiskLimit: true,
    avoidedFOMO: true,
    postMarketReview: 'Smart decision to reduce risk. One BE trade and called it a day.'
  }
];

export const initialEconomicEvents = [
  {
    id: 'ec-1',
    time: '13:30',
    currency: 'USD',
    title: 'Core CPI (MoM)',
    impact: 'HIGH',
    forecast: '0.3%',
    previous: '0.3%',
    actual: '0.2%'
  },
  {
    id: 'ec-2',
    time: '13:30',
    currency: 'USD',
    title: 'Non-Farm Employment Change',
    impact: 'HIGH',
    forecast: '185K',
    previous: '216K',
    actual: '198K'
  },
  {
    id: 'ec-3',
    time: '09:00',
    currency: 'EUR',
    title: 'ECB Monetary Policy Statement',
    impact: 'HIGH',
    forecast: '3.75%',
    previous: '4.00%',
    actual: '3.75%'
  },
  {
    id: 'ec-4',
    time: '07:00',
    currency: 'GBP',
    title: 'GDP (MoM)',
    impact: 'MEDIUM',
    forecast: '0.2%',
    previous: '-0.1%',
    actual: '0.3%'
  },
  {
    id: 'ec-5',
    time: '19:00',
    currency: 'USD',
    title: 'FOMC Meeting Minutes',
    impact: 'HIGH',
    forecast: '-',
    previous: '-',
    actual: '-'
  },
  {
    id: 'ec-6',
    time: '00:30',
    currency: 'JPY',
    title: 'Tokyo Core CPI (YoY)',
    impact: 'MEDIUM',
    forecast: '2.1%',
    previous: '2.2%',
    actual: '2.0%'
  }
];

export const initialPayouts = [
  {
    id: 'po-1',
    firm: 'FTMO',
    amount: 4580.00,
    requestedDate: '2026-02-18',
    paidDate: '2026-02-21',
    status: 'PAID',
    method: 'Crypto (USDT)',
    accountNumber: 'FTMO-100482',
    certificateId: 'FTMO-CERT-98214'
  },
  {
    id: 'po-2',
    firm: 'FundedNext',
    amount: 2890.00,
    requestedDate: '2026-02-28',
    paidDate: '2026-03-02',
    status: 'PAID',
    method: 'Direct Bank Wire',
    accountNumber: 'FN-582194',
    certificateId: 'FN-CERT-44109'
  },
  {
    id: 'po-3',
    firm: 'Topstep',
    amount: 3200.00,
    requestedDate: '2026-03-05',
    paidDate: 'Pending',
    status: 'PROCESSING',
    method: 'Wise Transfer',
    accountNumber: 'TS-89421',
    certificateId: 'TS-PENDING'
  }
];

export const initialBacktests = [
  {
    id: 'bt-1',
    name: 'EURUSD 15m SMC Model (Q1 2025)',
    symbol: 'EURUSD',
    timeframe: '15m',
    strategy: 'SMC Liquidity Sweep + FVG',
    tradesCount: 42,
    wins: 31,
    losses: 11,
    winRate: 73.8,
    profitFactor: 2.84,
    netPnL: 14200,
    created: '2026-02-15'
  },
  {
    id: 'bt-2',
    name: 'Gold (XAUUSD) NY Open Rejection',
    symbol: 'XAUUSD',
    timeframe: '5m',
    strategy: 'Order Block Rejection',
    tradesCount: 35,
    wins: 24,
    losses: 11,
    winRate: 68.5,
    profitFactor: 2.31,
    netPnL: 18900,
    created: '2026-02-28'
  }
];

export const initialPlaybook = [
  {
    id: 'pb-1',
    title: 'A+ SMC Liquidity Sweep & Retest',
    category: 'Core Model',
    timeframe: '15m / 1h',
    rules: [
      'Identify Asian session high or low liquidity pools.',
      'Wait for clear sweep during London open (07:00 - 09:00 UTC).',
      'Look for strong displacement candle breaking previous market structure (BOS/MSS).',
      'Enter on fair value gap (FVG) or 50% equilibrium of the impulse leg.',
      'Stop loss positioned strictly beyond the sweep wick. Take profit targeted at opposing external liquidity.'
    ],
    riskPerTrade: '1.0% maximum',
    minRR: '1:2.5'
  },
  {
    id: 'pb-2',
    title: 'High Impact News Protocol',
    category: 'Risk Management',
    timeframe: 'All',
    rules: [
      'No new position entries within 15 minutes before or after red folder events (CPI, NFP, FOMC).',
      'Existing winning trades must have stop loss moved to breakeven or partials taken (min 50%).',
      'Check Economic Calendar every morning before session start.'
    ],
    riskPerTrade: '0% (Do not trade news spikes)',
    minRR: 'N/A'
  }
];

export const initialCoupons = [
  {
    id: 'cp-1',
    firm: 'FTMO',
    code: 'RYZEFTMO10',
    discount: '10% OFF',
    description: 'Valid for all standard and aggressive evaluation challenges.'
  },
  {
    id: 'cp-2',
    firm: 'FundedNext',
    code: 'RYZENEXT20',
    discount: '20% OFF + 15% Profit Share',
    description: 'Exclusive partner discount code for Stellar and Evaluation accounts.'
  },
  {
    id: 'cp-3',
    firm: 'Topstep',
    code: 'RYZETOP20',
    discount: '20% OFF',
    description: 'Applicable to 50K and 100K Futures Trading Combines.'
  }
];
