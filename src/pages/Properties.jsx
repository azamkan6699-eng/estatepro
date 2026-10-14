import properties from '../data/properties.json'
import { usePropertyFilters } from '../hooks/usePropertyFilters'
import { getCities, getTypes } from '../utils/filterProperties'
import { Container } from '../components/common/Container'
import { SearchBar } from '../components/properties/SearchBar'
import { FilterSidebar } from '../components/properties/FilterSidebar'
import { FilterDrawer } from '../components/properties/FilterDrawer'
import { PropertyGrid } from '../components/properties/PropertyGrid'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useSEO } from '../hooks/useSEO'

// Derived once at module level — source data is static at runtime.
const cities = getCities(properties)
const types  = getTypes(properties)

export default function Properties() {
  useDocumentTitle('Property Listings')
  useSEO({
    title: 'Property Listings',
    description: 'Search and filter premium real estate listings. Filter by city, property type, and price range.',
    url: '/properties',
  })

  const { filters, filtered, setFilter, clearFilters, hasActiveFilters } =
    usePropertyFilters(properties)

  const filterProps = { filters, setFilter, clearFilters, hasActiveFilters, cities, types }

  return (
    <section aria-labelledby="listings-heading" className="py-10">
      <Container>
        <div className="mb-8">
          <h1 id="listings-heading" className="font-display text-3xl font-bold text-gray-900">
            Property Listings
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Browse our curated selection of premium properties.
          </p>
        </div>

        {/* Search + result count */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <SearchBar
            value={filters.search}
            onChange={(value) => setFilter({ search: value })}
          />
          <p className="shrink-0 text-sm text-gray-500" aria-live="polite" aria-atomic="true">
            <span className="font-semibold text-gray-900">{filtered.length}</span>{' '}
            {filtered.length === 1 ? 'property' : 'properties'} found
          </p>
        </div>

        {/* Mobile: collapsible filter drawer above grid */}
        <div className="mb-5 md:hidden">
          <FilterDrawer {...filterProps} />
        </div>

        {/* Desktop: sticky sidebar + grid */}
        <div className="flex items-start gap-7">
          <FilterSidebar {...filterProps} />
          <div className="min-w-0 flex-1">
            <PropertyGrid
              properties={filtered}
              onClearFilters={clearFilters}
              hasActiveFilters={hasActiveFilters}
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
