import React, { useState, useEffect } from 'react';
import { X, Check, Calculator, Sparkles, Image as ImageIcon } from 'lucide-react';

export default function TradeModal({ isOpen, onClose, onSaveTrade, initialTrade }) {
  const [formData, setFormData] = useState({
    symbol: 'EURUSD',
    direction: 'LONG',
    entryPrice: '',
    exitPrice: '',
    stopLoss: '',
    takeProfit: '',
    lots: '1.0',
    pnl: '',
    rr: '2.0',
    status: 'WIN',
    date: new Date().toISOString().slice(0, 16).replace('T', ' '),
    session: 'London',
    strategy: 'SMC Liquidity Sweep',
    emotions: 'Disciplined & Calm',
    followedRules: true,
    notes: '',
    screenshot: ''
  });

  useEffect(() => {
    if (initialTrade) {
      setFormData(initialTrade);
    } else {
      setFormData({
        symbol: 'EURUSD',
        direction: 'LONG',
        entryPrice: '',
        exitPrice: '',
        stopLoss: '',
        takeProfit: '',
        lots: '1.0',
        pnl: '',
        rr: '2.0',
        status: 'WIN',
        date: new Date().toISOString().slice(0, 16).replace('T', ' '),
        session: 'London',
        strategy: 'SMC Liquidity Sweep',
        emotions: 'Disciplined & Calm',
        followedRules: true,
        notes: '',
        screenshot: ''
      });
    }
  }, [initialTrade, isOpen]);

  // Auto-calculate PnL and R:R when prices change
  const handlePriceChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    const entry = Number(field === 'entryPrice' ? value : updated.entryPrice);
    const exit = Number(field === 'exitPrice' ? value : updated.exitPrice);
    const sl = Number(field === 'stopLoss' ? value : updated.stopLoss);
    const lots = Number(field === 'lots' ? value : updated.lots) || 1.0;

    if (entry && exit && sl) {
      const isLong = updated.direction === 'LONG';
      const riskPips = Math.abs(entry - sl);
      const rewardPips = Math.abs(exit - entry);
      const calculatedRR = riskPips > 0 ? (rewardPips / riskPips).toFixed(2) : 0;
      
      const isWin = isLong ? exit > entry : entry > exit;
      const multiplier = updated.symbol.includes('XAU') ? 100 : (updated.symbol.includes('JPY') ? 1000 : 100000);
      
      // Estimated PnL if not manually typed
      if (!updated.pnl || field === 'exitPrice') {
        const pnlCalc = isLong ? (exit - entry) * lots * (multiplier / 10) : (entry - exit) * lots * (multiplier / 10);
        updated.pnl = Math.round(pnlCalc);
        updated.status = pnlCalc > 0 ? 'WIN' : (pnlCalc < 0 ? 'LOSS' : 'BE');
      }
      updated.rr = calculatedRR;
    }

    setFormData(updated);
  };

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.symbol || !formData.entryPrice) {
      alert('Please fill out the required trade symbol and entry price.');
      return;
    }

    onSaveTrade({
      ...formData,
      id: initialTrade ? initialTrade.id : `tr-${Date.now()}`,
      pnl: Number(formData.pnl) || 0,
      rr: Number(formData.rr) || 0,
      lots: Number(formData.lots) || 1.0,
      entryPrice: Number(formData.entryPrice) || 0,
      exitPrice: Number(formData.exitPrice) || 0,
      stopLoss: Number(formData.stopLoss) || 0,
      takeProfit: Number(formData.takeProfit) || 0
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl border border-border bg-background p-6 sm:p-8 shadow-premium text-left my-8">
        <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
          <div>
            <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-teal" />
              {initialTrade ? 'Edit Trade Entry' : 'Log New Trade Execution'}
            </h3>
            <p className="text-xs text-foreground/60 mt-0.5">
              Record execution details, confluence setups, and psychological state
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl border border-border text-foreground/60 hover:text-foreground hover:bg-card transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Row 1: Symbol, Direction, Lots, Session */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-[11px] font-semibold uppercase text-foreground/60 mb-1">Symbol / Pair</label>
              <select
                value={formData.symbol}
                onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-border bg-card text-xs text-foreground font-semibold focus:outline-none focus:border-brand-teal"
              >
                <option value="EURUSD">EURUSD</option>
                <option value="GBPUSD">GBPUSD</option>
                <option value="USDJPY">USDJPY</option>
                <option value="XAUUSD">XAUUSD (Gold)</option>
                <option value="NAS100">NAS100</option>
                <option value="US30">US30 (Dow)</option>
                <option value="BTCUSD">BTCUSD</option>
                <option value="ETHUSD">ETHUSD</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase text-foreground/60 mb-1">Direction</label>
              <div className="flex rounded-xl border border-border bg-card p-0.5">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, direction: 'LONG' })}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${formData.direction === 'LONG' ? 'bg-emerald-500 text-white shadow-sm' : 'text-foreground/60'}`}
                >
                  BUY
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, direction: 'SHORT' })}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${formData.direction === 'SHORT' ? 'bg-red-500 text-white shadow-sm' : 'text-foreground/60'}`}
                >
                  SELL
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase text-foreground/60 mb-1">Lots / Size</label>
              <input
                type="number"
                step="0.01"
                value={formData.lots}
                onChange={(e) => handlePriceChange('lots', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-border bg-card text-xs text-foreground font-mono focus:outline-none focus:border-brand-teal"
                placeholder="1.0"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase text-foreground/60 mb-1">Session</label>
              <select
                value={formData.session}
                onChange={(e) => setFormData({ ...formData, session: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-border bg-card text-xs text-foreground font-semibold focus:outline-none focus:border-brand-teal"
              >
                <option value="London">London (07:00-15:00)</option>
                <option value="New York">New York (13:00-21:00)</option>
                <option value="Asian">Asian (00:00-08:00)</option>
              </select>
            </div>
          </div>

          {/* Row 2: Entry, Exit, Stop Loss, Take Profit */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-[11px] font-semibold uppercase text-foreground/60 mb-1">Entry Price *</label>
              <input
                type="number"
                step="any"
                value={formData.entryPrice}
                onChange={(e) => handlePriceChange('entryPrice', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-border bg-card text-xs text-foreground font-mono focus:outline-none focus:border-brand-teal"
                placeholder="1.0850"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase text-foreground/60 mb-1">Exit Price</label>
              <input
                type="number"
                step="any"
                value={formData.exitPrice}
                onChange={(e) => handlePriceChange('exitPrice', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-border bg-card text-xs text-foreground font-mono focus:outline-none focus:border-brand-teal"
                placeholder="1.0920"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase text-foreground/60 mb-1">Stop Loss</label>
              <input
                type="number"
                step="any"
                value={formData.stopLoss}
                onChange={(e) => handlePriceChange('stopLoss', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-border bg-card text-xs text-foreground font-mono focus:outline-none focus:border-brand-teal"
                placeholder="1.0820"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase text-foreground/60 mb-1">Take Profit</label>
              <input
                type="number"
                step="any"
                value={formData.takeProfit}
                onChange={(e) => handlePriceChange('takeProfit', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-border bg-card text-xs text-foreground font-mono focus:outline-none focus:border-brand-teal"
                placeholder="1.0950"
              />
            </div>
          </div>

          {/* Row 3: PnL, R:R, Status, Strategy */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-[11px] font-semibold uppercase text-foreground/60 mb-1">Profit / Loss ($)</label>
              <input
                type="number"
                step="any"
                value={formData.pnl}
                onChange={(e) => setFormData({ ...formData, pnl: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-border bg-card text-xs font-mono font-bold focus:outline-none focus:border-brand-teal"
                placeholder="e.g. 2450 or -500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase text-foreground/60 mb-1">R:R Ratio</label>
              <input
                type="number"
                step="0.01"
                value={formData.rr}
                onChange={(e) => setFormData({ ...formData, rr: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-border bg-card text-xs text-foreground font-mono focus:outline-none focus:border-brand-teal"
                placeholder="2.5"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase text-foreground/60 mb-1">Outcome</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-border bg-card text-xs text-foreground font-bold focus:outline-none focus:border-brand-teal"
              >
                <option value="WIN">WIN (Profit)</option>
                <option value="LOSS">LOSS (Stop Hit)</option>
                <option value="BE">BE (Breakeven)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase text-foreground/60 mb-1">Setup / Strategy</label>
              <select
                value={formData.strategy}
                onChange={(e) => setFormData({ ...formData, strategy: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-border bg-card text-xs text-foreground font-semibold focus:outline-none focus:border-brand-teal"
              >
                <option value="SMC Liquidity Sweep">SMC Liquidity Sweep</option>
                <option value="Order Block Rejection">Order Block Rejection</option>
                <option value="FVG Displacement">FVG Displacement</option>
                <option value="Break & Retest">Break & Retest</option>
                <option value="London Open Breakout">London Open Breakout</option>
                <option value="Trend Continuation">Trend Continuation</option>
              </select>
            </div>
          </div>

          {/* Row 4: Psychology & Rules */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-2xl border border-border bg-card/40">
            <div>
              <label className="block text-[11px] font-semibold uppercase text-foreground/60 mb-1">Trader Mindset & Emotion</label>
              <select
                value={formData.emotions}
                onChange={(e) => setFormData({ ...formData, emotions: e.target.value })}
                className="w-full px-3 py-1.5 rounded-xl border border-border bg-background text-xs text-foreground font-medium focus:outline-none focus:border-brand-teal"
              >
                <option value="Disciplined & Calm">Disciplined & Calm (A+ Execution)</option>
                <option value="Patient Execution">Patient Execution</option>
                <option value="Slight FOMO">Slight FOMO (Premature)</option>
                <option value="Revenge Trade">Revenge Trade (Emotional)</option>
                <option value="Hesitated to Enter">Hesitated to Enter</option>
                <option value="Overleveraged">Overleveraged</option>
              </select>
            </div>

            <div className="flex items-center gap-3 pt-4 sm:pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-foreground">
                <input
                  type="checkbox"
                  checked={formData.followedRules}
                  onChange={(e) => setFormData({ ...formData, followedRules: e.target.checked })}
                  className="w-4 h-4 rounded text-brand-teal focus:ring-brand-teal"
                />
                <span>Followed Trading Plan & Risk Limits</span>
              </label>
            </div>
          </div>

          {/* Row 5: Screenshot Link */}
          <div>
            <label className="block text-[11px] font-semibold uppercase text-foreground/60 mb-1 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-brand-teal" />
              Chart Screenshot URL
            </label>
            <input
              type="url"
              value={formData.screenshot}
              onChange={(e) => setFormData({ ...formData, screenshot: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-border bg-card text-xs text-foreground focus:outline-none focus:border-brand-teal"
              placeholder="e.g. TradingView chart link or image URL"
            />
          </div>

          {/* Row 6: Notes */}
          <div>
            <label className="block text-[11px] font-semibold uppercase text-foreground/60 mb-1">Execution Notes & Debrief</label>
            <textarea
              rows="3"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-border bg-card text-xs text-foreground focus:outline-none focus:border-brand-teal"
              placeholder="What confluences were present? How was execution managed? Any lessons learned?"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl border border-border hover:bg-card text-xs font-semibold text-foreground/70 hover:text-foreground transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-brand-primary px-6 py-2 text-xs font-bold flex items-center gap-1.5 shadow-md"
            >
              <Check className="w-4 h-4" />
              {initialTrade ? 'Save Changes' : 'Record Trade'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
