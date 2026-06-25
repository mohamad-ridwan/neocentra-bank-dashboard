import React from 'react';
import Dashboard from '../components/Dashboard';

export default function StandaloneDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <Dashboard />
      </div>
    </div>
  );
}
