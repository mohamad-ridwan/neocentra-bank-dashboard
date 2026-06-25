import React from 'react';
import { useDashboard } from './useDashboard';
import { DashboardView } from './DashboardView';

export default function DashboardContainer() {
  const {
    counterValue,
    auth,
    injected,
    data,
    isLoading,
    error,
    handleIncrement,
    handleDecrement,
  } = useDashboard();

  return (
    <DashboardView
      counterValue={counterValue}
      auth={auth}
      injected={injected}
      data={data}
      isLoading={isLoading}
      error={error}
      onIncrement={handleIncrement}
      onDecrement={handleDecrement}
    />
  );
}
