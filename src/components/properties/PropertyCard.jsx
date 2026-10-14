import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Bed, Bath, Maximize2, MapPin } from 'lucide-react'
import { Badge } from '../common/Badge'
import { useFavorites } from '../../hooks/useFavorites'
import { formatPrice, formatAreaShort } from '../../utils/formatters'
import { IMAGE_FALLBACK } from '../../utils/constants'

/**
 * Reusable property card used in both the grid and the Favorites page.
 * Keeps its own image-error state so the rest of the card isn't affected.
 */
export function PropertyCard({ property }) {
  const { id, title, city, address, price, bedrooms, bathrooms, area, type, images } = property
  const { isFavorite, toggleFavorite } = useFavorites()
  const [imgSrc, setImgSrc] = useState(images?.[0] ?? IMAGE_FALLBACK)
  const favorite = isFavorite(id)

  const handleFavoriteClick = useCallback(
    (e) => {
      // Prevent the Link from navigating when clicking the heart
      e.preventDefault()
      e.stopPropagation()
      toggleFavorite(id)
    },
    [id, toggleFavorite]
  )

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      {/* Image */}
      <Link to={`/properties/${id}`} aria-label={`View details for ${title}`} tabIndex={-1}>
        <div className="relative h-52 overflow-hidden bg-gray-100">
          <img
            src={imgSrc}
            alt={title}
            loading="lazy"
            onError={() => setImgSrc(IMAGE_FALLBACK)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      </Link>

      {/* Favorite button */}
      <button
        onClick={handleFavoriteClick}
        aria-label={favorite ? `Remove ${title} from favorites` : `Add ${title} to favorites`}
        aria-pressed={favorite}
        className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full shadow-md transition-all duration-200 ${
          favorite
            ? 'bg-rose-500 text-white'
            : 'bg-white/90 text-gray-500 hover:bg-rose-50 hover:text-rose-500'
        }`}
      >
        <Heart size={16} fill={favorite ? 'currentColor' : 'none'} strokeWidth={2} />
      </button>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-start justify-between gap-2">
          <Badge variant={type}>{type}</Badge>
        </div>

        <Link to={`/properties/${id}`} className="group/title mb-1">
          <h3 className="line-clamp-2 text-base font-semibold text-gray-900 transition-colors group-hover/title:text-brand-600">
            {title}
          </h3>
        </Link>

        <p className="mb-3 flex items-center gap-1 text-sm text-gray-500">
          <MapPin size={13} className="shrink-0 text-gray-400" />
          <span className="truncate">{city} · {address}</span>
        </p>

        <p className="mb-4 text-lg font-bold text-brand-700">
          {formatPrice(price)}
        </p>

        {/* Specs row */}
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-gray-100 pt-4 text-xs text-gray-500">
          {bedrooms > 0 && (
            <span className="flex items-center gap-1">
              <Bed size={13} />
              {bedrooms} {bedrooms === 1 ? 'bed' : 'beds'}
            </span>
          )}
          {bathrooms > 0 && (
            <span className="flex items-center gap-1">
              <Bath size={13} />
              {bathrooms} {bathrooms === 1 ? 'bath' : 'baths'}
            </span>
          )}
          {area > 0 && (
            <span className="flex items-center gap-1">
              <Maximize2 size={13} />
              {formatAreaShort(area)}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
