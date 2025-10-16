'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, BarChart3, Clock, DollarSign, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'

interface SyntheticAsset {
  id: string
  name: string
  symbol: string
  price: number
  change: number
  changePercent: number
  volume: string
  volatility: 'low' | 'medium' | 'high'
  description: string
}

interface MultiplierPosition {
  id: string
  asset: string
  direction: 'up' | 'down'
  multiplier: number
  stake: number
  currentPL: number
  duration: string
  status: 'active' | 'closed'
}

const SYNTHETIC_ASSETS: SyntheticAsset[] = [
  {
    id: 'R_10',
    name: 'Volatility 10 Index',
    symbol: 'VOL 10',
    price: 4521.23,
    change: 12.45,
    changePercent: 0.28,
    volume: '2.1M',
    volatility: 'low',
    description: '10% annual volatility'
  },
  {
    id: 'R_25',
    name: 'Volatility 25 Index',
    symbol: 'VOL 25',
    price: 8934.67,
    change: -23.12,
    changePercent: -0.26,
    volume: '1.8M',
    volatility: 'medium',
    description: '25% annual volatility'
  },
  {
    id: 'R_50',
    name: 'Volatility 50 Index',
    symbol: 'VOL 50',
    price: 3456.78,
    change: 45.23,
    changePercent: 1.33,
    volume: '3.2M',
    volatility: 'high',
    description: '50% annual volatility'
  },
  {
    id: 'BOOM1000',
    name: 'Boom 1000 Index',
    symbol: 'BOOM 1000',
    price: 12345.67,
    change: 156.78,
    changePercent: 1.28,
    volume: '4.1M',
    volatility: 'high',
    description: 'Frequent small rises with occasional big drops'
  },
  {
    id: 'CRASH1000',
    name: 'Crash 1000 Index',
    symbol: 'CRASH 1000',
    price: 9876.54,
    change: -89.23,
    changePercent: -0.89,
    volume: '3.7M',
    volatility: 'high',
    description: 'Frequent small drops with occasional big rises'
  },
  {
    id: 'STEP',
    name: 'Step Index',
    symbol: 'STEP',
    price: 5678.90,
    change: 34.56,
    changePercent: 0.61,
    volume: '1.5M',
    volatility: 'medium',
    description: 'Equal probability of up/down steps'
  }
]

const MOCK_POSITIONS: MultiplierPosition[] = [
  {
    id: '1',
    asset: 'VOL 10',
    direction: 'up',
    multiplier: 100,
    stake: 50,
    currentPL: 23.45,
    duration: '00:15:23',
    status: 'active'
  },
  {
    id: '2',
    asset: 'BOOM 1000',
    direction: 'down',
    multiplier: 250,
    stake: 25,
    currentPL: -12.67,
    duration: 'Closed',
    status: 'closed'
  }
]

export default function SyntheticIndices() {
  const [selectedAsset, setSelectedAsset] = useState<SyntheticAsset>(SYNTHETIC_ASSETS[0])
  const [tradeDirection, setTradeDirection] = useState<'up' | 'down'>('up')
  const [multiplier, setMultiplier] = useState(100)
  const [stake, setStake] = useState(10)
  const [positions, setPositions] = useState<MultiplierPosition[]>(MOCK_POSITIONS)
  const [isTrading, setIsTrading] = useState(false)

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      SYNTHETIC_ASSETS.forEach(asset => {
        const volatilityFactor = asset.volatility === 'low' ? 0.5 : asset.volatility === 'medium' ? 1 : 2
        const change = (Math.random() - 0.5) * volatilityFactor * 10
        asset.price += change
        asset.change = change
        asset.changePercent = (change / asset.price) * 100
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const getVolatilityColor = (volatility: string) => {
    switch (volatility) {
      case 'low': return 'text-green-400'
      case 'medium': return 'text-yellow-400'
      case 'high': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getVolatilityBg = (volatility: string) => {
    switch (volatility) {
      case 'low': return 'bg-green-500/10 border-green-500/20'
      case 'medium': return 'bg-yellow-500/10 border-yellow-500/20'
      case 'high': return 'bg-red-500/10 border-red-500/20'
      default: return 'bg-gray-500/10 border-gray-500/20'
    }
  }

  const handleTrade = () => {
    setIsTrading(true)
    
    // Simulate trade execution
    setTimeout(() => {
      const newPosition: MultiplierPosition = {
        id: Date.now().toString(),
        asset: selectedAsset.symbol,
        direction: tradeDirection,
        multiplier,
        stake,
        currentPL: 0,
        duration: '00:00:01',
        status: 'active'
      }
      
      setPositions(prev => [newPosition, ...prev])
      setIsTrading(false)
    }, 1500)
  }

  const potentialProfit = stake * (multiplier / 100)
  const potentialLoss = stake

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Synthetic Indices & Multipliers</h1>
          <p className="text-gray-400">Trade 24/7 on synthetic markets with customizable volatility</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Asset Selection */}
          <div className="xl:col-span-1">
            <div className="bg-gray-800 rounded-lg border border-gray-700">
              <div className="p-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-400" />
                  Synthetic Assets
                </h2>
              </div>
              
              <div className="p-4">
                <div className="space-y-2">
                  {SYNTHETIC_ASSETS.map((asset) => (
                    <motion.button
                      key={asset.id}
                      onClick={() => setSelectedAsset(asset)}
                      className={`w-full text-left p-3 rounded-lg border transition-all ${
                        selectedAsset.id === asset.id
                          ? 'bg-green-600/20 border-green-500/50'
                          : 'bg-gray-700/50 border-gray-600 hover:bg-gray-700'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-white font-medium text-sm">{asset.symbol}</p>
                          <p className="text-gray-400 text-xs">{asset.name}</p>
                        </div>
                        <div className={`px-2 py-1 rounded text-xs border ${getVolatilityBg(asset.volatility)}`}>
                          <span className={getVolatilityColor(asset.volatility)}>
                            {asset.volatility.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <p className="text-white font-mono">${asset.price.toFixed(2)}</p>
                        <div className={`flex items-center gap-1 ${
                          asset.change >= 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {asset.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          <span className="text-xs">{asset.changePercent.toFixed(2)}%</span>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Trading Panel */}
          <div className="xl:col-span-2">
            <div className="bg-gray-800 rounded-lg border border-gray-700">
              <div className="p-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-400" />
                  Multipliers Trading - {selectedAsset.symbol}
                </h2>
                <p className="text-gray-400 text-sm mt-1">{selectedAsset.description}</p>
              </div>

              <div className="p-6 space-y-6">
                {/* Current Price Display */}
                <div className="text-center bg-gray-900 rounded-lg p-4">
                  <p className="text-gray-400 text-sm mb-1">Current Price</p>
                  <p className="text-3xl font-bold text-white font-mono">
                    ${selectedAsset.price.toFixed(2)}
                  </p>
                  <div className={`flex items-center justify-center gap-1 mt-2 ${
                    selectedAsset.change >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {selectedAsset.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    <span>{selectedAsset.changePercent.toFixed(2)}%</span>
                  </div>
                </div>

                {/* Trade Direction */}
                <div>
                  <label className="block text-white font-medium mb-3">Trade Direction</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setTradeDirection('up')}
                      className={`p-4 rounded-lg border transition-all flex items-center justify-center gap-2 ${
                        tradeDirection === 'up'
                          ? 'bg-green-600/20 border-green-500 text-green-400'
                          : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      <TrendingUp className="w-5 h-5" />
                      UP
                    </button>
                    <button
                      onClick={() => setTradeDirection('down')}
                      className={`p-4 rounded-lg border transition-all flex items-center justify-center gap-2 ${
                        tradeDirection === 'down'
                          ? 'bg-red-600/20 border-red-500 text-red-400'
                          : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      <TrendingDown className="w-5 h-5" />
                      DOWN
                    </button>
                  </div>
                </div>

                {/* Multiplier Selection */}
                <div>
                  <label className="block text-white font-medium mb-3">
                    Multiplier: x{multiplier}
                  </label>
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    {[50, 100, 250, 500].map((mult) => (
                      <button
                        key={mult}
                        onClick={() => setMultiplier(mult)}
                        className={`p-2 rounded border text-sm transition-all ${
                          multiplier === mult
                            ? 'bg-blue-600/20 border-blue-500 text-blue-400'
                            : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        x{mult}
                      </button>
                    ))}
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="1000"
                    step="50"
                    value={multiplier}
                    onChange={(e) => setMultiplier(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>

                {/* Stake Amount */}
                <div>
                  <label className="block text-white font-medium mb-3">Stake Amount</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                    <input
                      type="number"
                      value={stake}
                      onChange={(e) => setStake(parseFloat(e.target.value) || 0)}
                      min="1"
                      max="1000"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-8 pr-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter stake amount"
                    />
                  </div>
                </div>

                {/* Risk Summary */}
                <div className="bg-gray-900 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Max Profit</p>
                      <p className="text-green-400 font-bold">${potentialProfit.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Max Loss</p>
                      <p className="text-red-400 font-bold">${potentialLoss.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                {/* Trade Button */}
                <button
                  onClick={handleTrade}
                  disabled={isTrading || stake < 1}
                  className={`w-full py-4 rounded-lg font-semibold text-lg transition-all flex items-center justify-center gap-2 ${
                    tradeDirection === 'up'
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-red-600 hover:bg-red-700 text-white'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isTrading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Executing...
                    </>
                  ) : (
                    <>
                      {tradeDirection === 'up' ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                      Buy {tradeDirection.toUpperCase()} x{multiplier}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Active Positions */}
          <div className="xl:col-span-1">
            <div className="bg-gray-800 rounded-lg border border-gray-700">
              <div className="p-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-400" />
                  Positions
                </h2>
              </div>

              <div className="p-4">
                <div className="space-y-3">
                  {positions.map((position) => (
                    <div
                      key={position.id}
                      className={`p-3 rounded-lg border ${
                        position.status === 'active'
                          ? 'bg-gray-700/50 border-gray-600'
                          : 'bg-gray-800/50 border-gray-700'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-white font-medium text-sm">{position.asset}</p>
                          <div className="flex items-center gap-1 mt-1">
                            {position.direction === 'up' ? (
                              <TrendingUp className="w-3 h-3 text-green-400" />
                            ) : (
                              <TrendingDown className="w-3 h-3 text-red-400" />
                            )}
                            <span className="text-xs text-gray-400">
                              {position.direction.toUpperCase()} x{position.multiplier}
                            </span>
                          </div>
                        </div>
                        <div className={`px-2 py-1 rounded text-xs ${
                          position.status === 'active'
                            ? 'bg-green-500/10 text-green-400'
                            : 'bg-gray-500/10 text-gray-400'
                        }`}>
                          {position.status}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">Stake:</span>
                          <span className="text-white">${position.stake}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">P&L:</span>
                          <span className={position.currentPL >= 0 ? 'text-green-400' : 'text-red-400'}>
                            ${position.currentPL.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">Duration:</span>
                          <span className="text-white">{position.duration}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Risk Warning */}
        <div className="mt-8 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
            <div>
              <p className="text-yellow-400 font-medium mb-1">Risk Warning</p>
              <p className="text-gray-300 text-sm">
                Multipliers trading involves significant risk. You could lose your entire stake. 
                Only trade with money you can afford to lose. Past performance is not indicative of future results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}