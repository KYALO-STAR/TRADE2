'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  User, Mail, Key, Bell, Shield, Palette, Globe, 
  Save, Eye, EyeOff, Smartphone, Monitor, Moon,
  Volume2, VolumeX, Download, Trash2, AlertTriangle 
} from 'lucide-react'

export default function Settings() {
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('profile')
  const [showApiToken, setShowApiToken] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState({
    // Profile settings
    fullName: '',
    email: '',
    phone: '',
    derivToken: '',
    
    // Notification settings
    emailNotifications: true,
    pushNotifications: true,
    tradingAlerts: true,
    newsAlerts: true,
    soundEnabled: true,
    
    // Display settings
    theme: 'dark',
    language: 'en',
    timezone: 'UTC',
    saccoMode: false,
    
    // Security settings
    twoFactorEnabled: false,
    sessionTimeout: 30,
    apiAccess: true,
    
    // Trading settings
    riskWarnings: true,
    confirmTrades: true,
    autoLogout: true
  })

  useEffect(() => {
    // Load user data from localStorage (in production, this would come from your API)
    const userData = localStorage.getItem('user')
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      setSettings(prev => ({
        ...prev,
        fullName: parsedUser.fullName || '',
        email: parsedUser.email || '',
        derivToken: parsedUser.derivToken || '',
        saccoMode: parsedUser.accountType === 'sacco'
      }))
    }
  }, [])

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'display', label: 'Display', icon: Palette },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'trading', label: 'Trading', icon: Monitor }
  ]

  const handleSave = async (tabId: string) => {
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Update localStorage
      if (tabId === 'profile' && user) {
        const updatedUser = {
          ...user,
          fullName: settings.fullName,
          email: settings.email,
          derivToken: settings.derivToken,
          accountType: settings.saccoMode ? 'sacco' : 'individual'
        }
        localStorage.setItem('user', JSON.stringify(updatedUser))
        setUser(updatedUser)
      }
      
      // Show success message (in production, use toast notification)
      alert('Settings saved successfully!')
      
    } catch (error) {
      alert('Failed to save settings')
    } finally {
      setIsLoading(false)
    }
  }

  const ProfileSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Full Name
        </label>
        <div className="relative">
          <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={settings.fullName}
            onChange={(e) => setSettings(prev => ({ ...prev, fullName: e.target.value }))}
            className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your full name"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="email"
            value={settings.email}
            onChange={(e) => setSettings(prev => ({ ...prev, email: e.target.value }))}
            className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your email"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Phone Number
        </label>
        <div className="relative">
          <Smartphone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="tel"
            value={settings.phone}
            onChange={(e) => setSettings(prev => ({ ...prev, phone: e.target.value }))}
            className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your phone number"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Deriv API Token
        </label>
        <div className="relative">
          <Key className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type={showApiToken ? 'text' : 'password'}
            value={settings.derivToken}
            onChange={(e) => setSettings(prev => ({ ...prev, derivToken: e.target.value }))}
            className="w-full pl-10 pr-12 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your Deriv API token"
          />
          <button
            type="button"
            onClick={() => setShowApiToken(!showApiToken)}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-300"
          >
            {showApiToken ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        <p className="mt-1 text-xs text-gray-400">
          Get your token from{' '}
          <a href="https://app.deriv.com/account/api-token" target="_blank" rel="noopener noreferrer" 
             className="text-green-400 hover:text-green-300">
            Deriv App → Settings → API Token
          </a>
        </p>
      </div>

      <button
        onClick={() => handleSave('profile')}
        disabled={isLoading}
        className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Save className="w-5 h-5" />
            Save Profile
          </>
        )}
      </button>
    </div>
  )

  const NotificationSettings = () => (
    <div className="space-y-6">
      {/* Email Notifications */}
      <div className="flex items-center justify-between py-4 border-b border-gray-700">
        <div>
          <h3 className="text-white font-medium">Email Notifications</h3>
          <p className="text-gray-400 text-sm">Receive updates via email</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer" title="Toggle Email Notifications">
          <input
            type="checkbox"
            title="Toggle Email Notifications"
            checked={settings.emailNotifications}
            onChange={(e) => setSettings(prev => ({ ...prev, emailNotifications: e.target.checked }))}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
        </label>
      </div>

      {/* Push Notifications */}
      <div className="flex items-center justify-between py-4 border-b border-gray-700">
        <div>
          <h3 className="text-white font-medium">Push Notifications</h3>
          <p className="text-gray-400 text-sm">Browser push notifications</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer" title="Toggle Push Notifications">
          <input
            type="checkbox"
            title="Toggle Push Notifications"
            checked={settings.pushNotifications}
            onChange={(e) => setSettings(prev => ({ ...prev, pushNotifications: e.target.checked }))}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
        </label>
      </div>

      {/* Trading Alerts */}
      <div className="flex items-center justify-between py-4 border-b border-gray-700">
        <div>
          <h3 className="text-white font-medium">Trading Alerts</h3>
          <p className="text-gray-400 text-sm">Notifications for trades and positions</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer" title="Toggle Trading Alerts">
          <input
            type="checkbox"
            title="Toggle Trading Alerts"
            checked={settings.tradingAlerts}
            onChange={(e) => setSettings(prev => ({ ...prev, tradingAlerts: e.target.checked }))}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
        </label>
      </div>

      {/* News Alerts */}
      <div className="flex items-center justify-between py-4 border-b border-gray-700">
        <div>
          <h3 className="text-white font-medium">Market News Alerts</h3>
          <p className="text-gray-400 text-sm">Important market news and updates</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer" title="Toggle Market News Alerts">
          <input
            type="checkbox"
            title="Toggle Market News Alerts"
            checked={settings.newsAlerts}
            onChange={(e) => setSettings(prev => ({ ...prev, newsAlerts: e.target.checked }))}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
        </label>
      </div>

      {/* Sound Effects */}
      <div className="flex items-center justify-between py-4">
        <div>
          <h3 className="text-white font-medium">Sound Effects</h3>
          <p className="text-gray-400 text-sm">Audio alerts for wins and notifications</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer" title="Toggle Sound Effects">
          <input
            type="checkbox"
            title="Toggle Sound Effects"
            checked={settings.soundEnabled}
            onChange={(e) => setSettings(prev => ({ ...prev, soundEnabled: e.target.checked }))}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
        </label>
      </div>

      <button
        onClick={() => handleSave('notifications')}
        disabled={isLoading}
        className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
      >
        <Save className="w-5 h-5" />
        Save Notification Settings
      </button>
    </div>
  )

  const DisplaySettings = () => (
    <div className="space-y-6">
      {/* SACCO Mode */}
      <div className="flex items-center justify-between py-4 border-b border-gray-700">
        <div>
          <h3 className="text-white font-medium">SACCO-Friendly Mode</h3>
          <p className="text-gray-400 text-sm">Larger fonts and simplified interface</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            title="Toggle SACCO-Friendly Mode"
            checked={settings.saccoMode}
            onChange={(e) => setSettings(prev => ({ ...prev, saccoMode: e.target.checked }))}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
        </label>
      </div>

      {/* Language */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Language
        </label>
        <select
          title="Select language"
          value={settings.language}
          onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="en">English</option>
          <option value="sw">Swahili</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
        </select>
      </div>

      {/* Timezone */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Timezone
        </label>
        <select
          title="Select timezone"
          value={settings.timezone}
          onChange={(e) => setSettings(prev => ({ ...prev, timezone: e.target.value }))}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="UTC">UTC</option>
          <option value="EAT">East Africa Time (UTC+3)</option>
          <option value="EST">Eastern Standard Time (UTC-5)</option>
          <option value="GMT">Greenwich Mean Time (UTC+0)</option>
        </select>
      </div>

      <button
        onClick={() => handleSave('display')}
        disabled={isLoading}
        className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
      >
        <Save className="w-5 h-5" />
        Save Display Settings
      </button>
    </div>
  )

  const SecuritySettings = () => (
    <div className="space-y-6">
      {/* Two-Factor Authentication */}
      <div className="flex items-center justify-between py-4 border-b border-gray-700">
        <div>
          <h3 className="text-white font-medium">Two-Factor Authentication</h3>
          <p className="text-gray-400 text-sm">Add an extra layer of security</p>
        </div>
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
          {settings.twoFactorEnabled ? 'Enabled' : 'Enable'}
        </button>
      </div>

      {/* Session Timeout */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Session Timeout (minutes)
        </label>
        <select
          title="Select session timeout"
          value={settings.sessionTimeout}
          onChange={(e) => setSettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value={15}>15 minutes</option>
          <option value={30}>30 minutes</option>
          <option value={60}>1 hour</option>
          <option value={120}>2 hours</option>
          <option value={480}>8 hours</option>
        </select>
      </div>

      {/* API Access */}
      <div className="flex items-center justify-between py-4 border-b border-gray-700">
        <div>
          <h3 className="text-white font-medium">API Access</h3>
          <p className="text-gray-400 text-sm">Allow third-party applications to access your account</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer" title="Toggle API Access">
          <input
            type="checkbox"
            title="Toggle API Access"
            checked={settings.apiAccess}
            onChange={(e) => setSettings(prev => ({ ...prev, apiAccess: e.target.checked }))}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
        </label>
      </div>

      {/* Data Export */}
      <div className="bg-gray-750 rounded-lg p-4">
        <h3 className="text-white font-medium mb-2">Data Export</h3>
        <p className="text-gray-400 text-sm mb-4">Download your trading data and account information</p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2">
          <Download className="w-4 h-4" />
          Download Data
        </button>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
        <h3 className="text-red-400 font-medium mb-2 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Danger Zone
        </h3>
        <p className="text-gray-400 text-sm mb-4">
          Permanently delete your account and all associated data. This action cannot be undone.
        </p>
        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2">
          <Trash2 className="w-4 h-4" />
          Delete Account
        </button>
      </div>

      <button
        onClick={() => handleSave('security')}
        disabled={isLoading}
        className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
      >
        <Save className="w-5 h-5" />
        Save Security Settings
      </button>
    </div>
  )

  const TradingSettings = () => (
    <div className="space-y-6">
      {/* Risk Warnings */}
      <div className="flex items-center justify-between py-4 border-b border-gray-700">
        <div>
          <h3 className="text-white font-medium">Risk Warnings</h3>
          <p className="text-gray-400 text-sm">Show warnings for high-risk trades</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer" title="Toggle Risk Warnings">
          <input
            type="checkbox"
            title="Toggle Risk Warnings"
            checked={settings.riskWarnings}
            onChange={(e) => setSettings(prev => ({ ...prev, riskWarnings: e.target.checked }))}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
        </label>
      </div>

      {/* Confirm Trades */}
      <div className="flex items-center justify-between py-4 border-b border-gray-700">
        <div>
          <h3 className="text-white font-medium">Confirm Trades</h3>
          <p className="text-gray-400 text-sm">Require confirmation before executing trades</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer" title="Toggle Trade Confirmation">
          <input
            type="checkbox"
            title="Toggle Trade Confirmation"
            checked={settings.confirmTrades}
            onChange={(e) => setSettings(prev => ({ ...prev, confirmTrades: e.target.checked }))}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
        </label>
      </div>

      {/* Auto Logout */}
      <div className="flex items-center justify-between py-4">
        <div>
          <h3 className="text-white font-medium">Auto Logout</h3>
          <p className="text-gray-400 text-sm">Automatically logout after inactivity</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer" title="Toggle Auto Logout">
          <input
            type="checkbox"
            title="Toggle Auto Logout"
            checked={settings.autoLogout}
            onChange={(e) => setSettings(prev => ({ ...prev, autoLogout: e.target.checked }))}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
        </label>
      </div>

      <button
        onClick={() => handleSave('trading')}
        disabled={isLoading}
        className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
      >
        <Save className="w-5 h-5" />
        Save Trading Settings
      </button>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile': return <ProfileSettings />
      case 'notifications': return <NotificationSettings />
      case 'display': return <DisplaySettings />
      case 'security': return <SecuritySettings />
      case 'trading': return <TradingSettings />
      default: return <ProfileSettings />
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Settings
          </h1>
          <p className="text-xl text-gray-300">
            Manage your account preferences and security settings
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${
                      activeTab === tab.id
                        ? 'bg-green-500 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Settings Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <h2 className="text-2xl font-bold text-white mb-6 capitalize">
                {activeTab} Settings
              </h2>
              {renderTabContent()}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}