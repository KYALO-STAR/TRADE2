'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react'

export interface Toast {
  id: string
  title: string
  message?: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

interface ToastProps {
  toast: Toast
  onDismiss: (id: string) => void
}

function ToastComponent({ toast, onDismiss }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => onDismiss(toast.id), 300)
    }, toast.duration || 5000)

    return () => clearTimeout(timer)
  }, [toast.id, toast.duration, onDismiss])

  const handleDismiss = () => {
    setIsVisible(false)
    setTimeout(() => onDismiss(toast.id), 300)
  }

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-400" />
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />
      case 'info':
        return <Info className="w-5 h-5 text-blue-400" />
    }
  }

  const getColors = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-green-500/10 border-green-500/20 text-green-400'
      case 'error':
        return 'bg-red-500/10 border-red-500/20 text-red-400'
      case 'warning':
        return 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
      case 'info':
        return 'bg-blue-500/10 border-blue-500/20 text-blue-400'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.9 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        x: isVisible ? 0 : 300,
        scale: isVisible ? 1 : 0.9
      }}
      transition={{ duration: 0.3 }}
      className={`
        relative max-w-sm w-full p-4 rounded-xl border backdrop-blur-sm
        ${getColors()}
        shadow-lg
      `}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold text-sm mb-1">
            {toast.title}
          </h3>
          {toast.message && (
            <p className="text-gray-300 text-sm leading-relaxed">
              {toast.message}
            </p>
          )}
          {toast.action && (
            <button
              onClick={toast.action.onClick}
              className="mt-2 text-xs font-medium underline hover:no-underline transition-all duration-200"
            >
              {toast.action.label}
            </button>
          )}
        </div>

        <button
          onClick={handleDismiss}
          className="flex-shrink-0 text-gray-400 hover:text-white transition-colors duration-200"
          title="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  )
}

interface ToastContainerProps {
  toasts: Toast[]
  onDismiss: (id: string) => void
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-4">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastComponent
            key={toast.id}
            toast={toast}
            onDismiss={onDismiss}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

// Toast management hook
export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const newToast: Toast = {
      ...toast,
      id: Math.random().toString(36).substr(2, 9)
    }
    setToasts(prev => [...prev, newToast])
  }

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  const dismissAll = () => {
    setToasts([])
  }

  // Helper methods
  const success = (title: string, message?: string, options?: Partial<Toast>) => {
    addToast({ ...options, title, message, type: 'success' })
  }

  const error = (title: string, message?: string, options?: Partial<Toast>) => {
    addToast({ ...options, title, message, type: 'error' })
  }

  const warning = (title: string, message?: string, options?: Partial<Toast>) => {
    addToast({ ...options, title, message, type: 'warning' })
  }

  const info = (title: string, message?: string, options?: Partial<Toast>) => {
    addToast({ ...options, title, message, type: 'info' })
  }

  return {
    toasts,
    addToast,
    dismissToast,
    dismissAll,
    success,
    error,
    warning,
    info
  }
}

// Toast context for global access
import { createContext, useContext } from 'react'

const ToastContext = createContext<ReturnType<typeof useToast> | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const toast = useToast()

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ToastContainer toasts={toast.toasts} onDismiss={toast.dismissToast} />
    </ToastContext.Provider>
  )
}

export function useToastContext() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToastContext must be used within ToastProvider')
  }
  return context
}