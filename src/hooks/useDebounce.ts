import { useState, useEffect } from 'react'

/**
 * Custom hook that delays updating a value until after a specified delay period.
 * Frequently used for search inputs to prevent excessive API requests or expensive filter computations.
 *
 * @param value The value to be debounced (string, number, object, etc.)
 * @param delay The delay in milliseconds (defaults to 400ms)
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delay: number = 400): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    // Schedule a timer to update debouncedValue after delay ms
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Cleanup function: clears the timer if value changes before the delay completes
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

