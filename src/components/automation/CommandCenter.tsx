'use client'

import { useState } from 'react'
import { Send, Dice1, Calculator, TrendingUp, Settings, Bell, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

interface Command {
  id: string
  command: string
  description: string
  category: 'bot' | 'utility' | 'trading' | 'system'
  usage: string
}

interface Announcement {
  id: string
  title: string
  message: string
  type: 'info' | 'warning' | 'success' | 'update'
  timestamp: Date
}

const COMMANDS: Command[] = [
  // Bot Commands
  { id: '1', command: '/start', description: 'Start the selected bot strategy', category: 'bot', usage: '/start [strategy-name]' },
  { id: '2', command: '/stop', description: 'Stop the currently running bot', category: 'bot', usage: '/stop' },
  { id: '3', command: '/status', description: 'Check bot status and performance', category: 'bot', usage: '/status' },
  { id: '4', command: '/restart', description: 'Restart the bot with current settings', category: 'bot', usage: '/restart' },

  // Utility Commands
  { id: '5', command: '/dice', description: 'Roll a dice (1-6)', category: 'utility', usage: '/dice [sides?]' },
  { id: '6', command: '/random', description: 'Generate random number', category: 'utility', usage: '/random [min] [max]' },
  { id: '7', command: '/convert', description: 'Convert currencies', category: 'utility', usage: '/convert [amount] [from] [to]' },
  { id: '8', command: '/calculate', description: 'Basic math calculations', category: 'utility', usage: '/calculate [expression]' },

  // Trading Commands
  { id: '9', command: '/balance', description: 'Check account balance', category: 'trading', usage: '/balance' },
  { id: '10', command: '/profit', description: 'Show profit/loss summary', category: 'trading', usage: '/profit [period?]' },
  { id: '11', command: '/positions', description: 'List open positions', category: 'trading', usage: '/positions' },

  // System Commands
  { id: '12', command: '/help', description: 'Show all available commands', category: 'system', usage: '/help [command?]' },
  { id: '13', command: '/settings', description: 'Open settings panel', category: 'system', usage: '/settings' },
]

const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: '1',
    title: 'New Bot Strategy Available',
    message: 'Martingale Pro strategy has been updated with improved risk management features.',
    type: 'update',
    timestamp: new Date(Date.now() - 1000 * 60 * 30)
  },
  {
    id: '2',
    title: 'Platform Maintenance',
    message: 'Scheduled maintenance on Sunday 2:00 AM - 4:00 AM UTC. Trading will be temporarily unavailable.',
    type: 'warning',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2)
  },
  {
    id: '3',
    title: 'Performance Improvement',
    message: 'WebSocket connection speed improved by 40%. Enjoy faster price updates!',
    type: 'success',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24)
  }
]

export default function CommandCenter() {
  const [command, setCommand] = useState('')
  const [output, setOutput] = useState<string[]>(['Welcome to DTBot Command Center. Type /help to see available commands.'])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim()
    const [baseCmd, ...args] = trimmedCmd.split(' ')

    let result = ''

    switch (baseCmd) {
      case '/help':
        result = 'Available commands:\n' + COMMANDS.map(c => `${c.command} - ${c.description}`).join('\n')
        break
      case '/dice':
        const sides = args[0] ? parseInt(args[0]) : 6
        const roll = Math.floor(Math.random() * sides) + 1
        result = `🎲 Rolled ${roll} (1-${sides})`
        break
      case '/random':
        const min = parseInt(args[0]) || 1
        const max = parseInt(args[1]) || 100
        const random = Math.floor(Math.random() * (max - min + 1)) + min
        result = `🔢 Random number: ${random} (${min}-${max})`
        break
      case '/calculate':
        try {
          const expression = args.join(' ')
          // Simple calculator (in real app, use a proper math parser)
          const cleanExpr = expression.replace(/[^0-9+\-*/.() ]/g, '')
          const calculated = eval(cleanExpr)
          result = `🧮 ${expression} = ${calculated}`
        } catch {
          result = '❌ Invalid expression'
        }
        break
      case '/status':
        result = '🤖 Bot Status: Running | Strategy: Martingale Pro | Profit: +$127.50 | Win Rate: 68%'
        break
      case '/balance':
        result = '💰 Account Balance: $1,250.75 | Available: $1,100.25 | In Use: $150.50'
        break
      case '/start':
        const strategy = args[0] || 'default'
        result = `🚀 Starting bot with ${strategy} strategy...`
        break
      case '/stop':
        result = '⏹️ Bot stopped successfully'
        break
      default:
        result = `❌ Unknown command: ${baseCmd}. Type /help for available commands.`
    }

    setOutput(prev => [...prev, `> ${trimmedCmd}`, result])
    setCommand('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (command.trim()) {
      executeCommand(command)
    }
  }

  const filteredCommands = selectedCategory === 'all' 
    ? COMMANDS 
    : COMMANDS.filter(cmd => cmd.category === selectedCategory)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'bot': return <Zap className="w-4 h-4" />
      case 'utility': return <Calculator className="w-4 h-4" />
      case 'trading': return <TrendingUp className="w-4 h-4" />
      case 'system': return <Settings className="w-4 h-4" />
      default: return <Send className="w-4 h-4" />
    }
  }

  const getAnnouncementIcon = (type: string) => {
    switch (type) {
      case 'success': return '✅'
      case 'warning': return '⚠️'
      case 'update': return '🔄'
      default: return 'ℹ️'
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Automation Command Center</h1>
          <p className="text-gray-400">Control your trading bots and utilities with slash commands</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Command Terminal */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg border border-gray-700">
              <div className="p-4 border-b border-gray-700">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Send className="w-5 h-5 text-green-400" />
                  Command Terminal
                </h2>
              </div>

              {/* Output Area */}
              <div className="p-4 h-96 overflow-y-auto bg-gray-900 font-mono text-sm">
                {output.map((line, index) => (
                  <div
                    key={index}
                    className={line.startsWith('>') ? 'text-green-400 mb-1' : 'text-gray-300 mb-2'}
                  >
                    {line}
                  </div>
                ))}
              </div>

              {/* Command Input */}
              <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    placeholder="Type a command (e.g., /help, /dice, /status)..."
                    className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Command Reference */}
            <div className="bg-gray-800 rounded-lg border border-gray-700">
              <div className="p-4 border-b border-gray-700">
                <h3 className="text-lg font-semibold text-white">Command Reference</h3>
              </div>

              {/* Category Filter */}
              <div className="p-4 border-b border-gray-700">
                <div className="flex flex-wrap gap-2">
                  {['all', 'bot', 'utility', 'trading', 'system'].map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 transition-colors ${
                        selectedCategory === category
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {category !== 'all' && getCategoryIcon(category)}
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Commands List */}
              <div className="p-4 max-h-96 overflow-y-auto">
                <div className="space-y-3">
                  {filteredCommands.map((cmd) => (
                    <motion.div
                      key={cmd.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border border-gray-700 rounded-lg p-3 hover:border-gray-600 transition-colors cursor-pointer"
                      onClick={() => setCommand(cmd.command)}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {getCategoryIcon(cmd.category)}
                        <code className="text-green-400 font-mono">{cmd.command}</code>
                      </div>
                      <p className="text-gray-300 text-sm mb-1">{cmd.description}</p>
                      <p className="text-gray-500 text-xs font-mono">{cmd.usage}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Announcements */}
            <div className="bg-gray-800 rounded-lg border border-gray-700">
              <div className="p-4 border-b border-gray-700">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Bell className="w-5 h-5 text-blue-400" />
                  Announcements
                </h3>
              </div>

              <div className="p-4 max-h-80 overflow-y-auto">
                <div className="space-y-3">
                  {MOCK_ANNOUNCEMENTS.map((announcement) => (
                    <div
                      key={announcement.id}
                      className="border border-gray-700 rounded-lg p-3"
                    >
                      <div className="flex items-start gap-2 mb-2">
                        <span className="text-lg">{getAnnouncementIcon(announcement.type)}</span>
                        <div className="flex-1">
                          <h4 className="text-white font-medium text-sm">{announcement.title}</h4>
                          <p className="text-gray-300 text-xs mt-1">{announcement.message}</p>
                          <p className="text-gray-500 text-xs mt-2">
                            {announcement.timestamp.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}