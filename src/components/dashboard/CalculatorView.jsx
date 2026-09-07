import React, { useState } from 'react';
import { Calculator, Copy, Check, ShieldCheck, DollarSign, Percent, AlertCircle } from 'lucide-react';

export default function CalculatorView({ account }) {
  const [instrument, setInstrument] = useState('EURUSD');
  const [balance, setBalance] = useState(account ? account.balance : 100000);
  const [riskPercent, setRiskPercent] = useState(1.0);
  const [stopLossPips, setStopLossPips] = useState(15);
  const [copied, setCopied] = useState(false);

  // Position Size Calculation logic
  // Cash at Risk = Balance * (RiskPercent / 100)
  const cashAtRisk = balance * (riskPercent / 100);

  // Pip value and lot sizing by instrument
  let lotSize = 0;
  let pipValuePerStandardLot = 10; // Default Forex 1 lot = $10/pip

  if (instrument === 'EURUSD' || instrument === 'GBPUSD' || instrument === 'AUDUSD') {
    pipValuePerStandardLot = 10;
    lotSize = stopLossPips > 0 ? (cashAtRisk / (stopLossPips * pipValuePerStandardLot)) : 0;
  } else if (instrument === 'USDJPY') {
    pipValuePerStandardLot = 6.67; // Approx
    lotSize = stopLossPips > 0 ? (cashAtRisk / (stopLossPips * pipValuePerStandardLot)) : 0;
  } else if (instrument === 'XAUUSD') {
    // 1 standard lot = 100 oz. 1 point ($1 move) = $100. 1 pip (0.10) = $10
    pipValuePerStandardLot = 10;
    lotSize = stopLossPips > 0 ? (cashAtRisk / (stopLossPips * 10)) : 0;
  } else if (instrument === 'NAS100' || instrument === 'US30') {
    // 1 lot = $1 per point
    lotSize = stopLossPips > 0 ? (cashAtRisk / stopLossPips) : 0;
  } else if (instrument === 'BTCUSD') {
    // 1 lot = 1 BTC
    lotSize = stopLossPips > 0 ? (cashAtRisk / stopLossPips) : 0;
  }

  const formattedLotSize = lotSize > 0 ? lotSize.toFixed(2) : '0.00';

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedLotSize);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 text-left animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          Position Size & Risk Calculator
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-brand-blue/10 text-brand-blue font-semibold">
            Precision Sizing
          </span>
        </h2>
        <p className="text-xs text-foreground/60 mt-1">
          Calculate precise lot sizes to never risk a single dollar more than your daily plan allows
        </p>
      </div>

      {/* Main Calculator Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Parameters */}
        <div className="glass-card p-6 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-foreground/60 border-b border-border pb-2 flex items-center gap-2">
            <Calculator className="w-4 h-4 text-brand-blue" />
            Trade Parameters
          </h3>

          {/* Instrument */}
          <div>
            <label className="block text-xs font-semibold uppercase text-foreground/60 mb-1">Instrument</label>
            <select
              value={instrument}
              onChange={(e) => setInstrument(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground font-semibold focus:outline-none focus:border-brand-teal"
            >
              <option value="EURUSD">EURUSD (Forex Major)</option>
              <option value="GBPUSD">GBPUSD (Forex Major)</option>
              <option value="USDJPY">USDJPY (Forex Major)</option>
              <option value="XAUUSD">XAUUSD (Gold Spot)</option>
              <option value="US30">US30 (Dow Jones)</option>
              <option value="NAS100">NAS100 (Nasdaq)</option>
              <option value="BTCUSD">BTCUSD (Bitcoin)</option>
            </select>
          </div>

          {/* Account Balance */}
          <div>
            <label className="block text-xs font-semibold uppercase text-foreground/60 mb-1">Account Balance ($)</label>
            <input
              type="number"
              value={balance}
              onChange={(e) => setBalance(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground font-mono font-bold focus:outline-none focus:border-brand-teal"
              placeholder="100000"
            />
          </div>

          {/* Risk Percentage */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold uppercase text-foreground/60">Risk Percentage</label>
              <span className="text-xs font-bold text-brand-teal font-mono">{riskPercent}% (${cashAtRisk.toLocaleString()})</span>
            </div>

            <div className="grid grid-cols-4 gap-2 mb-2">
              {[0.5, 1.0, 1.5, 2.0].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setRiskPercent(pct)}
                  className={`py-1.5 rounded-xl border border-border text-xs font-bold transition-all ${
                    riskPercent === pct
                      ? 'bg-foreground text-background shadow-sm'
                      : 'bg-background hover:bg-card text-foreground/70'
                  }`}
                >
                  {pct}%
                </button>
              ))}
            </div>

            <input
              type="range"
              min="0.1"
              max="5"
              step="0.1"
              value={riskPercent}
              onChange={(e) => setRiskPercent(Number(e.target.value))}
              className="w-full accent-brand-teal mt-1"
            />
          </div>

          {/* Stop Loss in Pips */}
          <div>
            <label className="block text-xs font-semibold uppercase text-foreground/60 mb-1">
              Stop Loss ({instrument.includes('NAS') || instrument.includes('US30') ? 'Points' : 'Pips'})
            </label>
            <input
              type="number"
              step="any"
              value={stopLossPips}
              onChange={(e) => setStopLossPips(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground font-mono font-bold focus:outline-none focus:border-brand-teal"
              placeholder="e.g. 15"
            />
          </div>
        </div>

        {/* Calculated Result Card */}
        <div className="glass-card p-6 flex flex-col justify-between border-brand-teal/40">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground/60 border-b border-border pb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-teal" />
              Calculated Execution Sizing
            </h3>

            {/* Big Lot Size Display */}
            <div className="mt-8 text-center p-6 rounded-2xl bg-card border border-border">
              <span className="text-xs uppercase font-semibold text-foreground/60 block">Recommended Position Size</span>
              <div className="text-5xl font-bold text-gradient-brand font-mono my-2 flex items-center justify-center gap-2">
                {formattedLotSize}
                <span className="text-lg text-foreground/50 font-normal">Lots</span>
              </div>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl border border-border hover:bg-background text-xs font-semibold text-foreground/80 mt-2 transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-brand-teal" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied to Clipboard!' : 'Copy Lot Size'}
              </button>
            </div>

            {/* Breakdown */}
            <div className="mt-6 space-y-2.5 text-xs font-mono">
              <div className="flex justify-between p-2 rounded-lg bg-background/50 border border-border">
                <span className="text-foreground/60 font-sans">Total Dollar Risk:</span>
                <span className="font-bold text-red-400">-${cashAtRisk.toLocaleString()} ({riskPercent}%)</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-background/50 border border-border">
                <span className="text-foreground/60 font-sans">Stop Loss Distance:</span>
                <span className="font-bold text-foreground">{stopLossPips} pips / points</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-background/50 border border-border">
                <span className="text-foreground/60 font-sans">Pip Value at This Size:</span>
                <span className="font-bold text-foreground">${((cashAtRisk / (stopLossPips || 1)) || 0).toFixed(2)} / pip</span>
              </div>
            </div>
          </div>

          <div className="mt-6 p-3 rounded-xl bg-brand-teal/10 border border-brand-teal/20 text-[11px] text-brand-teal flex items-start gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>Always verify broker contract specifications and leverage limits before placing orders.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
