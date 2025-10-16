'use client'

import { useState } from 'react'
import { MessageCircle, Share2, Users, Trophy, Copy, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'

interface TelegramGroup {
  id: string
  name: string
  members: number
  description: string
  type: 'public' | 'private'
  joinLink?: string
}

interface SharedStrategy {
  id: string
  name: string
  author: string
  downloads: number
  rating: number
  description: string
  telegramLink: string
}

const TELEGRAM_GROUPS: TelegramGroup[] = [
  {
    id: '1',
    name: 'TradeBot Strategies',
    members: 2547,
    description: 'Share and discuss profitable bot strategies',
    type: 'public',
    joinLink: 'https://t.me/tradebotstrategies'
  },
  {
    id: '2',
    name: 'SACCO Trading Hub',
    members: 1823,
    description: 'Dedicated group for SACCO members and financial literacy',
    type: 'public',
    joinLink: 'https://t.me/saccotradingub'
  },
  {
    id: '3',
    name: 'Premium Signals VIP',
    members: 456,
    description: 'Exclusive signals and advanced strategies',
    type: 'private'
  }
]

const SHARED_STRATEGIES: SharedStrategy[] = [
  {
    id: '1',
    name: 'Martingale Pro V2',
    author: 'TradeMaster_KE',
    downloads: 1247,
    rating: 4.8,
    description: 'Enhanced martingale with dynamic risk management',
    telegramLink: 'https://t.me/tradebotstrategies/1234'
  },
  {
    id: '2',
    name: 'Scalping Beast',
    author: 'QuickProfit_UG',
    downloads: 892,
    rating: 4.6,
    description: 'High-frequency scalping for volatile markets',
    telegramLink: 'https://t.me/tradebotstrategies/1235'
  },
  {
    id: '3',
    name: 'SACCO Safe Strategy',
    author: 'ConservativeTrader',
    downloads: 2156,
    rating: 4.9,
    description: 'Low-risk strategy designed for SACCO investments',
    telegramLink: 'https://t.me/saccotradingub/456'
  }
]

export default function TelegramIntegration() {
  const [selectedTab, setSelectedTab] = useState<'groups' | 'strategies'>('groups')
  const [copiedLink, setCopiedLink] = useState<string | null>(null)

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedLink(id)
      setTimeout(() => setCopiedLink(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-600'}
      >
        ★
      </span>
    ))
  }

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-blue-400" />
          Telegram Community
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Connect with traders and share strategies on Telegram
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex space-x-1 bg-gray-700 rounded-lg p-1">
          <button
            onClick={() => setSelectedTab('groups')}
            className={`flex-1 py-2 px-4 rounded-md transition-all flex items-center justify-center gap-2 ${
              selectedTab === 'groups'
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:text-white hover:bg-gray-600'
            }`}
          >
            <Users className="w-4 h-4" />
            Groups
          </button>
          <button
            onClick={() => setSelectedTab('strategies')}
            className={`flex-1 py-2 px-4 rounded-md transition-all flex items-center justify-center gap-2 ${
              selectedTab === 'strategies'
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:text-white hover:bg-gray-600'
            }`}
          >
            <Share2 className="w-4 h-4" />
            Strategies
          </button>
        </div>
      </div>

      <div className="p-4">
        {selectedTab === 'groups' && (
          <div className="space-y-4">
            {TELEGRAM_GROUPS.map((group) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-700/50 rounded-lg p-4 border border-gray-600"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-white font-semibold flex items-center gap-2">
                      {group.name}
                      {group.type === 'private' && (
                        <span className="bg-yellow-500/10 text-yellow-400 px-2 py-1 rounded text-xs">
                          Private
                        </span>
                      )}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">{group.description}</p>
                  </div>
                  {group.type === 'private' && (
                    <Trophy className="w-5 h-5 text-yellow-400" />
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {group.members.toLocaleString()} members
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {group.joinLink && (
                      <>
                        <button
                          onClick={() => copyToClipboard(group.joinLink!, group.id)}
                          className="p-2 bg-gray-600 hover:bg-gray-500 rounded-lg transition-colors"
                          title="Copy link"
                        >
                          {copiedLink === group.id ? (
                            <span className="text-green-400 text-xs px-1">Copied!</span>
                          ) : (
                            <Copy className="w-4 h-4 text-gray-300" />
                          )}
                        </button>
                        <a
                          href={group.joinLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                        >
                          <MessageCircle className="w-4 h-4" />
                          Join Group
                        </a>
                      </>
                    )}
                    {group.type === 'private' && (
                      <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors">
                        Request Access
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {selectedTab === 'strategies' && (
          <div className="space-y-4">
            {SHARED_STRATEGIES.map((strategy) => (
              <motion.div
                key={strategy.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-700/50 rounded-lg p-4 border border-gray-600"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">{strategy.name}</h3>
                    <p className="text-blue-400 text-sm">by @{strategy.author}</p>
                    <p className="text-gray-400 text-sm mt-1">{strategy.description}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Share2 className="w-4 h-4" />
                      {strategy.downloads.toLocaleString()} downloads
                    </span>
                    <div className="flex items-center gap-1">
                      {renderStars(strategy.rating)}
                      <span className="ml-1">({strategy.rating})</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyToClipboard(strategy.telegramLink, strategy.id)}
                      className="p-2 bg-gray-600 hover:bg-gray-500 rounded-lg transition-colors"
                      title="Copy Telegram link"
                    >
                      {copiedLink === strategy.id ? (
                        <span className="text-green-400 text-xs px-1">Copied!</span>
                      ) : (
                        <Copy className="w-4 h-4 text-gray-300" />
                      )}
                    </button>
                    <a
                      href={strategy.telegramLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View in Telegram
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Share Your Strategy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-lg p-4 border border-green-500/30"
            >
              <div className="flex items-center gap-3 mb-3">
                <Share2 className="w-6 h-6 text-green-400" />
                <div>
                  <h3 className="text-white font-semibold">Share Your Strategy</h3>
                  <p className="text-gray-400 text-sm">
                    Upload your successful bot strategies and earn rewards
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Upload Strategy
                </button>
                <button className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition-colors">
                  Learn More
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}