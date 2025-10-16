/**
 * Authentication hook for managing user state and auth operations
 * Provides centralized auth logic with localStorage persistence
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { User, LoginForm, SignupForm, AuthState } from '@/types';
import { STORAGE_KEYS, SUCCESS_MESSAGES, ERROR_MESSAGES } from '@/lib/constants';
import { useLocalStorage } from './useLocalStorage';

/**
 * Authentication hook providing user state and auth operations
 * Handles login, signup, logout, and session persistence
 */
export function useAuth() {
  const router = useRouter();
  
  // Persistent auth state in localStorage
  const [token, setToken] = useLocalStorage<string | null>(STORAGE_KEYS.AUTH_TOKEN, null);
  const [userData, setUserData] = useLocalStorage<User | null>('user_data', null);
  
  // Local loading and error state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Computed auth state
  const authState: AuthState = {
    user: userData,
    token,
    isLoading,
    error,
  };

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Login function
   */
  const login = useCallback(async (formData: LoginForm) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call - replace with actual API integration
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      
      // Store auth data
      setToken(data.token);
      setUserData(data.user);
      
      toast.success(SUCCESS_MESSAGES.LOGIN_SUCCESS);
      router.push('/dashboard');
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : ERROR_MESSAGES.GENERIC_ERROR;
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [setToken, setUserData, router]);

  /**
   * Signup function
   */
  const signup = useCallback(async (formData: SignupForm) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call - replace with actual API integration
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      const data = await response.json();
      
      // Store auth data
      setToken(data.token);
      setUserData(data.user);
      
      toast.success(SUCCESS_MESSAGES.SIGNUP_SUCCESS);
      router.push('/dashboard');
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : ERROR_MESSAGES.GENERIC_ERROR;
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [setToken, setUserData, router]);

  /**
   * Logout function
   */
  const logout = useCallback(async () => {
    setIsLoading(true);

    try {
      // Optional: Call logout endpoint to invalidate token on server
      if (token) {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }).catch(() => {
          // Ignore logout endpoint errors - still clear local state
        });
      }

      // Clear auth data
      setToken(null);
      setUserData(null);
      setError(null);
      
      toast.success('Logged out successfully');
      router.push('/');
      
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [token, setToken, setUserData, router]);

  /**
   * Update user profile
   */
  const updateProfile = useCallback(async (updates: Partial<User>) => {
    if (!userData || !token) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Profile update failed');
      }

      const updatedUser = await response.json();
      setUserData(updatedUser);
      
      toast.success(SUCCESS_MESSAGES.PROFILE_UPDATED);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : ERROR_MESSAGES.GENERIC_ERROR;
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [userData, token, setUserData]);

  /**
   * Refresh user data
   */
  const refreshUser = useCallback(async () => {
    if (!token) return;

    try {
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const user = await response.json();
        setUserData(user);
      } else if (response.status === 401) {
        // Token is invalid, logout user
        await logout();
      }
    } catch (err) {
      console.error('Failed to refresh user:', err);
    }
  }, [token, setUserData, logout]);

  /**
   * Check if user has a specific role
   */
  const hasRole = useCallback((role: User['role']) => {
    return userData?.role === role;
  }, [userData]);

  /**
   * Check if user is authenticated
   */
  const isAuthenticated = Boolean(token && userData);

  /**
   * Check if user is admin
   */
  const isAdmin = hasRole('admin');

  /**
   * Check if user has premium subscription
   */
  const isPremium = hasRole('premium') || hasRole('admin');

  // Auto-refresh user data on mount if authenticated
  useEffect(() => {
    if (token && userData) {
      refreshUser();
    }
  }, [token, userData, refreshUser]);

  // Auto-logout on token expiration
  useEffect(() => {
    if (!token || !userData) return;

    const checkTokenValidity = async () => {
      try {
        const response = await fetch('/api/auth/verify', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          await logout();
        }
      } catch (err) {
        console.error('Token verification failed:', err);
      }
    };

    // Check token validity every 5 minutes
    const interval = setInterval(checkTokenValidity, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [token, userData, logout]);

  return {
    // Auth state
    ...authState,
    isAuthenticated,
    isAdmin,
    isPremium,
    
    // Auth actions
    login,
    signup,
    logout,
    updateProfile,
    refreshUser,
    clearError,
    hasRole,
  };
}