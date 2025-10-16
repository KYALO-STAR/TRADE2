'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, BarChart3, PieChart, Calendar, Clock, Filter, Search, Download } from 'lucide-react'
import Header from '@/components/layout/Header'

interface MarketData {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: number
  high24h: number
  low24h: number
}

export default function MarketAnalysis() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  
  // Mock market data
  const marketData: MarketData[] = [
    {
      symbol: 'EURUSD',
      name: 'Euro / US Dollar',
      price: 1.0842,
      change: 0.0023,
      changePercent: 0.21,
      volume: 1247832,
      high24h: 1.0865,
      low24h: 1.0819
    },
    {
      symbol: 'GBPUSD',
      name: 'British Pound / US Dollar',
      price: 1.2634,
      change: -0.0041,
      changePercent: -0.32,
      volume: 892471,
      high24h: 1.2675,
      low24h: 1.2618
    },
    {
      symbol: 'USDJPY',
      name: 'US Dollar / Japanese Yen',
      price: 149.72,
      change: 0.89,
      changePercent: 0.60,
      volume: 1534892,
      high24h: 150.11,
      low24h: 148.95
    },
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      price: 43250.00,
      change: 1250.00,
      changePercent: 2.98,
      volume: 28472831,
      high24h: 43890.00,
      low24h: 41980.00
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      price: 2640.50,
      change: -87.30,
      changePercent: -3.20,
      volume: 15847293,
      high24h: 2728.00,
      low24h: 2598.20
    },
    {
      symbol: 'GOLD',
      name: 'Gold',
      price: 2018.40,
      change: 12.80,
      changePercent: 0.64,
      volume: 3847291,
      high24h: 2025.70,
      low24h: 2005.60
    }
  ]

  const timeframes = ['1D', '1W', '1M', '3M', '1Y']
  const categories = [
    { value: 'all', label: 'All Markets' },
    { value: 'forex', label: 'Forex' },
    { value: 'crypto', label: 'Cryptocurrency' },
    { value: 'commodities', label: 'Commodities' },
    { value: 'indices', label: 'Indices' }
  ]

  const filteredData = marketData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Market Analysis
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Real-time market data and comprehensive analysis tools
          </p>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-wrap gap-4 items-center">
              {/* Timeframe Selection */}
              <div className="flex bg-gray-800 rounded-lg p-1">
                {timeframes.map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setSelectedTimeframe(tf)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      selectedTimeframe === tf
                        ? 'bg-green-500 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>

              {/* Category Filter */}
              <select
                title="Filter by category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Search and Actions */}
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search markets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <button className="bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2">
                <Download className="w-5 h-5" />
                Export
              </button>
            </div>
          </div>
        </motion.div>

        {/* Market Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="bg-gray-800 rounded-xl border border-gray-700 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-gray-400 text-sm">Total Volume</div>
              <BarChart3 className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-2">$2.4B</div>
            <div className="text-sm text-green-400">+12.3% from yesterday</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gray-800 rounded-xl border border-gray-700 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-gray-400 text-sm">Market Cap</div>
              <PieChart className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-2">$1.8T</div>
            <div className="text-sm text-blue-400">+2.1% this week</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-gray-800 rounded-xl border border-gray-700 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-gray-400 text-sm">Active Pairs</div>
              <TrendingUp className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-2">247</div>
            <div className="text-sm text-purple-400">Available for trading</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gray-800 rounded-xl border border-gray-700 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-gray-400 text-sm">Last Update</div>
              <Clock className="w-5 h-5 text-orange-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-2">Real-time</div>
            <div className="text-sm text-orange-400">Live market data</div>
          </motion.div>
        </div>

        {/* Market Data Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-bold text-white">Live Market Data</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-750">
                <tr>
                  <th className="text-left py-4 px-6 text-gray-300 font-medium">Market</th>
                  <th className="text-right py-4 px-6 text-gray-300 font-medium">Price</th>
                  <th className="text-right py-4 px-6 text-gray-300 font-medium">24h Change</th>
                  <th className="text-right py-4 px-6 text-gray-300 font-medium">24h Volume</th>
                  <th className="text-right py-4 px-6 text-gray-300 font-medium">24h High</th>
                  <th className="text-right py-4 px-6 text-gray-300 font-medium">24h Low</th>
                  <th className="text-center py-4 px-6 text-gray-300 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <motion.tr
                    key={item.symbol}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border-b border-gray-700 hover:bg-gray-750 transition-colors duration-200"
                  >
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-bold text-white">{item.symbol}</div>
                        <div className="text-sm text-gray-400">{item.name}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="font-bold text-white">
                        ${item.price.toLocaleString()}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className={`flex items-center justify-end ${
                        item.change >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {item.change >= 0 ? (
                          <TrendingUp className="w-4 h-4 mr-1" />
                        ) : (
                          <TrendingDown className="w-4 h-4 mr-1" />
                        )}
                        <span className="font-medium">
                          {item.changePercent >= 0 ? '+' : ''}{item.changePercent}%
                        </span>
                      </div>
                      <div className="text-sm text-gray-400">
                        {item.change >= 0 ? '+' : ''}{item.change}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right text-gray-300">
                      {item.volume.toLocaleString()}
                    </td>
                    <td className="py-4 px-6 text-right text-gray-300">
                      ${item.high24h.toLocaleString()}
                    </td>
                    <td className="py-4 px-6 text-right text-gray-300">
                      ${item.low24h.toLocaleString()}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                        Trade
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Market Insights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Market Trends */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <h3 className="text-xl font-bold text-white mb-4">Market Trends</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-700">
                <span className="text-gray-300">Bullish Momentum</span>
                <span className="text-green-400 font-medium">67%</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-700">
                <span className="text-gray-300">Volatility Index</span>
                <span className="text-orange-400 font-medium">Medium</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-700">
                <span className="text-gray-300">Fear & Greed</span>
                <span className="text-blue-400 font-medium">Neutral</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-gray-300">Market Sentiment</span>
                <span className="text-green-400 font-medium">Optimistic</span>
              </div>
            </div>
          </div>

          {/* Top Movers */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <h3 className="text-xl font-bold text-white mb-4">Top Movers</h3>
            <div className="space-y-3">
              {marketData
                .sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent))
                .slice(0, 4)
                .map((item) => (
                  <div key={item.symbol} className="flex items-center justify-between py-2">
                    <div>
                      <div className="font-medium text-white">{item.symbol}</div>
                      <div className="text-sm text-gray-400">{item.name}</div>
                    </div>
                    <div className={`text-right ${
                      item.changePercent >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      <div className="font-bold">
                        {item.changePercent >= 0 ? '+' : ''}{item.changePercent}%
                      </div>
                      <div className="text-sm">${item.price}</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}