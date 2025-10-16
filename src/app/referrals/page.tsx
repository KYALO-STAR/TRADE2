'use client'

import { useState, useEffect } from 'react'
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Share2, 
  Copy,
  Award,
  Calendar,
  ArrowUpRight,
  MessageCircle,
  Download,
  Eye
} from 'lucide-react'
import { motion } from 'framer-motion'
import TelegramIntegration from '@/components/referrals/TelegramIntegration'
import Header from '@/components/layout/Header'

interface ReferralStats {
  totalReferrals: number
  activeReferrals: number
  totalEarnings: number
  pendingPayouts: number
  clicksThisMonth: number
  conversionRate: number
}

interface ReferralTier {
  name: string
  level: number
  minReferrals: number
  commission: number
  bonuses: string[]
  color: string
}

interface PayoutRequest {
  id: string
  amount: number
  requestDate: Date
  status: 'pending' | 'approved' | 'paid'
  paymentMethod: string
}

const REFERRAL_TIERS: ReferralTier[] = [
  {
    name: 'Bronze',
    level: 1,
    minReferrals: 0,
    commission: 10,
    bonuses: ['Basic referral tracking', 'Monthly reports'],
    color: 'from-orange-400 to-orange-600'
  },
  {
    name: 'Silver',
    level: 2,
    minReferrals: 10,
    commission: 15,
    bonuses: ['Priority support', 'Advanced analytics', 'Custom referral codes'],
    color: 'from-gray-300 to-gray-500'
  },
  {
    name: 'Gold',
    level: 3,
    minReferrals: 25,
    commission: 20,
    bonuses: ['Weekly payouts', 'Marketing materials', 'Dedicated account manager'],
    color: 'from-yellow-400 to-yellow-600'
  },
  {
    name: 'Platinum',
    level: 4,
    minReferrals: 50,
    commission: 25,
    bonuses: ['Daily payouts', 'White-label options', 'Revenue sharing', 'VIP events'],
    color: 'from-purple-400 to-purple-600'
  }
]

const MOCK_STATS: ReferralStats = {
  totalReferrals: 47,
  activeReferrals: 32,
  totalEarnings: 2847.50,
  pendingPayouts: 450.75,
  clicksThisMonth: 1247,
  conversionRate: 3.8
}

const MOCK_PAYOUTS: PayoutRequest[] = [
  {
    id: '1',
    amount: 450.75,
    requestDate: new Date('2024-01-15'),
    status: 'pending',
    paymentMethod: 'Bank Transfer'
  },
  {
    id: '2',
    amount: 325.50,
    requestDate: new Date('2024-01-01'),
    status: 'paid',
    paymentMethod: 'Mobile Money'
  },
  {
    id: '3',
    amount: 275.25,
    requestDate: new Date('2023-12-15'),
    status: 'paid',
    paymentMethod: 'Bank Transfer'
  }
]

export default function ReferralsPage() {
  const [stats, setStats] = useState<ReferralStats>(MOCK_STATS)
  const [currentTier, setCurrentTier] = useState<ReferralTier>(REFERRAL_TIERS[2])
  const [payoutRequests, setPayoutRequests] = useState<PayoutRequest[]>(MOCK_PAYOUTS)
  const [referralLink, setReferralLink] = useState('https://tradepro.app/ref/user123')
  const [copiedLink, setCopiedLink] = useState(false)
  const [selectedTab, setSelectedTab] = useState<'overview' | 'community' | 'payouts'>('overview')

  const copyReferralLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink)
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  const requestPayout = () => {
    // In a real app, this would make an API call
    const newRequest: PayoutRequest = {
      id: (payoutRequests.length + 1).toString(),
      amount: stats.pendingPayouts,
      requestDate: new Date(),
      status: 'pending',
      paymentMethod: 'Bank Transfer'
    }
    
    setPayoutRequests(prev => [newRequest, ...prev])
    setStats(prev => ({ ...prev, pendingPayouts: 0 }))
  }

  const getNextTier = () => {
    return REFERRAL_TIERS.find(tier => tier.minReferrals > stats.totalReferrals)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/10 text-yellow-400'
      case 'approved': return 'bg-blue-500/10 text-blue-400'
      case 'paid': return 'bg-green-500/10 text-green-400'
      default: return 'bg-gray-500/10 text-gray-400'
    }
  }

  const progressToNextTier = () => {
    const nextTier = getNextTier()
    if (!nextTier) return 100
    return Math.min((stats.totalReferrals / nextTier.minReferrals) * 100, 100)
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Referral Program</h1>
          <p className="text-gray-400">
            Earn commissions by referring new traders to our platform
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-800 rounded-lg p-1 w-fit">
            <button
              onClick={() => setSelectedTab('overview')}
              className={`py-2 px-4 rounded-md transition-all flex items-center gap-2 ${
                selectedTab === 'overview'
                  ? 'bg-green-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              Overview
            </button>
            <button
              onClick={() => setSelectedTab('community')}
              className={`py-2 px-4 rounded-md transition-all flex items-center gap-2 ${
                selectedTab === 'community'
                  ? 'bg-green-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              Community
            </button>
            <button
              onClick={() => setSelectedTab('payouts')}
              className={`py-2 px-4 rounded-md transition-all flex items-center gap-2 ${
                selectedTab === 'payouts'
                  ? 'bg-green-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              Payouts
            </button>
          </div>
        </div>

        {selectedTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800 rounded-lg border border-gray-700 p-6"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-8 h-8 text-blue-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Total Referrals</p>
                    <p className="text-2xl font-bold text-white">{stats.totalReferrals}</p>
                  </div>
                </div>
                <p className="text-green-400 text-sm flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" />
                  {stats.activeReferrals} active
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gray-800 rounded-lg border border-gray-700 p-6"
              >
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="w-8 h-8 text-green-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Total Earnings</p>
                    <p className="text-2xl font-bold text-white">${stats.totalEarnings.toFixed(2)}</p>
                  </div>
                </div>
                <p className="text-yellow-400 text-sm flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  ${stats.pendingPayouts.toFixed(2)} pending
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gray-800 rounded-lg border border-gray-700 p-6"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="w-8 h-8 text-purple-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Monthly Clicks</p>
                    <p className="text-2xl font-bold text-white">{stats.clicksThisMonth.toLocaleString()}</p>
                  </div>
                </div>
                <p className="text-blue-400 text-sm flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {stats.conversionRate}% conversion
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`bg-gradient-to-br ${currentTier.color} rounded-lg border border-gray-700 p-6`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Award className="w-8 h-8 text-white" />
                  <div>
                    <p className="text-white/80 text-sm">Current Tier</p>
                    <p className="text-2xl font-bold text-white">{currentTier.name}</p>
                  </div>
                </div>
                <p className="text-white/80 text-sm">
                  {currentTier.commission}% commission rate
                </p>
              </motion.div>
            </div>

            {/* Referral Link Section */}
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Share2 className="w-5 h-5 text-green-400" />
                Your Referral Link
              </h2>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={referralLink}
                  readOnly
                  placeholder="Your referral link"
                  className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white font-mono text-sm"
                />
                <button
                  onClick={copyReferralLink}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {copiedLink ? (
                    <>
                      <span className="text-sm">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy Link
                    </>
                  )}
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Share on WhatsApp
                </button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Share on Telegram
                </button>
                <button className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download QR Code
                </button>
              </div>
            </div>

            {/* Tier Progress */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                  <h2 className="text-xl font-semibold text-white mb-6">Referral Tiers</h2>
                  
                  <div className="space-y-4">
                    {REFERRAL_TIERS.map((tier, index) => (
                      <div
                        key={tier.name}
                        className={`p-4 rounded-lg border transition-all ${
                          tier.name === currentTier.name
                            ? 'border-green-500 bg-green-500/10'
                            : stats.totalReferrals >= tier.minReferrals
                            ? 'border-gray-600 bg-gray-700/50'
                            : 'border-gray-700 bg-gray-800/50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${tier.color}`} />
                            <h3 className="text-white font-semibold">{tier.name}</h3>
                            {tier.name === currentTier.name && (
                              <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">
                                Current
                              </span>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-white font-bold">{tier.commission}%</p>
                            <p className="text-gray-400 text-xs">commission</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-gray-400 text-sm">
                            {tier.minReferrals === 0 ? 'No minimum' : `${tier.minReferrals}+ referrals`}
                          </p>
                          {stats.totalReferrals >= tier.minReferrals ? (
                            <span className="text-green-400 text-sm">✓ Unlocked</span>
                          ) : (
                            <span className="text-gray-500 text-sm">
                              {tier.minReferrals - stats.totalReferrals} more needed
                            </span>
                          )}
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {tier.bonuses.map((bonus, i) => (
                            <span
                              key={i}
                              className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs"
                            >
                              {bonus}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* Progress to Next Tier */}
                {getNextTier() && (
                  <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Progress to {getNextTier()!.name}</h3>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">{stats.totalReferrals} referrals</span>
                        <span className="text-gray-400">{getNextTier()!.minReferrals} needed</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className={`bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500 w-[${progressToNextTier()}%]`}
                        />
                      </div>
                    </div>
                    
                    <p className="text-gray-300 text-sm">
                      {getNextTier()!.minReferrals - stats.totalReferrals} more referrals to unlock{' '}
                      <span className="text-green-400 font-medium">{getNextTier()!.commission}% commission</span>
                    </p>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                  
                  <div className="space-y-3">
                    {stats.pendingPayouts > 0 && (
                      <button
                        onClick={requestPayout}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <DollarSign className="w-4 h-4" />
                        Request Payout (${stats.pendingPayouts.toFixed(2)})
                      </button>
                    )}
                    
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Download Materials
                    </button>
                    
                    <button className="w-full bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                      <Award className="w-4 h-4" />
                      View Leaderboard
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'community' && (
          <div className="space-y-8">
            <TelegramIntegration />
          </div>
        )}

        {selectedTab === 'payouts' && (
          <div className="space-y-8">
            {/* Payout Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="w-8 h-8 text-green-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Available Balance</p>
                    <p className="text-2xl font-bold text-white">${stats.pendingPayouts.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="w-8 h-8 text-blue-400" />
                  <div>
                    <p className="text-gray-400 text-sm">This Month</p>
                    <p className="text-2xl font-bold text-white">$1,247.50</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-8 h-8 text-purple-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Total Paid</p>
                    <p className="text-2xl font-bold text-white">${(stats.totalEarnings - stats.pendingPayouts).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payout History */}
            <div className="bg-gray-800 rounded-lg border border-gray-700">
              <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">Payout History</h2>
                {stats.pendingPayouts > 0 && (
                  <button
                    onClick={requestPayout}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <DollarSign className="w-4 h-4" />
                    Request Payout
                  </button>
                )}
              </div>

              <div className="p-4">
                <div className="space-y-4">
                  {payoutRequests.map((request) => (
                    <div
                      key={request.id}
                      className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg border border-gray-600"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <p className="text-white font-semibold">${request.amount.toFixed(2)}</p>
                          <span className={`px-2 py-1 rounded text-xs ${getStatusColor(request.status)}`}>
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm">
                          {request.paymentMethod} • {request.requestDate.toLocaleDateString()}
                        </p>
                      </div>
                      
                      {request.status === 'pending' && (
                        <div className="flex items-center gap-2 text-yellow-400">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                          <span className="text-sm">Processing...</span>
                        </div>
                      )}
                      
                      {request.status === 'paid' && (
                        <div className="flex items-center gap-2 text-green-400">
                          <span className="text-sm">✓ Completed</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}