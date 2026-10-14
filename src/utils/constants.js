/** Application-wide constants. Import from here rather than scattering magic values. */

export const SITE_NAME = 'EstatePro'

export const PROPERTY_TYPES = ['House', 'Apartment', 'Villa', 'Commercial', 'Land']

export const SORT_OPTIONS = [
  { value: 'newest',     label: 'Newest' },
  { value: 'price_asc',  label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
]

export const DEFAULT_SORT = 'newest'

/** Contact page agency details */
export const AGENCY_INFO = {
  name: 'EstatePro Realty Group',
  address: '350 Fifth Avenue, Suite 4800, New York, NY 10118',
  phone: '+1 (212) 555-0178',
  email: 'hello@estatepro.com',
  hours: 'Mon–Fri: 8:00 AM – 7:00 PM · Sat: 9:00 AM – 5:00 PM',
}

/** Placeholder image shown when a property image fails to load */
export const IMAGE_FALLBACK =
  'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=60'

/** localStorage key used for the favorites list */
export const FAVORITES_STORAGE_KEY = 'ep_favorites'

/** Simulated form-submission delay (ms) */
export const SUBMIT_DELAY_MS = 1200
