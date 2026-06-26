import React from 'react';
import dynamic from 'next/dynamic';

const DashboardStandaloneContainer = dynamic(
  () => import('../components/DashboardStandaloneContainer'),
  { ssr: false }
);

export default function StandaloneDashboardPage() {
  return <DashboardStandaloneContainer />;
}
