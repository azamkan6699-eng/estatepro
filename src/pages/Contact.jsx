import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { ContactForm } from '../components/contact/ContactForm'
import { Container } from '../components/common/Container'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useSEO } from '../hooks/useSEO'
import { AGENCY_INFO } from '../utils/constants'

export default function Contact() {
  useDocumentTitle('Contact Us')
  useSEO({
    title: 'Contact Us',
    description: 'Get in touch with the EstatePro team. We\'re available Mon–Fri 8am–7pm and Saturday 9am–5pm.',
    url: '/contact',
  })
  return (
    <section aria-labelledby="contact-heading" className="py-16">
      <Container>
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-600">
            Get in touch
          </p>
          <h1
            id="contact-heading"
            className="font-display text-3xl font-bold text-gray-900 sm:text-4xl"
          >
            Contact Us
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-gray-500">
            Have a question or ready to take the next step? Our team is here to help.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          {/* Form */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-card">
            <h2 className="mb-6 text-xl font-semibold text-gray-900">Send Us a Message</h2>
            <ContactForm />
          </div>

          {/* Agency info */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-card">
              <h2 className="mb-5 text-lg font-semibold text-gray-900">Agency Information</h2>
              <ul className="space-y-4">
                <ContactInfoItem icon={MapPin} label="Office">
                  {AGENCY_INFO.address}
                </ContactInfoItem>
                <ContactInfoItem icon={Phone} label="Phone">
                  <a href={`tel:${AGENCY_INFO.phone}`} className="hover:text-brand-600 transition-colors">
                    {AGENCY_INFO.phone}
                  </a>
                </ContactInfoItem>
                <ContactInfoItem icon={Mail} label="Email">
                  <a href={`mailto:${AGENCY_INFO.email}`} className="hover:text-brand-600 transition-colors">
                    {AGENCY_INFO.email}
                  </a>
                </ContactInfoItem>
                <ContactInfoItem icon={Clock} label="Hours">
                  {AGENCY_INFO.hours}
                </ContactInfoItem>
              </ul>
            </div>

            {/* Map placeholder */}
            <div
              className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-100"
              aria-label="Office location map placeholder"
              role="img"
            >
              <div className="flex h-52 items-center justify-center text-sm text-gray-400">
                <div className="text-center">
                  <MapPin size={28} className="mx-auto mb-2 text-gray-300" />
                  <p className="font-medium text-gray-500">{AGENCY_INFO.name}</p>
                  <p className="text-xs text-gray-400">Map integration available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function ContactInfoItem({ icon: Icon, label, children }) {
  return (
    <li className="flex gap-3">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
        <Icon size={15} />
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">{label}</p>
        <p className="text-sm text-gray-700">{children}</p>
      </div>
    </li>
  )
}
