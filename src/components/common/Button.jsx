/**
 * Reusable button component with variant and size support.
 * Renders a <button> by default; pass `as="a"` or `as={Link}` for anchor/link.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  as: Tag = 'button',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary:
      'bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800 shadow-sm hover:shadow-md',
    secondary:
      'bg-white text-brand-700 border border-brand-200 hover:bg-brand-50 hover:border-brand-400',
    accent:
      'bg-accent-500 text-white hover:bg-accent-600 active:bg-accent-600 shadow-sm hover:shadow-md',
    ghost:
      'bg-transparent text-gray-700 hover:bg-gray-100 hover:text-gray-900',
    danger:
      'bg-red-500 text-white hover:bg-red-600',
    outline:
      'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50',
  }

  const sizes = {
    sm:  'px-3 py-1.5 text-sm',
    md:  'px-5 py-2.5 text-sm',
    lg:  'px-7 py-3 text-base',
    xl:  'px-9 py-4 text-lg',
  }

  return (
    <Tag
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}
