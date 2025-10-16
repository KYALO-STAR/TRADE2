'use client'

import { motion } from 'framer-motion'
import { Wallet, TrendingUp, PieChart, Award } from 'lucide-react'

export function AccountSummary() {
  const accountData = {
    balance: 2458.50,
    equity: 2583.75,
    margin: 125.25,
    freeMargin: 2458.50,
    marginLevel: 2062.5,
    todayPnL: 125.30,
    weeklyPnL: 287.65,
    monthlyPnL: 1205.40
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 border border-gray-700 rounded-lg p-6"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Wallet size={24} className="text-green-400" />
        <div>
          <h2 className="text-lg font-bold text-white">Account Summary</h2>
          <p className="text-sm text-gray-400">Live Trading Account</p>
        </div>
      </div>

      {/* Balance Section */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
          <div>
            <p className="text-sm text-gray-400">Current Balance</p>
            <p className="text-2xl font-bold text-white">${accountData.balance.toFixed(2)}</p>
          </div>
          <TrendingUp size={32} className="text-green-400" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-700/50 p-3 rounded-lg">
            <p className="text-xs text-gray-400">Equity</p>
            <p className="text-lg font-semibold text-white">${accountData.equity.toFixed(2)}</p>
          </div>
          <div className="bg-gray-700/50 p-3 rounded-lg">
            <p className="text-xs text-gray-400">Free Margin</p>
            <p className="text-lg font-semibold text-white">${accountData.freeMargin.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Performance Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-3">
          <PieChart size={18} className="text-green-400" />
          <h3 className="font-semibold text-white">Performance</h3>
        </div>

        <div className="space-y-3">
          {[
            { label: 'Today\'s P&L', value: accountData.todayPnL, period: '24h' },
            { label: 'Weekly P&L', value: accountData.weeklyPnL, period: '7d' },
            { label: 'Monthly P&L', value: accountData.monthlyPnL, period: '30d' }
          ].map((item) => (
            <div key={item.label} className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
              <div>
                <p className="text-sm text-gray-400">{item.label}</p>
                <p className="text-xs text-gray-500">{item.period}</p>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${item.value >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {item.value >= 0 ? '+' : ''}${item.value.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500">
                  {((item.value / accountData.balance) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-2 mb-3">
          <Award size={18} className="text-green-400" />
          <h3 className="font-semibold text-white">Quick Actions</h3>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Deposit
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Withdraw
          </button>
        </div>
      </div>

      {/* Risk Level Indicator */}
      <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-yellow-400">Risk Level</span>
          <span className="text-sm font-medium text-yellow-400">Moderate</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '35%' }}></div>
        </div>
        <p className="text-xs text-yellow-400 mt-2">
          Current risk exposure is within acceptable limits
        </p>
      </div>
    </motion.div>
  )
}