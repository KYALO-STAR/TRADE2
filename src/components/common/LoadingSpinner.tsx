/**
 * Reusable loading spinner component
 * Provides consistent loading states across the application
 */

'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  /** Size variant of the spinner */
  size?: 'small' | 'medium' | 'large';
  /** Custom className for styling */
  className?: string;
  /** Loading text to display */
  text?: string;
  /** Whether to show the spinner inline or as a block */
  inline?: boolean;
  /** Color variant */
  variant?: 'primary' | 'secondary' | 'white';
}

/**
 * Loading spinner component with multiple size and style variants
 * Used throughout the app for consistent loading states
 */
export function LoadingSpinner({
  size = 'medium',
  className,
  text,
  inline = false,
  variant = 'primary',
}: LoadingSpinnerProps) {
  // Size classes for different spinner sizes
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8',
  };

  // Color classes for different variants
  const variantClasses = {
    primary: 'text-primary-500',
    secondary: 'text-gray-400',
    white: 'text-white',
  };

  // Text size classes
  const textSizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  };

  const spinnerElement = (
    <Loader2
      className={cn(
        'animate-spin',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      aria-hidden="true"
    />
  );

  // If inline, render just the spinner
  if (inline && !text) {
    return spinnerElement;
  }

  // Render spinner with optional text
  return (
    <div
      className={cn(
        'flex items-center justify-center',
        inline ? 'inline-flex' : 'flex-col',
        text && !inline && 'gap-3',
        text && inline && 'gap-2'
      )}
      role="status"
      aria-live="polite"
    >
      {spinnerElement}
      
      {text && (
        <span
          className={cn(
            'text-gray-300',
            textSizeClasses[size]
          )}
        >
          {text}
        </span>
      )}
      
      {/* Screen reader text */}
      <span className="sr-only">
        {text || 'Loading...'}
      </span>
    </div>
  );
}

/**
 * Full-page loading overlay component
 * Used for page-level loading states
 */
export function LoadingOverlay({
  text = 'Loading...',
  className,
}: {
  text?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center bg-gray-950/80 backdrop-blur-sm',
        className
      )}
      role="dialog"
      aria-modal="true"
      aria-label="Loading"
    >
      <div className="flex flex-col items-center justify-center p-6 bg-gray-900 rounded-lg border border-gray-800 shadow-xl">
        <LoadingSpinner size="large" text={text} />
      </div>
    </div>
  );
}

/**
 * Inline loading state for buttons and small components
 */
export function InlineLoader({
  size = 'small',
  className,
}: {
  size?: 'small' | 'medium';
  className?: string;
}) {
  return (
    <LoadingSpinner
      size={size}
      inline
      variant="white"
      className={className}
    />
  );
}

/**
 * Loading skeleton component for content placeholders
 */
export function LoadingSkeleton({
  className,
  lines = 3,
}: {
  className?: string;
  lines?: number;
}) {
  return (
    <div className={cn('animate-pulse space-y-3', className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'h-4 bg-gray-800 rounded',
            index === lines - 1 && 'w-3/4', // Last line is shorter
            index === 0 && 'w-full', // First line is full width
            index > 0 && index < lines - 1 && 'w-5/6' // Middle lines are slightly shorter
          )}
        />
      ))}
    </div>
  );
}

/**
 * Card loading skeleton
 */
export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('animate-pulse', className)}>
      <div className="h-48 bg-gray-800 rounded-t-lg" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-800 rounded w-3/4" />
        <div className="space-y-2">
          <div className="h-3 bg-gray-800 rounded" />
          <div className="h-3 bg-gray-800 rounded w-5/6" />
        </div>
        <div className="flex justify-between items-center pt-2">
          <div className="h-4 bg-gray-800 rounded w-1/4" />
          <div className="h-8 bg-gray-800 rounded w-20" />
        </div>
      </div>
    </div>
  );
}