/**
 * Error Boundary component for graceful error handling
 * Catches JavaScript errors anywhere in the child component tree
 */

'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

/**
 * Error boundary class component that catches and handles React errors
 * Provides a fallback UI and recovery options when errors occur
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  /**
   * Static method called when an error occurs
   * Updates state to trigger fallback UI rendering
   */
  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  /**
   * Lifecycle method called after an error is caught
   * Used for error logging and reporting
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error details for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Update state with error information
    this.setState({
      error,
      errorInfo,
    });

    // In production, you might want to log this to an error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: logErrorToService(error, errorInfo);
    }
  }

  /**
   * Resets the error boundary state to recover from errors
   */
  handleReset = () => {
    this.setState({
      hasError: false,
      error: undefined,
      errorInfo: undefined,
    });
  };

  /**
   * Navigates to the home page
   */
  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    // If there's an error, render the fallback UI
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center">
            {/* Error icon */}
            <div className="mb-8">
              <div className="mx-auto w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
              
              <h1 className="text-2xl font-semibold text-white mb-2">
                Something went wrong
              </h1>
              
              <p className="text-gray-400">
                We encountered an unexpected error. Don't worry, this has been logged and we'll look into it.
              </p>
            </div>

            {/* Error details in development mode */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-8 p-4 bg-gray-900 rounded-lg text-left">
                <h3 className="text-sm font-medium text-red-400 mb-2">
                  Error Details (Development Only):
                </h3>
                <pre className="text-xs text-gray-300 overflow-auto whitespace-pre-wrap">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack && (
                    <>
                      {'\n\nComponent Stack:'}
                      {this.state.errorInfo.componentStack}
                    </>
                  )}
                </pre>
              </div>
            )}

            {/* Recovery actions */}
            <div className="space-y-4">
              <button
                onClick={this.handleReset}
                className="inline-flex items-center justify-center w-full px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-950"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Try Again
              </button>
              
              <button
                onClick={this.handleGoHome}
                className="inline-flex items-center justify-center w-full px-6 py-3 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-950"
              >
                <Home className="w-5 h-5 mr-2" />
                Go Home
              </button>
            </div>

            {/* Contact support */}
            <div className="mt-8 pt-8 border-t border-gray-800">
              <p className="text-gray-400 text-sm">
                If this problem persists, please{' '}
                <a
                  href="mailto:support@tradingapp.com"
                  className="text-primary-400 hover:text-primary-300 transition-colors"
                >
                  contact our support team
                </a>
              </p>
            </div>
          </div>
        </div>
      );
    }

    // If no error, render children normally
    return this.props.children;
  }
}

/**
 * Higher-order component wrapper for functional components
 * Usage: export default withErrorBoundary(YourComponent);
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
}