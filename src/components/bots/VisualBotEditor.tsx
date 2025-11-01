'use client'

import React, { useState, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  Play, 
  Square, 
  Download, 
  Upload, 
  Zap, 
  Target, 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  Clock,
  DollarSign,
  Settings,
  Plus,
  Trash2,
  Copy
} from 'lucide-react'

interface BotBlock {
  id: string
  type: 'condition' | 'action' | 'logic' | 'indicator'
  title: string
  icon: React.ReactNode
  color: string
  x: number
  y: number
  inputs: { [key: string]: any }
  connections: string[]
}

interface Connection {
  from: string
  to: string
  fromPort: string
  toPort: string
}

const blockTemplates = {
  conditions: [
    { type: 'price_above', title: 'Price Above', icon: <TrendingUp size={16} />, color: 'bg-blue-500' },
    { type: 'price_below', title: 'Price Below', icon: <TrendingDown size={16} />, color: 'bg-red-500' },
    { type: 'rsi_above', title: 'RSI Above', icon: <BarChart3 size={16} />, color: 'bg-purple-500' },
    { type: 'time_condition', title: 'Time Condition', icon: <Clock size={16} />, color: 'bg-orange-500' }
  ],
  actions: [
    { type: 'buy_action', title: 'Buy Trade', icon: <TrendingUp size={16} />, color: 'bg-green-500' },
    { type: 'sell_action', title: 'Sell Trade', icon: <TrendingDown size={16} />, color: 'bg-red-500' },
    { type: 'close_trade', title: 'Close Trade', icon: <Square size={16} />, color: 'bg-gray-500' },
    { type: 'set_stake', title: 'Set Stake', icon: <DollarSign size={16} />, color: 'bg-yellow-500' }
  ],
  logic: [
    { type: 'and_gate', title: 'AND Gate', icon: <Zap size={16} />, color: 'bg-cyan-500' },
    { type: 'or_gate', title: 'OR Gate', icon: <Zap size={16} />, color: 'bg-indigo-500' },
    { type: 'not_gate', title: 'NOT Gate', icon: <Zap size={16} />, color: 'bg-pink-500' },
    { type: 'delay', title: 'Delay', icon: <Clock size={16} />, color: 'bg-teal-500' }
  ]
}

export function VisualBotEditor() {
  const [blocks, setBlocks] = useState<BotBlock[]>([])
  const [connections, setConnections] = useState<Connection[]>([])
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null)
  const [draggedBlock, setDraggedBlock] = useState<string | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)

  const addBlock = useCallback((template: any, x: number = 100, y: number = 100) => {
    const newBlock: BotBlock = {
      id: `block_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: template.type.includes('condition') ? 'condition' : 
            template.type.includes('action') ? 'action' : 'logic',
      title: template.title,
      icon: template.icon,
      color: template.color,
      x,
      y,
      inputs: {},
      connections: []
    }
    
    setBlocks(prev => [...prev, newBlock])
  }, [])

  const deleteBlock = useCallback((blockId: string) => {
    setBlocks(prev => prev.filter(b => b.id !== blockId))
    setConnections(prev => prev.filter(c => c.from !== blockId && c.to !== blockId))
  }, [])

  const duplicateBlock = useCallback((blockId: string) => {
    const block = blocks.find(b => b.id === blockId)
    if (block) {
      const newBlock = {
        ...block,
        id: `block_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        x: block.x + 20,
        y: block.y + 20,
        connections: []
      }
      setBlocks(prev => [...prev, newBlock])
    }
  }, [blocks])

  const exportBot = () => {
    const botData = {
      blocks,
      connections,
      metadata: {
        name: 'Custom Bot',
        created: new Date().toISOString(),
        version: '1.0.0'
      }
    }
    
    const blob = new Blob([JSON.stringify(botData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'trading_bot.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const importBot = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const botData = JSON.parse(e.target?.result as string)
          setBlocks(botData.blocks || [])
          setConnections(botData.connections || [])
        } catch (error) {
          console.error('Error importing bot:', error)
        }
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className="h-screen bg-gray-900 flex">
      {/* Toolbar */}
      <div className="w-80 bg-gray-800 border-r border-gray-700 p-4 overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Visual Bot Builder</h2>
          
          {/* Controls */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                isRunning 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              {isRunning ? <Square size={16} /> : <Play size={16} />}
              {isRunning ? 'Stop' : 'Start'}
            </button>
            
            <button
              onClick={exportBot}
              className="flex items-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-all"
            >
              <Download size={16} />
              Export
            </button>
            
            <label className="flex items-center gap-2 px-3 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg text-sm font-medium transition-all cursor-pointer">
              <Upload size={16} />
              Import
              <input
                type="file"
                accept=".json"
                onChange={importBot}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Block Categories */}
        {Object.entries(blockTemplates).map(([category, templates]) => (
          <div key={category} className="mb-6">
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wide mb-3">
              {category}
            </h3>
            <div className="space-y-2">
              {templates.map((template, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`${template.color} p-3 rounded-lg cursor-pointer flex items-center gap-3 text-white hover:opacity-90 transition-all`}
                  onClick={() => addBlock(template)}
                >
                  {template.icon}
                  <span className="text-sm font-medium">{template.title}</span>
                  <Plus size={14} className="ml-auto" />
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Canvas */}
      <div className="flex-1 relative overflow-hidden">
        <div 
          ref={canvasRef}
          className="w-full h-full bg-gray-900 relative"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(55, 65, 81, 0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}
        >
          {/* Blocks */}
          {blocks.map((block) => (
            <motion.div
              key={block.id}
              drag
              dragMomentum={false}
              className={`absolute ${block.color} rounded-lg p-4 min-w-[200px] cursor-move shadow-lg border-2 ${
                selectedBlock === block.id ? 'border-yellow-400' : 'border-transparent'
              }`}
              style={{ left: block.x, top: block.y }}
              onClick={() => setSelectedBlock(block.id)}
              whileHover={{ scale: 1.02 }}
              whileDrag={{ scale: 1.05, zIndex: 1000 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-white">
                  {block.icon}
                  <span className="font-medium text-sm">{block.title}</span>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      duplicateBlock(block.id)
                    }}
                    className="p-1 hover:bg-white/20 rounded text-white"
                  >
                    <Copy size={12} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteBlock(block.id)
                    }}
                    className="p-1 hover:bg-white/20 rounded text-white"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
              
              {/* Input/Output Ports */}
              <div className="flex justify-between items-center">
                <div className="w-3 h-3 bg-gray-300 rounded-full border-2 border-gray-600"></div>
                <div className="text-xs text-white/80">ID: {block.id.slice(-6)}</div>
                <div className="w-3 h-3 bg-gray-300 rounded-full border-2 border-gray-600"></div>
              </div>
            </motion.div>
          ))}

          {/* Instructions */}
          {blocks.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <Target size={48} className="mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2">Start Building Your Bot</h3>
                <p className="text-sm">Drag blocks from the left panel to create your trading strategy</p>
              </div>
            </div>
          )}
        </div>

        {/* Status Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <span className="text-gray-400">Blocks: {blocks.length}</span>
              <span className="text-gray-400">Connections: {connections.length}</span>
              {selectedBlock && (
                <span className="text-yellow-400">Selected: {blocks.find(b => b.id === selectedBlock)?.title}</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-green-400' : 'bg-gray-400'}`}></div>
              <span className="text-gray-400">{isRunning ? 'Running' : 'Stopped'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}