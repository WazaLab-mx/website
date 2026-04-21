'use client';

import React, { useState, useEffect } from 'react';
import { PageLoader, ListSkeleton, FeatureSkeleton } from './premium-loading';

interface LoadingPageProps {
  children: React.ReactNode;
  delay?: number;
  showSkeleton?: boolean;
  skeletonType?: 'features' | 'list' | 'custom';
  customSkeleton?: React.ReactNode;
}

export function LoadingPage({ 
  children, 
  delay = 1000, 
  showSkeleton = false,
  skeletonType = 'list',
  customSkeleton 
}: LoadingPageProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (isLoading) {
    if (showSkeleton) {
      return (
        <div className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-8">
            {customSkeleton ? (
              customSkeleton
            ) : skeletonType === 'features' ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <FeatureSkeleton key={i} />
                ))}
              </div>
            ) : (
              <ListSkeleton items={5} />
            )}
          </div>
        </div>
      );
    }
    
    return <PageLoader text="Loading WAZA Experience..." />;
  }

  return <>{children}</>;
}

// Hook for loading state management
export function useLoading(initialState = false) {
  const [isLoading, setIsLoading] = useState(initialState);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  return {
    isLoading,
    startLoading,
    stopLoading,
    setIsLoading,
  };
}

// Component wrapper for conditional loading
export function WithLoading({ 
  isLoading, 
  children, 
  skeleton,
  loader
}: {
  isLoading: boolean;
  children: React.ReactNode;
  skeleton?: React.ReactNode;
  loader?: React.ReactNode;
}) {
  if (isLoading) {
    return skeleton || loader || <PageLoader />;
  }

  return <>{children}</>;
}

export default LoadingPage;