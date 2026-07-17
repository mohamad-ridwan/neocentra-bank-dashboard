import React from "react";
import { AlertTriangle, TrendingUp, UserCheck, Users } from "lucide-react";

interface MetricCardsProps {
  data: {
    stats: {
      totalAccounts: number;
      activeAccounts: number;
      blockedAccounts: number;
      pendingKyc: number;
    };
  } | null;
  isLoading: boolean;
  error: any;
}

export function MetricCards({
  data,
  isLoading,
  error,
}: Readonly<MetricCardsProps>) {
  if (error) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-slate-900/40 border border-red-500/10 p-6 rounded-2xl flex items-center justify-between shadow-lg"
          >
            <div>
              <span className="text-xs font-semibold text-slate-400 tracking-wide uppercase">
                Metrics
              </span>
              <p className="text-sm text-red-400 mt-1 font-semibold">
                Gagal memuat metrik
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400">
              <AlertTriangle className="w-6 h-6 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-28 bg-slate-900/50 border border-slate-800 rounded-2xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-2xl flex items-center justify-between shadow-lg">
        <div>
          <span className="text-xs font-semibold text-slate-400 tracking-wide uppercase">
            Total Accounts
          </span>
          <h3 className="text-3xl font-extrabold mt-1">
            {data.stats.totalAccounts.toLocaleString()}
          </h3>
        </div>
        <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400">
          <Users className="w-6 h-6" />
        </div>
      </div>

      <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-2xl flex items-center justify-between shadow-lg">
        <div>
          <span className="text-xs font-semibold text-slate-400 tracking-wide uppercase">
            Active Accounts
          </span>
          <h3 className="text-3xl font-extrabold text-teal-400 mt-1">
            {data.stats.activeAccounts.toLocaleString()}
          </h3>
        </div>
        <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400">
          <TrendingUp className="w-6 h-6" />
        </div>
      </div>

      <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-2xl flex items-center justify-between shadow-lg">
        <div>
          <span className="text-xs font-semibold text-slate-400 tracking-wide uppercase">
            Blocked Accounts
          </span>
          <h3 className="text-3xl font-extrabold text-red-400 mt-1">
            {data.stats.blockedAccounts}
          </h3>
        </div>
        <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400">
          <AlertTriangle className="w-6 h-6" />
        </div>
      </div>

      <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-2xl flex items-center justify-between shadow-lg">
        <div>
          <span className="text-xs font-semibold text-slate-400 tracking-wide uppercase">
            Pending KYC
          </span>
          <h3 className="text-3xl font-extrabold text-indigo-400 mt-1">
            {data.stats.pendingKyc}
          </h3>
        </div>
        <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
          <UserCheck className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
