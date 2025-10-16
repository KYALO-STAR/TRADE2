/**
 * Root layout component for the trading application
 * Provides global styling, providers, and layout structure
 */

import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { ToastProvider } from '@/components/common/Toast';

// Configure Inter font with Latin subset
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Metadata configuration for SEO and social sharing
export const metadata: Metadata = {
  title: {
    default: 'TradingApp - Professional Trading Platform',
    template: '%s | TradingApp'
  },
  description: 'Professional trading platform with advanced tools, bot strategies, and educational resources for traders of all levels.',
  keywords: [
    'trading',
    'forex',
    'synthetic indices',
    'bot trading',
    'deriv',
    'financial education',
    'trading strategies'
  ],
  authors: [{ name: 'TradingApp Team' }],
  creator: 'TradingApp',
  publisher: 'TradingApp',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tradingapp.com',
    siteName: 'TradingApp',
    title: 'TradingApp - Professional Trading Platform',
    description: 'Professional trading platform with advanced tools and educational resources.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TradingApp - Professional Trading Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TradingApp - Professional Trading Platform',
    description: 'Professional trading platform with advanced tools and educational resources.',
    images: ['/og-image.png'],
    creator: '@tradingapp',
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
};

/**
 * Root layout component that wraps all pages
 * Provides global providers, error boundaries, and consistent structure
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        
        {/* Additional meta tags for better SEO */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className="min-h-screen bg-gray-950 text-white font-inter antialiased">
        {/* Error boundary to catch and handle React errors gracefully */}
        <ErrorBoundary>
          {/* Global providers for state management, theming, etc. */}
          <Providers>
            <ToastProvider>
              <div className="relative min-h-screen flex flex-col">
                <main className="flex-1">
                  {children}
                </main>
              </div>
            </ToastProvider>
          </Providers>
        </ErrorBoundary>
        
        {/* Prevent flash of unstyled content */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                var theme = localStorage.getItem('theme') || 'dark';
                document.documentElement.classList.toggle('dark', theme === 'dark');
              } catch (e) {}
            })();
          `
        }} />
      </body>
    </html>
  );
}