'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Download, Heart, MessageCircle, Share2, Plus, Filter } from 'lucide-react'

interface TradingTip {
  id: string
  title: string
  content: string
  category: 'risk-management' | 'psychology' | 'strategy' | 'technical' | 'fundamental'
  author: string
  likes: number
  comments: number
  date: string
  isUserSubmitted: boolean
}

const mockTips: TradingTip[] = [
  {
    id: '1',
    title: 'The 2% Rule: Never Risk More Than You Can Afford',
    content: 'One of the most fundamental principles in trading is the 2% rule. Never risk more than 2% of your total account balance on a single trade. This ensures that even a series of losses won\'t wipe out your account.',
    category: 'risk-management',
    author: 'Trading Academy',
    likes: 342,
    comments: 28,
    date: '2024-01-15',
    isUserSubmitted: false
  },
  {
    id: '2',
    title: 'Emotional Control: The Key to Consistent Profits',
    content: 'Fear and greed are the biggest enemies of traders. Develop a trading plan and stick to it, regardless of emotions. Set clear entry and exit points before entering any trade.',
    category: 'psychology',
    author: 'Sarah Johnson',
    likes: 289,
    comments: 45,
    date: '2024-01-14',
    isUserSubmitted: true
  },
  {
    id: '3',
    title: 'Understanding Support and Resistance Levels',
    content: 'Support and resistance levels are crucial for timing your trades. Support is where price tends to find buying interest, while resistance is where selling pressure increases.',
    category: 'technical',
    author: 'Trading Academy',
    likes: 198,
    comments: 12,
    date: '2024-01-13',
    isUserSubmitted: false
  },
  {
    id: '4',
    title: 'Diversification: Don\'t Put All Eggs in One Basket',
    content: 'Spread your trades across different assets and timeframes. This reduces the risk of significant losses if one particular market moves against you.',
    category: 'strategy',
    author: 'Michael Chen',
    likes: 156,
    comments: 19,
    date: '2024-01-12',
    isUserSubmitted: true
  },
  {
    id: '5',
    title: 'Economic Calendar: Your Trading Compass',
    content: 'Always check the economic calendar before trading. Major news events can cause significant market volatility and affect your trades unexpectedly.',
    category: 'fundamental',
    author: 'Trading Academy',
    likes: 223,
    comments: 33,
    date: '2024-01-11',
    isUserSubmitted: false
  }
]

const categories = [
  { value: 'all', label: 'All Tips' },
  { value: 'risk-management', label: 'Risk Management' },
  { value: 'psychology', label: 'Trading Psychology' },
  { value: 'strategy', label: 'Strategy' },
  { value: 'technical', label: 'Technical Analysis' },
  { value: 'fundamental', label: 'Fundamental Analysis' }
]

const downloadableGuides = [
  {
    title: 'Complete Trading Guide for Beginners',
    description: 'A comprehensive 50-page guide covering all trading basics',
    pages: 50,
    downloads: 12489
  },
  {
    title: 'Risk Management Strategies',
    description: 'Advanced techniques for protecting your trading capital',
    pages: 32,
    downloads: 8734
  },
  {
    title: 'Technical Analysis Masterclass',
    description: 'Learn to read charts like a professional trader',
    pages: 68,
    downloads: 15623
  },
  {
    title: 'SACCO Trading Guidelines',
    description: 'Special guide for SACCO members and group trading',
    pages: 28,
    downloads: 3456
  }
]

export default function TipsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showSubmitForm, setShowSubmitForm] = useState(false)
  const [newTip, setNewTip] = useState({
    title: '',
    content: '',
    category: 'strategy' as const
  })

  const filteredTips = selectedCategory === 'all' 
    ? mockTips 
    : mockTips.filter(tip => tip.category === selectedCategory)

  const handleSubmitTip = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement tip submission
    console.log('Submitting tip:', newTip)
    setShowSubmitForm(false)
    setNewTip({ title: '', content: '', category: 'strategy' })
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      'risk-management': 'bg-red-600/20 text-red-400',
      'psychology': 'bg-purple-600/20 text-purple-400',
      'strategy': 'bg-blue-600/20 text-blue-400',
      'technical': 'bg-green-600/20 text-green-400',
      'fundamental': 'bg-yellow-600/20 text-yellow-400'
    }
    return colors[category as keyof typeof colors] || 'bg-gray-600/20 text-gray-400'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Trading Tips & Guidelines
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Learn from experienced traders and improve your trading skills with our comprehensive collection of tips, strategies, and downloadable guides.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5 text-green-400" />
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.value
                        ? 'bg-green-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700/50'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Submit Tip */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Share Your Knowledge</h3>
              <p className="text-gray-400 mb-4 text-sm">
                Have a valuable trading tip? Share it with the community!
              </p>
              <button
                onClick={() => setShowSubmitForm(true)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Submit a Tip
              </button>
            </motion.div>

            {/* Downloadable Guides */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-green-400" />
                Free Guides
              </h3>
              <div className="space-y-4">
                {downloadableGuides.map((guide, index) => (
                  <div key={index} className="border-b border-gray-700/50 pb-4 last:border-b-0">
                    <h4 className="font-medium text-white mb-1">{guide.title}</h4>
                    <p className="text-sm text-gray-400 mb-2">{guide.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                      <span>{guide.pages} pages</span>
                      <span>{guide.downloads.toLocaleString()} downloads</span>
                    </div>
                    <button className="flex items-center gap-1 text-green-400 hover:text-green-300 text-sm transition-colors">
                      <Download className="w-3 h-3" />
                      Download PDF
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {filteredTips.map((tip, index) => (
                <motion.div
                  key={tip.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 hover:border-gray-600/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(tip.category)}`}>
                        {tip.category.replace('-', ' ').toUpperCase()}
                      </span>
                      {tip.isUserSubmitted && (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-600/20 text-blue-400">
                          COMMUNITY
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(tip.date).toLocaleDateString()}
                    </span>
                  </div>

                  <h2 className="text-xl font-semibold text-white mb-3">{tip.title}</h2>
                  <p className="text-gray-300 mb-4 leading-relaxed">{tip.content}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>By {tip.author}</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 text-gray-400 hover:text-red-400 transition-colors">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">{tip.likes}</span>
                      </button>
                      <button className="flex items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm">{tip.comments}</span>
                      </button>
                      <button className="flex items-center gap-1 text-gray-400 hover:text-green-400 transition-colors">
                        <Share2 className="w-4 h-4" />
                        <span className="text-sm">Share</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Tip Modal */}
        {showSubmitForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-800 rounded-xl border border-gray-700 p-6 w-full max-w-2xl"
            >
              <h3 className="text-xl font-semibold text-white mb-4">Submit a Trading Tip</h3>
              <form onSubmit={handleSubmitTip} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tip Title
                  </label>
                  <input
                    type="text"
                    value={newTip.title}
                    onChange={(e) => setNewTip({ ...newTip, title: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={newTip.category}
                    onChange={(e) => setNewTip({ ...newTip, category: e.target.value as any })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="risk-management">Risk Management</option>
                    <option value="psychology">Trading Psychology</option>
                    <option value="strategy">Strategy</option>
                    <option value="technical">Technical Analysis</option>
                    <option value="fundamental">Fundamental Analysis</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tip Content
                  </label>
                  <textarea
                    value={newTip.content}
                    onChange={(e) => setNewTip({ ...newTip, content: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    Submit Tip
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowSubmitForm(false)}
                    className="flex-1 px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}