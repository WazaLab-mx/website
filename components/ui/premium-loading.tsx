'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface PremiumLoadingProps {
  variant?: 'spinner' | 'skeleton' | 'pulse' | 'shimmer';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  text?: string;
}

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  height?: string;
  width?: string;
  lines?: number;
}

// Premium Loading Spinner
export function PremiumSpinner({ size = 'md', className }: { size?: PremiumLoadingProps['size']; className?: string }) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8', 
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-[#7C2D3E] via-[#D4AF37] to-[#9B3A4C] animate-spin">
        <div className="absolute inset-1 rounded-full bg-background"></div>
      </div>
      
      {/* Inner glow */}
      <div className="absolute inset-2 rounded-full bg-gradient-to-r from-[#7C2D3E]/20 via-[#D4AF37]/20 to-[#9B3A4C]/20 animate-pulse"></div>
      
      {/* Center dot */}
      <div className="absolute inset-1/3 rounded-full bg-gradient-to-r from-[#7C2D3E] to-[#9B3A4C] animate-ping opacity-75"></div>
    </div>
  );
}

// Premium Skeleton Loader
export function PremiumSkeleton({ 
  className, 
  variant = 'rectangular', 
  height, 
  width, 
  lines = 1 
}: SkeletonProps) {
  const baseClasses = "animate-pulse bg-gradient-to-r from-muted/80 via-muted/60 to-muted/80 bg-[length:200%_100%] animate-shimmer";
  
  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full aspect-square',
    rectangular: 'rounded-lg',
    card: 'rounded-xl'
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={cn("space-y-3", className)}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              baseClasses,
              variantClasses.text,
              i === lines - 1 ? 'w-3/4' : 'w-full'
            )}
            style={{ height, width: i === lines - 1 ? '75%' : width }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(baseClasses, variantClasses[variant], className)}
      style={{ height, width }}
    />
  );
}

// Card Skeleton
export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("premium-card p-6 space-y-4", className)}>
      <div className="flex items-center space-x-4">
        <PremiumSkeleton variant="circular" className="h-12 w-12" />
        <div className="space-y-2 flex-1">
          <PremiumSkeleton variant="text" className="h-4 w-3/4" />
          <PremiumSkeleton variant="text" className="h-3 w-1/2" />
        </div>
      </div>
      <PremiumSkeleton variant="text" lines={3} />
      <div className="flex space-x-2">
        <PremiumSkeleton variant="rectangular" className="h-8 w-20 rounded-full" />
        <PremiumSkeleton variant="rectangular" className="h-8 w-16 rounded-full" />
      </div>
    </div>
  );
}

// Page Loading Component
export function PageLoader({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex flex-col items-center space-y-6">
        {/* Premium Loading Animation */}
        <div className="relative">
          <PremiumSpinner size="xl" />
          
          {/* Floating particles */}
          <div className="absolute -top-2 -right-2 w-2 h-2 bg-[#7C2D3E] rounded-full animate-ping opacity-60"></div>
          <div className="absolute -bottom-2 -left-2 w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-ping opacity-40" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute -top-1 -left-3 w-1 h-1 bg-[#9B3A4C] rounded-full animate-ping opacity-50" style={{animationDelay: '1s'}}></div>
        </div>
        
        {/* Loading text with gradient */}
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold text-gradient-hover">{text}</h3>
          <div className="flex space-x-1 justify-center">
            <div className="w-2 h-2 bg-[#7C2D3E] rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-[#9B3A4C] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Premium Loading Component
export function PremiumLoading({ 
  variant = 'spinner', 
  size = 'md', 
  className, 
  text 
}: PremiumLoadingProps) {
  switch (variant) {
    case 'skeleton':
      return <PremiumSkeleton className={className} />;
    case 'pulse':
      return (
        <div className={cn("animate-pulse bg-gradient-to-r from-[#7C2D3E]/10 via-[#D4AF37]/10 to-[#9B3A4C]/10 rounded-lg", className)}>
          <div className="p-4 space-y-3">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
        </div>
      );
    case 'shimmer':
      return (
        <div className={cn("relative overflow-hidden bg-muted rounded-lg", className)}>
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
        </div>
      );
    default:
      return (
        <div className={cn("flex items-center justify-center space-x-3", className)}>
          <PremiumSpinner size={size} />
          {text && <span className="text-sm text-muted-foreground">{text}</span>}
        </div>
      );
  }
}

// List Skeleton for multiple items
export function ListSkeleton({ 
  items = 3, 
  className 
}: { 
  items?: number; 
  className?: string; 
}) {
  return (
    <div className={cn("space-y-4", className)}>
      {Array.from({ length: items }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

// Feature Skeleton for feature cards
export function FeatureSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("premium-card p-6 space-y-4", className)}>
      {/* Top accent line */}
      <PremiumSkeleton variant="rectangular" className="h-1 w-full rounded-full" />
      
      {/* Icon */}
      <PremiumSkeleton variant="circular" className="h-16 w-16" />
      
      {/* Title */}
      <PremiumSkeleton variant="text" className="h-5 w-3/4" />
      
      {/* Description */}
      <PremiumSkeleton variant="text" lines={2} />
      
      {/* Bottom accent */}
      <PremiumSkeleton variant="rectangular" className="h-0.5 w-1/2 rounded-full mx-auto" />
    </div>
  );
}

export default PremiumLoading;