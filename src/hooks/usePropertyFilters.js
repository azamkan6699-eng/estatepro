import { useMemo, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { filterProperties } from '../utils/filterProperties'
import { DEFAULT_SORT } from '../utils/constants'

/**
 * Encapsulates all filter state (kept in URL search params) and
 * the derived filtered results for the Properties page.
 *
 * @param {object[]} properties  The full unfiltered dataset
 */
export function usePropertyFilters(properties) {
  const [searchParams, setSearchParams] = useSearchParams()

  const filters = useMemo(() => ({
    search:   searchParams.get('search')   ?? '',
    city:     searchParams.get('city')     ?? '',
    type:     searchParams.get('type')     ?? '',
    minPrice: searchParams.get('minPrice') ?? '',
    maxPrice: searchParams.get('maxPrice') ?? '',
    sort:     searchParams.get('sort')     ?? DEFAULT_SORT,
  }), [searchParams])

  const filtered = useMemo(
    () => filterProperties(properties, filters),
    [properties, filters]
  )

  /** Update one or more filter keys without overwriting unrelated params. */
  const setFilter = useCallback(
    (updates) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev)
        Object.entries(updates).forEach(([key, value]) => {
          if (value === '' || value === null || value === undefined) {
            next.delete(key)
          } else {
            next.set(key, value)
          }
        })
        return next
      }, { replace: true })
    },
    [setSearchParams]
  )

  const clearFilters = useCallback(() => {
    setSearchParams({}, { replace: true })
  }, [setSearchParams])

  const hasActiveFilters = useMemo(() => (
    filters.search || filters.city || filters.type ||
    filters.minPrice || filters.maxPrice ||
    filters.sort !== DEFAULT_SORT
  ), [filters])

  return { filters, filtered, setFilter, clearFilters, hasActiveFilters }
}
