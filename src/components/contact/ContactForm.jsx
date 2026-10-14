import { useState, useCallback, useRef } from 'react'
import { CheckCircle, Loader2 } from 'lucide-react'
import { Button } from '../common/Button'
import { validateContactForm, isFormValid } from '../../utils/validators'
import { SUBMIT_DELAY_MS } from '../../utils/constants'

const EMPTY_FIELDS = { name: '', email: '', phone: '', subject: '', message: '' }
const EMPTY_ERRORS = { name: '', email: '', phone: '', subject: '', message: '' }

/**
 * Reusable contact / inquiry form.
 * Accepts an optional `defaultSubject` to pre-fill the subject field
 * (used on property detail pages for inquiry).
 *
 * Validation strategy:
 *  - Errors appear on blur (first touch) or on submit.
 *  - Errors update live on change once a field has been touched.
 *  - We use refs for fields/touched inside callbacks to avoid stale
 *    closures while keeping a single source of truth in state.
 */
export function ContactForm({ defaultSubject = '' }) {
  const [fields, setFields]     = useState({ ...EMPTY_FIELDS, subject: defaultSubject })
  const [errors, setErrors]     = useState(EMPTY_ERRORS)
  const [touched, setTouched]   = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted]   = useState(false)

  // Refs mirror state so event callbacks always see current values
  // without needing to be recreated on every render.
  const fieldsRef  = useRef(fields)
  const touchedRef = useRef(touched)
  fieldsRef.current  = fields
  touchedRef.current = touched

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    const nextFields = { ...fieldsRef.current, [name]: value }
    setFields(nextFields)
    // Re-validate live once the field has been touched
    if (touchedRef.current[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateContactForm(nextFields)[name],
      }))
    }
  }, []) // stable – reads from refs, not closed-over state

  const handleBlur = useCallback((e) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors((prev) => ({
      ...prev,
      [name]: validateContactForm(fieldsRef.current)[name],
    }))
  }, []) // stable – reads from ref

  const handleSubmit = async (e) => {
    e.preventDefault()
    setTouched({ name: true, email: true, phone: true, subject: true, message: true })
    const newErrors = validateContactForm(fieldsRef.current)
    setErrors(newErrors)
    if (!isFormValid(newErrors)) return

    setSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, SUBMIT_DELAY_MS))
    setSubmitting(false)
    setSubmitted(true)
  }

  const handleReset = () => {
    setFields({ ...EMPTY_FIELDS, subject: defaultSubject })
    setErrors(EMPTY_ERRORS)
    setTouched({})
    setSubmitted(false)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center rounded-2xl bg-green-50 py-14 px-8 text-center">
        <CheckCircle size={48} className="mb-4 text-green-500" />
        <h3 className="mb-2 text-xl font-semibold text-gray-900">Message Sent!</h3>
        <p className="mb-6 max-w-sm text-sm text-gray-500">
          Thanks for reaching out. One of our agents will be in touch within one business day.
        </p>
        <Button variant="secondary" size="sm" onClick={handleReset}>
          Send another message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
      <div className="grid gap-5 sm:grid-cols-2">
        {/* Full name */}
        <div>
          <label htmlFor="contact-name" className="form-label">
            Full name <span aria-hidden="true" className="text-red-500">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            value={fields.name}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name && touched.name ? 'error-name' : undefined}
            className={`form-input ${errors.name && touched.name ? 'form-input-error' : ''}`}
            placeholder="Jane Smith"
          />
          {errors.name && touched.name && (
            <p id="error-name" className="form-error" role="alert">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="contact-email" className="form-label">
            Email address <span aria-hidden="true" className="text-red-500">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            value={fields.email}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email && touched.email ? 'error-email' : undefined}
            className={`form-input ${errors.email && touched.email ? 'form-input-error' : ''}`}
            placeholder="jane@example.com"
          />
          {errors.email && touched.email && (
            <p id="error-email" className="form-error" role="alert">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="contact-phone" className="form-label">
            Phone number <span aria-hidden="true" className="text-red-500">*</span>
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={fields.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-required="true"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone && touched.phone ? 'error-phone' : undefined}
            className={`form-input ${errors.phone && touched.phone ? 'form-input-error' : ''}`}
            placeholder="(212) 555-0100"
          />
          {errors.phone && touched.phone && (
            <p id="error-phone" className="form-error" role="alert">{errors.phone}</p>
          )}
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="contact-subject" className="form-label">
            Subject <span aria-hidden="true" className="text-red-500">*</span>
          </label>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            value={fields.subject}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-required="true"
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject && touched.subject ? 'error-subject' : undefined}
            className={`form-input ${errors.subject && touched.subject ? 'form-input-error' : ''}`}
            placeholder="I'm interested in…"
          />
          {errors.subject && touched.subject && (
            <p id="error-subject" className="form-error" role="alert">{errors.subject}</p>
          )}
        </div>

        {/* Message */}
        <div className="sm:col-span-2">
          <label htmlFor="contact-message" className="form-label">
            Message <span aria-hidden="true" className="text-red-500">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            value={fields.message}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message && touched.message ? 'error-message' : undefined}
            className={`form-input resize-none ${errors.message && touched.message ? 'form-input-error' : ''}`}
            placeholder="Tell us how we can help…"
          />
          {errors.message && touched.message && (
            <p id="error-message" className="form-error" role="alert">{errors.message}</p>
          )}
        </div>
      </div>

      <div className="mt-6">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full sm:w-auto"
          disabled={submitting}
        >
          {submitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Sending…
            </>
          ) : (
            'Send Message'
          )}
        </Button>
      </div>
    </form>
  )
}
