import React, { useState, useEffect } from 'react';
import LandingPage from './components/landing/LandingPage';
import AppShell from './components/dashboard/AppShell';
import { initialAccounts, initialTrades, initialMindsetLogs } from './data/mockData';

export default function App() {
  // Theme Management
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('ryzelog_theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ryzelog_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // View state: 'landing' or 'app'
  const [mode, setMode] = useState('landing');
  const [initialAppView, setInitialAppView] = useState('dashboard');

  // App Data with LocalStorage Persistence
  const [trades, setTrades] = useState(() => {
    const saved = localStorage.getItem('ryzelog_trades');
    return saved ? JSON.parse(saved) : initialTrades;
  });

  const [accounts, setAccounts] = useState(() => {
    const saved = localStorage.getItem('ryzelog_accounts');
    return saved ? JSON.parse(saved) : initialAccounts;
  });

  const [mindsetLogs, setMindsetLogs] = useState(() => {
    const saved = localStorage.getItem('ryzelog_mindset');
    return saved ? JSON.parse(saved) : initialMindsetLogs;
  });

  useEffect(() => {
    localStorage.setItem('ryzelog_trades', JSON.stringify(trades));
  }, [trades]);

  useEffect(() => {
    localStorage.setItem('ryzelog_accounts', JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    localStorage.setItem('ryzelog_mindset', JSON.stringify(mindsetLogs));
  }, [mindsetLogs]);

  // Handler to transition from landing to app
  const handleLaunchApp = (view = 'dashboard') => {
    setInitialAppView(view);
    setMode('app');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToLanding = () => {
    setMode('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full min-h-screen">
      {mode === 'landing' ? (
        <LandingPage
          onLaunchApp={handleLaunchApp}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      ) : (
        <AppShell
          theme={theme}
          onToggleTheme={toggleTheme}
          onBackToLanding={handleBackToLanding}
          initialView={initialAppView}
          trades={trades}
          setTrades={setTrades}
          accounts={accounts}
          setAccounts={setAccounts}
          mindsetLogs={mindsetLogs}
          setMindsetLogs={setMindsetLogs}
        />
      )}
    </div>
  );
}
