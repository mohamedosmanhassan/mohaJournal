import React from 'react';
import { X, Calendar, Clock, TrendingUp, CheckCircle, AlertCircle, Edit2, Trash2, ExternalLink } from 'lucide-react';

export default function TradeDetailModal({ trade, isOpen, onClose, onEdit, onDelete }) {
  if (!isOpen || !trade) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto text-left">
      <div className="relative w-full max-w-2xl rounded-3xl border border-border bg-background p-6 sm:p-8 shadow-premium my-8">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-border pb-4 mb-6">
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-xl text-xs font-bold ${trade.direction === 'LONG' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
              {trade.direction}
            </span>
            <div>
              <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
                {trade.symbol}
                <span className={`text-sm font-mono px-2 py-0.5 rounded-full ${trade.pnl > 0 ? 'bg-emerald-500/15 text-emerald-400 font-bold' : (trade.pnl < 0 ? 'bg-red-500/15 text-red-400 font-bold' : 'bg-card text-foreground/70')}`}>
                  {trade.pnl > 0 ? `+$${Number(trade.pnl).toLocaleString()}` : (trade.pnl < 0 ? `-$${Math.abs(Number(trade.pnl)).toLocaleString()}` : '$0.00')}
                </span>
              </h3>
              <p className="text-xs text-foreground/60 flex items-center gap-2 mt-1">
                <Calendar className="w-3.5 h-3.5" />
                {trade.date}
                <span>•</span>
                <Clock className="w-3.5 h-3.5" />
                {trade.session} Session
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl border border-border text-foreground/60 hover:text-foreground hover:bg-card transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Trade Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="glass-card p-3">
            <span className="text-[10px] uppercase font-semibold text-foreground/60">Entry Price</span>
            <div className="text-sm font-bold font-mono text-foreground mt-0.5">{trade.entryPrice}</div>
          </div>
          <div className="glass-card p-3">
            <span className="text-[10px] uppercase font-semibold text-foreground/60">Exit Price</span>
            <div className="text-sm font-bold font-mono text-foreground mt-0.5">{trade.exitPrice}</div>
          </div>
          <div className="glass-card p-3">
            <span className="text-[10px] uppercase font-semibold text-foreground/60">Stop Loss</span>
            <div className="text-sm font-bold font-mono text-foreground mt-0.5">{trade.stopLoss}</div>
          </div>
          <div className="glass-card p-3">
            <span className="text-[10px] uppercase font-semibold text-foreground/60">R:R Achieved</span>
            <div className="text-sm font-bold font-mono text-brand-teal mt-0.5">
              {trade.rr > 0 ? `1:${trade.rr}` : `${trade.rr}R`}
            </div>
          </div>
        </div>

        {/* Strategy & Psychology */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-2xl border border-border bg-card/40">
            <span className="text-[11px] font-semibold uppercase text-foreground/60 block mb-1">Strategy / Model</span>
            <span className="text-sm font-bold text-foreground">{trade.strategy}</span>
            <span className="block text-xs text-foreground/60 mt-1">Lots: {trade.lots} Contracts</span>
          </div>

          <div className="p-4 rounded-2xl border border-border bg-card/40">
            <span className="text-[11px] font-semibold uppercase text-foreground/60 block mb-1">Trader Discipline</span>
            <div className="flex items-center gap-2">
              {trade.followedRules ? (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400">
                  <CheckCircle className="w-4 h-4" /> Plan Followed
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-400">
                  <AlertCircle className="w-4 h-4" /> Rule Deviation
                </span>
              )}
            </div>
            <span className="block text-xs text-foreground/60 mt-1">Emotion: {trade.emotions || 'Neutral'}</span>
          </div>
        </div>

        {/* Screenshot if available */}
        {trade.screenshot && (
          <div className="mb-6">
            <span className="text-[11px] font-semibold uppercase text-foreground/60 block mb-2">Trade Chart Screenshot</span>
            <div className="rounded-2xl border border-border overflow-hidden bg-card">
              <img
                src={trade.screenshot}
                alt={`${trade.symbol} trade screenshot`}
                className="w-full max-h-64 object-cover"
              />
            </div>
          </div>
        )}

        {/* Notes */}
        {trade.notes && (
          <div className="p-4 rounded-2xl border border-border bg-card/50 mb-6">
            <span className="text-[11px] font-semibold uppercase text-foreground/60 block mb-1">Debrief & Notes</span>
            <p className="text-xs text-foreground/80 leading-relaxed whitespace-pre-wrap">{trade.notes}</p>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <button
            onClick={() => { onDelete(trade.id); onClose(); }}
            className="px-4 py-2 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete Trade
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => { onEdit(trade); onClose(); }}
              className="px-4 py-2 rounded-xl border border-border hover:bg-card text-xs font-semibold text-foreground flex items-center gap-1.5 transition-colors"
            >
              <Edit2 className="w-3.5 h-3.5 text-brand-blue" />
              Edit
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-foreground text-background text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
