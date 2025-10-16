/**
 * Reusable input component with validation and error handling
 * Provides consistent form input styling across the application
 */

'use client';

import React, { forwardRef } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Label for the input */
  label?: string;
  /** Error message to display */
  error?: string;
  /** Helper text to display */
  helperText?: string;
  /** Icon to display on the left side */
  leftIcon?: React.ReactNode;
  /** Icon to display on the right side */
  rightIcon?: React.ReactNode;
  /** Whether the input is in a loading state */
  loading?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Versatile input component with built-in validation states and icons
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    loading,
    size = 'md',
    className,
    type = 'text',
    id,
    ...props
  }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const inputId = id || `input-${React.useId()}`;
    const isPassword = type === 'password';
    const actualType = isPassword && showPassword ? 'text' : type;

    // Size classes
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-4 py-3 text-lg',
    };

    // Base input classes
    const inputClasses = cn(
      'w-full rounded-lg border transition-all duration-200',
      'bg-gray-900 text-white placeholder-gray-400',
      'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950',
      
      // Default state
      'border-gray-700 focus:border-primary-500 focus:ring-primary-500',
      
      // Error state
      error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
      
      // Disabled state
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-800',
      
      // Size
      sizeClasses[size],
      
      // Icon padding
      leftIcon && 'pl-10',
      (rightIcon || isPassword) && 'pr-10',
      
      className
    );

    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            {label}
          </label>
        )}

        {/* Input container */}
        <div className="relative">
          {/* Left icon */}
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400 [&>svg]:w-5 [&>svg]:h-5">
                {leftIcon}
              </span>
            </div>
          )}

          {/* Input element */}
          <input
            ref={ref}
            id={inputId}
            type={actualType}
            className={inputClasses}
            {...props}
          />

          {/* Right icon or password toggle */}
          {(rightIcon || isPassword) && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {isPassword ? (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-300 transition-colors focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              ) : rightIcon ? (
                <span className="text-gray-400 [&>svg]:w-5 [&>svg]:h-5">
                  {rightIcon}
                </span>
              ) : null}
            </div>
          )}

          {/* Loading spinner */}
          {loading && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <div className="animate-spin w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full" />
            </div>
          )}
        </div>

        {/* Helper text or error message */}
        {(error || helperText) && (
          <div className="mt-1 flex items-center gap-1">
            {error && (
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
            )}
            <p className={cn(
              'text-sm',
              error ? 'text-red-500' : 'text-gray-400'
            )}>
              {error || helperText}
            </p>
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

/**
 * Textarea component with consistent styling
 */
export const Textarea = forwardRef<HTMLTextAreaElement, {
  label?: string;
  error?: string;
  helperText?: string;
  rows?: number;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({
    label,
    error,
    helperText,
    rows = 4,
    className,
    id,
    ...props
  }, ref) => {
    const textareaId = id || `textarea-${React.useId()}`;

    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            {label}
          </label>
        )}

        {/* Textarea element */}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={cn(
            'w-full px-4 py-2 rounded-lg border transition-all duration-200',
            'bg-gray-900 text-white placeholder-gray-400',
            'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950',
            'resize-vertical',
            
            // Default state
            'border-gray-700 focus:border-primary-500 focus:ring-primary-500',
            
            // Error state
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
            
            // Disabled state
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-800',
            
            className
          )}
          {...props}
        />

        {/* Helper text or error message */}
        {(error || helperText) && (
          <div className="mt-1 flex items-center gap-1">
            {error && (
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
            )}
            <p className={cn(
              'text-sm',
              error ? 'text-red-500' : 'text-gray-400'
            )}>
              {error || helperText}
            </p>
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';