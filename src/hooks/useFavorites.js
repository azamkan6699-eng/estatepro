import { useContext } from 'react'
import { FavoritesContext } from '../context/FavoritesContext'

/**
 * Convenience hook for accessing the favorites context.
 * Throws a clear error if used outside of FavoritesProvider.
 *
 * @returns {{ favoriteIds: number[], isFavorite: (id: number) => boolean, toggleFavorite: (id: number) => void }}
 */
export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}
