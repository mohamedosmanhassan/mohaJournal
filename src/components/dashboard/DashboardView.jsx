import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  Percent,
  Award,
  BarChart2,
  Clock,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  CheckCircle2,
  Calendar
} from 'lucide-react';

export default function DashboardView({
  trades,
  account,
  onOpenTradeModal,
  onViewTrade
}) {
  // Compute Key Metrics
  const totalTrades = trades.length;
  const wins = trades.filter(t => t.status === 'WIN').length;
  const losses = trades.filter(t => t.status === 'LOSS').length;
  const winRate = totalTrades > 0 ? ((wins / totalTrades) * 100).toFixed(1) : 0;
  const totalPnL = trades.reduce((acc, t) => acc + (Number(t.pnl) || 0), 0);
  const grossProfit = trades.filter(t => t.pnl > 0).reduce((acc, t) => acc + Number(t.pnl), 0);
  const grossLoss = Math.abs(trades.filter(t => t.pnl < 0).reduce((acc, t) => acc + Number(t.pnl), 0));
  const profitFactor = grossLoss > 0 ? (grossProfit / grossLoss).toFixed(2) : (grossProfit > 0 ? '∞' : '0.00');
  const avgWin = wins > 0 ? (grossProfit / wins).toFixed(0) : 0;
  const avgLoss = losses > 0 ? (grossLoss / losses).toFixed(0) : 0;

  // Compute Cumulative Equity Progression
  let runningBalance = account ? account.initialBalance : 100000;
  const equityPoints = [
    { label: 'Start', balance: runningBalance }
  ];

  trades.forEach((t, i) => {
    runningBalance += Number(t.pnl) || 0;
    equityPoints.push({
      label: `Trade ${i + 1}`,
      balance: runningBalance
    });
  });

  const minBalance = Math.min(...equityPoints.map(p => p.balance));
  const maxBalance = Math.max(...equityPoints.map(p => p.balance));
  const range = maxBalance - minBalance || 1;

  // Generate SVG path for equity curve
  const width = 600;
  const height = 180;
  const pointsString = equityPoints.map((pt, idx) => {
    const x = (idx / (equityPoints.length - 1 || 1)) * width;
    const y = height - ((pt.balance - minBalance) / range) * (height - 30) - 15;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Welcome & Quick Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            Trading Dashboard
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-brand-teal/10 text-brand-teal font-semibold">
              Live Feed
            </span>
          </h2>
          <p className="text-xs text-foreground/60 mt-1">
            Real-time analytics for <span className="font-semibold text-foreground">{account?.name || 'Main Portfolio'}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenTradeModal}
            className="btn-brand-primary flex items-center gap-2 px-5 py-2.5 text-sm font-semibold shadow-md"
          >
            <Plus className="w-4 h-4" />
            Log New Trade
          </button>
        </div>
      </div>

      {/* 6 Performance Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {/* Net PnL */}
        <div className="glass-card p-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-semibold text-foreground/60">Net Cumulative PnL</span>
            <span className={`p-1.5 rounded-lg ${totalPnL >= 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
              {totalPnL >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            </span>
          </div>
          <div className={`text-2xl sm:text-3xl font-bold mt-2 ${totalPnL >= 0 ? 'text-gradient-brand' : 'text-red-400'}`}>
            {totalPnL >= 0 ? `+$${totalPnL.toLocaleString()}` : `-$${Math.abs(totalPnL).toLocaleString()}`}
          </div>
          <span className="text-[11px] text-foreground/60 mt-1 block">
            Account Balance: ${(account ? account.balance : 100000).toLocaleString()}
          </span>
        </div>

        {/* Win Rate */}
        <div className="glass-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-semibold text-foreground/60">Win Rate</span>
            <Percent className="w-4 h-4 text-brand-teal" />
          </div>
          <div className="text-2xl font-bold text-foreground mt-2">{winRate}%</div>
          <span className="text-[11px] text-foreground/60 mt-1 block">{wins}W - {losses}L</span>
        </div>

        {/* Profit Factor */}
        <div className="glass-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-semibold text-foreground/60">Profit Factor</span>
            <Award className="w-4 h-4 text-brand-blue" />
          </div>
          <div className="text-2xl font-bold text-foreground mt-2">{profitFactor}</div>
          <span className="text-[11px] text-emerald-400 mt-1 block font-medium">Strong Edge</span>
        </div>

        {/* Avg Win / Loss */}
        <div className="glass-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-semibold text-foreground/60">Avg Win / Loss</span>
            <BarChart2 className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-xl font-bold text-foreground mt-2">
            <span className="text-emerald-400">+${avgWin}</span> / <span className="text-red-400">-${avgLoss}</span>
          </div>
          <span className="text-[11px] text-foreground/60 mt-1 block">Expected Value: +${avgWin > 0 ? (grossProfit / totalTrades || 0).toFixed(0) : 0}</span>
        </div>

        {/* Total Executions */}
        <div className="glass-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-semibold text-foreground/60">Total Trades</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-foreground mt-2">{totalTrades}</div>
          <span className="text-[11px] text-foreground/60 mt-1 block">Streak: 3 Wins 🔥</span>
        </div>
      </div>

      {/* Main Center Grid: Interactive Equity Curve & Sessions */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Cumulative Equity Curve Chart */}
        <div className="lg:col-span-2 glass-card p-6 text-left">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-foreground">Cumulative Account Equity Curve</h3>
              <p className="text-xs text-foreground/60">Account progression based on all logged closed positions</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-1 rounded-lg bg-card border border-border text-foreground/80 font-mono">
                High: ${maxBalance.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Responsive SVG Chart */}
          <div className="h-56 w-full pt-4 relative">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible" preserveAspectRatio="none">
              <defs>
                <linearGradient id="eqGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#12d6a0" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#5c7cff" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="eqLine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#12d6a0" />
                  <stop offset="60%" stopColor="#5c7cff" />
                  <stop offset="100%" stopColor="#93a5ff" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="30" x2={width} y2="30" stroke="currentColor" strokeOpacity="0.08" strokeDasharray="3 3" />
              <line x1="0" y1="80" x2={width} y2="80" stroke="currentColor" strokeOpacity="0.08" strokeDasharray="3 3" />
              <line x1="0" y1="130" x2={width} y2="130" stroke="currentColor" strokeOpacity="0.08" strokeDasharray="3 3" />

              {/* Area polygon */}
              {equityPoints.length > 1 && (
                <polygon
                  points={`0,${height} ${pointsString} ${width},${height}`}
                  fill="url(#eqGrad)"
                />
              )}

              {/* Polyline */}
              {equityPoints.length > 1 && (
                <polyline
                  points={pointsString}
                  fill="none"
                  stroke="url(#eqLine)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {/* Point Circles */}
              {equityPoints.map((pt, idx) => {
                const x = (idx / (equityPoints.length - 1 || 1)) * width;
                const y = height - ((pt.balance - minBalance) / range) * (height - 30) - 15;
                return (
                  <circle
                    key={idx}
                    cx={x}
                    cy={y}
                    r={idx === equityPoints.length - 1 ? 5 : 3.5}
                    fill={idx === equityPoints.length - 1 ? '#12d6a0' : '#5c7cff'}
                    className="hover:scale-150 transition-transform cursor-pointer"
                  >
                    <title>{`${pt.label}: $${pt.balance.toLocaleString()}`}</title>
                  </circle>
                );
              })}
            </svg>
          </div>

          <div className="flex justify-between items-center text-[11px] text-foreground/50 border-t border-border mt-4 pt-3 font-mono">
            <span>Starting: ${(account ? account.initialBalance : 100000).toLocaleString()}</span>
            <span>Current: ${(account ? account.balance : 108420).toLocaleString()}</span>
          </div>
        </div>

        {/* Sessions & Edge Breakdown */}
        <div className="glass-card p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-foreground mb-1">Session Profitability</h3>
            <p className="text-xs text-foreground/60 mb-4">Win rate & performance by market window</p>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>London Session (07:00 - 15:00 UTC)</span>
                  <span className="text-brand-teal font-mono">82% Win Rate</span>
                </div>
                <div className="w-full bg-background rounded-full h-2 overflow-hidden border border-border">
                  <div className="bg-gradient-brand h-full rounded-full" style={{ width: '82%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>New York Session (13:00 - 21:00 UTC)</span>
                  <span className="text-brand-blue font-mono">75% Win Rate</span>
                </div>
                <div className="w-full bg-background rounded-full h-2 overflow-hidden border border-border">
                  <div className="bg-brand-blue h-full rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Asian Session (00:00 - 08:00 UTC)</span>
                  <span className="text-foreground/60 font-mono">60% Win Rate</span>
                </div>
                <div className="w-full bg-background rounded-full h-2 overflow-hidden border border-border">
                  <div className="bg-amber-400 h-full rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-border">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground/60 mb-2">Trader Discipline Score</h4>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-7 h-7 text-brand-teal" />
                <div>
                  <span className="text-base font-bold text-foreground">96% Plan Compliance</span>
                  <p className="text-[11px] text-foreground/60">Followed stop loss & risk parameters in 96% of trades</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Trades Table */}
      <div className="glass-card p-6 text-left">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-foreground">Recent Journal Entries</h3>
            <p className="text-xs text-foreground/60">Recently closed positions with full confluences</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-foreground/60 text-xs font-semibold uppercase">
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Symbol</th>
                <th className="py-3 px-3">Direction</th>
                <th className="py-3 px-3">Lots</th>
                <th className="py-3 px-3">Strategy / Setup</th>
                <th className="py-3 px-3">R:R</th>
                <th className="py-3 px-3">Net PnL</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {trades.slice(0, 6).map((trade) => (
                <tr key={trade.id} className="hover:bg-card/50 transition-colors">
                  <td className="py-3 px-3 text-xs font-mono text-foreground/70">{trade.date}</td>
                  <td className="py-3 px-3 font-semibold text-foreground">{trade.symbol}</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${trade.direction === 'LONG' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'}`}>
                      {trade.direction}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-xs font-mono">{trade.lots}</td>
                  <td className="py-3 px-3 text-xs text-foreground/80">{trade.strategy}</td>
                  <td className="py-3 px-3 text-xs font-mono">{trade.rr > 0 ? `1:${trade.rr}` : `${trade.rr}R`}</td>
                  <td className={`py-3 px-3 font-mono font-bold ${trade.pnl > 0 ? 'text-emerald-400' : (trade.pnl < 0 ? 'text-red-400' : 'text-foreground/60')}`}>
                    {trade.pnl > 0 ? `+$${trade.pnl.toLocaleString()}` : (trade.pnl < 0 ? `-$${Math.abs(trade.pnl).toLocaleString()}` : '$0.00')}
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${trade.status === 'WIN' ? 'bg-emerald-500/15 text-emerald-400' : (trade.status === 'LOSS' ? 'bg-red-500/15 text-red-400' : 'bg-foreground/10 text-foreground/70')}`}>
                      {trade.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => onViewTrade(trade)}
                      className="px-2.5 py-1 text-xs rounded-lg border border-border hover:border-brand-teal/40 transition-colors"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
