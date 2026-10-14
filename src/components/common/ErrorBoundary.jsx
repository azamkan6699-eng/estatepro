import { Component } from 'react'
import { Link } from 'react-router-dom'

/**
 * Class-based error boundary wrapping the entire app.
 * React requires a class component for componentDidCatch.
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
          <h1 className="mb-3 text-2xl font-bold text-gray-900">Something went wrong</h1>
          <p className="mb-6 max-w-sm text-sm text-gray-500">
            An unexpected error occurred. Try refreshing the page, or go back to the homepage.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => window.location.reload()}
              className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
            >
              Refresh page
            </button>
            <Link
              to="/"
              className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Go home
            </Link>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
