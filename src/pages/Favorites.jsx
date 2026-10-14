import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import properties from '../data/properties.json'
import { useFavorites } from '../hooks/useFavorites'
import { PropertyGrid } from '../components/properties/PropertyGrid'
import { Container } from '../components/common/Container'
import { Button } from '../components/common/Button'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function Favorites() {
  useDocumentTitle('My Favorites')
  const { favoriteIds } = useFavorites()

  // properties is a module-level constant, so favoriteIds is the only real dep
  const savedProperties = useMemo(
    () => properties.filter((p) => favoriteIds.includes(Number(p.id))),
    [favoriteIds]
  )

  return (
    <section aria-labelledby="favorites-heading" className="py-10">
      <Container>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 id="favorites-heading" className="font-display text-3xl font-bold text-gray-900">
              My Favorites
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              {savedProperties.length} saved{' '}
              {savedProperties.length === 1 ? 'property' : 'properties'}
            </p>
          </div>
          {savedProperties.length > 0 && (
            <Button as={Link} to="/properties" variant="secondary" size="sm">
              Browse more
            </Button>
          )}
        </div>

        {savedProperties.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-50">
              <Heart size={28} className="text-rose-300" />
            </div>
            <h2 className="mb-2 text-lg font-semibold text-gray-900">No saved properties yet</h2>
            <p className="mb-6 max-w-xs text-sm text-gray-500">
              Click the heart icon on any property to save it here for later.
            </p>
            <Button as={Link} to="/properties" variant="primary">
              Browse Properties
            </Button>
          </div>
        ) : (
          <PropertyGrid properties={savedProperties} />
        )}
      </Container>
    </section>
  )
}
