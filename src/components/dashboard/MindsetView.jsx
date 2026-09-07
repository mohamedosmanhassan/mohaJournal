import React, { useState } from 'react';
import { Brain, Star, Shield, CheckSquare, Plus, Award, AlertTriangle, MessageSquare } from 'lucide-react';

export default function MindsetView({ mindsetLogs, onSaveMindsetLog }) {
  const [showNewLog, setShowNewLog] = useState(false);
  const [formData, setFormData] = useState({
    sleepScore: 5,
    mentalState: 'Calm & Prepared',
    maxRiskLimit: '1.0% ($1,000)',
    preMarketPlan: '',
    rulesFollowed: true,
    followedRiskLimit: true,
    avoidedFOMO: true,
    postMarketReview: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveMindsetLog({
      ...formData,
      id: `ms-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10)
    });
    setShowNewLog(false);
    setFormData({
      sleepScore: 5,
      mentalState: 'Calm & Prepared',
      maxRiskLimit: '1.0% ($1,000)',
      preMarketPlan: '',
      rulesFollowed: true,
      followedRiskLimit: true,
      avoidedFOMO: true,
      postMarketReview: ''
    });
  };

  return (
    <div className="space-y-6 text-left animate-fade-in">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            Daily Mindset & Routines
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-brand-blue/10 text-brand-blue font-semibold">
              Psychology
            </span>
          </h2>
          <p className="text-xs text-foreground/60 mt-1">
            Build unshakeable emotional discipline, set risk boundaries, and review your daily execution habits
          </p>
        </div>

        <button
          onClick={() => setShowNewLog(!showNewLog)}
          className="btn-brand-primary flex items-center gap-2 px-5 py-2 text-xs font-semibold shadow-md"
        >
          <Plus className="w-4 h-4" />
          {showNewLog ? 'Close Form' : 'New Daily Check-in'}
        </button>
      </div>

      {/* Psychology Highlights Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-brand text-white grid place-items-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase font-semibold text-foreground/60">Discipline Streak</span>
              <div className="text-2xl font-bold text-foreground mt-0.5">5 Days</div>
            </div>
          </div>
          <p className="text-[11px] text-brand-teal mt-3">Zero revenge trades or overleveraging this week.</p>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-blue/10 text-brand-blue grid place-items-center font-bold">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase font-semibold text-foreground/60">Average Mental State</span>
              <div className="text-2xl font-bold text-foreground mt-0.5">Calm & Focused</div>
            </div>
          </div>
          <p className="text-[11px] text-foreground/60 mt-3">88% of days traded in optimal emotional state.</p>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 grid place-items-center font-bold">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase font-semibold text-foreground/60">Risk Rule Adherence</span>
              <div className="text-2xl font-bold text-foreground mt-0.5">100% Compliance</div>
            </div>
          </div>
          <p className="text-[11px] text-foreground/60 mt-3">Hard stop limit of 1.0% per trade respected.</p>
        </div>
      </div>

      {/* New Check-in Form Modal / Drawer */}
      {showNewLog && (
        <form onSubmit={handleSubmit} className="glass-card p-6 border-brand-blue/30 space-y-4">
          <h3 className="text-lg font-bold text-foreground border-b border-border pb-3 flex items-center gap-2">
            <Brain className="w-5 h-5 text-brand-blue" />
            Today's Pre-Market & Routine Check-in
          </h3>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-foreground/60 mb-1">Sleep & Energy (1 to 5 Stars)</label>
              <div className="flex gap-2 items-center mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, sleepScore: star })}
                    className={`p-2 rounded-xl border border-border transition-colors ${
                      formData.sleepScore >= star ? 'bg-amber-400/20 text-amber-400 border-amber-400/40' : 'text-foreground/30'
                    }`}
                  >
                    <Star className="w-4 h-4 fill-current" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-foreground/60 mb-1">Current Mindset</label>
              <select
                value={formData.mentalState}
                onChange={(e) => setFormData({ ...formData, mentalState: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-border bg-background text-xs text-foreground font-semibold focus:outline-none"
              >
                <option value="Calm & Prepared">Calm & Prepared (A+ Focus)</option>
                <option value="Slightly Fatigued">Slightly Fatigued</option>
                <option value="Anxious / Stressed">Anxious / Stressed (Exercise Caution)</option>
                <option value="Overconfident">Overconfident (Watch Risk!)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-foreground/60 mb-1">Max Daily Risk Limit</label>
              <input
                type="text"
                value={formData.maxRiskLimit}
                onChange={(e) => setFormData({ ...formData, maxRiskLimit: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-border bg-background text-xs text-foreground font-semibold focus:outline-none"
                placeholder="e.g. 1% or $1,000"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-foreground/60 mb-1">Session Gameplan</label>
            <textarea
              rows="2"
              value={formData.preMarketPlan}
              onChange={(e) => setFormData({ ...formData, preMarketPlan: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-border bg-background text-xs text-foreground focus:outline-none"
              placeholder="What setups are you waiting for? What price levels must hold?"
              required
            />
          </div>

          <div className="p-3 rounded-2xl border border-border bg-background/50 flex flex-wrap gap-4">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
              <input
                type="checkbox"
                checked={formData.followedRiskLimit}
                onChange={(e) => setFormData({ ...formData, followedRiskLimit: e.target.checked })}
                className="w-4 h-4 rounded text-brand-teal"
              />
              <span>Respect strict stop losses</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
              <input
                type="checkbox"
                checked={formData.avoidedFOMO}
                onChange={(e) => setFormData({ ...formData, avoidedFOMO: e.target.checked })}
                className="w-4 h-4 rounded text-brand-teal"
              />
              <span>No chasing candles or revenge entries</span>
            </label>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-foreground/60 mb-1">Post-Market Reflection (Optional)</label>
            <textarea
              rows="2"
              value={formData.postMarketReview}
              onChange={(e) => setFormData({ ...formData, postMarketReview: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-border bg-background text-xs text-foreground focus:outline-none"
              placeholder="How well did you execute? What could be improved for tomorrow?"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowNewLog(false)}
              className="px-4 py-2 rounded-xl border border-border text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-brand-primary px-6 py-2 text-xs font-bold shadow-md"
            >
              Save Daily Journal
            </button>
          </div>
        </form>
      )}

      {/* Log History */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-foreground">Previous Daily Mindset Journals</h3>

        {mindsetLogs.map((log) => (
          <div key={log.id} className="glass-card p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border pb-3 mb-3 gap-2">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-foreground font-mono">{log.date}</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-blue/10 text-brand-blue">
                  {log.mentalState}
                </span>
                <span className="text-xs text-foreground/60 flex items-center gap-1">
                  Sleep: {log.sleepScore}/5 ★
                </span>
              </div>

              <span className="text-xs font-mono text-foreground/70">
                Max Risk: <strong className="text-foreground">{log.maxRiskLimit}</strong>
              </span>
            </div>

            <div className="text-xs text-foreground/80 space-y-2">
              <div>
                <strong className="text-foreground">Pre-Market Plan: </strong>
                {log.preMarketPlan}
              </div>
              {log.postMarketReview && (
                <div>
                  <strong className="text-brand-teal">Post-Session Debrief: </strong>
                  {log.postMarketReview}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
