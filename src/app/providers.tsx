/**
 * Global providers for the application
 * Wraps the app with necessary context providers
 */

'use client';

import React from 'react';
import { Toaster } from 'react-hot-toast';

interface ProvidersProps {
  children: React.ReactNode;
}

/**
 * Global providers component that wraps the entire application
 * Add additional providers here as needed (Redux, React Query, etc.)
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <>
      {children}
      
      {/* Toast notification provider with custom styling */}
      <Toaster
        position="top-right"
        toastOptions={{
          // Default toast styling
          duration: 4000,
          style: {
            background: '#1f2937',
            color: '#f9fafb',
            border: '1px solid #374151',
          },
          
          // Success toast styling
          success: {
            style: {
              background: '#065f46',
              color: '#d1fae5',
              border: '1px solid #059669',
            },
            iconTheme: {
              primary: '#10b981',
              secondary: '#d1fae5',
            },
          },
          
          // Error toast styling
          error: {
            style: {
              background: '#7f1d1d',
              color: '#fecaca',
              border: '1px solid #dc2626',
            },
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fecaca',
            },
          },
        }}
      />
    </>
  );
}