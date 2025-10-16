/**
 * Global error page component
 * Displayed when an unhandled error occurs in the application
 */

'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import Header from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Error page component with recovery options
 */
export default function Error({ error, reset }: ErrorProps) {
  // Log error to console for debugging
  useEffect(() => {
    console.error('Application Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          {/* Error icon */}
          <div className="mb-8">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            
            <h1 className="text-2xl font-semibold text-white mb-2">
              Oops! Something went wrong
            </h1>
            
            <p className="text-gray-400">
              We encountered an unexpected error. This has been logged and we'll look into it.
            </p>
          </div>
          
          {/* Error details in development */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mb-8 p-4 bg-gray-900 rounded-lg text-left">
              <h3 className="text-sm font-medium text-red-400 mb-2">Error Details:</h3>
              <pre className="text-xs text-gray-300 overflow-auto">
                {error.message}
              </pre>
              {error.digest && (
                <p className="text-xs text-gray-500 mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          )}
          
          {/* Recovery actions */}
          <div className="space-y-4">
            <button
              onClick={reset}
              className="inline-flex items-center justify-center w-full px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Try Again
            </button>
            
            <button
              onClick={() => window.location.href = '/'}
              className="inline-flex items-center justify-center w-full px-6 py-3 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-medium rounded-lg transition-colors"
            >
              Go to Home
            </button>
          </div>
          
          {/* Contact support */}
          <div className="mt-8 pt-8 border-t border-gray-800">
            <p className="text-gray-400 text-sm">
              If this problem persists, please{' '}
              <a
                href="mailto:support@tradingapp.com"
                className="text-primary-400 hover:text-primary-300"
              >
                contact support
              </a>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}