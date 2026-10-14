import { SlidersHorizontal } from 'lucide-react'
import { FilterFields } from './FilterFields'

/**
 * Sticky desktop filter sidebar. Hidden on mobile (md:block).
 * Uses idPrefix="desktop" so its form IDs never clash with FilterDrawer.
 */
export function FilterSidebar(props) {
  return (
    <aside
      aria-label="Property filters"
      className="hidden w-64 shrink-0 rounded-xl border border-gray-200 bg-white p-5 shadow-card sticky top-20 md:block"
    >
      <div className="mb-5 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
          <SlidersHorizontal size={15} aria-hidden="true" />
          Filters
        </h2>
        {props.hasActiveFilters && (
          <button
            onClick={props.clearFilters}
            className="text-xs text-red-500 hover:text-red-600 focus-visible:underline focus-visible:outline-none"
          >
            Clear all
          </button>
        )}
      </div>
      <FilterFields {...props} idPrefix="desktop" />
    </aside>
  )
}
