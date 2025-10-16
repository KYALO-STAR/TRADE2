'use client'

import { useState, useEffect } from 'react'
import { Eye, EyeOff, Type, Zap } from 'lucide-react'

interface SACCOMode {
  enabled: boolean
  fontSize: 'normal' | 'large' | 'extra-large'
  simplifiedNav: boolean
  highContrast: boolean
  reducedMotion: boolean
}

export default function SACCOToggle() {
  const [saccoMode, setSaccoMode] = useState<SACCOMode>({
    enabled: false,
    fontSize: 'normal',
    simplifiedNav: true,
    highContrast: false,
    reducedMotion: false
  })
  
  const [isExpanded, setIsExpanded] = useState(false)

  // Load settings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('sacco-mode')
    if (saved) {
      const parsed = JSON.parse(saved)
      setSaccoMode(parsed)
      applySettings(parsed)
    }
  }, [])

  // Apply settings to document
  const applySettings = (settings: SACCOMode) => {
    const root = document.documentElement
    
    if (settings.enabled) {
      // Font size
      switch (settings.fontSize) {
        case 'large':
          root.style.fontSize = '18px'
          break
        case 'extra-large':
          root.style.fontSize = '20px'
          break
        default:
          root.style.fontSize = '16px'
      }
      
      // High contrast
      if (settings.highContrast) {
        root.classList.add('high-contrast')
      } else {
        root.classList.remove('high-contrast')
      }
      
      // Reduced motion
      if (settings.reducedMotion) {
        root.classList.add('reduce-motion')
      } else {
        root.classList.remove('reduce-motion')
      }
      
      root.classList.add('sacco-mode')
    } else {
      root.style.fontSize = '16px'
      root.classList.remove('high-contrast', 'reduce-motion', 'sacco-mode')
    }
  }

  const updateSetting = (key: keyof SACCOMode, value: any) => {
    const newSettings = { ...saccoMode, [key]: value }
    setSaccoMode(newSettings)
    localStorage.setItem('sacco-mode', JSON.stringify(newSettings))
    applySettings(newSettings)
  }

  return (
    <div className="fixed top-20 right-4 z-40">
      <div className={`bg-gray-800 border border-gray-700 rounded-lg shadow-lg transition-all duration-300 ${
        isExpanded ? 'w-80' : 'w-12'
      }`}>
        {/* Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          title="SACCO Accessibility Options"
        >
          <Eye className="w-5 h-5" />
        </button>

        {/* Settings Panel */}
        {isExpanded && (
          <div className="p-4 border-t border-gray-700">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Eye className="w-4 h-4" />
              SACCO-Friendly Mode
            </h3>

            {/* Main Toggle */}
            <div className="mb-4">
              <label className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Enable SACCO Mode</span>
                <button
                  onClick={() => updateSetting('enabled', !saccoMode.enabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    saccoMode.enabled ? 'bg-green-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      saccoMode.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </label>
            </div>

            {saccoMode.enabled && (
              <div className="space-y-4">
                {/* Font Size */}
                <div>
                  <label className="block text-gray-300 text-sm mb-2">
                    <Type className="w-4 h-4 inline mr-1" />
                    Font Size
                  </label>
                  <select
                    value={saccoMode.fontSize}
                    onChange={(e) => updateSetting('fontSize', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-1 text-white text-sm"
                  >
                    <option value="normal">Normal (16px)</option>
                    <option value="large">Large (18px)</option>
                    <option value="extra-large">Extra Large (20px)</option>
                  </select>
                </div>

                {/* High Contrast */}
                <div>
                  <label className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">High Contrast</span>
                    <button
                      onClick={() => updateSetting('highContrast', !saccoMode.highContrast)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                        saccoMode.highContrast ? 'bg-green-600' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                          saccoMode.highContrast ? 'translate-x-5' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </label>
                </div>

                {/* Reduced Motion */}
                <div>
                  <label className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">Reduced Motion</span>
                    <button
                      onClick={() => updateSetting('reducedMotion', !saccoMode.reducedMotion)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                        saccoMode.reducedMotion ? 'bg-green-600' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                          saccoMode.reducedMotion ? 'translate-x-5' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </label>
                </div>

                {/* Simplified Navigation */}
                <div>
                  <label className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">Simplified Navigation</span>
                    <button
                      onClick={() => updateSetting('simplifiedNav', !saccoMode.simplifiedNav)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                        saccoMode.simplifiedNav ? 'bg-green-600' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                          saccoMode.simplifiedNav ? 'translate-x-5' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </label>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}