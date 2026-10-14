import { createContext, useCallback, useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { FAVORITES_STORAGE_KEY } from '../utils/constants'

export const FavoritesContext = createContext(null)

/**
 * Provides favorites state and actions to the entire component tree.
 * Stores only property IDs in localStorage to keep the payload small.
 */
export function FavoritesProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useLocalStorage(FAVORITES_STORAGE_KEY, [])

  const isFavorite = useCallback(
    (id) => favoriteIds.includes(Number(id)),
    [favoriteIds]
  )

  const toggleFavorite = useCallback(
    (id) => {
      const numId = Number(id)
      setFavoriteIds((prev) =>
        prev.includes(numId) ? prev.filter((i) => i !== numId) : [...prev, numId]
      )
    },
    [setFavoriteIds]
  )

  // Memoised so consumers only re-render when the values actually change
  const value = useMemo(
    () => ({ favoriteIds, isFavorite, toggleFavorite }),
    [favoriteIds, isFavorite, toggleFavorite]
  )

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}
