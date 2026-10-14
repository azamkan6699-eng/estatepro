# EstatePro – Premium Real Estate Platform

A modern, fully responsive real estate web application built with React, Vite, and Tailwind CSS. Browse properties, filter listings, save favourites, and get in touch with the agency — all from a polished front-end experience.

---

## Features

- **Hero with quick search** – search by keyword, property type, and max price directly from the homepage
- **Property listings** – responsive grid with reusable cards showing key specs and a favourite toggle
- **Advanced filtering** – city, type, price range, and sort order; all state synced to the URL for shareable, refresh-safe results
- **Property details** – full image gallery, lightbox with keyboard navigation, amenities list, and an inline enquiry form
- **Favourites** – heart toggle on every card and detail page; persisted in `localStorage`; dedicated `/favorites` page
- **Contact form** – validated fields with inline errors, loading state, and success message; pre-fills subject on property enquiries
- **Responsive design** – mobile-first, tested from 360 px to 1440 px; hamburger menu on small screens
- **Accessibility** – semantic HTML, ARIA attributes, visible focus states, keyboard-accessible gallery and lightbox
- **Code quality** – lazy-loaded routes, custom hooks, business logic in utilities, ErrorBoundary

---

## Tech Stack

| Tool | Version |
|------|---------|
| React | 18 |
| Vite | 5 |
| React Router | 6 |
| Tailwind CSS | 3 |
| lucide-react | ^0.378 |

---

## Project Structure

```
src/
├── assets/
├── components/
│   ├── common/        Button, Badge, Container, EmptyState, Loader, ErrorBoundary
│   ├── layout/        Navbar, Footer, Layout, ScrollToTop
│   ├── home/          Hero, FeaturedProperties, WhyChooseUs, CTABanner
│   ├── properties/    PropertyCard, PropertyGrid, FilterPanel, SearchBar,
│   │                  ImageGallery, Lightbox
│   └── contact/       ContactForm
├── context/           FavoritesContext
├── data/              properties.json (20 properties)
├── hooks/             useFavorites, useLocalStorage, usePropertyFilters
├── pages/             Home, Properties, PropertyDetails, Favorites,
│                      About, Contact, NotFound
├── utils/             constants.js, formatters.js, validators.js, filterProperties.js
├── App.jsx
├── main.jsx
└── index.css
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install & run

```bash
cd estatepro
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Other scripts

```bash
npm run build    # Production build → dist/
npm run preview  # Preview the production build locally
```

---

## Routes

| Path | Page |
|------|------|
| `/` | Home |
| `/properties` | Listings with search & filters |
| `/properties/:id` | Property detail |
| `/favorites` | Saved properties |
| `/about` | About the agency |
| `/contact` | Contact form |
| `*` | 404 Not Found |

---

## Possible Future Improvements

- **Authentication** – account creation, saved searches, and personal dashboards
- **Map view** – Mapbox or Google Maps integration to show listings geographically
- **Mortgage calculator** – interactive calculator on property detail pages
- **Virtual tours** – 360° image integration via Pannellum or similar
- **Agent profiles** – dedicated pages for individual agents with their listings
- **Back-end API** – replace the static JSON file with a real REST or GraphQL API
- **Unit & integration tests** – Vitest + React Testing Library coverage
- **Internationalisation** – i18n support for multi-region rollout
