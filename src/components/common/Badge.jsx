/** Small pill badge used for property type labels and similar tags. */
export function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default:    'bg-brand-100 text-brand-700',
    accent:     'bg-accent-500 text-white',
    success:    'bg-green-100 text-green-700',
    warning:    'bg-yellow-100 text-yellow-700',
    neutral:    'bg-gray-100 text-gray-600',
    House:      'bg-blue-100 text-blue-700',
    Apartment:  'bg-purple-100 text-purple-700',
    Villa:      'bg-emerald-100 text-emerald-700',
    Commercial: 'bg-amber-100 text-amber-700',
    Land:       'bg-lime-100 text-lime-700',
  }

  const color = variants[variant] ?? variants[children] ?? variants.default

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide ${color} ${className}`}
    >
      {children}
    </span>
  )
}
