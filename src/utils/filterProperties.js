import { DEFAULT_SORT } from './constants'

/**
 * Filters and sorts a properties array based on the given criteria.
 * All active filters combine with AND logic.
 *
 * @param {object[]} properties  Full properties array
 * @param {object}   filters
 * @param {string}   filters.search    - title / address text search
 * @param {string}   filters.city      - exact city match or ''
 * @param {string}   filters.type      - exact property type or ''
 * @param {string}   filters.minPrice  - minimum price (string from URL param)
 * @param {string}   filters.maxPrice  - maximum price (string from URL param)
 * @param {string}   filters.sort      - one of the SORT_OPTIONS values
 * @returns {object[]}
 */
export function filterProperties(properties, filters = {}) {
  const {
    search = '',
    city = '',
    type = '',
    minPrice = '',
    maxPrice = '',
    sort = DEFAULT_SORT,
  } = filters

  const needle = search.toLowerCase().trim()
  const min = minPrice !== '' ? Number(minPrice) : null
  const max = maxPrice !== '' ? Number(maxPrice) : null

  let results = properties.filter((p) => {
    if (needle && !p.title.toLowerCase().includes(needle) && !p.address.toLowerCase().includes(needle) && !p.city.toLowerCase().includes(needle)) {
      return false
    }
    if (city && p.city !== city) return false
    if (type && p.type !== type) return false
    if (min !== null && p.price < min) return false
    if (max !== null && p.price > max) return false
    return true
  })

  switch (sort) {
    case 'price_asc':
      results = [...results].sort((a, b) => a.price - b.price)
      break
    case 'price_desc':
      results = [...results].sort((a, b) => b.price - a.price)
      break
    case 'newest':
    default:
      results = [...results].sort(
        (a, b) => new Date(b.listedAt) - new Date(a.listedAt)
      )
  }

  return results
}

/**
 * Derives the sorted unique city list from the dataset.
 * @param {object[]} properties
 * @returns {string[]}
 */
export function getCities(properties) {
  return [...new Set(properties.map((p) => p.city))].sort()
}

/**
 * Derives the sorted unique property type list from the dataset.
 * @param {object[]} properties
 * @returns {string[]}
 */
export function getTypes(properties) {
  return [...new Set(properties.map((p) => p.type))].sort()
}
