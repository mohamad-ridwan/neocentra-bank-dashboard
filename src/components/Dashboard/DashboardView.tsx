import React from "react";
import dynamic from "next/dynamic";
import {
  Shield,
  Sparkles,
  TrendingUp,
  UserCheck,
  AlertTriangle,
  Users,
  RefreshCw,
} from "lucide-react";

const RemoteButton = dynamic(
  () => import("shared_remote/Button").then((m) => m.Button),
  { ssr: false },
);
const RemoteInput = dynamic(
  () => import("shared_remote/Input").then((m) => m.Input),
  { ssr: false },
);
const RemoteTooltip = dynamic(
  () => import("shared_remote/Tooltip").then((m) => m.Tooltip),
  { ssr: false },
);
const RemoteTooltipTrigger = dynamic(
  () => import("shared_remote/Tooltip").then((m) => m.TooltipTrigger),
  { ssr: false },
);
const RemoteTooltipContent = dynamic(
  () => import("shared_remote/Tooltip").then((m) => m.TooltipContent),
  { ssr: false },
);
const RemoteTooltipProvider = dynamic(
  () => import("shared_remote/Tooltip").then((m) => m.TooltipProvider),
  { ssr: false },
);

interface DashboardViewProps {
  counterValue: number;
  auth: any;
  injected: boolean;
  data: any;
  isLoading: boolean;
  error: any;
  refetch: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
}

export function DashboardView({
  counterValue,
  auth,
  injected,
  data,
  isLoading,
  error,
  refetch,
  onIncrement,
  onDecrement,
}: DashboardViewProps) {
  // TODO: Refactor this component to split into smaller widgets
  // const tempCalculatedStats = {
  //   totalAccounts: data?.stats?.totalAccounts * 1.1,
  //   activeAccounts: data?.stats?.activeAccounts * 0.9,
  // };
  // console.log("Temp stats calculated: ", tempCalculatedStats);

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-teal-400 to-indigo-400 bg-clip-text text-transparent">
            Welcome Back, {auth?.user?.username}!
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Here is the live backoffice overview for NeoCentra Bank.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-slate-300">
          <Sparkles className="w-4 h-4 text-teal-400 animate-pulse" />
          <span>
            MFE Architecture: Shell & Remote Shared [Dashboard v1.1.10]
          </span>
        </div>
      </div>

      {/* Dashboard Cards */}
      {error ? (
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
      ) : isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-28 bg-slate-900/50 border border-slate-800 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      ) : data ? (
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
      ) : null}

      {/* Integration Demos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* MFE Components Integration */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                Federated Shared UI & State
              </h2>
              <p className="text-xs text-slate-400">
                Imported dynamically from shared_remote MFE
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
              <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">
                1. Custom Inputs & Buttons
              </h4>
              <div className="flex flex-col gap-4">
                <RemoteInput
                  label="Interactive Sandbox Input"
                  placeholder="Type here..."
                />
                <div className="flex gap-3">
                  <RemoteButton variant="primary">Primary Button</RemoteButton>
                  <RemoteButton variant="outline">Outline Button</RemoteButton>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
              <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">
                2. Dynamic Redux Reducer Injection
              </h4>
              <p className="text-xs text-slate-400 mb-4">
                {injected
                  ? "Dashboard MFE successfully injected the counter reducer."
                  : "Injected Redux store reducer..."}
              </p>
              <div className="flex items-center justify-between p-3 bg-slate-900 border border-slate-800 rounded-xl">
                <span className="text-sm font-semibold text-slate-300">
                  Counter State:{" "}
                  <strong className="text-teal-400 text-lg ml-1">
                    {counterValue}
                  </strong>
                </span>
                <div className="flex gap-2">
                  <RemoteButton
                    size="sm"
                    variant="secondary"
                    onClick={onDecrement}
                  >
                    -1
                  </RemoteButton>
                  <RemoteButton
                    size="sm"
                    variant="primary"
                    onClick={onIncrement}
                  >
                    +1
                  </RemoteButton>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
              <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">
                3. Federated Tooltip (Radix UI)
              </h4>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">
                  Hover over the badge to see the tooltip:
                </span>
                <RemoteTooltipProvider>
                  <RemoteTooltip>
                    <RemoteTooltipTrigger asChild>
                      <span className="cursor-pointer bg-teal-500/10 text-teal-400 border border-teal-500/20 text-xs px-2.5 py-1 rounded-full font-bold inline-block hover:bg-teal-500/20 transition-all">
                        Hover Me
                      </span>
                    </RemoteTooltipTrigger>
                    <RemoteTooltipContent>
                      <p className="font-semibold text-teal-400">
                        Secure Core MFE Tooltip
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        Powered by Radix UI & Module Federation
                      </p>
                    </RemoteTooltipContent>
                  </RemoteTooltip>
                </RemoteTooltipProvider>
              </div>
            </div>
          </div>
        </div>

        {/* Accounts List (React Query) */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                Live Customer Account Registry
              </h2>
              <p className="text-xs text-slate-400">
                Fetched via React Query with shared query client
              </p>
            </div>
          </div>

          {error ? (
            <div className="flex flex-col items-center justify-center py-10 px-4 text-center bg-slate-950 rounded-xl border border-red-500/15">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 mb-4 border border-red-500/10 animate-pulse">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-white">
                Gagal Memuat Registry
              </h3>
              <p className="text-xs text-slate-400 mt-2 max-w-xs leading-relaxed">
                {error.status ? `${error.status}: ` : ""}
                {error.message || "Terjadi kesalahan internal pada server."}
              </p>
              <button
                onClick={() => {
                  if (error && error.status === 404) {
                    window.location.reload();
                  } else {
                    refetch();
                  }
                }}
                className="mt-5 px-4 py-2 text-xs font-semibold bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all shadow-md shadow-red-500/10 hover:scale-102 active:scale-98 cursor-pointer flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Retry Fetching
              </button>
            </div>
          ) : isLoading ? (
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-14 bg-slate-950 rounded-xl animate-pulse"
                />
              ))}
            </div>
          ) : data ? (
            <div className="space-y-3">
              {data.accounts.map((acc: any) => (
                <div
                  key={acc.id}
                  className="flex items-center justify-between p-4 bg-slate-950 border border-slate-800 rounded-xl hover:border-slate-700 transition-colors"
                >
                  <div>
                    <p className="text-sm font-bold text-white">{acc.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Acc: {acc.accountNumber} • {acc.type}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-200">
                      $
                      {acc.balance.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-1 ${
                        acc.status === "Active"
                          ? "bg-teal-500/10 text-teal-400"
                          : acc.status === "Blocked"
                            ? "bg-red-500/10 text-red-400"
                            : "bg-yellow-500/10 text-yellow-400"
                      }`}
                    >
                      {acc.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-red-400">Failed to load live registry</p>
          )}
        </div>
      </div>
    </div>
  );
}
