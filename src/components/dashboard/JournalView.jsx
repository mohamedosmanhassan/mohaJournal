import React, { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  Upload,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  ChevronDown,
  Eye,
  CheckCircle2,
  XCircle,
  FileSpreadsheet
} from 'lucide-react';

export default function JournalView({
  trades,
  onOpenTradeModal,
  onViewTrade,
  onDeleteTrade,
  onImportTrades
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [symbolFilter, setSymbolFilter] = useState('ALL');

  // Filter Trades
  const filteredTrades = trades.filter((trade) => {
    const matchesSearch =
      trade.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trade.strategy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (trade.notes && trade.notes.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'ALL' || trade.status === statusFilter;
    const matchesSymbol = symbolFilter === 'ALL' || trade.symbol === symbolFilter;

    return matchesSearch && matchesStatus && matchesSymbol;
  });

  // Extract unique symbols for dropdown
  const uniqueSymbols = Array.from(new Set(trades.map((t) => t.symbol)));

  // Export to real CSV file
  const handleExportCSV = () => {
    if (trades.length === 0) {
      alert('No trades available to export.');
      return;
    }

    const headers = [
      'ID',
      'Date',
      'Symbol',
      'Direction',
      'Entry Price',
      'Exit Price',
      'Stop Loss',
      'Take Profit',
      'Lots',
      'PnL ($)',
      'Risk:Reward',
      'Status',
      'Session',
      'Strategy',
      'Emotions',
      'Notes'
    ];

    const rows = trades.map((t) => [
      t.id,
      `"${t.date}"`,
      t.symbol,
      t.direction,
      t.entryPrice,
      t.exitPrice,
      t.stopLoss,
      t.takeProfit,
      t.lots,
      t.pnl,
      t.rr,
      t.status,
      t.session,
      `"${t.strategy}"`,
      `"${t.emotions || ''}"`,
      `"${(t.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `RyzeLog_Trades_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle CSV Import
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target.result;
        const lines = text.split('\n').filter((l) => l.trim().length > 0);
        if (lines.length <= 1) return;

        const imported = lines.slice(1).map((line, idx) => {
          const parts = line.split(',');
          return {
            id: `imp-${Date.now()}-${idx}`,
            symbol: parts[2] ? parts[2].replace(/"/g, '').trim() : 'EURUSD',
            direction: parts[3] ? parts[3].trim() : 'LONG',
            entryPrice: Number(parts[4]) || 1.0,
            exitPrice: Number(parts[5]) || 1.0,
            stopLoss: Number(parts[6]) || 0.9,
            takeProfit: Number(parts[7]) || 1.1,
            lots: Number(parts[8]) || 1.0,
            pnl: Number(parts[9]) || 0,
            rr: Number(parts[10]) || 2.0,
            status: parts[11] ? parts[11].trim() : 'WIN',
            date: parts[1] ? parts[1].replace(/"/g, '').trim() : new Date().toISOString().slice(0, 16).replace('T', ' '),
            session: parts[12] ? parts[12].trim() : 'London',
            strategy: parts[13] ? parts[13].replace(/"/g, '').trim() : 'Manual Trade',
            emotions: 'Imported',
            notes: parts[15] ? parts[15].replace(/"/g, '').trim() : ''
          };
        });

        onImportTrades(imported);
        alert(`Successfully imported ${imported.length} trades!`);
      } catch (err) {
        alert('Error parsing CSV file. Ensure format matches RyzeLog exports.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6 text-left animate-fade-in">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            Trading Journal
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-card border border-border text-foreground/70 font-mono">
              {filteredTrades.length} of {trades.length} Records
            </span>
          </h2>
          <p className="text-xs text-foreground/60 mt-1">
            Log, categorize, filter, and audit every execution with full trade psychology
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* CSV Import */}
          <label className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-border bg-card/60 hover:bg-card text-xs font-semibold text-foreground/80 hover:text-foreground transition-all">
            <Upload className="w-3.5 h-3.5 text-brand-blue" />
            <span>Import CSV</span>
            <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
          </label>

          {/* CSV Export */}
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-border bg-card/60 hover:bg-card text-xs font-semibold text-foreground/80 hover:text-foreground transition-all"
          >
            <Download className="w-3.5 h-3.5 text-brand-teal" />
            <span>Export CSV</span>
          </button>

          {/* Log New Trade */}
          <button
            onClick={onOpenTradeModal}
            className="btn-brand-primary flex items-center gap-1.5 px-4 py-2 text-xs font-semibold shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Log Trade</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card p-4 flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-foreground/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search symbol, setup, notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-border bg-background/50 text-xs text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-brand-teal/50"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Outcome Filter */}
          <div className="flex items-center rounded-xl border border-border bg-background/50 p-1 text-xs">
            {['ALL', 'WIN', 'LOSS', 'BE'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  statusFilter === status
                    ? 'bg-foreground text-background shadow-sm'
                    : 'text-foreground/60 hover:text-foreground'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Symbol Select */}
          <select
            value={symbolFilter}
            onChange={(e) => setSymbolFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-border bg-background/50 text-xs text-foreground font-semibold focus:outline-none"
          >
            <option value="ALL">All Symbols</option>
            {uniqueSymbols.map((sym) => (
              <option key={sym} value={sym}>{sym}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Trades Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-card/40 text-foreground/60 text-xs font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-4">Date & Time</th>
                <th className="py-3.5 px-4">Symbol</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Entry / Exit</th>
                <th className="py-3.5 px-4">Stop Loss</th>
                <th className="py-3.5 px-4">Lots</th>
                <th className="py-3.5 px-4">Strategy / Setup</th>
                <th className="py-3.5 px-4">R:R</th>
                <th className="py-3.5 px-4">Net PnL</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredTrades.length === 0 ? (
                <tr>
                  <td colSpan="11" className="py-12 text-center text-foreground/50 text-sm">
                    No trades match your search criteria. Click "+ Log Trade" to record an entry.
                  </td>
                </tr>
              ) : (
                filteredTrades.map((trade) => (
                  <tr key={trade.id} className="hover:bg-card/60 transition-colors group">
                    <td className="py-3.5 px-4 text-xs font-mono text-foreground/70">{trade.date}</td>
                    <td className="py-3.5 px-4 font-bold text-foreground flex items-center gap-1.5">
                      {trade.symbol}
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-card border border-border text-foreground/60">
                        {trade.session}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${trade.direction === 'LONG' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'}`}>
                        {trade.direction}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-xs font-mono">
                      <span>{trade.entryPrice}</span> → <span className="text-foreground/70">{trade.exitPrice}</span>
                    </td>
                    <td className="py-3.5 px-4 text-xs font-mono text-foreground/60">{trade.stopLoss}</td>
                    <td className="py-3.5 px-4 text-xs font-mono font-semibold">{trade.lots}</td>
                    <td className="py-3.5 px-4 text-xs">
                      <span className="px-2 py-0.5 rounded-md bg-card border border-border text-foreground/80 font-medium">
                        {trade.strategy}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-xs font-mono font-semibold">
                      {trade.rr > 0 ? `1:${trade.rr}` : `${trade.rr}R`}
                    </td>
                    <td className={`py-3.5 px-4 font-mono font-bold ${trade.pnl > 0 ? 'text-emerald-400' : (trade.pnl < 0 ? 'text-red-400' : 'text-foreground/60')}`}>
                      {trade.pnl > 0 ? `+$${Number(trade.pnl).toLocaleString()}` : (trade.pnl < 0 ? `-$${Math.abs(Number(trade.pnl)).toLocaleString()}` : '$0.00')}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        trade.status === 'WIN'
                          ? 'bg-emerald-500/15 text-emerald-400'
                          : trade.status === 'LOSS'
                          ? 'bg-red-500/15 text-red-400'
                          : 'bg-foreground/10 text-foreground/70'
                      }`}>
                        {trade.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onViewTrade(trade)}
                          title="View Trade Details"
                          className="p-1.5 rounded-lg border border-border hover:border-brand-teal/40 text-foreground/70 hover:text-foreground transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteTrade(trade.id)}
                          title="Delete Trade"
                          className="p-1.5 rounded-lg border border-border hover:border-red-500/40 text-red-400/80 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
