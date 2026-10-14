/** Centered content container with consistent horizontal padding. */
export function Container({ children, className = '', size = 'default' }) {
  const sizes = {
    default: 'max-w-7xl',
    narrow:  'max-w-3xl',
    wide:    'max-w-screen-2xl',
  }

  return (
    <div className={`${sizes[size]} mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  )
}
