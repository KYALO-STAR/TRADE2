'use client';

import { useState, useEffect } from 'react';

export interface User {
  id: string
  fullName: string
  email: string
  role: 'user' | 'admin'
  accountType: 'individual' | 'sacco'
  saccoName?: string
  derivToken: string
  isAuthenticated: boolean
  createdAt: string
  updatedAt: string
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
}

export class AuthService {
  private static instance: AuthService
  private user: User | null = null
  private listeners: ((user: User | null) => void)[] = []

  private constructor() {
    // Initialize from localStorage if available
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user')
      if (userData) {
        try {
          this.user = JSON.parse(userData)
        } catch (error) {
          console.error('Failed to parse user data:', error)
          localStorage.removeItem('user')
        }
      }
    }
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  public getCurrentUser(): User | null {
    return this.user
  }

  public isAuthenticated(): boolean {
    return this.user !== null && this.user.isAuthenticated
  }

  public async signIn(email: string, password: string): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Demo authentication - in production, validate against backend
    if (email === 'admin@example.com' && password === 'password123') {
      const user: User = {
        id: 'admin-user-456',
        fullName: 'Admin User',
        email,
        role: 'admin',
        accountType: 'individual',
        derivToken: 'AdminT0k3n123456',
        isAuthenticated: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      this.setUser(user)
      return user
    }

    if (email === 'demo@example.com' && password === 'password123') {
      const user: User = {
        id: 'demo-user-123',
        fullName: 'Demo User',
        email,
        role: 'user',
        accountType: 'individual',
        derivToken: 'DemoT0k3n987654',
        isAuthenticated: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      this.setUser(user)
      return user
    } else {
      throw new Error('Invalid credentials')
    }
  }

  public async signUp(userData: {
    fullName: string
    email: string
    password: string
    derivToken: string
    accountType: 'individual' | 'sacco'
    saccoName?: string
  }): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    const user: User = {
      id: `user_${Date.now()}`,
      fullName: userData.fullName,
      email: userData.email,
      role: 'user', // Default role
      accountType: userData.accountType,
      saccoName: userData.saccoName,
      derivToken: userData.derivToken,
      isAuthenticated: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    this.setUser(user)
    return user
  }

  public async signOut(): Promise<void> {
    this.setUser(null)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user')
    }
  }

  public async updateUser(updates: Partial<User>): Promise<User> {
    if (!this.user) {
      throw new Error('No user authenticated')
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))

    const updatedUser: User = {
      ...this.user,
      ...updates,
      updatedAt: new Date().toISOString()
    }

    this.setUser(updatedUser)
    return updatedUser
  }

  public subscribe(callback: (user: User | null) => void): () => void {
    this.listeners.push(callback)
    
    // Immediately call with current state
    callback(this.user)
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback)
    }
  }

  private setUser(user: User | null): void {
    this.user = user
    
    // Persist to localStorage
    if (typeof window !== 'undefined') {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user))
      } else {
        localStorage.removeItem('user')
      }
    }

    // Notify listeners
    this.listeners.forEach(listener => listener(user))
  }

  // Helper method to get user's display name
  public getDisplayName(): string {
    if (!this.user) return 'Guest'
    
    if (this.user.accountType === 'sacco' && this.user.saccoName) {
      return `${this.user.fullName} (${this.user.saccoName})`
    }
    
    return this.user.fullName
  }

  // Helper method to check if user is SACCO member
  public isSaccoMember(): boolean {
    return this.user?.accountType === 'sacco'
  }

  // Security helpers
  public validateDerivToken(token: string): boolean {
    // Validate Deriv API token format based on actual tokens
    // Example valid token: UhbS0Rzgia3U7fT (16 chars, alphanumeric only)
    if (!token || typeof token !== 'string') return false
    
    // Deriv API tokens are typically 15-20 characters, alphanumeric only
    const derivTokenPattern = /^[a-zA-Z0-9]{15,20}$/
    return derivTokenPattern.test(token)
  }

  public async refreshToken(): Promise<string> {
    if (!this.user) {
      throw new Error('No user authenticated')
    }

    // Simulate token refresh API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const newToken = `refreshed_${Date.now()}`
    await this.updateUser({ derivToken: newToken })
    
    return newToken
  }
}

// Export singleton instance
export const authService = AuthService.getInstance()

// React hook for auth state
export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: authService.getCurrentUser(),
    isLoading: false,
    error: null
  })

  useEffect(() => {
    const unsubscribe = authService.subscribe((user) => {
      setAuthState(prev => ({ ...prev, user, error: null }))
    })

    return unsubscribe
  }, [])

  const signIn = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }))
    try {
      const user = await authService.signIn(email, password)
      setAuthState(prev => ({ ...prev, user, isLoading: false }))
      return user
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Sign in failed'
      setAuthState(prev => ({ ...prev, error: errorMessage, isLoading: false }))
      throw error
    }
  }

  const signUp = async (userData: Parameters<typeof authService.signUp>[0]) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }))
    try {
      const user = await authService.signUp(userData)
      setAuthState(prev => ({ ...prev, user, isLoading: false }))
      return user
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Sign up failed'
      setAuthState(prev => ({ ...prev, error: errorMessage, isLoading: false }))
      throw error
    }
  }

  const signOut = async () => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }))
    try {
      await authService.signOut()
      setAuthState(prev => ({ ...prev, user: null, isLoading: false }))
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Sign out failed'
      setAuthState(prev => ({ ...prev, error: errorMessage, isLoading: false }))
    }
  }

  const updateUser = async (updates: Partial<User>) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }))
    try {
      const user = await authService.updateUser(updates)
      setAuthState(prev => ({ ...prev, user, isLoading: false }))
      return user
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Update failed'
      setAuthState(prev => ({ ...prev, error: errorMessage, isLoading: false }))
      throw error
    }
  }

  return {
    ...authState,
    signIn,
    signUp,
    signOut,
    updateUser,
    isAuthenticated: authService.isAuthenticated(),
    isSaccoMember: authService.isSaccoMember(),
    getDisplayName: authService.getDisplayName
  }
}