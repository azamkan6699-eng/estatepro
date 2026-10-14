import { useState, useCallback } from 'react'

/**
 * A useState wrapper that syncs state to localStorage.
 * Handles JSON parse errors gracefully so a corrupted value
 * doesn't crash the app.
 *
 * The setter accepts either a value or an updater function (same API
 * as React's own setState), and avoids stale-closure issues by
 * reading directly from the React state update rather than closing
 * over the current value.
 *
 * @template T
 * @param {string} key
 * @param {T} initialValue
 * @returns {[T, (value: T | ((prev: T) => T)) => void]}
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item !== null ? JSON.parse(item) : initialValue
    } catch {
      // Corrupted data – fall back silently
      return initialValue
    }
  })

  const setValue = useCallback(
    (value) => {
      // Use the functional form of setState so we never close over
      // a stale copy of storedValue, then persist the result.
      setStoredValue((prev) => {
        const next = value instanceof Function ? value(prev) : value
        try {
          window.localStorage.setItem(key, JSON.stringify(next))
        } catch {
          // Storage full or disabled in private-browsing – ignore
        }
        return next
      })
    },
    [key] // key is the only real external dependency
  )

  return [storedValue, setValue]
}
