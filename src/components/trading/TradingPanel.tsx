'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, DollarSign, Clock, Play } from 'lucide-react'

interface TradingPanelProps {
  selectedAsset: string
}

export function TradingPanel({ selectedAsset }: TradingPanelProps) {
  const [tradeType, setTradeType] = useState<'higher' | 'lower'>('higher')
  const [stake, setStake] = useState(10)
  const [duration, setDuration] = useState(60)
  const [isTrading, setIsTrading] = useState(false)

  const handleTrade = async () => {
    setIsTrading(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsTrading(false)
    
    // Here you would integrate with the actual Deriv API
    // For demo purposes, we'll show a success message
    alert(`Trade placed successfully!\nAsset: ${selectedAsset}\nDirection: ${tradeType}\nStake: $${stake}\nDuration: ${duration}s`)
  }

  const presetStakes = [5, 10, 25, 50, 100]
  const presetDurations = [30, 60, 180, 300, 600]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 border border-gray-700 rounded-lg p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Trade Execution</h2>
        <div className="text-sm text-gray-400">
          Trading: <span className="text-green-400 font-medium">{selectedAsset}</span>
        </div>
      </div>

      {/* Trade Direction */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-400 mb-3">Prediction</h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setTradeType('higher')}
            className={`p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-2 ${
              tradeType === 'higher'
                ? 'border-green-500 bg-green-500/10 text-green-400'
                : 'border-gray-600 bg-gray-700/50 text-gray-400 hover:border-gray-500'
            }`}
          >
            <TrendingUp size={24} />
            <span className="font-medium">Higher</span>
            <span className="text-xs opacity-75">Price will rise</span>
          </button>

          <button
            onClick={() => setTradeType('lower')}
            className={`p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-2 ${
              tradeType === 'lower'
                ? 'border-red-500 bg-red-500/10 text-red-400'
                : 'border-gray-600 bg-gray-700/50 text-gray-400 hover:border-gray-500'
            }`}
          >
            <TrendingDown size={24} />
            <span className="font-medium">Lower</span>
            <span className="text-xs opacity-75">Price will fall</span>
          </button>
        </div>
      </div>

      {/* Stake Amount */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-400 mb-3">Stake Amount</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <DollarSign size={20} className="text-gray-400" />
            <input
              type="number"
              value={stake}
              onChange={(e) => setStake(Number(e.target.value))}
              className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
              min="1"
              max="1000"
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {presetStakes.map(amount => (
              <button
                key={amount}
                onClick={() => setStake(amount)}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  stake === amount
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white'
                }`}
              >
                ${amount}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Duration */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-400 mb-3">Duration</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Clock size={20} className="text-gray-400" />
            <select
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
            >
              <option value={30}>30 seconds</option>
              <option value={60}>1 minute</option>
              <option value={180}>3 minutes</option>
              <option value={300}>5 minutes</option>
              <option value={600}>10 minutes</option>
            </select>
          </div>

          <div className="flex gap-2 flex-wrap">
            {presetDurations.map(time => (
              <button
                key={time}
                onClick={() => setDuration(time)}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  duration === time
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white'
                }`}
              >
                {time < 60 ? `${time}s` : `${time/60}m`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Potential Payout */}
      <div className="mb-6 p-4 bg-gray-700/50 rounded-lg border border-gray-600">
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">Potential Payout</span>
          <span className="text-white font-bold">${(stake * 1.85).toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-gray-400 text-sm">Potential Profit</span>
          <span className="text-green-400 font-bold">+${(stake * 0.85).toFixed(2)}</span>
        </div>
      </div>

      {/* Trade Button */}
      <button
        onClick={handleTrade}
        disabled={isTrading}
        className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
          isTrading
            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
            : tradeType === 'higher'
            ? 'bg-green-500 hover:bg-green-600 text-white transform hover:scale-[1.02]'
            : 'bg-red-500 hover:bg-red-600 text-white transform hover:scale-[1.02]'
        }`}
      >
        {isTrading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-400" />
            Processing...
          </>
        ) : (
          <>
            <Play size={20} />
            Place Trade - {tradeType.toUpperCase()}
          </>
        )}
      </button>

      {/* Risk Warning */}
      <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
        <p className="text-yellow-400 text-xs">
          ⚠️ Trading involves risk. Only invest what you can afford to lose. 
          Past performance does not guarantee future results.
        </p>
      </div>
    </motion.div>
  )
}