import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  Bed, Bath, Maximize2, Calendar, MapPin, Heart,
  CheckCircle2, ArrowLeft, Home
} from 'lucide-react'
import properties from '../data/properties.json'
import { ImageGallery } from '../components/properties/ImageGallery'
import { ContactForm } from '../components/contact/ContactForm'
import { Badge } from '../components/common/Badge'
import { Button } from '../components/common/Button'
import { Container } from '../components/common/Container'
import { useFavorites } from '../hooks/useFavorites'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useSEO } from '../hooks/useSEO'
import { formatPrice, formatArea, formatListedDate } from '../utils/formatters'

export default function PropertyDetails() {
  const { id } = useParams()
  const { isFavorite, toggleFavorite } = useFavorites()

  // properties is static at module level, so id is the only real dep
  const property = useMemo(
    () => properties.find((p) => String(p.id) === String(id)),
    [id]
  )

  useDocumentTitle(property ? property.title : 'Property Not Found')
  useSEO(property ? {
    title: property.title,
    description: `${property.type} in ${property.city}. ${property.bedrooms > 0 ? `${property.bedrooms} bed, ` : ''}${property.bathrooms > 0 ? `${property.bathrooms} bath. ` : ''}${formatPrice(property.price)}. ${property.description.slice(0, 100)}…`,
    image: property.images?.[0],
    url: `/properties/${property.id}`,
    type: 'article',
  } : { title: 'Property Not Found', url: `/properties/${id}` })

  if (!property) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <Home size={48} className="mb-4 text-gray-300" />
        <h1 className="mb-2 text-2xl font-bold text-gray-900">Property Not Found</h1>
        <p className="mb-6 text-gray-500">
          The property you're looking for doesn't exist or may have been removed.
        </p>
        <Button as={Link} to="/properties" variant="primary">
          Back to Listings
        </Button>
      </div>
    )
  }

  const {
    title, city, address, price, type, description,
    bedrooms, bathrooms, area, yearBuilt, amenities,
    images, listedAt
  } = property

  const favorite = isFavorite(property.id)

  return (
    <article>
      {/* JSON-LD structured data for this property listing */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'RealEstateListing',
        name: title,
        description,
        url: `https://estatepro.vercel.app/properties/${property.id}`,
        image: images,
        offers: {
          '@type': 'Offer',
          price,
          priceCurrency: 'USD',
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: address,
          addressLocality: city,
          addressCountry: 'US',
        },
        ...(yearBuilt > 0 && { yearBuilt }),
        ...(bedrooms > 0 && { numberOfRooms: bedrooms }),
        ...(area > 0 && { floorSize: { '@type': 'QuantitativeValue', value: area, unitCode: 'FTK' } }),
      })}} />

      <Container className="py-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-1.5 text-sm text-gray-500">
            <li>
              <Link to="/" className="hover:text-brand-600">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link to="/properties" className="hover:text-brand-600">Properties</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="truncate font-medium text-gray-900" aria-current="page">
              {title}
            </li>
          </ol>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
          {/* Left column */}
          <div>
            {/* Gallery */}
            <ImageGallery images={images} title={title} />

            {/* Header */}
            <div className="mt-8 flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Badge variant={type}>{type}</Badge>
                  <span className="text-xs text-gray-400">
                    Listed {formatListedDate(listedAt)}
                  </span>
                </div>
                <h1 className="font-display text-3xl font-bold text-gray-900 sm:text-4xl">
                  {title}
                </h1>
                <p className="mt-2 flex items-center gap-1.5 text-gray-500">
                  <MapPin size={15} className="text-gray-400" />
                  {address}
                </p>
              </div>

              <div className="flex flex-col items-end gap-3">
                <p className="text-3xl font-bold text-brand-700">{formatPrice(price)}</p>
                <button
                  onClick={() => toggleFavorite(property.id)}
                  aria-pressed={favorite}
                  aria-label={favorite ? 'Remove from favorites' : 'Save to favorites'}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    favorite
                      ? 'bg-rose-100 text-rose-600 hover:bg-rose-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Heart size={15} fill={favorite ? 'currentColor' : 'none'} />
                  {favorite ? 'Saved' : 'Save'}
                </button>
              </div>
            </div>

            {/* Key specs */}
            <div className="mt-6 grid grid-cols-2 gap-4 rounded-2xl bg-gray-50 p-5 sm:grid-cols-4">
              {bedrooms > 0 && (
                <Spec icon={Bed} label="Bedrooms" value={bedrooms} />
              )}
              {bathrooms > 0 && (
                <Spec icon={Bath} label="Bathrooms" value={bathrooms} />
              )}
              {area > 0 && (
                <Spec icon={Maximize2} label="Area" value={formatArea(area, type)} />
              )}
              {yearBuilt > 0 && (
                <Spec icon={Calendar} label="Year Built" value={yearBuilt} />
              )}
            </div>

            {/* Description */}
            <div className="mt-8">
              <h2 className="mb-3 text-xl font-semibold text-gray-900">About This Property</h2>
              <p className="leading-relaxed text-gray-600">{description}</p>
            </div>

            {/* Amenities */}
            {amenities?.length > 0 && (
              <div className="mt-8">
                <h2 className="mb-4 text-xl font-semibold text-gray-900">Amenities & Features</h2>
                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {amenities.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle2 size={15} className="shrink-0 text-brand-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right column – inquiry form */}
          <aside>
            <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-6 shadow-card">
              <h2 className="mb-1 text-lg font-semibold text-gray-900">Enquire About This Property</h2>
              <p className="mb-5 text-sm text-gray-500">
                Fill in the form and an agent will contact you within 24 hours.
              </p>
              <ContactForm defaultSubject={`Enquiry: ${title}`} />
            </div>
          </aside>
        </div>

        {/* Back link */}
        <div className="mt-10 border-t border-gray-100 pt-6">
          <Link
            to="/properties"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-800"
          >
            <ArrowLeft size={14} />
            Back to all listings
          </Link>
        </div>
      </Container>
    </article>
  )
}

function Spec({ icon: Icon, label, value }) {
  return (
    <div className="flex flex-col items-center rounded-xl bg-white p-4 shadow-sm text-center">
      <Icon size={20} className="mb-1.5 text-brand-500" />
      <span className="text-lg font-bold text-gray-900">{value}</span>
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  )
}
