'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, TrendingUp, Globe, Search, Filter, ExternalLink, BookOpen } from 'lucide-react'
import Image from 'next/image'

interface NewsArticle {
  id: string
  title: string
  summary: string
  content: string
  author: string
  publishedAt: string
  category: string
  impact: 'high' | 'medium' | 'low'
  imageUrl: string
  source: string
  tags: string[]
}

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Mock news data
  const newsArticles: NewsArticle[] = [
    {
      id: '1',
      title: 'Federal Reserve Signals Potential Rate Cuts in Q2 2024',
      summary: 'Fed officials hint at possible monetary policy shifts amid inflation concerns and economic indicators.',
      content: 'The Federal Reserve has indicated potential interest rate adjustments following recent economic data...',
      author: 'Sarah Johnson',
      publishedAt: '2024-01-15T10:30:00Z',
      category: 'central-banking',
      impact: 'high',
      imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop',
      source: 'Financial Times',
      tags: ['Fed', 'Interest Rates', 'Monetary Policy']
    },
    {
      id: '2',
      title: 'Bitcoin Reaches New All-Time High Amid Institutional Adoption',
      summary: 'Major corporations and investment firms continue to add Bitcoin to their portfolios, driving price momentum.',
      content: 'Bitcoin has surged past previous records as institutional adoption accelerates...',
      author: 'Michael Chen',
      publishedAt: '2024-01-15T08:15:00Z',
      category: 'cryptocurrency',
      impact: 'high',
      imageUrl: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&h=400&fit=crop',
      source: 'CoinDesk',
      tags: ['Bitcoin', 'Cryptocurrency', 'Institutional Investment']
    },
    {
      id: '3',
      title: 'European Central Bank Maintains Dovish Stance on Inflation',
      summary: 'ECB President emphasizes gradual approach to monetary tightening despite rising consumer prices.',
      content: 'The European Central Bank continues its cautious approach to inflation management...',
      author: 'Emma Schmidt',
      publishedAt: '2024-01-14T16:45:00Z',
      category: 'central-banking',
      impact: 'medium',
      imageUrl: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=400&fit=crop',
      source: 'Reuters',
      tags: ['ECB', 'Inflation', 'European Markets']
    },
    {
      id: '4',
      title: 'Oil Prices Surge Following OPEC+ Production Cuts',
      summary: 'Crude oil futures jump after major oil producers announce extended supply reductions.',
      content: 'Oil markets responded positively to OPEC+ decisions regarding production levels...',
      author: 'David Rodriguez',
      publishedAt: '2024-01-14T14:20:00Z',
      category: 'commodities',
      impact: 'medium',
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop',
      source: 'Bloomberg',
      tags: ['Oil', 'OPEC', 'Commodities']
    },
    {
      id: '5',
      title: 'Global Stock Markets Rally on Positive Economic Data',
      summary: 'International equities rise as manufacturing and employment figures exceed expectations.',
      content: 'Stock indices worldwide gained momentum following encouraging economic indicators...',
      author: 'Lisa Wong',
      publishedAt: '2024-01-14T12:00:00Z',
      category: 'markets',
      impact: 'high',
      imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop',
      source: 'Wall Street Journal',
      tags: ['Stock Markets', 'Economic Data', 'Global Markets']
    },
    {
      id: '6',
      title: 'Forex Volatility Increases Amid Geopolitical Tensions',
      summary: 'Currency markets experience heightened volatility as international relations remain strained.',
      content: 'Foreign exchange markets are showing increased activity due to geopolitical developments...',
      author: 'James Thompson',
      publishedAt: '2024-01-13T18:30:00Z',
      category: 'forex',
      impact: 'medium',
      imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop',
      source: 'FXStreet',
      tags: ['Forex', 'Geopolitics', 'Currency Markets']
    }
  ]

  const categories = [
    { value: 'all', label: 'All News', count: newsArticles.length },
    { value: 'central-banking', label: 'Central Banking', count: 2 },
    { value: 'cryptocurrency', label: 'Cryptocurrency', count: 1 },
    { value: 'commodities', label: 'Commodities', count: 1 },
    { value: 'markets', label: 'Markets', count: 1 },
    { value: 'forex', label: 'Forex', count: 1 }
  ]

  const filteredArticles = newsArticles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-400 bg-red-400/10 border-red-400/20'
      case 'medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
      case 'low': return 'text-green-400 bg-green-400/10 border-green-400/20'
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20'
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Financial News & Analysis
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Stay updated with the latest market developments and economic insights
          </p>

          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search news articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="flex gap-2">
              <select
                title="Filter by category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label} ({category.count})
                  </option>
                ))}
              </select>
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors flex items-center gap-2"
                title="Upload news content"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Upload
              </button>
            </div>
          </div>
        </motion.div>

        {/* Market Impact Alert */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-xl p-4 mb-8"
        >
          <div className="flex items-start gap-3">
            <TrendingUp className="w-6 h-6 text-red-400 mt-0.5" />
            <div>
              <h3 className="text-red-400 font-semibold mb-1">High Impact News Alert</h3>
              <p className="text-gray-300 text-sm">
                Federal Reserve announcement expected to cause significant market volatility. 
                Review your positions and risk management strategies.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Featured Article */}
        {filteredArticles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden mb-8"
          >
            <div className="md:flex">
              <div className="md:w-1/2">
                <div className="relative h-64 md:h-full">
                  <Image
                    src={filteredArticles[0].imageUrl}
                    alt={filteredArticles[0].title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getImpactColor(filteredArticles[0].impact)}`}>
                      {filteredArticles[0].impact.toUpperCase()} IMPACT
                    </span>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 p-6 md:p-8">
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(filteredArticles[0].publishedAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {formatTime(filteredArticles[0].publishedAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Globe className="w-4 h-4" />
                    {filteredArticles[0].source}
                  </span>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                  {filteredArticles[0].title}
                </h2>
                
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                  {filteredArticles[0].summary}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {filteredArticles[0].tags.map((tag, index) => (
                    <span key={index} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">
                    By {filteredArticles[0].author}
                  </span>
                  <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2">
                    Read Full Article
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.slice(1).map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: (index + 3) * 0.1 }}
              className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:border-gray-600 transition-all duration-300 group"
            >
              <div className="relative h-48">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${getImpactColor(article.impact)}`}>
                    {article.impact.toUpperCase()}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(article.publishedAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatTime(article.publishedAt)}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-3 leading-tight group-hover:text-green-400 transition-colors duration-200">
                  {article.title}
                </h3>
                
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {article.summary}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {article.tags.slice(0, 2).map((tag, tagIndex) => (
                    <span key={tagIndex} className="bg-gray-700 text-gray-400 px-2 py-1 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                  {article.tags.length > 2 && (
                    <span className="text-gray-500 text-xs px-1">+{article.tags.length - 2}</span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-gray-400 text-xs">
                    <div>{article.author}</div>
                    <div className="text-gray-500">{article.source}</div>
                  </div>
                  <button className="bg-gray-700 hover:bg-green-500 text-white px-3 py-1 rounded text-sm font-medium transition-colors duration-200 flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    Read
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        {filteredArticles.length > 6 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-12"
          >
            <button className="bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-green-500 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200">
              Load More Articles
            </button>
          </motion.div>
        )}

        {/* No Results */}
        {filteredArticles.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center py-12"
          >
            <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No articles found</h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your search terms or category filter
            </p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
              }}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}