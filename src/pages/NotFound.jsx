import { Link } from 'react-router-dom'
import { Home, Search } from 'lucide-react'
import { Button } from '../components/common/Button'
import { Container } from '../components/common/Container'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function NotFound() {
  useDocumentTitle('Page Not Found')
  return (
    <section className="flex min-h-[80vh] items-center justify-center">
      <Container className="py-20 text-center">
        <p className="font-display mb-2 text-9xl font-bold text-gray-100">404</p>
        <h1 className="mb-3 text-3xl font-bold text-gray-900">Page Not Found</h1>
        <p className="mx-auto mb-8 max-w-md text-gray-500">
          The page you're looking for doesn't exist or may have been moved. Let's get you back on track.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button as={Link} to="/" variant="primary" size="lg">
            <Home size={16} />
            Back to Home
          </Button>
          <Button as={Link} to="/properties" variant="secondary" size="lg">
            <Search size={16} />
            Browse Properties
          </Button>
        </div>
      </Container>
    </section>
  )
}
