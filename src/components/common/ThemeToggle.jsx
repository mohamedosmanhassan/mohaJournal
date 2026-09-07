import React from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle dark/light theme"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="flex items-center justify-center w-9 h-9 rounded-xl border border-border bg-card/60 backdrop-blur-md text-foreground/70 hover:text-foreground hover:border-brand-teal/40 transition-all duration-200"
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 hover:rotate-90" />
      ) : (
        <Moon className="w-4 h-4 text-indigo-500 transition-transform duration-300 hover:-rotate-12" />
      )}
    </button>
  );
}
