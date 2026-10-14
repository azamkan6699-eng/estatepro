import { Link } from 'react-router-dom'
import { ArrowRight, Phone } from 'lucide-react'
import { Button } from '../common/Button'
import { Container } from '../common/Container'
import { AGENCY_INFO } from '../../utils/constants'

export function CTABanner() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="relative overflow-hidden bg-brand-700 py-20"
    >
      {/* Decorative circles */}
      <span
        aria-hidden="true"
        className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand-600/40"
      />
      <span
        aria-hidden="true"
        className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-brand-800/50"
      />

      <Container className="relative z-10 text-center">
        <h2
          id="cta-heading"
          className="font-display mb-4 text-3xl font-bold text-white sm:text-4xl"
        >
          Ready to Find Your Dream Home?
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-base text-brand-200">
          Browse thousands of premium listings or speak directly with one of our expert agents today.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button as={Link} to="/properties" variant="accent" size="lg">
            Browse Listings
            <ArrowRight size={16} />
          </Button>
          <Button
            as="a"
            href={`tel:${AGENCY_INFO.phone}`}
            variant="secondary"
            size="lg"
            className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
          >
            <Phone size={16} />
            Call Us Now
          </Button>
        </div>
      </Container>
    </section>
  )
}
