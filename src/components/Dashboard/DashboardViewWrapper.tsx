import React from 'react';
import { useDashboard } from './useDashboard';
import { DashboardView } from './DashboardView';
import DashboardSkeleton from '../loaders/DashboardSkeleton';

export default function DashboardViewWrapper() {
  const {
    counterValue,
    auth,
    injected,
    data,
    isLoading,
    error,
    refetch,
    handleIncrement,
    handleDecrement,
  } = useDashboard();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <DashboardView
      counterValue={counterValue}
      auth={auth}
      injected={injected}
      data={data}
      isLoading={isLoading}
      error={error}
      refetch={refetch}
      onIncrement={handleIncrement}
      onDecrement={handleDecrement}
    />
  );
}
