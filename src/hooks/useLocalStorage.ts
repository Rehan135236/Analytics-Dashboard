import { useState, useEffect, useCallback } from 'react'

/**
 * Type-safe custom hook to persist state in the browser's localStorage.
 * Automatically synchronizes changes across tabs and handles serialization errors.
 *
 * @param key The localStorage key
 * @param initialValue The default value if key is not found
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T | (() => T)
): [T, (value: T | ((prev: T) => T)) => void] {
  // Read value from localStorage or fallback to initialValue
  const readValue = useCallback((): T => {
    if (typeof window === 'undefined') {
      return initialValue instanceof Function ? initialValue() : initialValue
    }

    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue instanceof Function ? initialValue() : initialValue
    } catch (error) {
      console.warn(`[useLocalStorage] Error reading key "${key}":`, error)
      return initialValue instanceof Function ? initialValue() : initialValue
    }
  }, [key, initialValue])

  const [storedValue, setStoredValue] = useState<T>(readValue)

  // Setter function that writes to state and localStorage
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        setStoredValue((prev) => {
          const valueToStore = value instanceof Function ? value(prev) : value
          if (typeof window !== 'undefined') {
            window.localStorage.setItem(key, JSON.stringify(valueToStore))
          }
          return valueToStore
        })
      } catch (error) {
        console.warn(`[useLocalStorage] Error setting key "${key}":`, error)
      }
    },
    [key]
  )

  // Listen to storage events to synchronize state across multiple tabs
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue !== null) {
        try {
          setStoredValue(JSON.parse(event.newValue) as T)
        } catch (error) {
          console.warn(`[useLocalStorage] Error parsing cross-tab update for key "${key}":`, error)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key])

  return [storedValue, setValue]
}
