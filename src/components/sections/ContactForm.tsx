'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { getNames } from 'country-list'
import { Phone, Mail, MessageCircle, MapPin, Clock, CheckCircle, Send, ChevronDown } from 'lucide-react'
import { contactInfo } from '@/data/content'
import { ClayButton, Reveal, SectionHeader } from '@/components/ui/clay'
import { Field, inputClass } from '@/components/ui/form'

const inquirySchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  company: z.string().min(2, 'Company name is required'),
  email: z.email('Please enter a valid email'),
  phone: z.string().min(7, 'Phone number is required'),
  country: z.string().min(2, 'Country is required'),
  product: z.string().min(1, 'Please select a product'),
  quantity: z.string().min(1, 'Please select a quantity'),
  message: z.string().optional(),
})
type InquiryFormData = z.infer<typeof inquirySchema>

const makeReference = () => `HH-${Math.random().toString(36).substring(2, 8).toUpperCase()}`

const countries = getNames().sort((a, b) => a.localeCompare(b))

const contactItems = [
  { icon: Phone, label: 'Phone', value: contactInfo.phone, href: contactInfo.phoneHref, tone: 'bg-blush' },
  { icon: Mail, label: 'Email', value: contactInfo.email, href: `mailto:${contactInfo.email}`, tone: 'bg-butter' },
  { icon: MessageCircle, label: 'WhatsApp', value: contactInfo.phone, href: contactInfo.whatsappHref, tone: 'bg-mint' },
  { icon: MapPin, label: 'Address', value: contactInfo.address, href: 'https://maps.google.com/?q=Bole,Addis+Ababa', tone: 'bg-sky' },
]

const productOptions = [
  { value: 'classic-teff', label: 'Classic Teff Injera' },
  { value: 'mixed-grain', label: 'Mixed Grain Injera' },
  { value: 'jumbo-export', label: 'Jumbo Export Rolls' },
  { value: 'not-sure', label: 'Not Sure Yet' },
]

const quantityOptions = [
  { value: '10-50', label: '10 – 50 kg' },
  { value: '50-200', label: '50 – 200 kg' },
  { value: '200-500', label: '200 – 500 kg' },
  { value: '500-1000', label: '500 kg – 1 ton' },
  { value: '1000+', label: '1 ton+ (bulk)' },
]

const shipTo = ['USA', 'UK', 'Canada', 'UAE', 'Sweden', 'Australia', 'Norway', 'Netherlands', 'Germany', '+6 more']

function Select({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select {...props} className={`${inputClass} cursor-pointer appearance-none pr-10`}>
        {children}
      </select>
      <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-cocoa-soft" />
    </div>
  )
}

export default function ContactForm() {
  const [reference, setReference] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      fullName: '', company: '', email: '', phone: '',
      country: '', product: '', quantity: '', message: '',
    },
  })

  const onSubmit = async (data: InquiryFormData) => {
    // In production: POST to /api/inquiries
    await new Promise((r) => setTimeout(r, 700))
    console.log('Inquiry submitted:', data)
    setReference(makeReference())
  }

  return (
    <section id="contact" className="section-pad relative bg-clay/60">
      <div className="max-container">
        <SectionHeader
          eyebrow="Get in touch"
          title={
            <>
              Start your <span className="text-terracotta">order</span>
            </>
          }
          subtitle="Fill out the form below and our export team will send you a detailed quote within 24 hours."
        />

        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.5fr]">
          {/* Info column */}
          <div className="flex flex-col gap-5">
            {contactItems.map(({ icon: Icon, label, value, href, tone }, i) => (
              <Reveal key={label} delay={i * 0.08}>
                <a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="clay-sm clay-hover group flex items-center gap-4 bg-white p-4"
                >
                  <span className={`clay-sm flex h-12 w-12 shrink-0 items-center justify-center ${tone}`}>
                    <Icon size={20} className="text-cocoa" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-bold uppercase tracking-wider text-cocoa-soft">{label}</span>
                    <span className="block truncate font-bold text-cocoa transition-colors group-hover:text-terracotta">
                      {value}
                    </span>
                  </span>
                </a>
              </Reveal>
            ))}

            <Reveal className="clay-sm bg-butter p-5 [--clay-drop:rgb(217_162_30/0.35)]">
              <p className="flex items-center gap-2 font-bold text-cocoa">
                <Clock size={18} className="text-terracotta" /> 24 Hour Response Guarantee
              </p>
              <p className="mt-2 text-sm leading-relaxed text-cocoa-soft">
                Our export team responds to every inquiry within 24 hours, Monday through Saturday.
                Orders confirmed within 48 hours.
              </p>
            </Reveal>

            <Reveal className="clay-sm bg-white p-5">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-cocoa-soft">We ship to</p>
              <div className="flex flex-wrap gap-2">
                {shipTo.map((c) => (
                  <span key={c} className="clay-inset rounded-full bg-cream px-3 py-1 text-xs font-bold text-cocoa">
                    {c}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal className="clay bg-white p-6 sm:p-10">
            <AnimatePresence mode="wait">
              {reference ? (
                <motion.div
                  key="ok"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-5 py-14 text-center"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 220, delay: 0.1 }}
                    className="clay flex h-24 w-24 items-center justify-center rounded-full bg-mint"
                  >
                    <CheckCircle size={42} className="text-forest" />
                  </motion.span>
                  <div>
                    <p className="font-display text-3xl font-semibold text-cocoa">Inquiry received!</p>
                    <p className="mx-auto mt-2 max-w-xs text-sm text-cocoa-soft">
                      Thank you! Our export team will send you a detailed quote within 24 hours.
                    </p>
                  </div>
                  <div className="clay-inset bg-cream px-8 py-4">
                    <p className="text-xs font-semibold text-cocoa-soft">Reference number</p>
                    <p className="font-display text-2xl font-semibold tracking-wider text-terracotta">{reference}</p>
                  </div>
                  <button
                    onClick={() => {
                      reset()
                      setReference(null)
                    }}
                    className="cursor-pointer text-sm font-semibold text-cocoa-soft underline underline-offset-4 hover:text-terracotta"
                  >
                    Submit another inquiry
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" exit={{ opacity: 0 }} onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5">
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-cocoa">Order inquiry form</h3>
                    <p className="mt-1 text-xs text-cocoa-soft">All fields marked * are required</p>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full name *" error={errors.fullName?.message}>
                      <input {...register('fullName')} placeholder="Your full name" autoComplete="name" className={inputClass} />
                    </Field>
                    <Field label="Company / Restaurant *" error={errors.company?.message}>
                      <input {...register('company')} placeholder="Your business name" autoComplete="organization" className={inputClass} />
                    </Field>
                    <Field label="Email address *" error={errors.email?.message}>
                      <input {...register('email')} type="email" placeholder="you@business.com" autoComplete="email" className={inputClass} />
                    </Field>
                    <Field label="Phone number *" error={errors.phone?.message}>
                      <input {...register('phone')} type="tel" placeholder="+1 234 567 8900" autoComplete="tel" className={inputClass} />
                    </Field>
                  </div>

                  <Field label="Delivery country *" error={errors.country?.message}>
                    <Select {...register('country')} defaultValue="">
                      <option value="" disabled>Select a country</option>
                      {countries.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </Select>
                  </Field>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Product interest *" error={errors.product?.message}>
                      <Select {...register('product')} defaultValue="">
                        <option value="" disabled>Select product</option>
                        {productOptions.map((o) => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </Select>
                    </Field>
                    <Field label="Quantity *" error={errors.quantity?.message}>
                      <Select {...register('quantity')} defaultValue="">
                        <option value="" disabled>Select quantity</option>
                        {quantityOptions.map((o) => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </Select>
                    </Field>
                  </div>

                  <Field label="Additional message" optional>
                    <textarea
                      {...register('message')}
                      rows={4}
                      placeholder="Tell us about your needs, delivery timeline, or any questions…"
                      className={`${inputClass} h-auto resize-none py-3`}
                    />
                  </Field>

                  <ClayButton type="submit" size="lg" disabled={isSubmitting} className="w-full">
                    <Send size={18} />
                    {isSubmitting ? 'Sending…' : 'Send Inquiry'}
                  </ClayButton>
                  <p className="text-center text-xs text-cocoa-soft">
                    By submitting you agree to be contacted by our export team. No spam — ever.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
