import { useState, useCallback } from 'react'
import { Lightbox } from './Lightbox'
import { IMAGE_FALLBACK } from '../../utils/constants'

/**
 * Property image gallery: large main image + thumbnail strip.
 * Clicking the main image opens a lightbox.
 * Shows a skeleton placeholder while the main image is loading.
 */
export function ImageGallery({ images = [], title = '' }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [imgErrors, setImgErrors] = useState({})
  const [mainLoaded, setMainLoaded] = useState(false)

  const src = (i) => (imgErrors[i] ? IMAGE_FALLBACK : images[i] ?? IMAGE_FALLBACK)

  const handleError = useCallback((i) => {
    setImgErrors((prev) => ({ ...prev, [i]: true }))
    setMainLoaded(true) // stop showing skeleton even on error
  }, [])

  const handleMainLoad = useCallback(() => setMainLoaded(true), [])

  const handleThumbClick = useCallback((i) => {
    setActiveIndex(i)
    setMainLoaded(false) // show skeleton while next image loads
  }, [])

  const openLightbox  = useCallback(() => setLightboxOpen(true), [])
  const closeLightbox = useCallback(() => setLightboxOpen(false), [])

  return (
    <>
      <div className="space-y-3">
        {/* Main image */}
        <button
          onClick={openLightbox}
          aria-label={`Open full-screen gallery for ${title}`}
          className="group relative block w-full overflow-hidden rounded-2xl bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
        >
          {/* Skeleton shown while image loads */}
          {!mainLoaded && (
            <div
              aria-hidden="true"
              className="h-80 w-full animate-pulse bg-gray-200 md:h-[460px]"
            />
          )}
          <img
            key={src(activeIndex)} // remount img on src change to re-trigger onLoad
            src={src(activeIndex)}
            alt={`${title} – photo ${activeIndex + 1}`}
            onError={() => handleError(activeIndex)}
            onLoad={handleMainLoad}
            className={`h-80 w-full object-cover transition-transform duration-500 group-hover:scale-[1.02] md:h-[460px] ${
              mainLoaded ? 'block' : 'hidden'
            }`}
          />
          <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
            View gallery ({images.length})
          </span>
        </button>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div
            className="flex gap-2 overflow-x-auto pb-1"
            role="list"
            aria-label="Photo thumbnails"
          >
            {images.map((_, i) => (
              <button
                key={i}
                role="listitem"
                onClick={() => handleThumbClick(i)}
                aria-label={`View photo ${i + 1}`}
                aria-current={i === activeIndex ? 'true' : undefined}
                className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-500 ${
                  i === activeIndex
                    ? 'border-brand-500'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={src(i)}
                  alt={`${title} photo ${i + 1}`}
                  loading="lazy"
                  onError={() => handleError(i)}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {lightboxOpen && (
        <Lightbox
          images={images}
          initialIndex={activeIndex}
          title={title}
          onClose={closeLightbox}
        />
      )}
    </>
  )
}
