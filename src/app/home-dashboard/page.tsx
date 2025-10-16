'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  DollarSign, 
  Activity, 
  Users, 
  Bot,
  BookOpen,
  Award,
  Eye,
  ArrowUpRight,
  Calendar,
  Clock,
  Target,
  Zap
} from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import { AIAssistant } from '@/components/ai/AIAssistant'

interface DashboardStats {
  totalBalance: number
  todayProfit: number
  totalTrades: number
  winRate: number
  activeBots: number
  referrals: number
}

interface RecentActivity {
  id: string
  type: 'trade' | 'bot' | 'referral' | 'course'
  description: string
  timestamp: Date
  amount?: number
  status: 'success' | 'pending' | 'completed'
}

export default function HomeDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalBalance: 2450.75,
    todayProfit: 125.30,
    totalTrades: 87,
    winRate: 72.4,
    activeBots: 3,
    referrals: 12
  })

  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([
    {
      id: '1',
      type: 'trade',
      description: 'Volatility 75 Index trade closed',
      timestamp: new Date(Date.now() - 5 * 60000),
      amount: 45.20,
      status: 'success'
    },
    {
      id: '2',
      type: 'bot',
      description: 'Scalping Bot activated',
      timestamp: new Date(Date.now() - 15 * 60000),
      status: 'completed'
    },
    {
      id: '3',
      type: 'referral',
      description: 'New referral joined',
      timestamp: new Date(Date.now() - 30 * 60000),
      amount: 25.00,
      status: 'success'
    },
    {
      id: '4',
      type: 'course',
      description: 'Completed Risk Management module',
      timestamp: new Date(Date.now() - 45 * 60000),
      status: 'completed'
    }
  ])

  const quickActions = [
    { 
      title: 'Start Trading', 
      description: 'Access synthetic indices', 
      href: '/synthetics', 
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-600'
    },
    { 
      title: 'Manage Bots', 
      description: 'Deploy trading bots', 
      href: '/bots', 
      icon: Bot,
      color: 'from-blue-500 to-cyan-600'
    },
    { 
      title: 'Market Analysis', 
      description: 'View market insights', 
      href: '/market-analysis', 
      icon: Eye,
      color: 'from-purple-500 to-violet-600'
    },
    { 
      title: 'Learn Trading', 
      description: 'Educational courses', 
      href: '/course', 
      icon: BookOpen,
      color: 'from-orange-500 to-red-600'
    }
  ]

  const formatTime = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'trade': return TrendingUp
      case 'bot': return Bot
      case 'referral': return Users
      case 'course': return BookOpen
      default: return Activity
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-400'
      case 'pending': return 'text-yellow-400'
      case 'completed': return 'text-blue-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Welcome back, John!</h1>
              <p className="text-gray-400">Here's what's happening with your trading today</p>
            </div>
            <div className="flex items-center gap-3">
              <Link 
                href="/dashboard"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <Activity className="w-4 h-4" />
                Trading Dashboard
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-xs text-gray-400">Balance</span>
            </div>
            <p className="text-2xl font-bold text-white">${stats.totalBalance.toLocaleString()}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </div>
              <span className="text-xs text-gray-400">Today's P&L</span>
            </div>
            <p className="text-2xl font-bold text-green-400">+${stats.todayProfit}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Activity className="w-6 h-6 text-purple-400" />
              </div>
              <span className="text-xs text-gray-400">Total Trades</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.totalTrades}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-800 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <Target className="w-6 h-6 text-yellow-400" />
              </div>
              <span className="text-xs text-gray-400">Win Rate</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.winRate}%</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-800 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-cyan-500/20 rounded-lg">
                <Bot className="w-6 h-6 text-cyan-400" />
              </div>
              <span className="text-xs text-gray-400">Active Bots</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.activeBots}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-gray-800 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-pink-500/20 rounded-lg">
                <Users className="w-6 h-6 text-pink-400" />
              </div>
              <span className="text-xs text-gray-400">Referrals</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.referrals}</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-800 rounded-xl p-6 mb-6"
            >
              <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon
                  return (
                    <Link key={index} href={action.href}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`bg-gradient-to-r ${action.color} rounded-xl p-6 cursor-pointer group`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <Icon className="w-8 h-8 text-white" />
                          <ArrowUpRight className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="text-white font-semibold text-lg mb-1">{action.title}</h3>
                        <p className="text-white/70 text-sm">{action.description}</p>
                      </motion.div>
                    </Link>
                  )
                })}
              </div>
            </motion.div>

            {/* Performance Chart Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-800 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Performance Overview</h2>
                <select className="bg-gray-700 text-white text-sm rounded-lg px-3 py-2">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
              </div>
              <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                  <p className="text-gray-400">Performance chart will be displayed here</p>
                  <p className="text-gray-500 text-sm">Connect to your trading account to see real data</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-800 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Recent Activity</h2>
              <Link href="/history" className="text-blue-400 hover:text-blue-300 text-sm">
                View All
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentActivity.map((activity) => {
                const Icon = getActivityIcon(activity.type)
                return (
                  <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-700 rounded-lg">
                    <div className="p-2 bg-gray-600 rounded-lg">
                      <Icon className="w-4 h-4 text-gray-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white font-medium">{activity.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatTime(activity.timestamp)}
                        </span>
                        <span className={`text-xs ${getStatusColor(activity.status)}`}>
                          {activity.status}
                        </span>
                      </div>
                    </div>
                    {activity.amount && (
                      <div className="text-sm font-semibold text-green-400">
                        +${activity.amount}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Quick Tips */}
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg border border-blue-500/30">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">Trading Tip</h3>
                  <p className="text-xs text-gray-300">
                    Consider using stop-loss orders to manage your risk. Set them at 2-3% below your entry price.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* AI Assistant */}
      <AIAssistant />
    </div>
  )
}