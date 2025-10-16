'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Settings, TrendingUp, TrendingDown, BarChart3, Star, Bot } from 'lucide-react'

interface BotStrategy {
  id: string
  name: string
  description: string
  winRate: number
  totalTrades: number
  monthlyReturn: number
  riskLevel: 'Low' | 'Medium' | 'High'
  isRunning: boolean
  category: string
  rating: number
  author: string
}

export function BotStrategies() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [runningBots, setRunningBots] = useState<string[]>([])

  const strategies: BotStrategy[] = [
    {
      id: '1',
      name: 'Martingale Pro',
      description: 'Advanced martingale strategy with risk management and profit targets. Automatically adjusts stake based on previous results.',
      winRate: 68.5,
      totalTrades: 1247,
      monthlyReturn: 15.2,
      riskLevel: 'High',
      isRunning: false,
      category: 'martingale',
      rating: 4.2,
      author: 'TradingPro'
    },
    {
      id: '2',
      name: 'Volatility Scalper',
      description: 'Quick scalping strategy for volatile markets. Works best with high-frequency trading on synthetic indices.',
      winRate: 73.8,
      totalTrades: 2156,
      monthlyReturn: 12.7,
      riskLevel: 'Medium',
      isRunning: true,
      category: 'scalping',
      rating: 4.5,
      author: 'VolTrader'
    },
    {
      id: '3',
      name: 'Trend Following',
      description: 'Long-term trend following strategy that identifies and rides market trends. Lower frequency, higher accuracy.',
      winRate: 82.1,
      totalTrades: 567,
      monthlyReturn: 18.9,
      riskLevel: 'Low',
      isRunning: false,
      category: 'trend',
      rating: 4.7,
      author: 'TrendMaster'
    },
    {
      id: '4',
      name: 'RSI Reversal',
      description: 'Mean reversion strategy using RSI indicator. Buys oversold and sells overbought conditions.',
      winRate: 71.3,
      totalTrades: 892,
      monthlyReturn: 14.1,
      riskLevel: 'Medium',
      isRunning: false,
      category: 'oscillator',
      rating: 4.0,
      author: 'RSITrader'
    },
    {
      id: '5',
      name: 'Breakout Hunter',
      description: 'Identifies and trades breakouts from key support and resistance levels with confirmation signals.',
      winRate: 65.7,
      totalTrades: 1034,
      monthlyReturn: 11.8,
      riskLevel: 'Medium',
      isRunning: false,
      category: 'breakout',
      rating: 3.9,
      author: 'BreakoutKing'
    },
    {
      id: '6',
      name: 'Safe Conservative',
      description: 'Low-risk strategy focusing on capital preservation with steady, consistent returns. Perfect for beginners.',
      winRate: 89.2,
      totalTrades: 423,
      monthlyReturn: 8.4,
      riskLevel: 'Low',
      isRunning: false,
      category: 'conservative',
      rating: 4.3,
      author: 'SafeTrader'
    }
  ]

  const categories = [
    { id: 'all', name: 'All Strategies' },
    { id: 'martingale', name: 'Martingale' },
    { id: 'scalping', name: 'Scalping' },
    { id: 'trend', name: 'Trend Following' },
    { id: 'oscillator', name: 'Oscillators' },
    { id: 'breakout', name: 'Breakout' },
    { id: 'conservative', name: 'Conservative' }
  ]

  const filteredStrategies = strategies.filter(strategy => 
    selectedCategory === 'all' || strategy.category === selectedCategory
  )

  const toggleBot = (botId: string) => {
    setRunningBots(prev => 
      prev.includes(botId) 
        ? prev.filter(id => id !== botId)
        : [...prev, botId]
    )
  }

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Low': return 'text-green-400 bg-green-500/20'
      case 'Medium': return 'text-yellow-400 bg-yellow-500/20'
      case 'High': return 'text-red-400 bg-red-500/20'
      default: return 'text-gray-400 bg-gray-500/20'
    }
  }

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? 'bg-green-500 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Strategies Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredStrategies.map((strategy, index) => {
          const isRunning = runningBots.includes(strategy.id)
          
          return (
            <motion.div
              key={strategy.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-gray-800 border rounded-lg p-6 transition-all duration-200 hover:border-gray-600 ${
                isRunning ? 'border-green-500/50 bg-green-500/5' : 'border-gray-700'
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-white">{strategy.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-400">{strategy.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">by {strategy.author}</p>
                  <p className="text-sm text-gray-300 leading-relaxed">{strategy.description}</p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded ${getRiskColor(strategy.riskLevel)}`}>
                    {strategy.riskLevel} Risk
                  </span>
                  {isRunning && (
                    <div className="flex items-center gap-1 text-green-400 text-xs">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      Running
                    </div>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <TrendingUp size={14} className="text-green-400" />
                    <span className="text-sm font-medium text-green-400">{strategy.winRate}%</span>
                  </div>
                  <p className="text-xs text-gray-500">Win Rate</p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <BarChart3 size={14} className="text-blue-400" />
                    <span className="text-sm font-medium text-white">{strategy.totalTrades}</span>
                  </div>
                  <p className="text-xs text-gray-500">Total Trades</p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <TrendingUp size={14} className="text-yellow-400" />
                    <span className="text-sm font-medium text-yellow-400">+{strategy.monthlyReturn}%</span>
                  </div>
                  <p className="text-xs text-gray-500">Monthly Return</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => toggleBot(strategy.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-medium transition-colors ${
                    isRunning
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                >
                  {isRunning ? (
                    <>
                      <Pause size={16} />
                      Stop Bot
                    </>
                  ) : (
                    <>
                      <Play size={16} />
                      Start Bot
                    </>
                  )}
                </button>

                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
                  <Settings size={16} />
                </button>
              </div>

              {/* Performance Preview */}
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">Last 7 days</span>
                  <span className="text-green-400 font-medium">+{(Math.random() * 10 + 2).toFixed(1)}%</span>
                </div>
                <div className="mt-2 w-full bg-gray-700 rounded-full h-1">
                  <div 
                    className="bg-green-400 h-1 rounded-full transition-all duration-1000" 
                    style={{ width: `${Math.min(strategy.winRate, 100)}%` }}
                  />
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {filteredStrategies.length === 0 && (
        <div className="text-center py-12">
          <Bot size={48} className="mx-auto text-gray-600 mb-4" />
          <h3 className="text-lg font-medium text-gray-400 mb-2">No strategies found</h3>
          <p className="text-gray-500">Try selecting a different category or upload your own bot.</p>
        </div>
      )}
    </div>
  )
}