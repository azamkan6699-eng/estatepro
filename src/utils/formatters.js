/**
 * Formatting utilities. Keep all display-layer transformations here so
 * components stay free of formatting logic.
 */

/**
 * Formats a number as USD currency.
 * @param {number} price
 * @returns {string} e.g. "$1,250,000"
 */
export function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price)
}

/**
 * Formats an area value with appropriate unit.
 * For land (very large values) it shows acreage instead of sq ft.
 * @param {number} area  Square feet
 * @param {string} type  Property type
 * @returns {string}
 */
export function formatArea(area, type) {
  if (type === 'Land') {
    const acres = (area / 43560).toFixed(2)
    return `${acres} ac`
  }
  return `${area.toLocaleString('en-US')} sq ft`
}

/**
 * Returns a compact area string always in sq ft (used on cards).
 * @param {number} area
 * @returns {string}
 */
export function formatAreaShort(area) {
  if (area >= 1000) {
    return `${(area / 1000).toFixed(1)}k sq ft`
  }
  return `${area} sq ft`
}

/**
 * Formats a date string as a relative time or absolute date.
 * @param {string} isoString
 * @returns {string}
 */
export function formatListedDate(isoString) {
  const date = new Date(isoString)
  const now = new Date()
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 30) return `${diffDays} days ago`
  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30)
    return `${months} month${months > 1 ? 's' : ''} ago`
  }
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}
