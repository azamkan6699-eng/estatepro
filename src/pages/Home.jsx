import properties from '../data/properties.json'
import { Hero } from '../components/home/Hero'
import { FeaturedProperties } from '../components/home/FeaturedProperties'
import { WhyChooseUs } from '../components/home/WhyChooseUs'
import { CTABanner } from '../components/home/CTABanner'
import { useSEO } from '../hooks/useSEO'

// Computed once at module load — source data is static.
const featured = properties.filter((p) => p.featured).slice(0, 6)

export default function Home() {
  useSEO({
    title: 'Find Your Dream Home',
    description: 'Browse thousands of premium properties for sale across the US. Houses, apartments, villas and more — find yours with EstatePro.',
    url: '/',
  })

  return (
    <>
      <Hero />
      <FeaturedProperties properties={featured} />
      <WhyChooseUs />
      <CTABanner />
    </>
  )
}
