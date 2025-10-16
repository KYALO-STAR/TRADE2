/**
 * Home page component - Landing page for the trading application
 * Displays hero section, features, and key information about the platform
 */

'use client';

import { Hero } from '@/components/home/Hero';
import { Features } from '@/components/home/Features';
import { StatsSection } from '@/components/home/StatsSection';
import { CTA } from '@/components/home/CTA';
import Header from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AIAssistant } from '@/components/ai/AIAssistant';

/**
 * Main landing page component
 * Combines multiple sections to create an engaging user experience
 */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Navigation header */}
      <Header />
      
      {/* Main content sections */}
      <main>
        {/* Hero section with primary CTA */}
        <Hero />
        
        {/* Key features showcase */}
        <Features />
        
        {/* Platform statistics */}
        <StatsSection />
        
        {/* Final call to action */}
        <CTA />
      </main>
      
      {/* Site footer */}
      <Footer />
      
      {/* AI Assistant */}
      <AIAssistant />
    </div>
  );
}