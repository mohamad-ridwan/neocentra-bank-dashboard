import React from "react";
import { useRemoteCSS } from "../hooks/useRemoteCSS";
import Dashboard from "./Dashboard";

export default function DashboardStandaloneContainer() {
  const SHARED_MFE_URL =
    process.env.NEXT_PUBLIC_SHARED_URL || "http://localhost:3342";

  // Load the shared MFE styles dynamically
  const { loaded, error } = useRemoteCSS(
    SHARED_MFE_URL,
    "shared_remote",
    "./Button",
  );

  if (error) {
    return <div>Something went wrong</div>;
  }

  if (!loaded) {
    return <div>Loading...</div>;
  }
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <Dashboard />
      </div>
    </div>
  );
}
