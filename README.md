# RyzeLog (mohaJournal) — Full Production Trading Platform

![RyzeLog Platform](https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format&fit=crop&q=80)

An all-in-one institutional-grade **Trading Journal, Portfolio Analytics, Prop Firm Payout Tracker, and Backtesting SaaS Platform** inspired by [ryzelog.com](https://ryzelog.com).

Built for disciplined traders who trade Forex, Crypto, Indices, and Commodities with data-driven precision.

---

## 🌟 Core Features & Modules

### 1. High-Fidelity Landing & Marketing Page
- **Exact ryzelog.com recreation**: Neon-accented glassmorphic theme, ambient auroras, floating interactive live metric badges, and animated cursors/hotspots.
- **Dynamic Marquee Ticker**: `Discipline / Clarity / Edge / Consistency / Reflection / Process / Mastery / Patience`.
- **Mission & Vision**: 01 Mission ("Why we build") & 02 Vision ("Where we're headed").
- **Core Modules & Tools**: Dashboard, Daily Journal, Trading Journal, My Portfolio, Notebook, Analytics, Position Calculator, Economic Calendar, Prop Firm Coupons.
- **Pricing Tiers**: Monthly ($9.99), Monthly Pro ($14.99), and Yearly ($74.99 — Save $44.89).

### 2. Comprehensive Trading Journal
- **Full Trade Logger**: Date & Time, Symbol (EURUSD, XAUUSD, NAS100, BTCUSD, etc.), Direction (Buy/Sell), Entry, Exit, Stop Loss, Take Profit, Lot Size, Fees, PnL ($), and Risk:Reward.
- **Institutional Confluences**: SMC Liquidity Sweeps, Order Blocks, Fair Value Gaps (FVG), Break & Retest, and Session tagging.
- **Discipline & Emotional Tracking**: Rule compliance check, emotional state (Disciplined, FOMO, Revenge, Hesitation).
- **Import & Export**: One-click CSV Export (`.csv`) and instant CSV Import for historical trades.

### 3. Analytics & Statistics Center
- **Cumulative Equity Progression Curve**: Responsive SVG visual chart showing account growth over closed trades.
- **Strategy Performance Matrix**: Real-time win rate and net profit per setup/model.
- **Symbol Profitability Matrix**: Compare asset performance across currencies, crypto, and indices.
- **Session Analysis**: London (07:00-15:00 UTC), New York (13:00-21:00 UTC), and Asian session win rates.

### 4. Position Size & Risk Calculator
- **Precision Lot Sizing**: Real-time calculation based on account balance, risk percentage (0.5%, 1%, 1.5%, 2%), and stop loss in pips/points.
- Outputs exact recommended lot size, cash at risk ($), pip value, and margin requirement.

### 5. Economic Calendar
- Filterable live macro events feed with **High**, **Medium**, and **Low** impact color-coded tags.
- Time countdowns, currency filters, and risk warning protocols for major news events (CPI, NFP, FOMC).

### 6. Prop Firm Payout System
- Track payout requests and withdrawals from top prop firms (**FTMO, FundedNext, Topstep**).
- **Verified Payout Certificate Generator**: Generate official-looking RyzeLog verified certificates with certificate IDs.

### 7. Backtesting Simulator
- Test strategy hypotheses against historical price data.
- Live calculation of simulated win rate, profit factor, and statistical expectancy.

### 8. Strategy Notebook & Playbooks
- Document rules for A+ setups, entry checklists, and risk management parameters.

### 9. Theme Customization
- Seamless **Dark Mode** and **Light Mode** switching with persistent user preferences.

---

## 🚀 Quick Start (Local Launch)

### Option 1: One-Click Windows Start
Double-click `start.bat` in the root folder. It will launch the local production server and open `http://localhost:8000` in your default browser.

### Option 2: Python Production Server
```bash
python server/server.py
```
Open [http://localhost:8000](http://localhost:8000)

### Option 3: Vite Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

---

## 🛠️ Tech Stack & Architecture

- **Front-End**: React 19, Tailwind CSS v4, Lucide Icons, Vite.
- **Design System**: Glassmorphism, CSS Custom Properties (`--primary: #12d6a0`, `--secondary: #5c7cff`), Instrument Serif italic display fonts, and Plus Jakarta Sans.
- **Back-End API**: Zero-dependency Python server with SQLite (`server/ryzelog.db`).
- **Storage**: Real-time dual sync with LocalStorage and REST endpoints.

---

## 🌐 Deployment

### Vercel / Netlify
1. Connect your GitHub repository `https://github.com/mohamedosmanhassan/mohaJournal`.
2. Set Build Command: `npm run build`
3. Set Output Directory: `dist`
4. Deploy!

### Docker / Render / Railway
Run the included `server/server.py` with Python 3.

---

## 📄 License
MIT License. Created with ❤️ for disciplined traders.