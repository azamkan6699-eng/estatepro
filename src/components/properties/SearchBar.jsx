import { Search, X } from 'lucide-react'

/**
 * Text search bar used at the top of the Properties page.
 * Designed to integrate with usePropertyFilters via setFilter('search').
 */
export function SearchBar({ value, onChange, placeholder = 'Search by name or location…' }) {
  return (
    <div className="relative flex-1">
      <label htmlFor="property-search" className="sr-only">
        Search properties
      </label>
      <span aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        <Search size={16} />
      </span>
      <input
        id="property-search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="form-input pl-9 pr-8"
        autoComplete="off"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <X size={14} />
        </button>
      )}
    </div>
  )
}
