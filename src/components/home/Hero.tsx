'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { TrendingUp, Users, BookOpen, Bot } from 'lucide-react'

export function Hero() {
  const stats = [
    { icon: Users, label: 'Active Traders', value: '10,000+' },
    { icon: TrendingUp, label: 'Success Rate', value: '89%' },
    { icon: BookOpen, label: 'Learning Modules', value: '50+' },
    { icon: Bot, label: 'Bot Strategies', value: '25+' },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 to-dark-950" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80')] bg-cover bg-center opacity-5" />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center">
          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6">
              <span className="block text-white">Master</span>
              <span className="block gradient-text">Professional Trading</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Empower your financial future with advanced trading tools, comprehensive education, 
              and proven strategies designed for SACCOs, professionals, and ambitious beginners.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link href="/register" className="btn-primary text-lg px-8 py-4">
              Start Trading Now
            </Link>
            <Link href="/learn" className="btn-secondary text-lg px-8 py-4">
              Learn Trading First
            </Link>
            <Link href="/community" className="text-gray-300 hover:text-primary-400 text-lg transition-colors">
              Join Community →
            </Link>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="glass rounded-xl p-6 text-center group hover:border-primary-500/50 transition-all duration-300"
                >
                  <Icon className="h-8 w-8 text-primary-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 pt-8 border-t border-dark-700"
          >
            <p className="text-gray-500 mb-6">Trusted by professionals worldwide</p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
              {/* Placeholder for partner logos */}
              <div className="h-12 w-32 bg-dark-700 rounded flex items-center justify-center text-gray-500 text-sm">
                Partner Logo
              </div>
              <div className="h-12 w-32 bg-dark-700 rounded flex items-center justify-center text-gray-500 text-sm">
                Partner Logo
              </div>
              <div className="h-12 w-32 bg-dark-700 rounded flex items-center justify-center text-gray-500 text-sm">
                Partner Logo
              </div>
              <div className="h-12 w-32 bg-dark-700 rounded flex items-center justify-center text-gray-500 text-sm">
                Partner Logo
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-10 hidden lg:block"
      >
        <div className="w-20 h-20 bg-primary-500/20 rounded-full blur-xl" />
      </motion.div>
      
      <motion.div
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/3 right-10 hidden lg:block"
      >
        <div className="w-16 h-16 bg-blue-500/20 rounded-full blur-xl" />
      </motion.div>
    </section>
  )
}