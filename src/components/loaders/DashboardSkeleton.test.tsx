import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DashboardSkeleton from './DashboardSkeleton';

describe('DashboardSkeleton Component', () => {
  it('should render skeleton components for the dashboard layout', () => {
    render(<DashboardSkeleton />);
    
    // Check that multiple skeleton elements are rendered
    const skeletons = screen.getAllByTestId('skeleton');
    expect(skeletons.length).toBeGreaterThan(10);
  });
});
