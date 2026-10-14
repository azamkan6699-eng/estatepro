import { Link } from 'react-router-dom'
import { Home, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import { SITE_NAME, AGENCY_INFO } from '../../utils/constants'

const FOOTER_LINKS = {
  Company: [
    { to: '/about',   label: 'About Us' },
    { to: '/contact', label: 'Contact' },
  ],
  Properties: [
    { to: '/properties',           label: 'All Listings' },
    { to: '/properties?type=House',     label: 'Houses' },
    { to: '/properties?type=Apartment', label: 'Apartments' },
    { to: '/properties?type=Villa',     label: 'Villas' },
  ],
  Account: [
    { to: '/favorites', label: 'My Favorites' },
  ],
}

const SOCIAL_LINKS = [
  { icon: Facebook,  href: '#', label: 'Facebook' },
  { icon: Twitter,   href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin,  href: '#', label: 'LinkedIn' },
]

export function Footer() {
  return (
    <footer className="bg-navy-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main grid */}
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="mb-4 flex items-center gap-2 text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
                <Home size={16} strokeWidth={2.5} />
              </span>
              <span className="font-display text-xl font-bold">{SITE_NAME}</span>
            </Link>
            <p className="mb-6 max-w-xs text-sm leading-relaxed text-gray-400">
              Your trusted partner for premium real estate. We help you find the
              perfect home with expertise, integrity, and care.
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-gray-300 transition-colors hover:bg-brand-600 hover:text-white"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-500">
                {heading}
              </h3>
              <ul className="space-y-2.5">
                {links.map(({ to, label }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-sm text-gray-400 transition-colors hover:text-white"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-500">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex gap-2">
                <MapPin size={14} className="mt-0.5 shrink-0 text-brand-400" />
                <span>{AGENCY_INFO.address}</span>
              </li>
              <li className="flex gap-2">
                <Phone size={14} className="mt-0.5 shrink-0 text-brand-400" />
                <a href={`tel:${AGENCY_INFO.phone}`} className="hover:text-white">
                  {AGENCY_INFO.phone}
                </a>
              </li>
              <li className="flex gap-2">
                <Mail size={14} className="mt-0.5 shrink-0 text-brand-400" />
                <a href={`mailto:${AGENCY_INFO.email}`} className="hover:text-white">
                  {AGENCY_INFO.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-xs text-gray-500 sm:flex-row">
          <p>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-gray-300">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
