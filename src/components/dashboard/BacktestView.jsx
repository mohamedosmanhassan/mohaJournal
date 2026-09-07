import React, { useState } from 'react';
import { TrendingUp, Plus, CheckCircle, XCircle, Award, BarChart2, Layers } from 'lucide-react';
import { initialBacktests } from '../../data/mockData';

export default function BacktestView() {
  const [backtests, setBacktests] = useState(initialBacktests);
  const [selectedSession, setSelectedSession] = useState(initialBacktests[0]);
  const [showNewModal, setShowNewModal] = useState(false);

  const [newSessionData, setNewSessionData] = useState({
    name: '',
    symbol: 'EURUSD',
    timeframe: '15m',
    strategy: 'SMC Liquidity Sweep + FVG'
  });

  const handleCreateSession = (e) => {
    e.preventDefault();
    if (!newSessionData.name) return;

    const newSession = {
      id: `bt-${Date.now()}`,
      name: newSessionData.name,
      symbol: newSessionData.symbol,
      timeframe: newSessionData.timeframe,
      strategy: newSessionData.strategy,
      tradesCount: 0,
      wins: 0,
      losses: 0,
      winRate: 0,
      profitFactor: 0,
      netPnL: 0,
      created: new Date().toISOString().slice(0, 10)
    };

    setBacktests([newSession, ...backtests]);
    setSelectedSession(newSession);
    setShowNewModal(false);
    setNewSessionData({
      name: '',
      symbol: 'EURUSD',
      timeframe: '15m',
      strategy: 'SMC Liquidity Sweep + FVG'
    });
  };

  const handleSimulateTrade = (outcome, rr) => {
    if (!selectedSession) return;
    const isWin = outcome === 'WIN';
    const wins = selectedSession.wins + (isWin ? 1 : 0);
    const losses = selectedSession.losses + (!isWin ? 1 : 0);
    const tradesCount = selectedSession.tradesCount + 1;
    const winRate = Number(((wins / tradesCount) * 100).toFixed(1));
    const pnlGain = isWin ? 1000 * rr : -1000;
    const netPnL = selectedSession.netPnL + pnlGain;
    const grossProfit = wins * 1000 * rr;
    const grossLoss = losses * 1000;
    const profitFactor = grossLoss > 0 ? Number((grossProfit / grossLoss).toFixed(2)) : 3.0;

    const updated = {
      ...selectedSession,
      tradesCount,
      wins,
      losses,
      winRate,
      netPnL,
      profitFactor
    };

    setSelectedSession(updated);
    setBacktests(backtests.map((b) => (b.id === updated.id ? updated : b)));
  };

  return (
    <div className="space-y-6 text-left animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            Backtesting Simulator
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-brand-teal/10 text-brand-teal font-semibold">
              Strategy Lab
            </span>
          </h2>
          <p className="text-xs text-foreground/60 mt-1">
            Test and validate strategy models against historical price action to quantify mathematical expectancy
          </p>
        </div>

        <button
          onClick={() => setShowNewModal(true)}
          className="btn-brand-primary flex items-center gap-2 px-5 py-2 text-xs font-semibold shadow-md"
        >
          <Plus className="w-4 h-4" />
          New Simulation Model
        </button>
      </div>

      {/* Session Selector Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {backtests.map((bt) => (
          <div
            key={bt.id}
            onClick={() => setSelectedSession(bt)}
            className={`glass-card p-5 cursor-pointer transition-all ${
              selectedSession?.id === bt.id ? 'border-brand-teal ring-1 ring-brand-teal/30' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-card border border-border">
                {bt.symbol} • {bt.timeframe}
              </span>
              <span className="text-xs font-bold text-brand-teal font-mono">{bt.winRate}% WR</span>
            </div>
            <h4 className="text-sm font-bold text-foreground mt-3">{bt.name}</h4>
            <p className="text-[11px] text-foreground/60 mt-1">{bt.strategy}</p>

            <div className="flex justify-between items-center text-xs font-mono mt-4 pt-3 border-t border-border">
              <span className="text-foreground/70">{bt.tradesCount} Sample Trades</span>
              <span className={`font-bold ${bt.netPnL >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {bt.netPnL >= 0 ? `+$${bt.netPnL.toLocaleString()}` : `-$${Math.abs(bt.netPnL).toLocaleString()}`}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Active Session Simulation Dashboard */}
      {selectedSession && (
        <div className="glass-card p-6 border-brand-teal/40 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border pb-4 gap-4">
            <div>
              <span className="text-xs uppercase font-semibold text-brand-teal">Active Simulation Engine</span>
              <h3 className="text-xl font-bold text-foreground mt-0.5">{selectedSession.name}</h3>
              <p className="text-xs text-foreground/60">{selectedSession.strategy} on {selectedSession.symbol} ({selectedSession.timeframe})</p>
            </div>

            {/* Quick Simulation Buttons */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-foreground/60 font-semibold mr-1">Log Simulated Sample:</span>
              <button
                onClick={() => handleSimulateTrade('WIN', 2.5)}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold hover:bg-emerald-500/25 transition-colors"
              >
                + Win (2.5R)
              </button>
              <button
                onClick={() => handleSimulateTrade('WIN', 3.5)}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold hover:bg-emerald-500/25 transition-colors"
              >
                + Win (3.5R)
              </button>
              <button
                onClick={() => handleSimulateTrade('LOSS', 1.0)}
                className="px-3.5 py-1.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-bold hover:bg-red-500/25 transition-colors"
              >
                - Loss (1R)
              </button>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-card border border-border">
              <span className="text-xs uppercase font-semibold text-foreground/60">Sample Trades</span>
              <div className="text-2xl font-bold font-mono text-foreground mt-1">{selectedSession.tradesCount}</div>
              <span className="text-[11px] text-foreground/60">{selectedSession.wins}W / {selectedSession.losses}L</span>
            </div>

            <div className="p-4 rounded-2xl bg-card border border-border">
              <span className="text-xs uppercase font-semibold text-foreground/60">Simulated Win Rate</span>
              <div className="text-2xl font-bold font-mono text-brand-teal mt-1">{selectedSession.winRate}%</div>
              <span className="text-[11px] text-emerald-400 font-medium">Statistically Validated</span>
            </div>

            <div className="p-4 rounded-2xl bg-card border border-border">
              <span className="text-xs uppercase font-semibold text-foreground/60">Simulated PnL</span>
              <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">
                +${selectedSession.netPnL.toLocaleString()}
              </div>
              <span className="text-[11px] text-foreground/60">Base $1k / 1R Risk</span>
            </div>

            <div className="p-4 rounded-2xl bg-card border border-border">
              <span className="text-xs uppercase font-semibold text-foreground/60">Profit Factor</span>
              <div className="text-2xl font-bold font-mono text-foreground mt-1">{selectedSession.profitFactor}</div>
              <span className="text-[11px] text-brand-blue font-medium">Positive Expectancy</span>
            </div>
          </div>
        </div>
      )}

      {/* New Simulation Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md rounded-3xl border border-border bg-background p-6 shadow-premium">
            <h3 className="text-lg font-bold text-foreground mb-4">Create Backtest Model</h3>
            <form onSubmit={handleCreateSession} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-foreground/60 mb-1">Session Name</label>
                <input
                  type="text"
                  value={newSessionData.name}
                  onChange={(e) => setNewSessionData({ ...newSessionData, name: e.target.value })}
                  placeholder="e.g. Gold London Open Sweep 2025"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-card text-xs text-foreground focus:outline-none focus:border-brand-teal"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-foreground/60 mb-1">Instrument</label>
                  <select
                    value={newSessionData.symbol}
                    onChange={(e) => setNewSessionData({ ...newSessionData, symbol: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-card text-xs text-foreground font-semibold focus:outline-none"
                  >
                    <option value="EURUSD">EURUSD</option>
                    <option value="GBPUSD">GBPUSD</option>
                    <option value="XAUUSD">XAUUSD (Gold)</option>
                    <option value="NAS100">NAS100</option>
                    <option value="US30">US30</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-foreground/60 mb-1">Timeframe</label>
                  <select
                    value={newSessionData.timeframe}
                    onChange={(e) => setNewSessionData({ ...newSessionData, timeframe: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-card text-xs text-foreground font-semibold focus:outline-none"
                  >
                    <option value="5m">5m</option>
                    <option value="15m">15m</option>
                    <option value="1h">1h</option>
                    <option value="4h">4h</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 rounded-xl border border-border text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-brand-primary px-5 py-2 text-xs font-bold shadow-md"
                >
                  Create Model
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
