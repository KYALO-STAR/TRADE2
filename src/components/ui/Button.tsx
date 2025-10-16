/**
 * Reusable button component with multiple variants and states
 * Provides consistent button styling across the application
 */

'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant of the button */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  /** Size variant of the button */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the button is in a loading state */
  loading?: boolean;
  /** Icon to display before the text */
  leftIcon?: React.ReactNode;
  /** Icon to display after the text */
  rightIcon?: React.ReactNode;
  /** Whether the button should take full width */
  fullWidth?: boolean;
}

/**
 * Versatile button component with multiple variants and states
 * Handles loading states, icons, and accessibility automatically
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  // Base button classes
  const baseClasses = [
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'active:scale-95',
  ];

  // Variant classes
  const variantClasses = {
    primary: [
      'bg-primary-600 hover:bg-primary-700 text-white',
      'focus:ring-primary-500',
      'shadow-lg hover:shadow-xl',
    ],
    secondary: [
      'bg-gray-700 hover:bg-gray-600 text-white',
      'focus:ring-gray-500',
      'shadow-lg hover:shadow-xl',
    ],
    outline: [
      'border-2 border-primary-600 hover:border-primary-500',
      'text-primary-600 hover:text-primary-500 hover:bg-primary-50',
      'focus:ring-primary-500',
    ],
    ghost: [
      'text-gray-300 hover:text-white hover:bg-gray-800',
      'focus:ring-gray-500',
    ],
    danger: [
      'bg-red-600 hover:bg-red-700 text-white',
      'focus:ring-red-500',
      'shadow-lg hover:shadow-xl',
    ],
  };

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-base gap-2',
    lg: 'px-6 py-3 text-lg gap-2.5',
  };

  // Combine all classes
  const buttonClasses = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && 'w-full',
    className
  );

  return (
    <button
      className={buttonClasses}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {/* Left icon or loading spinner */}
      {loading ? (
        <Loader2 className={cn(
          'animate-spin',
          size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'
        )} />
      ) : leftIcon ? (
        <span className={cn(
          'flex items-center',
          size === 'sm' ? '[&>svg]:w-3 [&>svg]:h-3' : 
          size === 'lg' ? '[&>svg]:w-5 [&>svg]:h-5' : 
          '[&>svg]:w-4 [&>svg]:h-4'
        )}>
          {leftIcon}
        </span>
      ) : null}

      {/* Button text */}
      {children && (
        <span className={loading && !children ? 'sr-only' : ''}>
          {children}
        </span>
      )}

      {/* Right icon */}
      {!loading && rightIcon && (
        <span className={cn(
          'flex items-center',
          size === 'sm' ? '[&>svg]:w-3 [&>svg]:h-3' : 
          size === 'lg' ? '[&>svg]:w-5 [&>svg]:h-5' : 
          '[&>svg]:w-4 [&>svg]:h-4'
        )}>
          {rightIcon}
        </span>
      )}
    </button>
  );
}

/**
 * Icon-only button variant
 */
export function IconButton({
  children,
  variant = 'ghost',
  size = 'md',
  className,
  ...props
}: Omit<ButtonProps, 'leftIcon' | 'rightIcon'>) {
  const sizeClasses = {
    sm: 'p-1',
    md: 'p-2',
    lg: 'p-3',
  };

  return (
    <Button
      variant={variant}
      className={cn(
        sizeClasses[size],
        '[&>span]:sr-only',
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}