import React from "react";
import { AlertTriangle, RefreshCw, Shield } from "lucide-react";

interface CustomerRegistryProps {
  data: {
    accounts: Array<{
      id: string;
      name: string;
      accountNumber: string;
      type: string;
      status: string;
      balance: number;
    }>;
  } | null;
  isLoading: boolean;
  error: any;
  refetch: () => void;
}

export function CustomerRegistry({
  data,
  isLoading,
  error,
  refetch,
}: Readonly<CustomerRegistryProps>) {
  return (
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
          {data.accounts.map((acc) => (
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
  );
}
