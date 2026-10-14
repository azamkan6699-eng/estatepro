import { ShieldCheck, Users, Award, Clock } from 'lucide-react'
import { Container } from '../common/Container'

const REASONS = [
  {
    icon: ShieldCheck,
    title: 'Verified Listings',
    description:
      'Every property is personally verified by our team, so you can search with confidence.',
  },
  {
    icon: Users,
    title: 'Expert Agents',
    description:
      'Our award-winning agents bring decades of local market knowledge to every transaction.',
  },
  {
    icon: Award,
    title: 'Premium Properties',
    description:
      'We partner exclusively with trusted developers and sellers to offer only the finest homes.',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description:
      'From your first search to settlement day, our team is available around the clock.',
  },
]

export function WhyChooseUs() {
  return (
    <section aria-labelledby="why-heading" className="bg-gray-50 py-20">
      <Container>
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-600">
            The EstatePro difference
          </p>
          <h2
            id="why-heading"
            className="font-display text-3xl font-bold text-gray-900 sm:text-4xl"
          >
            Why Choose Us
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col items-center rounded-2xl bg-white p-8 text-center shadow-card transition-shadow hover:shadow-card-hover"
            >
              <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                <Icon size={26} />
              </span>
              <h3 className="mb-2 text-base font-semibold text-gray-900">{title}</h3>
              <p className="text-sm leading-relaxed text-gray-500">{description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
