'use client'

import { useState } from 'react'
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react'

interface EventRegistrationFormProps {
  eventId: string
  eventTitle?: string
  onSuccess?: () => void
}

export function EventRegistrationForm({
  eventId,
  eventTitle,
  onSuccess,
}: EventRegistrationFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    ticketType: 'Regular',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = (): boolean => {
    if (!formData.fullName.trim()) {
      setErrorMessage('Full name is required')
      return false
    }
    if (!formData.email.trim()) {
      setErrorMessage('Email is required')
      return false
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address')
      return false
    }
    if (!formData.phone.trim()) {
      setErrorMessage('Phone number is required')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId,
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          ticketType: formData.ticketType,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed. Please try again.')
      }

      setSuccessMessage(
        'Registration successful! You will receive a confirmation email shortly.'
      )
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        ticketType: 'Regular',
      })

      if (onSuccess) {
        setTimeout(onSuccess, 2000)
      }
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : 'An unexpected error occurred'
      setErrorMessage(errorMsg)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-card p-8">
      <h2 className="mb-2 text-2xl font-bold">Register for Event</h2>
      {eventTitle && (
        <p className="mb-6 text-sm text-muted-foreground">{eventTitle}</p>
      )}

      {successMessage && (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-green-500/30 bg-green-500/10 p-4">
          <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
          <p className="text-sm text-green-400">{successMessage}</p>
        </div>
      )}

      {errorMessage && (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-[#E11D2E]/30 bg-[#E11D2E]/10 p-4">
          <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#E11D2E]" />
          <p className="text-sm text-[#E11D2E]">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium mb-2">
            Full Name <span className="text-[#E11D2E]">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            disabled={isSubmitting}
            placeholder="John Doe"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-[#38BDF8] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email <span className="text-[#E11D2E]">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
            placeholder="john@example.com"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-[#38BDF8] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            Phone Number <span className="text-[#E11D2E]">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={isSubmitting}
            placeholder="+1 (555) 000-0000"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-[#38BDF8] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            required
          />
        </div>

        {/* Company */}
        <div>
          <label htmlFor="company" className="block text-sm font-medium mb-2">
            Company <span className="text-muted-foreground text-xs">(Optional)</span>
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            disabled={isSubmitting}
            placeholder="Acme Corp"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-[#38BDF8] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          />
        </div>

        {/* Ticket Type */}
        <div>
          <label htmlFor="ticketType" className="block text-sm font-medium mb-2">
            Ticket Type <span className="text-[#E11D2E]">*</span>
          </label>
          <select
            id="ticketType"
            name="ticketType"
            value={formData.ticketType}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-foreground focus:border-[#38BDF8] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <option value="Regular">Regular</option>
            <option value="VIP">VIP</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || !!successMessage}
          className="w-full mt-6 rounded-lg bg-[#E11D2E] px-4 py-3 font-semibold text-white transition-all hover:bg-[#E11D2E]/90 hover:shadow-lg hover:shadow-[#E11D2E]/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Registering...
            </>
          ) : (
            'Register Now'
          )}
        </button>

        <p className="text-xs text-muted-foreground text-center mt-4">
          By registering, you agree to receive event-related emails.
        </p>
      </form>
    </div>
  )
}
