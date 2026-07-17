import React from "react";
import { Sparkles } from "lucide-react";

interface WelcomeHeaderProps {
  auth: {
    user?: {
      username?: string;
    };
  } | null;
}

export function WelcomeHeader({ auth }: Readonly<WelcomeHeaderProps>) {
  return (
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
  );
}
