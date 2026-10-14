import { ChevronDown, X } from 'lucide-react'
import { Button } from '../common/Button'
import { SORT_OPTIONS } from '../../utils/constants'
import { formatPrice } from '../../utils/formatters'

/**
 * The shared filter form controls.
 * Accepts an `idPrefix` prop so mobile and desktop instances
 * never produce duplicate HTML id attributes in the same document.
 *
 * @param {object}   props
 * @param {object}   props.filters
 * @param {Function} props.setFilter
 * @param {Function} props.clearFilters
 * @param {boolean}  props.hasActiveFilters
 * @param {string[]} props.cities
 * @param {string[]} props.types
 * @param {string}   props.idPrefix  - 'mobile' | 'desktop'
 */
export function FilterFields({
  filters,
  setFilter,
  clearFilters,
  hasActiveFilters,
  cities,
  types,
  idPrefix,
}) {
  const handle = (key) => (e) => setFilter({ [key]: e.target.value })

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
            onChange={handle('sort')}
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
            onChange={handle('city')}
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
            onChange={handle('type')}
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
      <fieldset>
        <legend className="form-label">
          Price range
          {priceLabel && (
            <span className="ml-1 font-normal text-brand-600">({priceLabel})</span>
          )}
        </legend>
        <div className="flex gap-2 mt-1">
          <div className="flex-1">
            <label htmlFor={`${idPrefix}-min-price`} className="sr-only">Minimum price</label>
            <input
              id={`${idPrefix}-min-price`}
              type="number"
              min="0"
              step="50000"
              placeholder="Min $"
              value={filters.minPrice}
              onChange={handle('minPrice')}
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
              placeholder="Max $"
              value={filters.maxPrice}
              onChange={handle('maxPrice')}
              className="form-input"
            />
          </div>
        </div>
      </fieldset>

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
