import React from "react";
import dynamic from "next/dynamic";
import { Sparkles } from "lucide-react";

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

interface SharedUIIntegrationProps {
  injected: boolean;
  counterValue: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export function SharedUIIntegration({
  injected,
  counterValue,
  onIncrement,
  onDecrement,
}: Readonly<SharedUIIntegrationProps>) {
  return (
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
  );
}
