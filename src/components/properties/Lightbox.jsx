import { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { IMAGE_FALLBACK } from '../../utils/constants'

/**
 * Full-screen lightbox with keyboard navigation (←, →, Esc)
 * and accessible focus management.
 */
export function Lightbox({ images, initialIndex = 0, title, onClose }) {
  const [index, setIndex] = useState(initialIndex)
  const [imgError, setImgError] = useState(false)
  const closeRef = useRef(null)

  const total = images.length
  const canPrev = index > 0
  const canNext = index < total - 1

  const prev = useCallback(() => {
    if (canPrev) {
      setIndex((i) => i - 1)
      setImgError(false)
    }
  }, [canPrev])

  const next = useCallback(() => {
    if (canNext) {
      setIndex((i) => i + 1)
      setImgError(false)
    }
  }, [canNext])

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose, prev, next])

  // Prevent body scroll while open and move focus to close button
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => { document.body.style.overflow = '' }
  }, [])

  const src = imgError ? IMAGE_FALLBACK : images[index]

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Image gallery for ${title}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 animate-fade-in"
      onClick={onClose}
    >
      {/* Inner container – stops click from closing when clicking content */}
      <div
        className="relative flex h-full w-full max-w-5xl flex-col items-center justify-center px-4 py-16"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close gallery"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-white"
        >
          <X size={20} />
        </button>

        {/* Counter */}
        <p className="absolute top-5 left-1/2 -translate-x-1/2 text-sm font-medium text-white/70">
          {index + 1} / {total}
        </p>

        {/* Image */}
        <img
          src={src}
          alt={`${title} – photo ${index + 1} of ${total}`}
          onError={() => setImgError(true)}
          className="max-h-[calc(100vh-8rem)] max-w-full rounded-lg object-contain shadow-2xl"
          draggable="false"
        />

        {/* Prev */}
        {canPrev && (
          <button
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-white sm:left-4"
          >
            <ChevronLeft size={22} />
          </button>
        )}

        {/* Next */}
        {canNext && (
          <button
            onClick={next}
            aria-label="Next image"
            className="absolute right-2 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-white sm:right-4"
          >
            <ChevronRight size={22} />
          </button>
        )}
      </div>
    </div>,
    document.body
  )
}
