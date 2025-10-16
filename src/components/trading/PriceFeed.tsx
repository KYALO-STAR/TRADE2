'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Activity } from 'lucide-react'

interface PriceFeedProps {
  selectedAsset: string
  onAssetChange: (asset: string) => void
}

interface PriceData {
  symbol: string
  price: number
  change: number
  changePercent: number
  volume: number
  high24h: number
  low24h: number
}

export function PriceFeed({ selectedAsset, onAssetChange }: PriceFeedProps) {
  const [priceData, setPriceData] = useState<Record<string, PriceData>>({})
  const [selectedTab, setSelectedTab] = useState('synthetics')

  const assets = {
    synthetics: [
      { symbol: 'R_100', name: 'Volatility 100 Index' },
      { symbol: 'R_75', name: 'Volatility 75 Index' },
      { symbol: 'R_50', name: 'Volatility 50 Index' },
      { symbol: 'R_25', name: 'Volatility 25 Index' },
      { symbol: 'R_10', name: 'Volatility 10 Index' },
    ],
    forex: [
      { symbol: 'EURUSD', name: 'EUR/USD' },
      { symbol: 'GBPUSD', name: 'GBP/USD' },
      { symbol: 'USDJPY', name: 'USD/JPY' },
      { symbol: 'AUDUSD', name: 'AUD/USD' },
    ],
    commodities: [
      { symbol: 'GOLD', name: 'Gold' },
      { symbol: 'SILVER', name: 'Silver' },
      { symbol: 'OIL', name: 'Crude Oil' },
      { symbol: 'COPPER', name: 'Copper' },
    ]
  }

  // Simulate real-time price updates
  useEffect(() => {
    const updatePrices = () => {
      const allAssets = [...assets.synthetics, ...assets.forex, ...assets.commodities]
      
      const newPriceData: Record<string, PriceData> = {}
      
      allAssets.forEach(asset => {
        const basePrice = asset.symbol.includes('R_') ? 
          Math.random() * 1000 + 500 :
          asset.symbol === 'EURUSD' ? 1.0850 :
          asset.symbol === 'GBPUSD' ? 1.2650 :
          asset.symbol === 'USDJPY' ? 150.25 :
          asset.symbol === 'AUDUSD' ? 0.6580 :
          asset.symbol === 'GOLD' ? 2050.00 :
          asset.symbol === 'SILVER' ? 25.50 :
          asset.symbol === 'OIL' ? 75.80 :
          45.60 // COPPER

        const change = (Math.random() - 0.5) * 10
        const changePercent = (change / basePrice) * 100

        newPriceData[asset.symbol] = {
          symbol: asset.symbol,
          price: basePrice + change,
          change,
          changePercent,
          volume: Math.random() * 1000000,
          high24h: basePrice + Math.random() * 20,
          low24h: basePrice - Math.random() * 20
        }
      })

      setPriceData(newPriceData)
    }

    updatePrices()
    const interval = setInterval(updatePrices, 2000)

    return () => clearInterval(interval)
  }, [])

  const currentAssets = assets[selectedTab as keyof typeof assets] || assets.synthetics

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Live Market Prices</h2>
          <Activity size={20} className="text-green-400" />
        </div>

        {/* Asset Category Tabs */}
        <div className="flex gap-1 bg-gray-900 rounded-lg p-1">
          {Object.keys(assets).map(tab => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 ${
                selectedTab === tab
                  ? 'bg-green-500 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Price List */}
      <div className="max-h-96 overflow-y-auto">
        {currentAssets.map((asset) => {
          const data = priceData[asset.symbol]
          if (!data) return null

          return (
            <motion.div
              key={asset.symbol}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-4 border-b border-gray-700 cursor-pointer transition-all duration-200 hover:bg-gray-700/50 ${
                selectedAsset === asset.symbol ? 'bg-green-500/10 border-l-4 border-l-green-500' : ''
              }`}
              onClick={() => onAssetChange(asset.symbol)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div>
                      <h3 className="font-semibold text-white">{asset.symbol}</h3>
                      <p className="text-sm text-gray-400">{asset.name}</p>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-white">
                      {data.price.toFixed(asset.symbol.includes('JPY') ? 2 : 4)}
                    </span>
                    {data.change > 0 ? (
                      <TrendingUp size={16} className="text-green-400" />
                    ) : (
                      <TrendingDown size={16} className="text-red-400" />
                    )}
                  </div>
                  
                  <div className={`text-sm font-medium ${
                    data.change > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {data.change > 0 ? '+' : ''}{data.changePercent.toFixed(2)}%
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-3 gap-4 mt-3 pt-3 border-t border-gray-700">
                <div>
                  <p className="text-xs text-gray-500">24h High</p>
                  <p className="text-sm text-white">{data.high24h.toFixed(4)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">24h Low</p>
                  <p className="text-sm text-white">{data.low24h.toFixed(4)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Volume</p>
                  <p className="text-sm text-white">{(data.volume / 1000).toFixed(0)}K</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}