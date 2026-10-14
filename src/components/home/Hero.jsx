import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ChevronDown } from 'lucide-react'
import { Button } from '../common/Button'
import { PROPERTY_TYPES } from '../../utils/constants'

const PRICE_OPTIONS = [
  { value: '',        label: 'Any price' },
  { value: '500000',  label: 'Up to $500k' },
  { value: '1000000', label: 'Up to $1M' },
  { value: '2000000', label: 'Up to $2M' },
  { value: '5000000', label: 'Up to $5M' },
]

export function Hero() {
  const navigate = useNavigate()
  const [search, setSearch]   = useState('')
  const [type, setType]       = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (search.trim()) params.set('search', search.trim())
    if (type)          params.set('type', type)
    if (maxPrice)      params.set('maxPrice', maxPrice)
    navigate(`/properties?${params.toString()}`)
  }

  return (
    <section
      className="relative flex min-h-[92vh] items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1800&q=80"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Gradient overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-navy-950/85 via-navy-900/70 to-brand-900/50"
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
        {/* Eyebrow */}
        <span className="mb-5 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/80 backdrop-blur-sm">
          Premium Real Estate
        </span>

        {/* Headline */}
        <h1
          id="hero-heading"
          className="font-display mb-5 text-4xl font-bold leading-tight text-white text-balance sm:text-5xl lg:text-6xl"
        >
          Find Your Perfect{' '}
          <span className="text-accent-400">Dream Home</span>
        </h1>

        {/* Sub-headline */}
        <p className="mx-auto mb-10 max-w-xl text-base text-white/75 sm:text-lg">
          Explore thousands of curated properties across the country. Let us
          help you find the home that fits your life.
        </p>

        {/* Quick-search form */}
        <form
          onSubmit={handleSearch}
          aria-label="Quick property search"
          className="mx-auto max-w-3xl rounded-2xl bg-white p-3 shadow-2xl sm:flex sm:gap-2"
        >
          {/* City / keyword */}
          <div className="relative mb-2 flex-1 sm:mb-0">
            <label htmlFor="hero-search" className="sr-only">Search by city or keyword</label>
            <span aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={16} />
            </span>
            <input
              id="hero-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="City, neighbourhood, or keyword…"
              className="form-input pl-9"
            />
          </div>

          {/* Property type */}
          <div className="relative mb-2 sm:mb-0 sm:w-40">
            <label htmlFor="hero-type" className="sr-only">Property type</label>
            <select
              id="hero-type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="form-input appearance-none pr-7"
            >
              <option value="">Any type</option>
              {PROPERTY_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <ChevronDown size={13} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
          </div>

          {/* Max price */}
          <div className="relative mb-2 sm:mb-0 sm:w-36">
            <label htmlFor="hero-price" className="sr-only">Maximum price</label>
            <select
              id="hero-price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="form-input appearance-none pr-7"
            >
              {PRICE_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
            <ChevronDown size={13} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
          </div>

          <Button type="submit" variant="accent" size="md" className="w-full sm:w-auto">
            <Search size={15} />
            Search
          </Button>
        </form>
      </div>
    </section>
  )
}
