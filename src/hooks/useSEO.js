import { useEffect } from 'react'
import { SITE_NAME } from '../utils/constants'

/**
 * Updates per-page SEO meta tags: description, Open Graph, Twitter Card,
 * and canonical URL. Call once per page component.
 *
 * All values fall back gracefully to site-level defaults when not supplied.
 *
 * @param {object} options
 * @param {string} [options.title]        Page-specific title (without site name suffix)
 * @param {string} [options.description]  Page meta description (≤ 160 chars recommended)
 * @param {string} [options.image]        Absolute URL to OG share image
 * @param {string} [options.url]          Canonical URL for this page
 * @param {string} [options.type]         OG type, defaults to 'website'
 */
export function useSEO({ title, description, image, url, type = 'website' } = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} – ${SITE_NAME}` : SITE_NAME
    const baseUrl   = 'https://estatepro.vercel.app'
    const canonical = url ? `${baseUrl}${url}` : baseUrl
    const metaDesc  = description ?? 'Browse premium properties for sale across the US with EstatePro.'
    const metaImage = image ?? 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80'

    // Helper: update or create a <meta> element by selector
    const setMeta = (selector, attr, value) => {
      let el = document.querySelector(selector)
      if (!el) {
        el = document.createElement('meta')
        // Set the identifying attribute from the selector, e.g. name="description"
        const [attrName, attrValue] = selector.replace(/[\[\]']/g, '').split('=')
        el.setAttribute(attrName, attrValue)
        document.head.appendChild(el)
      }
      el.setAttribute(attr, value)
    }

    const setLink = (rel, value) => {
      let el = document.querySelector(`link[rel="${rel}"]`)
      if (!el) {
        el = document.createElement('link')
        el.setAttribute('rel', rel)
        document.head.appendChild(el)
      }
      el.setAttribute('href', value)
    }

    document.title = fullTitle

    setMeta("meta[name='description']",         'content', metaDesc)
    setMeta("meta[property='og:title']",         'content', fullTitle)
    setMeta("meta[property='og:description']",   'content', metaDesc)
    setMeta("meta[property='og:image']",         'content', metaImage)
    setMeta("meta[property='og:url']",           'content', canonical)
    setMeta("meta[property='og:type']",          'content', type)
    setMeta("meta[name='twitter:title']",        'content', fullTitle)
    setMeta("meta[name='twitter:description']",  'content', metaDesc)
    setMeta("meta[name='twitter:image']",        'content', metaImage)
    setLink('canonical', canonical)
  }, [title, description, image, url, type])
}
