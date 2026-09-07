import React, { useState } from 'react';
import { Calendar as CalendarIcon, Filter, AlertTriangle, Clock, Globe } from 'lucide-react';
import { initialEconomicEvents } from '../../data/mockData';

export default function CalendarView() {
  const [impactFilter, setImpactFilter] = useState('ALL');
  const [currencyFilter, setCurrencyFilter] = useState('ALL');

  const filteredEvents = initialEconomicEvents.filter((ev) => {
    const matchesImpact = impactFilter === 'ALL' || ev.impact === impactFilter;
    const matchesCurrency = currencyFilter === 'ALL' || ev.currency === currencyFilter;
    return matchesImpact && matchesCurrency;
  });

  return (
    <div className="space-y-6 text-left animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            Economic Calendar
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-semibold">
              Live Macro Data
            </span>
          </h2>
          <p className="text-xs text-foreground/60 mt-1">
            Track major interest rate releases, CPI, and employment reports to protect against slippage
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center rounded-xl border border-border bg-card p-1 text-xs">
            {['ALL', 'HIGH', 'MEDIUM'].map((impact) => (
              <button
                key={impact}
                onClick={() => setImpactFilter(impact)}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  impactFilter === impact
                    ? 'bg-foreground text-background shadow-sm'
                    : 'text-foreground/60 hover:text-foreground'
                }`}
              >
                {impact === 'HIGH' ? '🔴 High Impact' : (impact === 'MEDIUM' ? '🟠 Medium' : 'All')}
              </button>
            ))}
          </div>

          <select
            value={currencyFilter}
            onChange={(e) => setCurrencyFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-border bg-card text-xs text-foreground font-semibold focus:outline-none"
          >
            <option value="ALL">All Currencies</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
          </select>
        </div>
      </div>

      {/* High impact warning box */}
      <div className="p-4 rounded-2xl border border-red-500/20 bg-red-500/5 flex items-center gap-3 text-xs text-red-400">
        <AlertTriangle className="w-5 h-5 flex-shrink-0" />
        <span>
          <strong>Risk Rule:</strong> Avoid entering new market orders within 15 minutes before and after high-impact Red Folder events (CPI, NFP, FOMC).
        </span>
      </div>

      {/* Events Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-card/40 text-foreground/60 text-xs font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-4">Time (UTC)</th>
                <th className="py-3.5 px-4">Currency</th>
                <th className="py-3.5 px-4">Event Name</th>
                <th className="py-3.5 px-4">Impact</th>
                <th className="py-3.5 px-4">Forecast</th>
                <th className="py-3.5 px-4">Previous</th>
                <th className="py-3.5 px-4">Actual</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredEvents.map((ev) => (
                <tr key={ev.id} className="hover:bg-card/50 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-xs font-semibold text-foreground/80 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-foreground/50" />
                    {ev.time}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-md bg-card border border-border font-bold text-xs">
                      {ev.currency}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-foreground">{ev.title}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        ev.impact === 'HIGH'
                          ? 'bg-red-500/15 text-red-400'
                          : 'bg-amber-500/15 text-amber-400'
                      }`}
                    >
                      {ev.impact}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-xs text-foreground/70">{ev.forecast}</td>
                  <td className="py-3.5 px-4 font-mono text-xs text-foreground/50">{ev.previous}</td>
                  <td className="py-3.5 px-4 font-mono text-xs font-bold text-brand-teal">{ev.actual}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
