import { useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { Button } from '../common/Button'
import { FilterFields } from './FilterFields'

/**
 * Collapsible mobile filter drawer. Only visible below md breakpoint.
 * Uses idPrefix="mobile" so its form IDs never clash with FilterSidebar.
 */
export function FilterDrawer(props) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="mobile-filter-drawer"
        className="w-full justify-center"
      >
        <SlidersHorizontal size={15} />
        {open ? 'Hide filters' : 'Show filters'}
        {props.hasActiveFilters && (
          <span
            aria-label="Active filters applied"
            className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white"
          >
            !
          </span>
        )}
      </Button>

      {open && (
        <div
          id="mobile-filter-drawer"
          className="mt-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
        >
          <FilterFields {...props} idPrefix="mobile" />
        </div>
      )}
    </div>
  )
}
