'use client'

import { useState, useEffect } from 'react'
import { TradingPanel } from '@/components/trading/TradingPanel'
import { PriceFeed } from '@/components/trading/PriceFeed'
import { TradeHistory } from '@/components/trading/TradeHistory'
import { AccountSummary } from '@/components/trading/AccountSummary'
import { useDerivAPI } from '@/hooks/useDerivAPI'
import { motion } from 'framer-motion'
import { TrendingUp, DollarSign, Activity, Clock } from 'lucide-react'
import Header from '@/components/layout/Header'
import { AIAssistant } from '@/components/ai/AIAssistant'

export default function Dashboard() {
  const { isConnected, connect, disconnect } = useDerivAPI()
  const [selectedAsset, setSelectedAsset] = useState('R_100')

  useEffect(() => {
    // Auto-connect on dashboard load
    connect()
    
    return () => {
      disconnect()
    }
  }, [connect, disconnect])

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Trading Dashboard</h1>
              <p className="text-gray-400">Monitor markets and execute trades in real-time</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm ${
                isConnected 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}>
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`} />
                {isConnected ? 'Connected' : 'Disconnected'}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Portfolio Value', value: '$2,458.50', change: '+12.5%', icon: DollarSign, positive: true },
            { label: 'Today\'s P&L', value: '+$125.30', change: '+5.4%', icon: TrendingUp, positive: true },
            { label: 'Win Rate', value: '73%', change: '+2.1%', icon: Activity, positive: true },
            { label: 'Active Trades', value: '3', change: 'Running', icon: Clock, positive: null }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800 border border-gray-700 rounded-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon size={24} className="text-green-400" />
                <span className={`text-sm font-medium ${
                  stat.positive === true ? 'text-green-400' :
                  stat.positive === false ? 'text-red-400' : 'text-gray-400'
                }`}>
                  {stat.change}
                </span>
              </div>
              
              <div>
                <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Trading Interface */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Price Feed & Trading Panel */}
          <div className="lg:col-span-2 space-y-6">
            <PriceFeed selectedAsset={selectedAsset} onAssetChange={setSelectedAsset} />
            <TradingPanel selectedAsset={selectedAsset} />
          </div>

          {/* Right Column - Account & History */}
          <div className="space-y-6">
            <AccountSummary />
            <TradeHistory />
          </div>
        </div>
      </div>
      
      {/* AI Assistant */}
      <AIAssistant />
    </div>
  )
}