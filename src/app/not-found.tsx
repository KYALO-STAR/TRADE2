/**
 * 404 Not Found page component
 * Displayed when a user navigates to a non-existent route
 */

'use client';

import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';
import Header from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

/**
 * Custom 404 page with helpful navigation options
 */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          {/* Large 404 text */}
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-primary-500 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-white mb-2">Page Not Found</h2>
            <p className="text-gray-400">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          
          {/* Navigation options */}
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center w-full px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
            >
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center w-full px-6 py-3 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-medium rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </button>
          </div>
          
          {/* Additional help */}
          <div className="mt-8 pt-8 border-t border-gray-800">
            <p className="text-gray-400 text-sm mb-4">
              Need help? Check out these popular pages:
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Link
                href="/dashboard"
                className="px-3 py-1 text-sm bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/course"
                className="px-3 py-1 text-sm bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded transition-colors"
              >
                Courses
              </Link>
              <Link
                href="/bots"
                className="px-3 py-1 text-sm bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded transition-colors"
              >
                Bot Strategies
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}