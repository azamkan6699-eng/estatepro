import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PropertyCard } from '../properties/PropertyCard'
import { Container } from '../common/Container'

export function FeaturedProperties({ properties }) {
  return (
    <section aria-labelledby="featured-heading" className="py-20 bg-white">
      <Container>
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-600">
              Hand-picked for you
            </p>
            <h2
              id="featured-heading"
              className="font-display text-3xl font-bold text-gray-900 sm:text-4xl"
            >
              Featured Properties
            </h2>
          </div>
          <Link
            to="/properties"
            className="flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-800"
          >
            View all listings
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </Container>
    </section>
  )
}
