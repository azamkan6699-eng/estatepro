import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { FavoritesProvider } from './context/FavoritesContext'
import { ErrorBoundary } from './components/common/ErrorBoundary'
import { Layout } from './components/layout/Layout'
import { Loader } from './components/common/Loader'

// Lazy-load all pages so each route is code-split automatically
const Home           = lazy(() => import('./pages/Home'))
const Properties     = lazy(() => import('./pages/Properties'))
const PropertyDetails = lazy(() => import('./pages/PropertyDetails'))
const Favorites      = lazy(() => import('./pages/Favorites'))
const About          = lazy(() => import('./pages/About'))
const Contact        = lazy(() => import('./pages/Contact'))
const NotFound       = lazy(() => import('./pages/NotFound'))

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <FavoritesProvider>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="properties" element={<Properties />} />
                <Route path="properties/:id" element={<PropertyDetails />} />
                <Route path="favorites" element={<Favorites />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </FavoritesProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}
