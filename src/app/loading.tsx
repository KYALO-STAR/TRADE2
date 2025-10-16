/**
 * Global loading component
 * Displayed during page transitions and data fetching
 */

import { LoadingSpinner } from '@/components/common/LoadingSpinner';

/**
 * Loading page component with branded spinner
 */
export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="large" />
        <p className="mt-4 text-gray-400">Loading...</p>
      </div>
    </div>
  );
}