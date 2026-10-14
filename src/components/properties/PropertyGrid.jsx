import { PropertyCard } from './PropertyCard'
import { EmptyState } from '../common/EmptyState'
import { Button } from '../common/Button'
import { Link } from 'react-router-dom'

/**
 * Responsive property grid.
 * Handles empty state with a contextual message.
 */
export function PropertyGrid({ properties, onClearFilters, hasActiveFilters }) {
  if (properties.length === 0) {
    return (
      <EmptyState
        title="No properties found"
        description={
          hasActiveFilters
            ? 'Try adjusting your search criteria or clearing the filters.'
            : 'No properties are listed at this time. Check back soon.'
        }
        action={
          hasActiveFilters ? (
            <Button variant="secondary" size="sm" onClick={onClearFilters}>
              Clear all filters
            </Button>
          ) : (
            <Button variant="secondary" size="sm" as={Link} to="/">
              Back to Home
            </Button>
          )
        }
      />
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  )
}
