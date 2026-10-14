/**
 * Form validation utilities.
 * Each validator returns an error string or an empty string if valid.
 */

/** @param {string} value */
export function validateRequired(value) {
  return value.trim() ? '' : 'This field is required.'
}

/** @param {string} value */
export function validateEmail(value) {
  if (!value.trim()) return 'Email is required.'
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(value) ? '' : 'Please enter a valid email address.'
}

/**
 * Accepts formats: (123) 456-7890, 123-456-7890, +1 123 456 7890, etc.
 * @param {string} value
 */
export function validatePhone(value) {
  if (!value.trim()) return 'Phone number is required.'
  const re = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,3}[)]?[-\s.]?[0-9]{3,4}[-\s.]?[0-9]{3,4}$/
  return re.test(value.trim()) ? '' : 'Please enter a valid phone number.'
}

/**
 * @param {string} value
 * @param {number} min  Minimum character count
 */
export function validateMinLength(value, min) {
  if (!value.trim()) return 'This field is required.'
  if (value.trim().length < min) return `Must be at least ${min} characters.`
  return ''
}

/**
 * Run all contact form validators and return an errors map.
 * @param {{ name: string, email: string, phone: string, subject: string, message: string }} fields
 * @returns {{ [key: string]: string }}
 */
export function validateContactForm(fields) {
  return {
    name:    validateRequired(fields.name),
    email:   validateEmail(fields.email),
    phone:   validatePhone(fields.phone),
    subject: validateRequired(fields.subject),
    message: validateMinLength(fields.message, 20),
  }
}

/** Returns true if an errors map has no error strings. */
export function isFormValid(errors) {
  return Object.values(errors).every((e) => !e)
}
