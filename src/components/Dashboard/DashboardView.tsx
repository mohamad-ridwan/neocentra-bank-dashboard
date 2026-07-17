import React from "react";
import { WelcomeHeader } from "./WelcomeHeader";
import { MetricCards } from "./MetricCards";
import { SharedUIIntegration } from "./SharedUIIntegration";
import { CustomerRegistry } from "./CustomerRegistry";

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
}: Readonly<DashboardViewProps>) {
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <WelcomeHeader auth={auth} />

      {/* Dashboard Cards */}
      <MetricCards data={data} isLoading={isLoading} error={error} />

      {/* Integration Demos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* MFE Components Integration */}
        <SharedUIIntegration
          injected={injected}
          counterValue={counterValue}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
        />

        {/* Accounts List (React Query) */}
        <CustomerRegistry
          data={data}
          isLoading={isLoading}
          error={error}
          refetch={refetch}
        />
      </div>
    </div>
  );
}
