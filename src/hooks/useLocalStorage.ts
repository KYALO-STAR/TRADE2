/**
 * Custom hook for managing localStorage with TypeScript support
 * Provides a React state-like interface for localStorage values
 */

'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for managing localStorage values with React state
 * @param key - localStorage key
 * @param initialValue - Initial value if key doesn't exist
 * @returns [value, setValue, removeValue]
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  // State to store the current value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Only access localStorage on the client side
      if (typeof window === 'undefined') {
        return initialValue;
      }

      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  /**
   * Set value in localStorage and update state
   */
  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    try {
      // Allow value to be a function for functional updates
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Update state
      setStoredValue(valueToStore);
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        
        // Dispatch custom event for cross-tab synchronization
        window.dispatchEvent(
          new StorageEvent('storage', {
            key,
            newValue: JSON.stringify(valueToStore),
            storageArea: window.localStorage,
          })
        );
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  /**
   * Remove value from localStorage
   */
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
        
        // Dispatch custom event for cross-tab synchronization
        window.dispatchEvent(
          new StorageEvent('storage', {
            key,
            newValue: null,
            storageArea: window.localStorage,
          })
        );
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Listen for changes in localStorage (cross-tab synchronization)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.storageArea === localStorage) {
        try {
          setStoredValue(e.newValue ? JSON.parse(e.newValue) : initialValue);
        } catch (error) {
          console.error(`Error parsing localStorage value for key "${key}":`, error);
          setStoredValue(initialValue);
        }
      }
    };

    // Only add event listener on client side
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}

/**
 * Hook for managing boolean values in localStorage
 */
export function useLocalStorageBoolean(
  key: string,
  initialValue: boolean = false
): [boolean, (value: boolean) => void, () => void] {
  return useLocalStorage<boolean>(key, initialValue);
}

/**
 * Hook for managing string values in localStorage
 */
export function useLocalStorageString(
  key: string,
  initialValue: string = ''
): [string, (value: string) => void, () => void] {
  return useLocalStorage<string>(key, initialValue);
}

/**
 * Hook for managing number values in localStorage
 */
export function useLocalStorageNumber(
  key: string,
  initialValue: number = 0
): [number, (value: number) => void, () => void] {
  return useLocalStorage<number>(key, initialValue);
}

/**
 * Hook for managing object values in localStorage
 */
export function useLocalStorageObject<T extends Record<string, any>>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  return useLocalStorage<T>(key, initialValue);
}