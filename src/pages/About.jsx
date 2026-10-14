import { Link } from 'react-router-dom'
import { Users, Award, Home, TrendingUp, ArrowRight } from 'lucide-react'
import { Container } from '../components/common/Container'
import { Button } from '../components/common/Button'
import { useSEO } from '../hooks/useSEO'
import { SITE_NAME } from '../utils/constants'

const STATS = [
  { icon: Home,       value: '2,400+', label: 'Properties sold' },
  { icon: Users,      value: '1,800+', label: 'Happy clients' },
  { icon: Award,      value: '18',     label: 'Industry awards' },
  { icon: TrendingUp, value: '12+',    label: 'Years of expertise' },
]

// Initials + brand colours instead of random strangers' Unsplash portraits
const TEAM = [
  { name: 'Alexandra Reed',  role: 'Founder & CEO',      initials: 'AR', bg: 'bg-brand-700'   },
  { name: 'Marcus Chen',     role: 'Head of Sales',       initials: 'MC', bg: 'bg-emerald-700' },
  { name: 'Sofia Martinez',  role: 'Senior Agent',        initials: 'SM', bg: 'bg-accent-600'  },
  { name: "James O'Brien",   role: 'Commercial Director', initials: 'JO', bg: 'bg-navy-800'    },
]

export default function About() {
  useSEO({
    title: 'About Us',
    description: `Learn about ${SITE_NAME} Realty Group — our mission, our team, and why 1,800+ clients trust us to find their perfect home.`,
    url: '/about',
  })

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-900 py-24">
        <img
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <Container className="relative z-10 text-center">
          <h1 className="font-display mb-4 text-4xl font-bold text-white sm:text-5xl">
            About {SITE_NAME}
          </h1>
          <p className="mx-auto max-w-xl text-lg text-gray-300">
            Connecting people with exceptional properties since 2012.
          </p>
        </Container>
      </section>

      {/* Mission */}
      <section className="py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-600">
                Our mission
              </p>
              <h2 className="font-display mb-5 text-3xl font-bold text-gray-900 sm:text-4xl">
                Real Estate, Reimagined
              </h2>
              <p className="mb-4 leading-relaxed text-gray-600">
                {SITE_NAME} was founded on the belief that finding your perfect property should be
                a seamless, enjoyable experience. We combine deep local knowledge with cutting-edge
                technology to give our clients a genuine advantage in any market.
              </p>
              <p className="leading-relaxed text-gray-600">
                Whether you're buying your first home, searching for a luxury retreat, or investing
                in commercial real estate, our team of dedicated professionals is with you at every step.
              </p>
              <div className="mt-8">
                <Button as={Link} to="/contact" variant="primary">
                  Talk to an agent
                  <ArrowRight size={15} />
                </Button>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
                alt="Modern open-plan office with large windows"
                loading="lazy"
                className="h-80 w-full object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="bg-brand-600 py-16" aria-label="Company statistics">
        <Container>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center text-center text-white">
                <Icon size={28} className="mb-3 text-brand-200" aria-hidden="true" />
                <span className="font-display text-4xl font-bold">{value}</span>
                <span className="mt-1 text-sm text-brand-200">{label}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Team */}
      <section className="py-20" aria-labelledby="team-heading">
        <Container>
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-600">
              The people behind the brand
            </p>
            <h2 id="team-heading" className="font-display text-3xl font-bold text-gray-900 sm:text-4xl">
              Meet Our Team
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {TEAM.map(({ name, role, initials, bg }) => (
              <div key={name} className="flex flex-col items-center text-center">
                <div
                  className={`mb-4 flex h-24 w-24 items-center justify-center rounded-2xl ${bg} shadow-md`}
                  aria-hidden="true"
                >
                  <span className="font-display text-2xl font-bold text-white">{initials}</span>
                </div>
                <h3 className="font-semibold text-gray-900">{name}</h3>
                <p className="mt-0.5 text-sm text-brand-600">{role}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-20" aria-labelledby="values-heading">
        <Container>
          <div className="mb-12 text-center">
            <h2 id="values-heading" className="font-display text-3xl font-bold text-gray-900 sm:text-4xl">
              Our Values
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                title: 'Integrity',
                body: 'We operate with complete transparency. Every recommendation we make is in your best interest, not ours.',
              },
              {
                title: 'Excellence',
                body: 'We hold ourselves to the highest professional standards — from how we present properties to how we close deals.',
              },
              {
                title: 'Partnership',
                body: 'We see every client relationship as a long-term partnership, not a one-time transaction.',
              },
            ].map(({ title, body }) => (
              <div key={title} className="rounded-2xl bg-white p-8 shadow-card">
                <h3 className="mb-3 text-lg font-semibold text-gray-900">{title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
