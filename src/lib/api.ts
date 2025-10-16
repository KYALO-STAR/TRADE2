/**
 * API utilities for the trading application
 * Handles authentication, data fetching, and error handling
 */

import { toast } from 'react-hot-toast'

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'
const DERIV_APP_ID = process.env.NEXT_PUBLIC_DERIV_APP_ID || '1089'

// Types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface User {
  id: string
  name: string
  email: string
  token: string
  saccoMode?: boolean
  weeklyTips?: boolean
}

export interface TradeData {
  symbol: string
  price: number
  change: number
  changePercent: number
  timestamp: number
}

// Authentication helpers
export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('auth_token')
}

export const setAuthToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token)
  }
}

export const removeAuthToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token')
  }
}

// Generic API request handler
export const apiRequest = async <T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  const url = `${API_BASE_URL}${endpoint}`
  const token = getAuthToken()

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'API request failed')
    }

    return {
      success: true,
      data: data.data || data,
      message: data.message,
    }
  } catch (error) {
    console.error('API request error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    
    toast.error(errorMessage)
    
    return {
      success: false,
      error: errorMessage,
    }
  }
}

// Authentication API
export const authApi = {
  login: async (token: string): Promise<ApiResponse<User>> => {
    const response = await apiRequest<User>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ token }),
    })
    
    if (response.success && response.data) {
      setAuthToken(response.data.token)
    }
    
    return response
  },

  logout: async (): Promise<ApiResponse> => {
    removeAuthToken()
    return { success: true, message: 'Logged out successfully' }
  },

  getProfile: async (): Promise<ApiResponse<User>> => {
    return apiRequest<User>('/auth/profile')
  },

  updateProfile: async (data: Partial<User>): Promise<ApiResponse<User>> => {
    return apiRequest<User>('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },
}

// Trading API
export const tradingApi = {
  getPriceFeeds: async (): Promise<ApiResponse<TradeData[]>> => {
    return apiRequest<TradeData[]>('/trading/prices')
  },

  executeTrade: async (tradeData: {
    symbol: string
    amount: number
    direction: 'up' | 'down'
    duration: number
  }): Promise<ApiResponse> => {
    return apiRequest('/trading/execute', {
      method: 'POST',
      body: JSON.stringify(tradeData),
    })
  },

  getTradeHistory: async (): Promise<ApiResponse> => {
    return apiRequest('/trading/history')
  },

  getAccountSummary: async (): Promise<ApiResponse> => {
    return apiRequest('/trading/account')
  },
}

// Bot API
export const botApi = {
  uploadBot: async (file: File): Promise<ApiResponse> => {
    const formData = new FormData()
    formData.append('botFile', file)

    return apiRequest('/bots/upload', {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    })
  },

  getBots: async (): Promise<ApiResponse> => {
    return apiRequest('/bots')
  },

  startBot: async (botId: string): Promise<ApiResponse> => {
    return apiRequest(`/bots/${botId}/start`, {
      method: 'POST',
    })
  },

  stopBot: async (botId: string): Promise<ApiResponse> => {
    return apiRequest(`/bots/${botId}/stop`, {
      method: 'POST',
    })
  },
}

// Course API
export const courseApi = {
  getModules: async (): Promise<ApiResponse> => {
    return apiRequest('/course/modules')
  },

  completeLesson: async (lessonId: string): Promise<ApiResponse> => {
    return apiRequest(`/course/lessons/${lessonId}/complete`, {
      method: 'POST',
    })
  },

  submitQuiz: async (quizId: string, answers: Record<string, string>): Promise<ApiResponse> => {
    return apiRequest(`/course/quizzes/${quizId}/submit`, {
      method: 'POST',
      body: JSON.stringify({ answers }),
    })
  },

  getProgress: async (): Promise<ApiResponse> => {
    return apiRequest('/course/progress')
  },
}

// Tips API
export const tipsApi = {
  getTips: async (category?: string): Promise<ApiResponse> => {
    const queryParam = category ? `?category=${category}` : ''
    return apiRequest(`/tips${queryParam}`)
  },

  submitTip: async (tip: {
    title: string
    content: string
    category: string
  }): Promise<ApiResponse> => {
    return apiRequest('/tips', {
      method: 'POST',
      body: JSON.stringify(tip),
    })
  },

  likeTip: async (tipId: string): Promise<ApiResponse> => {
    return apiRequest(`/tips/${tipId}/like`, {
      method: 'POST',
    })
  },
}

// Referral API
export const referralApi = {
  getReferralData: async (): Promise<ApiResponse> => {
    return apiRequest('/referrals')
  },

  generateReferralLink: async (): Promise<ApiResponse> => {
    return apiRequest('/referrals/generate-link', {
      method: 'POST',
    })
  },

  requestPayout: async (amount: number, method: string): Promise<ApiResponse> => {
    return apiRequest('/referrals/request-payout', {
      method: 'POST',
      body: JSON.stringify({ amount, method }),
    })
  },
}

// Admin API (restricted access)
export const adminApi = {
  getUsers: async (): Promise<ApiResponse> => {
    return apiRequest('/admin/users')
  },

  getPayoutRequests: async (): Promise<ApiResponse> => {
    return apiRequest('/admin/payouts')
  },

  approvePayoutRequest: async (requestId: string): Promise<ApiResponse> => {
    return apiRequest(`/admin/payouts/${requestId}/approve`, {
      method: 'POST',
    })
  },

  rejectPayoutRequest: async (requestId: string): Promise<ApiResponse> => {
    return apiRequest(`/admin/payouts/${requestId}/reject`, {
      method: 'POST',
    })
  },

  uploadCourseContent: async (content: {
    title: string
    type: string
    module: string
    file?: File
  }): Promise<ApiResponse> => {
    const formData = new FormData()
    Object.entries(content).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, value as string | File)
      }
    })

    return apiRequest('/admin/course-content', {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    })
  },
}

// Deriv WebSocket connection
export class DerivWebSocket {
  private ws: WebSocket | null = null
  private callbacks: Map<string, Function> = new Map()
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5

  constructor() {
    this.connect()
  }

  private connect() {
    try {
      this.ws = new WebSocket(`wss://ws.binaryws.com/websockets/v3?app_id=${DERIV_APP_ID}`)
      
      this.ws.onopen = () => {
        console.log('Deriv WebSocket connected')
        this.reconnectAttempts = 0
      }

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          const msgType = data.msg_type
          
          if (this.callbacks.has(msgType)) {
            this.callbacks.get(msgType)?.(data)
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error)
        }
      }

      this.ws.onclose = () => {
        console.log('Deriv WebSocket disconnected')
        this.attemptReconnect()
      }

      this.ws.onerror = (error) => {
        console.error('Deriv WebSocket error:', error)
      }
    } catch (error) {
      console.error('Failed to connect to Deriv WebSocket:', error)
    }
  }

  private attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      setTimeout(() => {
        console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`)
        this.connect()
      }, 2000 * this.reconnectAttempts)
    }
  }

  public subscribe(msgType: string, callback: Function) {
    this.callbacks.set(msgType, callback)
  }

  public unsubscribe(msgType: string) {
    this.callbacks.delete(msgType)
  }

  public send(message: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message))
    } else {
      console.error('WebSocket is not connected')
    }
  }

  public disconnect() {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
    this.callbacks.clear()
  }
}

// Utility functions
export const formatCurrency = (amount: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

export const formatPercentage = (value: number): string => {
  return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`
}

export const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Input validation utilities
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '')
}

// Error handling utilities
export const handleApiError = (error: any): string => {
  if (error?.response?.data?.message) {
    return error.response.data.message
  }
  if (error?.message) {
    return error.message
  }
  return 'An unexpected error occurred'
}

export default {
  authApi,
  tradingApi,
  botApi,
  courseApi,
  tipsApi,
  referralApi,
  adminApi,
  DerivWebSocket,
  formatCurrency,
  formatPercentage,
  debounce,
  validateEmail,
  sanitizeInput,
  handleApiError,
}