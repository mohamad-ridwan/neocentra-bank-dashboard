import React, { Suspense, lazy } from 'react';
import DashboardSkeleton from '../loaders/DashboardSkeleton';

const DashboardViewWrapper = lazy(() => import('./DashboardViewWrapper'));

export default function DashboardContainer() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardViewWrapper />
    </Suspense>
  );
}
