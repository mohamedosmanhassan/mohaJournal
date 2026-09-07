import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Check,
  Menu,
  X,
  TrendingUp,
  BarChart3,
  Calendar,
  Calculator,
  BookOpen,
  DollarSign,
  ShieldCheck,
  Zap,
  Layers,
  ChevronRight
} from 'lucide-react';
import ThemeToggle from '../common/ThemeToggle';

export default function LandingPage({ onLaunchApp, theme, onToggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState('saved');

  const marqueeWords = [
    'Discipline',
    'Clarity',
    'Edge',
    'Consistency',
    'Reflection',
    'Process',
    'Mastery',
    'Patience'
  ];

  return (
    <div className="landing-page-root min-h-screen bg-background text-foreground relative overflow-x-hidden selection:bg-brand-teal/30">
      {/* Aurora glow background */}
      <div className="aurora opacity-70"></div>

      {/* Sticky Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl transition-colors">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <a href="#" className="flex items-center gap-2 select-none py-1">
            <img src="/logo.svg" alt="RyzeLog Logo" className="h-9 md:h-10 w-auto" />
          </a>

          <nav className="hidden items-center gap-7 text-sm font-medium text-foreground/70 lg:flex">
            <a href="#modules" className="hover:text-foreground transition-colors">Platform</a>
            <a href="#tools" className="hover:text-foreground transition-colors">Tools</a>
            <a href="#payouts" className="hover:text-foreground transition-colors">Payouts</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
            <a href="#how" className="hover:text-foreground transition-colors">How it Works</a>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />

            <button
              onClick={() => onLaunchApp('demo')}
              className="hidden lg:inline-flex items-center justify-center h-10 px-4 text-sm font-semibold text-foreground/80 hover:text-foreground transition-colors"
            >
              Demo
            </button>

            <button
              onClick={() => onLaunchApp('dashboard')}
              className="group relative inline-flex h-10 items-center justify-center gap-1.5 overflow-hidden rounded-xl bg-foreground px-5 text-sm font-medium text-background shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="absolute inset-0 bg-gradient-brand opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
              <span className="relative flex items-center gap-1.5 text-background group-hover:text-white font-semibold">
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex lg:hidden items-center justify-center h-10 w-10 rounded-xl border border-border bg-card/70 text-foreground/80"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-border bg-background/95 backdrop-blur-xl px-6 py-4 space-y-3">
            <a href="#modules" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-sm font-medium">Platform</a>
            <a href="#tools" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-sm font-medium">Tools</a>
            <a href="#payouts" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-sm font-medium">Payouts</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-sm font-medium">Pricing</a>
            <a href="#how" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-sm font-medium">How it Works</a>
            <div className="pt-3 border-t border-border flex flex-col gap-2">
              <button
                onClick={() => { setMobileMenuOpen(false); onLaunchApp('demo'); }}
                className="w-full py-2.5 rounded-xl border border-border text-center text-sm font-semibold"
              >
                Interactive Demo
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); onLaunchApp('dashboard'); }}
                className="w-full py-2.5 rounded-xl bg-gradient-brand text-white text-center text-sm font-semibold shadow-md"
              >
                Launch Application
              </button>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Top Hero Section */}
        <section id="top" className="relative overflow-hidden pt-16 md:pt-24 pb-16">
          <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none"></div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 text-center">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-1.5 text-xs font-medium text-foreground/70 backdrop-blur shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-brand-teal" />
              <span>Track. Analyze. Improve.</span>
              <span className="h-3 w-px bg-border"></span>
              <span className="text-gradient-brand font-semibold">v1.0 Production</span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-8 text-balance font-medium leading-[1.05] tracking-tight text-4xl sm:text-6xl lg:text-[72px]">
              Master your trading with <br />
              <span className="font-display italic font-normal text-gradient-brand">data-driven</span>{' '}
              <span className="relative inline-block font-display italic font-normal">
                precision
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="underlineGrad" x1="0" x2="1">
                      <stop offset="0%" stopColor="var(--primary)" />
                      <stop offset="50%" stopColor="var(--secondary)" />
                      <stop offset="100%" stopColor="#93a5ff" />
                    </linearGradient>
                  </defs>
                  <path d="M2 8 Q 60 2, 100 6 T 198 6" stroke="url(#underlineGrad)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                </svg>
              </span>.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-balance text-base sm:text-xl leading-relaxed text-foreground/70">
              A modern trading journal and portfolio management platform built to replace guesswork with clarity, structure and measurable improvement.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onLaunchApp('dashboard')}
                className="group relative inline-flex h-14 w-full sm:w-auto items-center justify-center gap-2 overflow-hidden rounded-full bg-foreground px-8 text-base font-semibold text-background shadow-premium transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="absolute inset-0 bg-gradient-brand opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                <span className="relative flex items-center gap-2 text-background group-hover:text-white">
                  Create Your Account
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </button>

              <button
                onClick={() => onLaunchApp('demo')}
                className="group inline-flex h-14 w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-border bg-card/60 px-8 text-base font-medium text-foreground hover:bg-card transition-all"
              >
                Request Demo
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </div>

            <p className="mt-4 flex items-center justify-center gap-2 text-xs text-foreground/60">
              <Check className="h-3.5 w-3.5 text-brand-teal" />
              No credit card required · Free trial available
            </p>

            {/* Interactive Dashboard Frame */}
            <div className="relative mx-auto mt-16 max-w-[1240px] px-2 sm:px-4">
              <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-premium [perspective:2400px]">
                {/* Browser bar */}
                <div className="flex items-center gap-2 border-b border-border bg-background/50 px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400"></span>
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400"></span>
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
                  </div>
                  <div className="mx-auto flex items-center gap-2 rounded-lg border border-border bg-card/80 px-4 py-1 text-xs text-foreground/60">
                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-brand"></span>
                    app.ryzelog.com / dashboard
                  </div>
                  <div className="flex gap-1.5">
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-brand-teal/10 text-brand-teal font-semibold">LIVE</span>
                  </div>
                </div>

                {/* Dashboard Inner Preview */}
                <div className="relative p-6 sm:p-8 bg-gradient-to-b from-card/90 to-card/40">
                  {/* Top Stats Row */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="glass-card p-4 text-left">
                      <span className="text-xs uppercase font-semibold text-foreground/60">Net Profit (PnL)</span>
                      <div className="text-2xl sm:text-3xl font-bold text-gradient-brand mt-1">+$264,850.00</div>
                      <span className="text-[11px] text-emerald-400 font-medium">↑ +14.2% this month</span>
                    </div>

                    <div className="glass-card p-4 text-left">
                      <span className="text-xs uppercase font-semibold text-foreground/60">Win Rate</span>
                      <div className="text-2xl sm:text-3xl font-bold text-foreground mt-1">79.2%</div>
                      <span className="text-[11px] text-foreground/60">68 Wins / 18 Losses</span>
                    </div>

                    <div className="glass-card p-4 text-left">
                      <span className="text-xs uppercase font-semibold text-foreground/60">Profit Factor</span>
                      <div className="text-2xl sm:text-3xl font-bold text-foreground mt-1">3.42</div>
                      <span className="text-[11px] text-brand-teal font-medium">Exceptional Edge</span>
                    </div>

                    <div className="glass-card p-4 text-left">
                      <span className="text-xs uppercase font-semibold text-foreground/60">Avg Risk : Reward</span>
                      <div className="text-2xl sm:text-3xl font-bold text-foreground mt-1">1 : 2.85</div>
                      <span className="text-[11px] text-foreground/60">Discipline Score: 98%</span>
                    </div>
                  </div>

                  {/* Chart and Activity Grid */}
                  <div className="grid lg:grid-cols-3 gap-6">
                    {/* Simulated Equity Curve */}
                    <div className="lg:col-span-2 glass-card p-5 text-left">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="text-sm font-semibold text-foreground">Cumulative Growth Curve</h4>
                          <span className="text-xs text-foreground/60">Equity Progression (Last 30 Days)</span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setActiveHotspot('filter')}
                            className={`px-2.5 py-1 text-xs rounded-lg border border-border transition-colors ${activeHotspot === 'filter' ? 'bg-brand-blue/20 text-brand-blue' : 'bg-background/40'}`}
                          >
                            Filter
                          </button>
                          <button
                            onClick={() => onLaunchApp('journal')}
                            className="px-2.5 py-1 text-xs rounded-lg bg-gradient-brand text-white font-medium"
                          >
                            + Open Trade
                          </button>
                        </div>
                      </div>

                      {/* SVG Chart */}
                      <div className="h-52 w-full pt-2">
                        <svg viewBox="0 0 500 160" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#12d6a0" stopOpacity="0.3" />
                              <stop offset="100%" stopColor="#5c7cff" stopOpacity="0.0" />
                            </linearGradient>
                            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                              <stop offset="0%" stopColor="#12d6a0" />
                              <stop offset="60%" stopColor="#5c7cff" />
                              <stop offset="100%" stopColor="#93a5ff" />
                            </linearGradient>
                          </defs>
                          {/* Grid horizontal lines */}
                          <line x1="0" y1="30" x2="500" y2="30" stroke="currentColor" strokeOpacity="0.08" strokeDasharray="3 3" />
                          <line x1="0" y1="70" x2="500" y2="70" stroke="currentColor" strokeOpacity="0.08" strokeDasharray="3 3" />
                          <line x1="0" y1="110" x2="500" y2="110" stroke="currentColor" strokeOpacity="0.08" strokeDasharray="3 3" />
                          
                          {/* Area fill */}
                          <path
                            d="M 0 140 L 40 125 L 80 130 L 130 95 L 180 105 L 240 65 L 300 75 L 360 40 L 420 48 L 470 20 L 500 15 L 500 160 L 0 160 Z"
                            fill="url(#chartGrad)"
                          />
                          {/* Line stroke */}
                          <path
                            d="M 0 140 L 40 125 L 80 130 L 130 95 L 180 105 L 240 65 L 300 75 L 360 40 L 420 48 L 470 20 L 500 15"
                            fill="none"
                            stroke="url(#lineGrad)"
                            strokeWidth="3"
                            strokeLinecap="round"
                          />
                          {/* Pulsing endpoint */}
                          <circle cx="500" cy="15" r="5" fill="#12d6a0" />
                          <circle cx="500" cy="15" r="9" fill="#12d6a0" opacity="0.3" className="animate-ping" />
                        </svg>
                      </div>
                    </div>

                    {/* Live Recent Trades Preview */}
                    <div className="glass-card p-5 text-left flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-semibold text-foreground">Recent Executions</h4>
                          <span className="text-[10px] font-semibold text-brand-teal uppercase tracking-wider">Live Log</span>
                        </div>

                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between p-2.5 rounded-xl border border-border bg-background/50 text-xs">
                            <div className="flex items-center gap-2">
                              <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">BUY</span>
                              <span className="font-semibold text-foreground">EURUSD</span>
                            </div>
                            <span className="font-mono text-emerald-400 font-bold">+$2,450.00</span>
                          </div>

                          <div className="flex items-center justify-between p-2.5 rounded-xl border border-border bg-background/50 text-xs">
                            <div className="flex items-center gap-2">
                              <span className="px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 font-bold text-[10px]">SELL</span>
                              <span className="font-semibold text-foreground">XAUUSD</span>
                            </div>
                            <span className="font-mono text-emerald-400 font-bold">+$6,060.00</span>
                          </div>

                          <div className="flex items-center justify-between p-2.5 rounded-xl border border-border bg-background/50 text-xs">
                            <div className="flex items-center gap-2">
                              <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">BUY</span>
                              <span className="font-semibold text-foreground">GBPUSD</span>
                            </div>
                            <span className="font-mono text-emerald-400 font-bold">+$3,000.00</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => onLaunchApp('journal')}
                        className="mt-4 w-full py-2 rounded-xl border border-border hover:border-brand-teal/40 bg-card text-center text-xs font-semibold text-foreground transition-all flex items-center justify-center gap-1.5"
                      >
                        Explore Full Trading Journal
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Floating Badges */}
                <div className="absolute top-1/2 -left-2 hidden sm:flex -translate-y-1/2 animate-float items-center gap-3 p-3 rounded-2xl border border-border bg-card/90 shadow-premium backdrop-blur">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand text-white font-bold text-xs shadow-md">
                    79%
                  </div>
                  <div className="text-left">
                    <span className="block text-[10px] uppercase tracking-wider text-foreground/60 font-semibold">Win Rate</span>
                    <span className="text-xs font-bold text-foreground">Consistently Profitable</span>
                  </div>
                </div>

                <div className="absolute top-16 right-4 hidden sm:flex animate-float items-center gap-2.5 rounded-full px-4 py-2 border border-border bg-card/90 shadow-premium backdrop-blur">
                  <Sparkles className="h-4 w-4 text-brand-purple" />
                  <span className="text-xs font-medium text-foreground/70">Total PnL:</span>
                  <span className="text-gradient-brand text-xs font-bold">+$264K</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Marquee Bar */}
        <section className="relative border-y border-border overflow-hidden bg-background/40 py-5">
          <div className="marquee-container">
            <div className="marquee-track">
              {[...marqueeWords, ...marqueeWords, ...marqueeWords].map((word, idx) => (
                <div key={idx} className="flex items-center gap-4 px-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-5 py-2 text-sm font-medium tracking-tight text-foreground backdrop-blur hover:border-brand-teal/50 transition-colors">
                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-brand"></span>
                    {word}
                  </span>
                  <span className="font-display text-xl italic text-gradient-brand">/</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Statement Section */}
        <section className="relative border-b border-border py-24">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-foreground/60">About RyzeLog</span>
            <p className="mt-6 text-balance text-2xl sm:text-4xl md:text-5xl font-light leading-snug text-foreground">
              An <em className="font-display italic font-normal text-gradient-brand">all-in-one ecosystem</em> where traders log trades, analyze performance, and manage portfolios eliminating guesswork and replacing it with{' '}
              <span className="font-medium not-italic text-foreground">clarity, structure, and measurable improvement.</span>
            </p>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="relative border-b border-border py-24 bg-card/20">
          <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-8">
            {/* 01 Mission */}
            <div className="glass-card p-8 md:p-10 text-left relative overflow-hidden group">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand text-white font-bold text-sm shadow-md">
                  01
                </span>
                <div>
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.25em] text-foreground/60">01 — Mission</span>
                  <span className="font-display text-2xl italic text-gradient-brand">Why we build.</span>
                </div>
              </div>
              <p className="mt-6 text-lg sm:text-xl font-light leading-relaxed text-foreground">
                To empower traders with <span className="font-display italic font-normal text-gradient-brand">intelligent tools</span> that enhance performance, strengthen discipline, and enable consistent decision-making.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground/70">
                  <span className="h-1 w-1 rounded-full bg-gradient-brand"></span>Performance
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground/70">
                  <span className="h-1 w-1 rounded-full bg-gradient-brand"></span>Discipline
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground/70">
                  <span className="h-1 w-1 rounded-full bg-gradient-brand"></span>Consistency
                </span>
              </div>
            </div>

            {/* 02 Vision */}
            <div className="glass-card p-8 md:p-10 text-left relative overflow-hidden group border-brand-teal/30">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-card border border-border text-foreground font-bold text-sm shadow-md">
                  02
                </span>
                <div>
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.25em] text-foreground/60">02 — Vision</span>
                  <span className="font-display text-2xl italic text-gradient-brand">Where we're headed.</span>
                </div>
              </div>
              <p className="mt-6 text-lg sm:text-xl font-light leading-relaxed text-foreground">
                To become the <span className="font-display italic font-normal text-gradient-brand">global leader</span> in trading analytics and journaling helping traders transform raw data into long-term compounding success.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-brand px-3 py-1 text-xs font-medium text-white shadow-sm">
                  Analytics
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-brand px-3 py-1 text-xs font-medium text-white shadow-sm">
                  Journaling
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-brand px-3 py-1 text-xs font-medium text-white shadow-sm">
                  Long-term Success
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 6 Core Modules Section */}
        <section id="modules" className="relative border-b border-border py-28">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3.5 py-1 text-xs font-medium uppercase tracking-[0.2em] text-foreground/60 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-brand"></span>
              Core Platform
            </div>
            <h2 className="mt-4 text-3xl sm:text-5xl font-medium tracking-tight">Everything traders need, in one place.</h2>
            <p className="mt-4 max-w-xl mx-auto text-foreground/70 text-base sm:text-lg">
              Six core modules that work together seamlessly to turn raw market activity into compounding insight.
            </p>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-16 text-left">
              {/* Module 1: Dashboard */}
              <div onClick={() => onLaunchApp('dashboard')} className="glass-card p-6 cursor-pointer group">
                <div className="w-12 h-12 rounded-xl bg-brand-teal/10 text-brand-teal grid place-items-center mb-5 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground group-hover:text-brand-teal transition-colors">Dashboard</h3>
                <ul className="mt-4 space-y-2 text-sm text-foreground/70">
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-teal mt-2 flex-shrink-0"></span>
                    Real-time overview of all trading activity
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-teal mt-2 flex-shrink-0"></span>
                    Key performance metrics and KPIs at a glance
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-teal mt-2 flex-shrink-0"></span>
                    Central command hub for your trading business
                  </li>
                </ul>
              </div>

              {/* Module 2: Daily Journal */}
              <div onClick={() => onLaunchApp('mindset')} className="glass-card p-6 cursor-pointer group">
                <div className="w-12 h-12 rounded-xl bg-brand-blue/10 text-brand-blue grid place-items-center mb-5 group-hover:scale-110 transition-transform">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground group-hover:text-brand-blue transition-colors">Daily Journal</h3>
                <ul className="mt-4 space-y-2 text-sm text-foreground/70">
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-blue mt-2 flex-shrink-0"></span>
                    Track trader mindset and emotional routines
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-blue mt-2 flex-shrink-0"></span>
                    Pre-market preparation and daily loss limits
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-blue mt-2 flex-shrink-0"></span>
                    Reflect on trading behavior and eliminate mistakes
                  </li>
                </ul>
              </div>

              {/* Module 3: Trading Journal */}
              <div onClick={() => onLaunchApp('journal')} className="glass-card p-6 cursor-pointer group border-brand-teal/40 shadow-glow-teal/20">
                <div className="w-12 h-12 rounded-xl bg-brand-teal/15 text-brand-teal grid place-items-center mb-5 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground group-hover:text-brand-teal transition-colors">Trading Journal</h3>
                <ul className="mt-4 space-y-2 text-sm text-foreground/70">
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-teal mt-2 flex-shrink-0"></span>
                    Log precise entries, exits, stop loss, and lots
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-teal mt-2 flex-shrink-0"></span>
                    Tag A+ setups, sessions, and screenshot URLs
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-teal mt-2 flex-shrink-0"></span>
                    Instant CSV import & export for all platforms
                  </li>
                </ul>
              </div>

              {/* Module 4: My Portfolio */}
              <div onClick={() => onLaunchApp('dashboard')} className="glass-card p-6 cursor-pointer group">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 grid place-items-center mb-5 group-hover:scale-110 transition-transform">
                  <DollarSign className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground group-hover:text-purple-400 transition-colors">My Portfolio</h3>
                <ul className="mt-4 space-y-2 text-sm text-foreground/70">
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0"></span>
                    Manage multiple accounts (Prop Firm & Personal)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0"></span>
                    Track total profit, loss, and capital allocation
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0"></span>
                    Monitor drawdown compliance and profit targets
                  </li>
                </ul>
              </div>

              {/* Module 5: Notebook */}
              <div onClick={() => onLaunchApp('notebook')} className="glass-card p-6 cursor-pointer group">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 grid place-items-center mb-5 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground group-hover:text-amber-400 transition-colors">Strategy Notebook</h3>
                <ul className="mt-4 space-y-2 text-sm text-foreground/70">
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0"></span>
                    Document trading playbook rules and entry triggers
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0"></span>
                    Keep lessons, psychological reminders, and notes
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0"></span>
                    Organize your knowledge in one central place
                  </li>
                </ul>
              </div>

              {/* Module 6: Analytics */}
              <div onClick={() => onLaunchApp('analytics')} className="glass-card p-6 cursor-pointer group">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 grid place-items-center mb-5 group-hover:scale-110 transition-transform">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground group-hover:text-emerald-400 transition-colors">Analytics Center</h3>
                <ul className="mt-4 space-y-2 text-sm text-foreground/70">
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></span>
                    Strategy breakdown and win rate comparison
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></span>
                    Symbol profitability heatmap & session breakdown
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></span>
                    Identify your true statistical trading edge
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Trading Tools Section */}
        <section id="tools" className="relative border-b border-border py-28 bg-card/20">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3.5 py-1 text-xs font-medium uppercase tracking-[0.2em] text-foreground/60 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-brand"></span>
              Trading Tools
            </div>
            <h2 className="mt-4 text-3xl sm:text-5xl font-medium tracking-tight">Sharper execution, every session.</h2>

            <div className="grid gap-6 sm:grid-cols-3 mt-16 text-left">
              {/* Tool 1: Position Calculator */}
              <div onClick={() => onLaunchApp('calculator')} className="glass-card p-6 cursor-pointer group">
                <div className="w-12 h-12 rounded-xl bg-brand-blue/10 text-brand-blue grid place-items-center mb-5 group-hover:scale-110 transition-transform">
                  <Calculator className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground group-hover:text-brand-blue transition-colors">Position Calculator</h3>
                <p className="mt-3 text-sm text-foreground/70">
                  Instantly compute exact lot sizes based on balance, risk percentage, and stop loss pips for Forex, Metals, and Crypto.
                </p>
                <span className="mt-6 inline-flex items-center text-xs font-semibold text-brand-blue gap-1">
                  Open Calculator <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>

              {/* Tool 2: Economic Calendar */}
              <div onClick={() => onLaunchApp('calendar')} className="glass-card p-6 cursor-pointer group">
                <div className="w-12 h-12 rounded-xl bg-brand-teal/10 text-brand-teal grid place-items-center mb-5 group-hover:scale-110 transition-transform">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground group-hover:text-brand-teal transition-colors">Economic Calendar</h3>
                <p className="mt-3 text-sm text-foreground/70">
                  Stay updated with high-impact economic releases (CPI, NFP, FOMC) with live countdowns and currency filters.
                </p>
                <span className="mt-6 inline-flex items-center text-xs font-semibold text-brand-teal gap-1">
                  View Events <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>

              {/* Tool 3: Coupons */}
              <div onClick={() => onLaunchApp('dashboard')} className="glass-card p-6 cursor-pointer group">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 grid place-items-center mb-5 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground group-hover:text-amber-400 transition-colors">Prop Firm Coupons</h3>
                <p className="mt-3 text-sm text-foreground/70">
                  Access exclusive partner discount codes and profit share bonuses for top prop firms like FTMO, FundedNext, and Topstep.
                </p>
                <span className="mt-6 inline-flex items-center text-xs font-semibold text-amber-400 gap-1">
                  View Offers <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Payouts Section */}
        <section id="payouts" className="relative border-b border-border py-28">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3.5 py-1 text-xs font-medium uppercase tracking-[0.2em] text-foreground/60 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-brand"></span>
              Payout System
            </div>
            <h2 className="mt-4 text-3xl sm:text-5xl font-medium tracking-tight">Track every dollar earned.</h2>

            <div className="grid gap-6 sm:grid-cols-2 max-w-4xl mx-auto mt-16 text-left">
              <div onClick={() => onLaunchApp('payouts')} className="glass-card p-8 cursor-pointer group">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 grid place-items-center mb-5 group-hover:scale-110 transition-transform">
                  <DollarSign className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground group-hover:text-emerald-400 transition-colors">Payout Dashboard</h3>
                <p className="mt-3 text-sm text-foreground/70 leading-relaxed">
                  Monitor withdrawal requests, processing times, and verified payout certificates from your funded prop firm accounts.
                </p>
              </div>

              <div onClick={() => onLaunchApp('payouts')} className="glass-card p-8 cursor-pointer group">
                <div className="w-12 h-12 rounded-xl bg-brand-blue/10 text-brand-blue grid place-items-center mb-5 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground group-hover:text-brand-blue transition-colors">Payout Journal</h3>
                <p className="mt-3 text-sm text-foreground/70 leading-relaxed">
                  Maintain an immutable, clear record of your cumulative trading earnings and profit splits for total financial clarity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Backtesting Simulator Highlight */}
        <section className="relative border-b border-border py-20 bg-card/20">
          <div className="mx-auto max-w-4xl px-6">
            <div className="glass-card p-8 sm:p-10 relative overflow-hidden border-brand-teal/40">
              <span className="absolute top-4 right-4 rounded-full bg-brand-teal/20 text-brand-teal font-semibold text-[10px] px-3 py-1 uppercase tracking-widest">
                Included in Pro
              </span>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-brand grid place-items-center text-white">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-foreground">Backtesting Simulator</h3>
                  <span className="text-xs text-foreground/60">Validate ideas with historical simulation</span>
                </div>
              </div>
              <p className="mt-5 text-foreground/80 leading-relaxed text-sm sm:text-base">
                Test setups against historical market sessions before putting real capital at risk. Calculate win rates, profit factor, maximum drawdown, and consecutive winning streaks.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <button
                  onClick={() => onLaunchApp('backtest')}
                  className="px-6 py-2.5 rounded-xl bg-foreground text-background font-semibold text-sm hover:scale-[1.02] transition-transform"
                >
                  Try Simulator
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 5-Column Benefits */}
        <section className="relative border-b border-border py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                'All-in-one trading system',
                'Data-driven performance',
                'Clean intuitive interface',
                'Scalable for teams & prop firms',
                'Secure local & cloud access'
              ].map((benefit, idx) => (
                <div key={idx} className="glass-card p-6 text-center flex items-center justify-center">
                  <span className="text-sm font-semibold text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works: 3 Steps */}
        <section id="how" className="relative border-b border-border py-28">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3.5 py-1 text-xs font-medium uppercase tracking-[0.2em] text-foreground/60 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-brand"></span>
              How It Works
            </div>
            <h2 className="mt-4 text-3xl sm:text-5xl font-medium tracking-tight">Three steps to consistency.</h2>

            <div className="grid md:grid-cols-3 gap-8 mt-16 text-left">
              <div className="glass-card p-8 relative overflow-hidden group">
                <span className="text-5xl font-display italic text-foreground/20 block mb-4">01</span>
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-teal">Step 01</span>
                <h3 className="text-2xl font-semibold mt-2 text-foreground">Track Your Activity</h3>
                <p className="mt-3 text-sm text-foreground/70 leading-relaxed">
                  Log trades, emotional routines, and strategy tags in one structured, effortless journal.
                </p>
              </div>

              <div className="glass-card p-8 relative overflow-hidden group">
                <span className="text-5xl font-display italic text-foreground/20 block mb-4">02</span>
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-blue">Step 02</span>
                <h3 className="text-2xl font-semibold mt-2 text-foreground">Analyze Your Data</h3>
                <p className="mt-3 text-sm text-foreground/70 leading-relaxed">
                  Use analytics dashboards to discover which setups, sessions, and pairs make you real money.
                </p>
              </div>

              <div className="glass-card p-8 relative overflow-hidden group">
                <span className="text-5xl font-display italic text-foreground/20 block mb-4">03</span>
                <span className="text-xs font-semibold uppercase tracking-widest text-purple-400">Step 03</span>
                <h3 className="text-2xl font-semibold mt-2 text-foreground">Improve Performance</h3>
                <p className="mt-3 text-sm text-foreground/70 leading-relaxed">
                  Eliminate bad habits, refine your edge with measurable feedback loops, and compound capital.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="relative border-b border-border py-28 bg-card/20">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3.5 py-1 text-xs font-medium uppercase tracking-[0.2em] text-foreground/60 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-brand"></span>
              Pricing
            </div>
            <h2 className="mt-4 text-3xl sm:text-5xl font-medium tracking-tight">Simple pricing, serious edge.</h2>
            <p className="mt-4 max-w-xl mx-auto text-foreground/70 text-base sm:text-lg">
              Start journaling today. Cancel anytime. No hidden fees.
            </p>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-16 text-left">
              {/* Monthly */}
              <div className="glass-card p-8 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-foreground">Monthly</h3>
                  <p className="mt-2 text-xs text-foreground/60">For traders validating their process week by week.</p>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-5xl font-display font-bold text-foreground">$9.99</span>
                    <span className="text-xs text-foreground/60">/ mo</span>
                  </div>

                  <ul className="mt-8 space-y-3.5 text-sm">
                    {['Unlimited trades', 'Full analytics & KPIs', 'Risk calculator', 'Journal CSV exports', 'Email support'].map((feature, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-foreground/80">
                        <Check className="h-4 w-4 text-brand-teal flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => onLaunchApp('dashboard')}
                  className="mt-8 w-full py-3 rounded-xl border border-border bg-card text-foreground font-semibold text-sm hover:border-brand-teal/50 transition-colors"
                >
                  Start Monthly
                </button>
              </div>

              {/* Monthly Pro */}
              <div className="glass-card p-8 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-foreground">Monthly Pro</h3>
                  <p className="mt-2 text-xs text-foreground/60">Full journaling plus the complete Backtesting Area.</p>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-5xl font-display font-bold text-foreground">$14.99</span>
                    <span className="text-xs text-foreground/60">/ mo</span>
                  </div>

                  <ul className="mt-8 space-y-3.5 text-sm">
                    {[
                      'Everything in Monthly',
                      'Backtesting Area full access',
                      'Statistics & Gallery Center',
                      'Symbol & Scenario Breakdown',
                      'Win-Streak & Drawdown tracking'
                    ].map((feature, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-foreground/80">
                        <Check className="h-4 w-4 text-brand-teal flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => onLaunchApp('dashboard')}
                  className="mt-8 w-full py-3 rounded-xl border border-border bg-card text-foreground font-semibold text-sm hover:border-brand-teal/50 transition-colors"
                >
                  Get Monthly Pro
                </button>
              </div>

              {/* Yearly - Best Value */}
              <div className="glass-card p-8 flex flex-col justify-between border-brand-teal/50 shadow-glow-teal/30 relative">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-0.5 rounded-full bg-gradient-brand text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
                  Save $44.89 / YR
                </span>
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-foreground">Yearly</h3>
                    <span className="text-[11px] font-bold text-brand-teal bg-brand-teal/10 px-2 py-0.5 rounded-full">BEST VALUE</span>
                  </div>
                  <p className="mt-2 text-xs text-foreground/60">The complete professional suite for serious traders.</p>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-5xl font-display font-bold text-gradient-brand">$74.99</span>
                    <span className="text-xs text-foreground/60">/ yr</span>
                  </div>

                  <ul className="mt-8 space-y-3.5 text-sm">
                    {[
                      'Everything in Monthly Pro',
                      'Full Backtesting Simulator',
                      'Prop firm payout generator',
                      'Priority feature access',
                      'Unlimited Trade Storage',
                      '24/7 Priority Support'
                    ].map((feature, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-foreground font-medium">
                        <Check className="h-4 w-4 text-brand-teal flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => onLaunchApp('dashboard')}
                  className="mt-8 w-full py-3 rounded-xl bg-gradient-brand text-white font-bold text-sm shadow-md hover:scale-[1.02] transition-all"
                >
                  Go Yearly
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Big Bottom CTA Banner */}
        <section className="relative px-6 py-24">
          <div className="mx-auto max-w-6xl rounded-3xl bg-black border border-white/10 p-12 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="pointer-events-none absolute -left-32 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-brand-blue/30 blur-[100px]"></div>
            <div className="pointer-events-none absolute -right-32 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-brand-teal/25 blur-[100px]"></div>

            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/70 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-teal"></span>
                Get Started
              </span>

              <h2 className="mt-6 text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight">
                Start trading <span className="font-display italic font-normal text-gradient-brand">smarter</span>.
              </h2>
              <p className="mt-4 max-w-md mx-auto text-white/60 text-base sm:text-lg">
                Turn your trade data into your supreme competitive advantage.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => onLaunchApp('dashboard')}
                  className="px-8 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:scale-105 transition-transform"
                >
                  Create Your Account
                </button>
                <button
                  onClick={() => onLaunchApp('demo')}
                  className="px-8 py-3.5 rounded-full border border-white/20 bg-white/5 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
                >
                  Request Demo
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-14">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-2 text-left">
            <img src="/logo.svg" alt="RyzeLog" className="h-8 w-auto" />
            <p className="text-xs text-foreground/60">
              Trading Journal • Portfolio Management • Analytics Platform
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-xs text-foreground/70">
            <a href="#modules" className="hover:text-foreground">Platform</a>
            <a href="#tools" className="hover:text-foreground">Tools</a>
            <a href="#payouts" className="hover:text-foreground">Payouts</a>
            <a href="#pricing" className="hover:text-foreground">Pricing</a>
            <a href="#how" className="hover:text-foreground">How it Works</a>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between text-xs text-foreground/50 gap-4">
          <p>© 2026 RyzeLog Inc. All rights reserved.</p>
          <p className="italic">Built for <span className="font-semibold text-brand-teal">disciplined traders</span>.</p>
        </div>
      </footer>
    </div>
  );
}
