import React, { useState } from 'react';
import {
  LayoutDashboard,
  TrendingUp,
  Brain,
  BarChart3,
  Calculator,
  Calendar,
  DollarSign,
  BookOpen,
  ChevronDown,
  Plus,
  ArrowLeft,
  Menu,
  X,
  User,
  ShieldCheck,
  Award
} from 'lucide-react';
import ThemeToggle from '../common/ThemeToggle';
import DashboardView from './DashboardView';
import JournalView from './JournalView';
import MindsetView from './MindsetView';
import AnalyticsView from './AnalyticsView';
import CalculatorView from './CalculatorView';
import CalendarView from './CalendarView';
import PayoutsView from './PayoutsView';
import BacktestView from './BacktestView';
import NotebookView from './NotebookView';
import TradeModal from './TradeModal';
import TradeDetailModal from './TradeDetailModal';

export default function AppShell({
  theme,
  onToggleTheme,
  onBackToLanding,
  initialView = 'dashboard',
  trades,
  setTrades,
  accounts,
  setAccounts,
  mindsetLogs,
  setMindsetLogs
}) {
  const [currentView, setCurrentView] = useState(initialView);
  const [selectedAccountId, setSelectedAccountId] = useState(accounts[0]?.id || 'acc-1');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  const [editingTrade, setEditingTrade] = useState(null);
  const [viewingTrade, setViewingTrade] = useState(null);

  const selectedAccount = accounts.find((a) => a.id === selectedAccountId) || accounts[0];

  // Navigation Items
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'journal', label: 'Trading Journal', icon: TrendingUp },
    { id: 'mindset', label: 'Daily Mindset', icon: Brain },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'calculator', label: 'Risk Calculator', icon: Calculator },
    { id: 'calendar', label: 'Economic Calendar', icon: Calendar },
    { id: 'payouts', label: 'Prop Payouts', icon: DollarSign },
    { id: 'backtest', label: 'Backtesting', icon: Award },
    { id: 'notebook', label: 'Notebook', icon: BookOpen }
  ];

  // Trade CRUD Handlers
  const handleSaveTrade = (tradeData) => {
    if (editingTrade) {
      setTrades(trades.map((t) => (t.id === tradeData.id ? tradeData : t)));
      setEditingTrade(null);
    } else {
      setTrades([tradeData, ...trades]);
      // Update account balance
      if (selectedAccount) {
        const updatedBalance = selectedAccount.balance + tradeData.pnl;
        setAccounts(
          accounts.map((a) => (a.id === selectedAccount.id ? { ...a, balance: updatedBalance } : a))
        );
      }
    }
  };

  const handleDeleteTrade = (id) => {
    if (confirm('Are you sure you want to delete this trade record?')) {
      setTrades(trades.filter((t) => t.id !== id));
      if (viewingTrade?.id === id) setViewingTrade(null);
    }
  };

  const handleImportTrades = (imported) => {
    setTrades([...imported, ...trades]);
  };

  const handleSaveMindsetLog = (log) => {
    setMindsetLogs([log, ...mindsetLogs]);
  };

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden font-sans">
      {/* Sidebar (Desktop) */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-border bg-card/50 backdrop-blur-xl p-4 justify-between">
        <div className="space-y-6">
          {/* Logo */}
          <div className="flex items-center justify-between px-2 pt-2">
            <img src="/logo.svg" alt="RyzeLog" className="h-8 w-auto" />
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-brand-teal/10 text-brand-teal">
              PRO
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-foreground text-background shadow-md'
                      : 'text-foreground/70 hover:text-foreground hover:bg-card'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-brand-teal' : 'text-foreground/60'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar info */}
        <div className="pt-4 border-t border-border space-y-3">
          <button
            onClick={onBackToLanding}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-border text-xs font-semibold text-foreground/70 hover:text-foreground hover:bg-card transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Website
          </button>

          <div className="p-3 rounded-2xl bg-card/80 border border-border flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-brand text-white grid place-items-center font-bold text-xs shadow-sm">
              MO
            </div>
            <div className="text-left overflow-hidden">
              <span className="block text-xs font-bold text-foreground truncate">Mohamed Osman</span>
              <span className="block text-[10px] text-brand-teal font-medium">Disciplined Trader</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}></div>
          <div className="relative w-64 bg-background border-r border-border p-4 flex flex-col justify-between z-10">
            <div>
              <div className="flex items-center justify-between mb-6">
                <img src="/logo.svg" alt="RyzeLog" className="h-7 w-auto" />
                <button onClick={() => setSidebarOpen(false)} className="p-1 text-foreground/70">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentView === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentView(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-foreground text-background shadow-md'
                          : 'text-foreground/70 hover:text-foreground'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <button
              onClick={() => {
                setSidebarOpen(false);
                onBackToLanding();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-border text-xs font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Website
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 border-b border-border bg-card/40 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl border border-border text-foreground/70"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Account Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-semibold text-foreground/50 hidden sm:inline">Portfolio:</span>
              <select
                value={selectedAccountId}
                onChange={(e) => setSelectedAccountId(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-border bg-card text-xs font-bold text-foreground focus:outline-none"
              >
                {accounts.map((acc) => (
                  <option key={acc.id} value={acc.id}>
                    {acc.name} (${acc.balance.toLocaleString()})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />

            <button
              onClick={() => {
                setEditingTrade(null);
                setIsTradeModalOpen(true);
              }}
              className="btn-brand-primary flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Quick Trade</span>
            </button>
          </div>
        </header>

        {/* Scrollable View Container */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-background relative">
          <div className="max-w-7xl mx-auto pb-12">
            {currentView === 'dashboard' && (
              <DashboardView
                trades={trades}
                account={selectedAccount}
                onOpenTradeModal={() => {
                  setEditingTrade(null);
                  setIsTradeModalOpen(true);
                }}
                onViewTrade={(t) => setViewingTrade(t)}
              />
            )}

            {currentView === 'journal' && (
              <JournalView
                trades={trades}
                onOpenTradeModal={() => {
                  setEditingTrade(null);
                  setIsTradeModalOpen(true);
                }}
                onViewTrade={(t) => setViewingTrade(t)}
                onDeleteTrade={handleDeleteTrade}
                onImportTrades={handleImportTrades}
              />
            )}

            {currentView === 'mindset' && (
              <MindsetView
                mindsetLogs={mindsetLogs}
                onSaveMindsetLog={handleSaveMindsetLog}
              />
            )}

            {currentView === 'analytics' && <AnalyticsView trades={trades} />}

            {currentView === 'calculator' && <CalculatorView account={selectedAccount} />}

            {currentView === 'calendar' && <CalendarView />}

            {currentView === 'payouts' && <PayoutsView />}

            {currentView === 'backtest' && <BacktestView />}

            {currentView === 'notebook' && <NotebookView />}
          </div>
        </main>
      </div>

      {/* Modals */}
      <TradeModal
        isOpen={isTradeModalOpen}
        onClose={() => {
          setIsTradeModalOpen(false);
          setEditingTrade(null);
        }}
        onSaveTrade={handleSaveTrade}
        initialTrade={editingTrade}
      />

      <TradeDetailModal
        trade={viewingTrade}
        isOpen={!!viewingTrade}
        onClose={() => setViewingTrade(null)}
        onEdit={(trade) => {
          setViewingTrade(null);
          setEditingTrade(trade);
          setIsTradeModalOpen(true);
        }}
        onDelete={handleDeleteTrade}
      />
    </div>
  );
}
