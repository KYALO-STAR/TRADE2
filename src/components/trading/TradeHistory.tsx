'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Clock, DollarSign, Filter } from 'lucide-react'

interface Trade {
  id: string
  asset: string
  type: 'higher' | 'lower'
  stake: number
  payout: number
  result: 'win' | 'lose' | 'pending'
  timestamp: Date
  duration: number
  entryPrice: number
  exitPrice?: number
}

export function TradeHistory() {
  const [trades, setTrades] = useState<Trade[]>([])
  const [filter, setFilter] = useState<'all' | 'win' | 'lose' | 'pending'>('all')

  // Mock trade history data
  useEffect(() => {
    const mockTrades: Trade[] = [
      {
        id: '1',
        asset: 'R_100',
        type: 'higher',
        stake: 25,
        payout: 46.25,
        result: 'win',
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        duration: 60,
        entryPrice: 1234.56,
        exitPrice: 1245.78
      },
      {
        id: '2',
        asset: 'EURUSD',
        type: 'lower',
        stake: 50,
        payout: 0,
        result: 'lose',
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
        duration: 180,
        entryPrice: 1.0845,
        exitPrice: 1.0852
      },
      {
        id: '3',
        asset: 'R_75',
        type: 'higher',
        stake: 10,
        payout: 0,
        result: 'pending',
        timestamp: new Date(Date.now() - 1000 * 30),
        duration: 300,
        entryPrice: 987.65
      },
      {
        id: '4',
        asset: 'GBPUSD',
        type: 'lower',
        stake: 100,
        payout: 185,
        result: 'win',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        duration: 120,
        entryPrice: 1.2650,
        exitPrice: 1.2635
      },
      {
        id: '5',
        asset: 'R_50',
        type: 'higher',
        stake: 15,
        payout: 0,
        result: 'lose',
        timestamp: new Date(Date.now() - 1000 * 60 * 45),
        duration: 60,
        entryPrice: 765.43,
        exitPrice: 762.18
      }
    ]

    setTrades(mockTrades)
  }, [])

  const filteredTrades = trades.filter(trade => 
    filter === 'all' || trade.result === filter
  )

  const stats = {
    totalTrades: trades.length,
    wins: trades.filter(t => t.result === 'win').length,
    losses: trades.filter(t => t.result === 'lose').length,
    pending: trades.filter(t => t.result === 'pending').length,
    totalProfit: trades.reduce((sum, trade) => sum + (trade.payout - trade.stake), 0)
  }

  const winRate = stats.totalTrades > 0 ? (stats.wins / (stats.wins + stats.losses)) * 100 : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Trade History</h2>
          <Filter size={18} className="text-gray-400" />
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gray-700/50 p-3 rounded">
            <p className="text-xs text-gray-400">Win Rate</p>
            <p className="text-lg font-bold text-green-400">{winRate.toFixed(1)}%</p>
          </div>
          <div className="bg-gray-700/50 p-3 rounded">
            <p className="text-xs text-gray-400">Total P&L</p>
            <p className={`text-lg font-bold ${stats.totalProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {stats.totalProfit >= 0 ? '+' : ''}${stats.totalProfit.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2">
          {['all', 'win', 'lose', 'pending'].map(filterType => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType as any)}
              className={`px-3 py-1 text-xs rounded font-medium transition-colors ${
                filter === filterType
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
              }`}
            >
              {filterType === 'all' ? `All (${stats.totalTrades})` :
               filterType === 'win' ? `Wins (${stats.wins})` :
               filterType === 'lose' ? `Losses (${stats.losses})` :
               `Pending (${stats.pending})`}
            </button>
          ))}
        </div>
      </div>

      {/* Trades List */}
      <div className="max-h-80 overflow-y-auto">
        {filteredTrades.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            <Clock size={32} className="mx-auto mb-2 opacity-50" />
            <p>No trades found</p>
          </div>
        ) : (
          filteredTrades.map((trade, index) => (
            <motion.div
              key={trade.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 border-b border-gray-700 hover:bg-gray-700/30 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    trade.result === 'win' ? 'bg-green-500/20' :
                    trade.result === 'lose' ? 'bg-red-500/20' : 'bg-yellow-500/20'
                  }`}>
                    {trade.type === 'higher' ? (
                      <TrendingUp size={16} className={
                        trade.result === 'win' ? 'text-green-400' :
                        trade.result === 'lose' ? 'text-red-400' : 'text-yellow-400'
                      } />
                    ) : (
                      <TrendingDown size={16} className={
                        trade.result === 'win' ? 'text-green-400' :
                        trade.result === 'lose' ? 'text-red-400' : 'text-yellow-400'
                      } />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white">{trade.asset}</span>
                      <span className={`px-2 py-1 text-xs rounded font-medium ${
                        trade.result === 'win' ? 'bg-green-500/20 text-green-400' :
                        trade.result === 'lose' ? 'bg-red-500/20 text-red-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {trade.result}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">
                      {trade.timestamp.toLocaleString()} • {trade.duration}s
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm text-gray-400">
                    <DollarSign size={14} />
                    <span>{trade.stake}</span>
                  </div>
                  <div className={`text-sm font-medium ${
                    trade.result === 'win' ? 'text-green-400' :
                    trade.result === 'lose' ? 'text-red-400' :
                    'text-gray-400'
                  }`}>
                    {trade.result === 'pending' ? '...' :
                     trade.result === 'win' ? `+$${(trade.payout - trade.stake).toFixed(2)}` :
                     `-$${trade.stake.toFixed(2)}`}
                  </div>
                </div>
              </div>

              {/* Price Details */}
              <div className="mt-2 pt-2 border-t border-gray-700">
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-gray-400">Entry: </span>
                    <span className="text-white">{trade.entryPrice}</span>
                  </div>
                  {trade.exitPrice && (
                    <div>
                      <span className="text-gray-400">Exit: </span>
                      <span className="text-white">{trade.exitPrice}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  )
}