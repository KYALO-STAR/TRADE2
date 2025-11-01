'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { BotUploader } from '@/components/bots/BotUploader'
import { BotStrategies } from '@/components/bots/BotStrategies'
import { BotPerformance } from '@/components/bots/BotPerformance'
import { RunningBots } from '@/components/bots/RunningBots'
import { VisualBotEditor } from '@/components/bots/VisualBotEditor'
import { Bot, Upload, Activity, Settings, Zap } from 'lucide-react'
import Header from '@/components/layout/Header'

export default function BotsPage() {
  const [activeTab, setActiveTab] = useState('visual-editor')

  const tabs = [
    { id: 'visual-editor', label: 'Visual Editor', icon: Zap },
    { id: 'strategies', label: 'Bot Strategies', icon: Bot },
    { id: 'upload', label: 'Upload Bot', icon: Upload },
    { id: 'running', label: 'Running Bots', icon: Activity },
    { id: 'performance', label: 'Performance', icon: Settings }
  ]

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Bot Strategy Manager</h1>
          <p className="text-gray-400">Automate your trading with powerful bot strategies</p>
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
        >
          {activeTab === 'visual-editor' && <VisualBotEditor />}
          {activeTab === 'strategies' && <BotStrategies />}
          {activeTab === 'upload' && <BotUploader />}
          {activeTab === 'running' && <RunningBots />}
          {activeTab === 'performance' && <BotPerformance />}
        </motion.div>
      </div>
    </div>
  )
}