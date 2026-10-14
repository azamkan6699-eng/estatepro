import { useEffect } from 'react'
import { SITE_NAME } from '../utils/constants'

/**
 * Sets the browser tab title for the current page.
 * Format: "Page Title – EstatePro"
 *
 * We deliberately do NOT restore the previous title on unmount — in a
 * SPA the incoming page's useDocumentTitle call will set the correct
 * title, and a restore would cause a visible flicker between routes.
 *
 * @param {string} title  Page-specific title
 */
export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} – ${SITE_NAME}` : SITE_NAME
  }, [title])
}
