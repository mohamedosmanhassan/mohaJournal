import React, { useState } from 'react';
import { DollarSign, Award, Download, CheckCircle, Clock, ShieldCheck, Eye, Plus, Sparkles, X } from 'lucide-react';
import { initialPayouts } from '../../data/mockData';

export default function PayoutsView() {
  const [payouts, setPayouts] = useState(initialPayouts);
  const [selectedCert, setSelectedCert] = useState(null);

  const totalWithdrawn = payouts
    .filter((p) => p.status === 'PAID')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6 text-left animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            Prop Firm Payout System
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold">
              Verified Earnings
            </span>
          </h2>
          <p className="text-xs text-foreground/60 mt-1">
            Track performance earnings, profit share payouts, and verified funded trader certificates
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-5">
          <span className="text-xs uppercase font-semibold text-foreground/60">Total Payouts Withdrawn</span>
          <div className="text-3xl font-bold text-gradient-brand mt-1 font-mono">
            ${totalWithdrawn.toLocaleString()}.00
          </div>
          <span className="text-[11px] text-emerald-400 mt-1 block">Successfully deposited & verified</span>
        </div>

        <div className="glass-card p-5">
          <span className="text-xs uppercase font-semibold text-foreground/60">Payout Certificates</span>
          <div className="text-3xl font-bold text-foreground mt-1 font-mono">
            {payouts.length} Approved
          </div>
          <span className="text-[11px] text-brand-teal mt-1 block">FTMO & FundedNext</span>
        </div>

        <div className="glass-card p-5">
          <span className="text-xs uppercase font-semibold text-foreground/60">Average Withdrawal</span>
          <div className="text-3xl font-bold text-foreground mt-1 font-mono">
            ${(totalWithdrawn / (payouts.filter((p) => p.status === 'PAID').length || 1)).toFixed(0)}
          </div>
          <span className="text-[11px] text-foreground/60 mt-1 block">Next cycle in 12 days</span>
        </div>
      </div>

      {/* Payouts Table */}
      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="text-sm font-bold text-foreground">Withdrawal & Payout History</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-card/40 text-foreground/60 text-xs font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-4">Firm / Prop</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Requested</th>
                <th className="py-3.5 px-4">Paid Date</th>
                <th className="py-3.5 px-4">Payment Method</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Certificate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {payouts.map((payout) => (
                <tr key={payout.id} className="hover:bg-card/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-foreground">{payout.firm}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">
                    +${payout.amount.toLocaleString()}.00
                  </td>
                  <td className="py-3.5 px-4 text-xs font-mono text-foreground/70">{payout.requestedDate}</td>
                  <td className="py-3.5 px-4 text-xs font-mono text-foreground/70">{payout.paidDate}</td>
                  <td className="py-3.5 px-4 text-xs text-foreground/80">{payout.method}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        payout.status === 'PAID'
                          ? 'bg-emerald-500/15 text-emerald-400'
                          : 'bg-amber-500/15 text-amber-400'
                      }`}
                    >
                      {payout.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedCert(payout)}
                      className="px-3 py-1 rounded-xl border border-border hover:border-brand-teal/40 text-xs font-semibold text-foreground/80 hover:text-foreground inline-flex items-center gap-1.5 transition-colors"
                    >
                      <Award className="w-3.5 h-3.5 text-brand-teal" />
                      View Cert
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Verified Certificate Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-xl rounded-3xl border border-brand-teal/40 bg-gradient-to-b from-[#0a1424] to-[#050912] p-8 text-center text-white shadow-2xl">
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-white/60 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 rounded-2xl bg-gradient-brand mx-auto grid place-items-center mb-4 shadow-glow-teal">
              <Award className="w-7 h-7 text-white" />
            </div>

            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-teal">
              RyzeLog Verified Certificate
            </span>

            <h3 className="text-2xl font-display font-bold mt-2">Funded Trader Payout</h3>
            <p className="text-xs text-white/60 mt-1">Certificate ID: {selectedCert.certificateId}</p>

            <div className="my-6 p-6 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-xs uppercase tracking-wider text-white/60">Awarded To</span>
              <div className="text-xl font-bold text-white mt-0.5">Mohamed Osman</div>
              <span className="text-xs text-brand-blue block mt-1">Prop Firm: {selectedCert.firm}</span>

              <div className="text-4xl font-display font-bold text-gradient-brand mt-4 font-mono">
                ${selectedCert.amount.toLocaleString()}.00 USD
              </div>
              <span className="text-[11px] text-white/60 mt-1 block">Verified & Processed on {selectedCert.paidDate}</span>
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setSelectedCert(null)}
                className="px-6 py-2 rounded-xl bg-white text-black font-semibold text-xs hover:scale-105 transition-transform"
              >
                Close Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
