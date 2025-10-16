'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Mail, 
  Calendar,
  Settings, 
  Bell, 
  Save, 
  Eye, 
  EyeOff,
  Shield,
  Activity,
  TrendingUp,
  DollarSign,
  Bot,
  Edit3,
  Target
} from 'lucide-react'
import Header from '@/components/layout/Header'
import { AIAssistant } from '@/components/ai/AIAssistant'

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, USA',
    bio: 'Passionate trader focused on building long-term wealth.',
    joinDate: '2024-01-15',
    totalTrades: 127,
    winRate: 68.5,
    totalProfit: 2450.75,
    activeBots: 3,
    weeklyTips: true,
    pushNotifications: true,
    emailAlerts: true
  })

  const [isEditing, setIsEditing] = useState(false)
  const [showApiToken, setShowApiToken] = useState(false)
  const [apiToken] = useState('demo_token_1234567890abcdef')
  const [activeTab, setActiveTab] = useState('profile')

  const handleSave = () => {
    setIsEditing(false)
  }

  const handleInputChange = (field: string, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const tabs = [
    { id: 'profile', label: 'Profile Info', icon: User },
    { id: 'trading', label: 'Trading Stats', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <Header />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-xl p-8 border border-green-500/20">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-gray-300" />
              </div>

              <div className="text-center md:text-left flex-1">
                <h1 className="text-3xl font-bold text-white mb-2">{profile.name}</h1>
                <p className="text-gray-300 mb-4">{profile.email}</p>
                
                <div className="flex flex-wrap gap-3 text-sm">
                  <span className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Joined {formatDate(profile.joinDate)}
                  </span>
                  <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full flex items-center gap-1">
                    <Activity className="w-3 h-3" />
                    {profile.totalTrades} trades
                  </span>
                  <span className="bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full flex items-center gap-1">
                    <Target className="w-3 h-3" />
                    {profile.winRate}% win rate
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 md:gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400"></div>
                  <div className="text-xs text-gray-400">Total Profit</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{profile.activeBots}</div>
                  <div className="text-xs text-gray-400">Active Bots</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mb-8">
          <div className="flex flex-wrap gap-1 bg-gray-800 p-1 rounded-lg">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-green-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'profile' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                    <User className="w-5 h-5 text-green-400" />
                    Personal Information
                  </h3>
                  <button
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    className="flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
                  >
                    {isEditing ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                    {isEditing ? 'Save' : 'Edit'}
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    ) : (
                      <p className="text-white bg-gray-700 px-4 py-2 rounded-lg">{profile.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    ) : (
                      <p className="text-white bg-gray-700 px-4 py-2 rounded-lg">{profile.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    ) : (
                      <p className="text-white bg-gray-700 px-4 py-2 rounded-lg">{profile.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                    {isEditing ? (
                      <textarea
                        value={profile.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                      />
                    ) : (
                      <p className="text-white bg-gray-700 px-4 py-2 rounded-lg">{profile.bio}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                  Trading Overview
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-700 rounded-lg p-4 text-center">
                    <DollarSign className="w-6 h-6 text-green-400 mx-auto mb-2" />
                    <div className="text-lg font-bold text-green-400"></div>
                    <div className="text-xs text-gray-400">Total Profit</div>
                  </div>
                  
                  <div className="bg-gray-700 rounded-lg p-4 text-center">
                    <Activity className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                    <div className="text-lg font-bold text-white">{profile.totalTrades}</div>
                    <div className="text-xs text-gray-400">Total Trades</div>
                  </div>
                  
                  <div className="bg-gray-700 rounded-lg p-4 text-center">
                    <Target className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                    <div className="text-lg font-bold text-purple-400">{profile.winRate}%</div>
                    <div className="text-xs text-gray-400">Win Rate</div>
                  </div>
                  
                  <div className="bg-gray-700 rounded-lg p-4 text-center">
                    <Bot className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                    <div className="text-lg font-bold text-cyan-400">{profile.activeBots}</div>
                    <div className="text-xs text-gray-400">Active Bots</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <Bell className="w-5 h-5 text-yellow-400" />
                Notification Settings
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Weekly Trading Tips</p>
                    <p className="text-gray-400 text-sm">Get weekly insights and tips</p>
                  </div>
                  <button
                    onClick={() => handleInputChange('weeklyTips', !profile.weeklyTips)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${profile.weeklyTips ? 'bg-green-500' : 'bg-gray-500'}`}
                  >
                    <div className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${profile.weeklyTips ? 'translate-x-6' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <Shield className="w-5 h-5 text-red-400" />
                Security & API
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">API Token</label>
                <div className="flex gap-2">
                  <input
                    type={showApiToken ? 'text' : 'password'}
                    value={apiToken}
                    readOnly
                    className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  />
                  <button
                    onClick={() => setShowApiToken(!showApiToken)}
                    className="px-3 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
                  >
                    {showApiToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      <AIAssistant />
    </div>
  )
}
