import React, { useState } from 'react';
import { BookOpen, Plus, CheckCircle2, ShieldAlert, Sparkles } from 'lucide-react';
import { initialPlaybook } from '../../data/mockData';

export default function NotebookView() {
  const [playbook, setPlaybook] = useState(initialPlaybook);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRule, setNewRule] = useState({
    title: '',
    category: 'Core Model',
    timeframe: '15m',
    rules: '',
    riskPerTrade: '1.0%',
    minRR: '1:2.5'
  });

  const handleAddPlaybook = (e) => {
    e.preventDefault();
    if (!newRule.title) return;

    const entry = {
      id: `pb-${Date.now()}`,
      title: newRule.title,
      category: newRule.category,
      timeframe: newRule.timeframe,
      rules: newRule.rules.split('\n').filter((r) => r.trim().length > 0),
      riskPerTrade: newRule.riskPerTrade,
      minRR: newRule.minRR
    };

    setPlaybook([...playbook, entry]);
    setShowAddModal(false);
    setNewRule({
      title: '',
      category: 'Core Model',
      timeframe: '15m',
      rules: '',
      riskPerTrade: '1.0%',
      minRR: '1:2.5'
    });
  };

  return (
    <div className="space-y-6 text-left animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            Strategy Notebook & Playbook
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-semibold">
              Execution Rules
            </span>
          </h2>
          <p className="text-xs text-foreground/60 mt-1">
            Standard Operating Procedures (SOP) and trading models to keep your trading mechanical
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="btn-brand-primary flex items-center gap-2 px-5 py-2 text-xs font-semibold shadow-md"
        >
          <Plus className="w-4 h-4" />
          Add Playbook Model
        </button>
      </div>

      {/* Cards of Rules */}
      <div className="grid md:grid-cols-2 gap-6">
        {playbook.map((item) => (
          <div key={item.id} className="glass-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-brand-blue/10 text-brand-blue">
                  {item.category}
                </span>
                <span className="text-xs font-mono text-foreground/60">Timeframe: {item.timeframe}</span>
              </div>

              <h3 className="text-lg font-bold text-foreground mb-3">{item.title}</h3>

              <div className="space-y-2 mb-6">
                {item.rules.map((rule, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-foreground/80 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-brand-teal flex-shrink-0 mt-0.5" />
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center text-xs pt-3 border-t border-border font-mono text-foreground/70">
              <span>Risk: <strong>{item.riskPerTrade}</strong></span>
              <span>Min R:R: <strong className="text-brand-teal">{item.minRR}</strong></span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-lg rounded-3xl border border-border bg-background p-6 shadow-premium">
            <h3 className="text-lg font-bold text-foreground mb-4">Add New Strategy Playbook</h3>
            <form onSubmit={handleAddPlaybook} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-foreground/60 mb-1">Model Name</label>
                <input
                  type="text"
                  value={newRule.title}
                  onChange={(e) => setNewRule({ ...newRule, title: e.target.value })}
                  placeholder="e.g. London Sweep & Fair Value Gap"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-card text-xs text-foreground focus:outline-none focus:border-brand-teal"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-foreground/60 mb-1">Category</label>
                  <select
                    value={newRule.category}
                    onChange={(e) => setNewRule({ ...newRule, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-card text-xs text-foreground font-semibold focus:outline-none"
                  >
                    <option value="Core Model">Core Model</option>
                    <option value="Risk Management">Risk Management</option>
                    <option value="Psychology">Psychology</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-foreground/60 mb-1">Timeframe</label>
                  <input
                    type="text"
                    value={newRule.timeframe}
                    onChange={(e) => setNewRule({ ...newRule, timeframe: e.target.value })}
                    placeholder="15m / 1h"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-card text-xs text-foreground focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-foreground/60 mb-1">Execution Rules (One per line)</label>
                <textarea
                  rows="4"
                  value={newRule.rules}
                  onChange={(e) => setNewRule({ ...newRule, rules: e.target.value })}
                  placeholder="1. Wait for Asian sweep&#10;2. Displacement break of structure&#10;3. Enter on 15m FVG"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-card text-xs text-foreground focus:outline-none focus:border-brand-teal"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-border text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-brand-primary px-5 py-2 text-xs font-bold shadow-md"
                >
                  Save Playbook
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
