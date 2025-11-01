'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Menu,
  X,
  User,
  LogOut,
  Settings,
  TrendingUp,
  Bot,
  BookOpen,
  Users,
  BarChart3,
  Command,
  Eye,
  Home,
  Zap
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import SACCOToggle from './SACCOToggle'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [saccoMode, setSaccoMode] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuthStatus = () => {
      // Check if user is logged in - check both localStorage and cookies
      const token = localStorage.getItem('auth_token')
      const cookieToken = document.cookie
        .split(';')
        .find(cookie => cookie.trim().startsWith('auth_token='))
        ?.split('=')[1]
      
      if (token || cookieToken) {
        // In a real app, validate token and get user data
        setUser({ name: 'John Doe', email: 'john@example.com' })
      } else {
        setUser(null)
      }
    }

    checkAuthStatus()

    // Check SACCO mode
    const savedSaccoMode = localStorage.getItem('sacco-mode')
    if (savedSaccoMode) {
      const parsed = JSON.parse(savedSaccoMode)
      setSaccoMode(parsed.enabled || false)
    }

    // Listen for auth changes
    const handleStorageChange = () => {
      checkAuthStatus()
    }
    
    window.addEventListener('storage', handleStorageChange)
    // Also listen for focus events to check auth on tab focus
    window.addEventListener('focus', checkAuthStatus)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('focus', checkAuthStatus)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('auth_token')
    // Clear auth cookie
    document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;'
    setUser(null)
    setIsUserMenuOpen(false)
    router.push('/auth/signin')
  }

  // Main navigation for authenticated users
  const mainNavLinks = [
    { href: '/home-dashboard', label: 'Home', icon: Home },
    { href: '/dashboard', label: 'Trading', icon: TrendingUp },
    { href: '/synthetics', label: 'Trade', icon: BarChart3 },
    { href: '/bots', label: 'Bots', icon: Bot },
    { href: '/bot-editor', label: 'Bot Builder', icon: Zap },
    { href: '/market-analysis', label: 'Analysis', icon: Eye },
  ]

  // Additional features navigation
  const featureNavLinks = [
    { href: '/automation', label: 'Automation', icon: Command },
    { href: '/course', label: 'Learn', icon: BookOpen },
    { href: '/referrals', label: 'Referrals', icon: Users },
  ]

  // Guest navigation for non-authenticated users
  const guestNavLinks = [
    { href: '/#features', label: 'Features' },
    { href: '/course', label: 'Learn' },
    { href: '/tips', label: 'Tips' },
    { href: '/#pricing', label: 'Pricing' },
  ]

  return (
    <>
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                TradePro
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {user ? (
                // Authenticated user navigation
                <>
                  {mainNavLinks.map((link) => {
                    const Icon = link.icon
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors hover:bg-gray-800 text-gray-300 hover:text-white text-sm"
                      >
                        <Icon className="w-4 h-4" />
                        {link.label}
                      </Link>
                    )
                  })}
                  {/* More dropdown for additional features */}
                  <div className="relative group">
                    <button className="flex items-center gap-1 px-3 py-2 rounded-lg transition-colors hover:bg-gray-800 text-gray-300 hover:text-white text-sm">
                      More
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="absolute top-full left-0 mt-1 w-48 bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                      {featureNavLinks.map((link) => {
                        const Icon = link.icon
                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg"
                          >
                            <Icon className="w-4 h-4" />
                            {link.label}
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                </>
              ) : (
                // Guest navigation
                guestNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-3 py-2 rounded-lg transition-colors hover:bg-gray-800 text-gray-300 hover:text-white text-sm"
                  >
                    {link.label}
                  </Link>
                ))
              )}
            </nav>

            {/* User Menu & Actions */}
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 bg-gray-800 rounded-lg px-3 py-2 hover:bg-gray-700 transition-colors"
                  >
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className={`text-white hidden sm:block ${saccoMode ? 'text-base' : 'text-sm'}`}>
                      {user.name}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg py-2 z-50"
                      >
                        <Link
                          href="/profile"
                          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <User className="w-4 h-4" />
                          Profile
                        </Link>
                        <Link
                          href="/settings"
                          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Settings className="w-4 h-4" />
                          Settings
                        </Link>
                        <hr className="border-gray-700 my-2" />
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-700 text-red-400 hover:text-red-300 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    href="/auth/signin"
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-lg transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Get Started
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5 text-white" />
                ) : (
                  <Menu className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-gray-800 border-t border-gray-700"
            >
              <div className="px-4 py-4 space-y-2">
                {user ? (
                  // Authenticated user mobile menu
                  <>
                    {mainNavLinks.map((link) => {
                      const Icon = link.icon
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
                        >
                          <Icon className="w-5 h-5" />
                          <span className="text-sm">{link.label}</span>
                        </Link>
                      )
                    })}
                    <div className="border-t border-gray-700 pt-2 mt-2">
                      {featureNavLinks.map((link) => {
                        const Icon = link.icon
                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
                          >
                            <Icon className="w-4 h-4" />
                            <span className="text-sm">{link.label}</span>
                          </Link>
                        )
                      })}
                    </div>
                  </>
                ) : (
                  // Guest mobile menu
                  guestNavLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-3 py-3 rounded-lg hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))
                )}
                
                {!user && (
                  <div className="pt-4 border-t border-gray-700 space-y-2">
                    <Link
                      href="/auth/signin"
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full text-center px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/signup"
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full text-center px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-colors"
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* SACCO Toggle Component */}
      <SACCOToggle />
    </>
  )
}