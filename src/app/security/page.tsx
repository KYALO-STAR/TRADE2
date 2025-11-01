'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import { 
  Shield, 
  Smartphone, 
  Key, 
  Mail,
  Clock,
  Globe,
  AlertTriangle,
  CheckCircle,
  Settings as SettingsIcon,
  Eye,
  Download,
  Trash2
} from 'lucide-react'
import Header from '@/components/layout/Header'
import { Button } from '@/components/ui/Button'
import { TwoFactorSetup } from '@/components/auth/TwoFactorSetup'

interface SecuritySettings {
  twoFactorEnabled: boolean
  passkeyEnabled: boolean
  emailNotifications: boolean
  loginNotifications: boolean
  deviceVerification: boolean
  sessionTimeout: number
  trustedDevices: TrustedDevice[]
  loginHistory: LoginAttempt[]
}

interface TrustedDevice {
  id: string
  name: string
  type: 'mobile' | 'desktop' | 'tablet'
  lastUsed: string
  location: string
  trusted: boolean
}

interface LoginAttempt {
  id: string
  timestamp: string
  ip: string
  location: string
  device: string
  success: boolean
  method: 'deriv' | 'email' | 'passkey'
}

export default function SecurityPage() {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState('overview')
  const [showTwoFactorSetup, setShowTwoFactorSetup] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState<SecuritySettings>({
    twoFactorEnabled: false,
    passkeyEnabled: false,
    emailNotifications: true,
    loginNotifications: true,
    deviceVerification: true,
    sessionTimeout: 30,
    trustedDevices: [],
    loginHistory: []
  })

  useEffect(() => {
    loadSecuritySettings()
  }, [])

  const loadSecuritySettings = async () => {
    try {
      // Simulate loading security settings
      const mockSettings: SecuritySettings = {
        twoFactorEnabled: false,
        passkeyEnabled: true,
        emailNotifications: true,
        loginNotifications: true,
        deviceVerification: true,
        sessionTimeout: 30,
        trustedDevices: [
          {
            id: '1',
            name: 'iPhone 13 Pro',
            type: 'mobile',
            lastUsed: '2024-11-01T10:30:00Z',
            location: 'New York, US',
            trusted: true
          },
          {
            id: '2',
            name: 'MacBook Pro',
            type: 'desktop',
            lastUsed: '2024-10-31T15:45:00Z',
            location: 'New York, US',
            trusted: true
          }
        ],
        loginHistory: [
          {
            id: '1',
            timestamp: '2024-11-01T10:30:00Z',
            ip: '192.168.1.100',
            location: 'New York, US',
            device: 'iPhone 13 Pro',
            success: true,
            method: 'deriv'
          },
          {
            id: '2',
            timestamp: '2024-10-31T15:45:00Z',
            ip: '192.168.1.101',
            location: 'California, US',
            device: 'Chrome Browser',
            success: false,
            method: 'email'
          }
        ]
      }
      setSettings(mockSettings)
    } catch (error) {
      console.error('Failed to load security settings:', error)
    }
  }

  const updateSetting = async (key: keyof SecuritySettings, value: any) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      setSettings(prev => ({ ...prev, [key]: value }))
    } catch (error) {
      console.error('Failed to update setting:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const removeTrustedDevice = async (deviceId: string) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      setSettings(prev => ({
        ...prev,
        trustedDevices: prev.trustedDevices.filter(d => d.id !== deviceId)
      }))
    } catch (error) {
      console.error('Failed to remove device:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const downloadLoginHistory = () => {
    const csvContent = [
      'Date,IP Address,Location,Device,Method,Success',
      ...settings.loginHistory.map(entry => 
        `${entry.timestamp},${entry.ip},${entry.location},${entry.device},${entry.method},${entry.success}`
      )
    ].join('\\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'login-history.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const tabs = [
    { id: 'overview', label: 'Security Overview', icon: Shield },
    { id: 'authentication', label: 'Authentication', icon: Key },
    { id: 'devices', label: 'Trusted Devices', icon: Smartphone },
    { id: 'activity', label: 'Login Activity', icon: Clock }
  ]

  if (showTwoFactorSetup) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Header />
        <div className="flex items-center justify-center px-4 py-12">
          <TwoFactorSetup
            onComplete={() => {
              setShowTwoFactorSetup(false)
              updateSetting('twoFactorEnabled', true)
            }}
            onCancel={() => setShowTwoFactorSetup(false)}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Security Settings</h1>
          <p className="text-gray-400">Manage your account security and authentication preferences</p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {tabs.map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-800 rounded-xl p-6"
        >
          {/* Security Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-6">Security Status</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Two-Factor Authentication */}
                <div className="bg-gray-700 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Shield className={`${settings.twoFactorEnabled ? 'text-green-400' : 'text-yellow-400'}`} size={24} />
                    {settings.twoFactorEnabled ? (
                      <CheckCircle className="text-green-400" size={20} />
                    ) : (
                      <AlertTriangle className="text-yellow-400" size={20} />
                    )}
                  </div>
                  <h3 className="text-white font-medium mb-2">Two-Factor Authentication</h3>
                  <p className="text-gray-300 text-sm mb-3">
                    {settings.twoFactorEnabled ? 'Enabled and active' : 'Recommended for extra security'}
                  </p>
                  <div className="text-xs">
                    <span className={`px-2 py-1 rounded-full ${
                      settings.twoFactorEnabled ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {settings.twoFactorEnabled ? 'Secure' : 'Action Required'}
                    </span>
                  </div>
                </div>

                {/* Passkey Authentication */}
                <div className="bg-gray-700 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Key className={`${settings.passkeyEnabled ? 'text-green-400' : 'text-gray-400'}`} size={24} />
                    {settings.passkeyEnabled ? (
                      <CheckCircle className="text-green-400" size={20} />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-gray-500"></div>
                    )}
                  </div>
                  <h3 className="text-white font-medium mb-2">Passkey Authentication</h3>
                  <p className="text-gray-300 text-sm mb-3">
                    {settings.passkeyEnabled ? 'Biometric login enabled' : 'Modern passwordless authentication'}
                  </p>
                  <div className="text-xs">
                    <span className={`px-2 py-1 rounded-full ${
                      settings.passkeyEnabled ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {settings.passkeyEnabled ? 'Active' : 'Available'}
                    </span>
                  </div>
                </div>

                {/* Device Verification */}
                <div className="bg-gray-700 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Smartphone className={`${settings.deviceVerification ? 'text-green-400' : 'text-gray-400'}`} size={24} />
                    {settings.deviceVerification ? (
                      <CheckCircle className="text-green-400" size={20} />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-gray-500"></div>
                    )}
                  </div>
                  <h3 className="text-white font-medium mb-2">Device Verification</h3>
                  <p className="text-gray-300 text-sm mb-3">
                    {settings.deviceVerification ? 'New devices require verification' : 'Allow login from any device'}
                  </p>
                  <div className="text-xs">
                    <span className={`px-2 py-1 rounded-full ${
                      settings.deviceVerification ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {settings.deviceVerification ? 'Protected' : 'Disabled'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Security Score */}
              <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-semibold mb-2">Security Score</h3>
                    <p className="text-gray-300 text-sm">
                      Your account security is {settings.twoFactorEnabled && settings.deviceVerification ? 'excellent' : 'good'}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-green-400">
                      {settings.twoFactorEnabled && settings.deviceVerification ? '95' : '75'}%
                    </div>
                    <p className="text-gray-400 text-sm">Security Level</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Authentication Tab */}
          {activeTab === 'authentication' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-6">Authentication Methods</h2>
              
              <div className="space-y-4">
                {/* Two-Factor Authentication */}
                <div className="bg-gray-700 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Shield className="text-green-400" size={24} />
                      <div>
                        <h3 className="text-white font-medium">Two-Factor Authentication (2FA)</h3>
                        <p className="text-gray-300 text-sm">
                          {settings.twoFactorEnabled ? 
                            'Authenticator app is configured for your account' :
                            'Add an extra layer of security with 2FA'
                          }
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={() => settings.twoFactorEnabled ? 
                        updateSetting('twoFactorEnabled', false) : 
                        setShowTwoFactorSetup(true)
                      }
                      className={settings.twoFactorEnabled ? 
                        'bg-red-500 hover:bg-red-600' : 
                        'bg-green-500 hover:bg-green-600'
                      }
                    >
                      {settings.twoFactorEnabled ? 'Disable' : 'Enable'}
                    </Button>
                  </div>
                </div>

                {/* Email Notifications */}
                <div className="bg-gray-700 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Mail className="text-blue-400" size={24} />
                      <div>
                        <h3 className="text-white font-medium">Email Notifications</h3>
                        <p className="text-gray-300 text-sm">
                          Receive email alerts for security events
                        </p>
                      </div>
                    </div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.emailNotifications}
                        onChange={(e) => updateSetting('emailNotifications', e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`relative w-11 h-6 rounded-full transition-colors ${
                        settings.emailNotifications ? 'bg-green-500' : 'bg-gray-600'
                      }`}>
                        <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                          settings.emailNotifications ? 'translate-x-5' : ''
                        }`}></div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Device Verification */}
                <div className="bg-gray-700 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Smartphone className="text-purple-400" size={24} />
                      <div>
                        <h3 className="text-white font-medium">Device Verification</h3>
                        <p className="text-gray-300 text-sm">
                          Require email verification for new devices
                        </p>
                      </div>
                    </div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.deviceVerification}
                        onChange={(e) => updateSetting('deviceVerification', e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`relative w-11 h-6 rounded-full transition-colors ${
                        settings.deviceVerification ? 'bg-green-500' : 'bg-gray-600'
                      }`}>
                        <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                          settings.deviceVerification ? 'translate-x-5' : ''
                        }`}></div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Session Timeout */}
                <div className="bg-gray-700 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Clock className="text-orange-400" size={24} />
                      <div>
                        <h3 className="text-white font-medium">Session Timeout</h3>
                        <p className="text-gray-300 text-sm">
                          Automatically log out after inactivity
                        </p>
                      </div>
                    </div>
                    <select
                      value={settings.sessionTimeout}
                      onChange={(e) => updateSetting('sessionTimeout', parseInt(e.target.value))}
                      className="bg-gray-600 text-white rounded-lg px-3 py-2 border border-gray-500"
                    >
                      <option value={15}>15 minutes</option>
                      <option value={30}>30 minutes</option>
                      <option value={60}>1 hour</option>
                      <option value={240}>4 hours</option>
                      <option value={0}>Never</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Trusted Devices Tab */}
          {activeTab === 'devices' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">Trusted Devices</h2>
                <p className="text-gray-400 text-sm">
                  {settings.trustedDevices.length} device(s) trusted
                </p>
              </div>
              
              <div className="space-y-4">
                {settings.trustedDevices.map((device) => (
                  <div key={device.id} className="bg-gray-700 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${
                          device.type === 'mobile' ? 'bg-blue-500/20' :
                          device.type === 'desktop' ? 'bg-green-500/20' : 'bg-purple-500/20'
                        }`}>
                          <Smartphone size={20} className={
                            device.type === 'mobile' ? 'text-blue-400' :
                            device.type === 'desktop' ? 'text-green-400' : 'text-purple-400'
                          } />
                        </div>
                        <div>
                          <h3 className="text-white font-medium">{device.name}</h3>
                          <p className="text-gray-300 text-sm">{device.location}</p>
                          <p className="text-gray-400 text-xs">
                            Last used: {new Date(device.lastUsed).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={() => removeTrustedDevice(device.id)}
                        className="bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white"
                        disabled={isLoading}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Login Activity Tab */}
          {activeTab === 'activity' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">Recent Login Activity</h2>
                <Button
                  onClick={downloadLoginHistory}
                  className="bg-blue-500 hover:bg-blue-600 flex items-center gap-2"
                >
                  <Download size={16} />
                  Download History
                </Button>
              </div>
              
              <div className="space-y-4">
                {settings.loginHistory.map((entry) => (
                  <div key={entry.id} className="bg-gray-700 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${
                          entry.success ? 'bg-green-500/20' : 'bg-red-500/20'
                        }`}>
                          {entry.success ? (
                            <CheckCircle className="text-green-400" size={20} />
                          ) : (
                            <AlertTriangle className="text-red-400" size={20} />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-white font-medium">
                              {entry.success ? 'Successful Login' : 'Failed Login Attempt'}
                            </h3>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              entry.method === 'deriv' ? 'bg-red-500/20 text-red-400' :
                              entry.method === 'passkey' ? 'bg-blue-500/20 text-blue-400' :
                              'bg-gray-500/20 text-gray-400'
                            }`}>
                              {entry.method.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-gray-300 text-sm">
                            {entry.device} • {entry.location} • {entry.ip}
                          </p>
                          <p className="text-gray-400 text-xs">
                            {new Date(entry.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}