import { useState } from 'react'
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import { Button } from '../common/Button'
import { SORT_OPTIONS } from '../../utils/constants'
import { formatPrice } from '../../utils/formatters'

/**
 * The actual filter controls, extracted as a proper component so that:
 *  - Each instance generates unique IDs via the `idPrefix` prop, avoiding
 *    duplicate-ID violations when both mobile and desktop panels are in the DOM.
 *  - It can be unit-tested in isolation.
 */
function FilterFields({ filters, setFilter, clearFilters, hasActiveFilters, cities, types, idPrefix }) {
  const handleChange = (key) => (e) => setFilter({ [key]: e.target.value })

  const priceLabel =
    filters.minPrice || filters.maxPrice
      ? `${filters.minPrice ? formatPrice(Number(filters.minPrice)) : '$0'} – ${
          filters.maxPrice ? formatPrice(Number(filters.maxPrice)) : 'Any'
        }`
      : null

  return (
    <div className="space-y-5">
      {/* Sort */}
      <div>
        <label htmlFor={`${idPrefix}-sort`} className="form-label">Sort by</label>
        <div className="relative">
          <select
            id={`${idPrefix}-sort`}
            value={filters.sort}
            onChange={handleChange('sort')}
            className="form-input appearance-none pr-8"
          >
            {SORT_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          <ChevronDown size={15} aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* City */}
      <div>
        <label htmlFor={`${idPrefix}-city`} className="form-label">City</label>
        <div className="relative">
          <select
            id={`${idPrefix}-city`}
            value={filters.city}
            onChange={handleChange('city')}
            className="form-input appearance-none pr-8"
          >
            <option value="">All cities</option>
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <ChevronDown size={15} aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Property type */}
      <div>
        <label htmlFor={`${idPrefix}-type`} className="form-label">Property type</label>
        <div className="relative">
          <select
            id={`${idPrefix}-type`}
            value={filters.type}
            onChange={handleChange('type')}
            className="form-input appearance-none pr-8"
          >
            <option value="">All types</option>
            {types.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <ChevronDown size={15} aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Price range */}
      <div>
        <span id={`${idPrefix}-price-label`} className="form-label block">
          Price range
          {priceLabel && (
            <span className="ml-1 font-normal text-brand-600">({priceLabel})</span>
          )}
        </span>
        <div className="flex gap-2" role="group" aria-labelledby={`${idPrefix}-price-label`}>
          <div className="flex-1">
            <label htmlFor={`${idPrefix}-min-price`} className="sr-only">Minimum price</label>
            <input
              id={`${idPrefix}-min-price`}
              type="number"
              min="0"
              step="50000"
              placeholder="Min"
              value={filters.minPrice}
              onChange={handleChange('minPrice')}
              className="form-input"
            />
          </div>
          <div className="flex-1">
            <label htmlFor={`${idPrefix}-max-price`} className="sr-only">Maximum price</label>
            <input
              id={`${idPrefix}-max-price`}
              type="number"
              min="0"
              step="50000"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={handleChange('maxPrice')}
              className="form-input"
            />
          </div>
        </div>
      </div>

      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="w-full justify-center text-red-500 hover:bg-red-50 hover:text-red-600"
        >
          <X size={14} />
          Clear all filters
        </Button>
      )}
    </div>
  )
}

/**
 * Sidebar/drawer filter panel.
 * Renders a mobile collapsible toggle and a sticky desktop sidebar.
 * Each uses a unique `idPrefix` so form control IDs are never duplicated.
 */
export function FilterPanel({ filters, setFilter, clearFilters, hasActiveFilters, cities, types }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const sharedProps = { filters, setFilter, clearFilters, hasActiveFilters, cities, types }

  return (
    <>
      {/* ── Mobile toggle ── */}
      <div className="md:hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setMobileOpen((o) => !o)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-filter-panel"
          className="w-full justify-center"
        >
          <SlidersHorizontal size={15} />
          {mobileOpen ? 'Hide filters' : 'Show filters'}
          {hasActiveFilters && (
            <span
              aria-label="Filters active"
              className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white"
            >
              !
            </span>
          )}
        </Button>

        {mobileOpen && (
          <div
            id="mobile-filter-panel"
            className="mt-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <FilterFields {...sharedProps} idPrefix="mobile" />
          </div>
        )}
      </div>

      {/* ── Desktop sidebar – always visible, sticky ── */}
      <aside
        aria-label="Property filters"
        className="hidden w-64 shrink-0 self-start rounded-xl border border-gray-200 bg-white p-5 shadow-card sticky top-20 md:block"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
            <SlidersHorizontal size={15} aria-hidden="true" />
            Filters
          </h2>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-xs text-red-500 hover:text-red-600 focus-visible:outline-none focus-visible:underline"
            >
              Clear all
            </button>
          )}
        </div>
        <FilterFields {...sharedProps} idPrefix="desktop" />
      </aside>
    </>
  )
}
