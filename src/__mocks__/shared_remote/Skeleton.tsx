import React from 'react';
export const Skeleton = ({ className, ...props }: any) => (
  <div data-testid="skeleton" className={className} {...props} />
);
