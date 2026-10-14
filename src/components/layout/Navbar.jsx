import { useState, useEffect, useCallback } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X, Heart, Home } from 'lucide-react'
import { useFavorites } from '../../hooks/useFavorites'
import { SITE_NAME } from '../../utils/constants'

const NAV_LINKS = [
  { to: '/',           label: 'Home',       end: true },
  { to: '/properties', label: 'Properties', end: false },
  { to: '/about',      label: 'About',      end: true },
  { to: '/contact',    label: 'Contact',    end: true },
]

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { favoriteIds } = useFavorites()

  const closeMenu = useCallback(() => setIsMenuOpen(false), [])

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu when Escape is pressed
  useEffect(() => {
    if (!isMenuOpen) return
    const onKey = (e) => { if (e.key === 'Escape') closeMenu() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isMenuOpen, closeMenu])

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-150 ${
      isActive ? 'text-brand-600' : 'text-gray-700 hover:text-brand-600'
    }`

  const mobileNavLinkClass = ({ isActive }) =>
    `block rounded-lg px-4 py-3 text-sm font-medium transition-colors duration-150 ${
      isActive ? 'bg-brand-50 text-brand-700' : 'text-gray-700 hover:bg-gray-50'
    }`

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-white'
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-navy-900"
          aria-label={`${SITE_NAME} – Home`}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
            <Home size={16} strokeWidth={2.5} />
          </span>
          <span className="font-display">{SITE_NAME}</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 md:flex" role="list">
          {NAV_LINKS.map(({ to, label, end }) => (
            <li key={to}>
              <NavLink to={to} end={end} className={navLinkClass}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          <Link
            to="/favorites"
            aria-label={`Favorites (${favoriteIds.length})`}
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100 hover:text-rose-500"
          >
            <Heart size={20} />
            {favoriteIds.length > 0 && (
              <span
                aria-hidden="true"
                className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white"
              >
                {favoriteIds.length > 9 ? '9+' : favoriteIds.length}
              </span>
            )}
          </Link>

          {/* Hamburger – mobile only */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-700 transition-colors hover:bg-gray-100 md:hidden"
            onClick={() => setIsMenuOpen((o) => !o)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-gray-100 bg-white px-4 pb-4 pt-2 md:hidden"
        >
          <ul role="list" className="space-y-1">
            {NAV_LINKS.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  className={mobileNavLinkClass}
                  onClick={closeMenu}
                >
                  {label}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink
                to="/favorites"
                end
                className={mobileNavLinkClass}
                onClick={closeMenu}
              >
                Favorites
                {favoriteIds.length > 0 && (
                  <span className="ml-2 rounded-full bg-rose-100 px-2 py-0.5 text-xs font-semibold text-rose-600">
                    {favoriteIds.length}
                  </span>
                )}
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
