'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Phone, Mail, MessageCircle,
  MapPin, Clock, CheckCircle,
  Send, ArrowRight,
} from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input }    from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// ─── Zod validation schema ─────────────────────────────────────────
const inquirySchema = z.object({
  fullName:  z.string().min(2,  'Full name is required'),
  company:   z.string().min(2,  'Company name is required'),
  email:     z.string().email(  'Please enter a valid email'),
  phone:     z.string().min(7,  'Phone number is required'),
  country:   z.string().min(2,  'Country is required'),
  product:   z.string().min(1,  'Please select a product'),
  quantity:  z.string().min(1,  'Quantity is required'),
  message:   z.string().optional(),
})

type InquiryFormData = z.infer<typeof inquirySchema>

// ─── Animation variants ────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0,
            transition: { duration: 0.6, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.12 } },
}

// ─── Contact info items ────────────────────────────────────────────
const contactItems = [
  {
    icon:  Phone,
    label: 'Phone',
    value: '+251 911 234 567',
    href:  'tel:+251911234567',
  },
  {
    icon:  Mail,
    label: 'Email',
    value: 'orders@habeshaharves.com',
    href:  'mailto:orders@habeshaharves.com',
  },
  {
    icon:  MessageCircle,
    label: 'WhatsApp',
    value: '+251 911 234 567',
    href:  'https://wa.me/251911234567',
  },
  {
    icon:  MapPin,
    label: 'Address',
    value: 'Bole Sub-city, Addis Ababa, Ethiopia',
    href:  '#',
  },
]

// ─── Product options ───────────────────────────────────────────────
const productOptions = [
  { value: 'classic-teff',  label: 'Classic Teff Injera'  },
  { value: 'mixed-grain',   label: 'Mixed Grain Injera'   },
  { value: 'jumbo-export',  label: 'Jumbo Export Rolls'   },
  { value: 'not-sure',      label: 'Not Sure Yet'         },
]

// ─── Quantity options ──────────────────────────────────────────────
const quantityOptions = [
  { value: '10-50',    label: '10 – 50 kg'          },
  { value: '50-200',   label: '50 – 200 kg'         },
  { value: '200-500',  label: '200 – 500 kg'        },
  { value: '500-1000', label: '500 kg – 1 ton'      },
  { value: '1000+',    label: '1 ton+ (bulk)'       },
]

// ─── Shared dark input style (reused on every field) ───────────────
const darkInput = `
  bg-white/8 border border-white/15
  text-white placeholder:text-white/30
  focus:border-gold focus:ring-gold/20
  rounded-xl font-body
`

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  // ─── Form setup ─────────────────────────────────────────────────
  const form = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      fullName: '',
      company:  '',
      email:    '',
      phone:    '',
      country:  '',
      product:  '',
      quantity: '',
      message:  '',
    },
  })

  const onSubmit = (data: InquiryFormData) => {
    console.log('Inquiry submitted:', data)
    // In production: POST to /api/inquiries
    setSubmitted(true)
  }

  return (
    <section
      id="contact"
      className="bg-espresso py-20 px-8 sm:px-12 lg:px-16
                 relative overflow-hidden"
    >

      {/* ── Decorative background blobs ──────────────────────── */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px]
                      bg-terracotta/8 rounded-full blur-3xl
                      pointer-events-none translate-x-1/2
                      -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px]
                      bg-gold/5 rounded-full blur-3xl
                      pointer-events-none -translate-x-1/2
                      translate-y-1/2" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* ── Section header ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-bold uppercase
                           tracking-widest text-gold/60 font-body mb-3">
            Get In Touch
          </span>
          <h2 className="font-display font-bold text-white
                         text-3xl md:text-5xl">
            Start Your Order
          </h2>
          <div className="w-16 h-1 bg-gold rounded-full
                          mx-auto mt-4" />
          <p className="text-white/40 text-sm font-body
                        mt-4 max-w-md mx-auto leading-relaxed">
            Fill out the form below and our export team will
            send you a detailed quote within 24 hours.
          </p>
        </motion.div>

        {/* ── Two column layout ────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr]
                        gap-12 lg:gap-16 items-start">

          {/* ════════════════════════════════════════════════════
              LEFT — Contact info panel
              ════════════════════════════════════════════════════ */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >

            {/* Contact items */}
            {contactItems.map(({ icon: Icon, label, value, href }) => (
              <motion.a
                key={label}
                variants={fadeUp}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="flex items-center gap-4 group
                           cursor-pointer"
              >
                {/* Icon circle */}
                <div className="w-12 h-12 rounded-2xl
                                bg-white/8 border border-white/10
                                flex items-center justify-center
                                flex-shrink-0
                                group-hover:bg-terracotta
                                group-hover:border-terracotta
                                transition-all duration-300">
                  <Icon size={18} className="text-gold
                                             group-hover:text-white
                                             transition-colors
                                             duration-300" />
                </div>

                {/* Text */}
                <div>
                  <p className="text-white/40 text-xs font-body
                                uppercase tracking-wider mb-0.5">
                    {label}
                  </p>
                  <p className="text-white font-body font-bold
                                text-sm group-hover:text-gold
                                transition-colors duration-300">
                    {value}
                  </p>
                </div>
              </motion.a>
            ))}

            {/* ── 24hr response badge ────────────────────────── */}
            <motion.div
              variants={fadeUp}
              className="mt-2 bg-white/5 border border-white/10
                         rounded-2xl p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <Clock size={16} className="text-gold" />
                <p className="text-white font-bold font-body text-sm">
                  24 Hour Response Guarantee
                </p>
              </div>
              <p className="text-white/40 text-xs font-body
                            leading-relaxed">
                Our export team responds to every inquiry within
                24 hours, Monday through Saturday.
                Orders confirmed within 48 hours.
              </p>
            </motion.div>

            {/* ── World map dots visual ──────────────────────── */}
            <motion.div
              variants={fadeUp}
              className="bg-white/5 border border-white/10
                         rounded-2xl p-5 overflow-hidden relative"
            >
              <p className="text-white/40 text-xs font-body
                            uppercase tracking-wider mb-4">
                We Ship To
              </p>

              {/* Country chips */}
              <div className="flex flex-wrap gap-2">
                {[
                  'USA', 'UK', 'Canada', 'UAE',
                  'Sweden', 'Australia', 'Norway',
                  'Netherlands', 'Germany', '+6 more',
                ].map((country) => (
                  <span
                    key={country}
                    className="text-[11px] font-bold font-body
                               text-white/60 bg-white/8
                               border border-white/10
                               rounded-full px-3 py-1"
                  >
                    {country}
                  </span>
                ))}
              </div>
            </motion.div>

          </motion.div>

          {/* ════════════════════════════════════════════════════
              RIGHT — Order inquiry form
              ════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white/5 backdrop-blur-sm
                       border border-white/10 rounded-3xl
                       p-7 md:p-10"
          >

            {/* ── Success state ──────────────────────────────── */}
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1  }}
                className="flex flex-col items-center
                           justify-center py-16 text-center gap-5"
              >
                {/* Animated checkmark circle */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type:      'spring',
                    stiffness: 200,
                    delay:     0.1,
                  }}
                  className="w-20 h-20 rounded-full
                             bg-forest/20 border-2 border-forest
                             flex items-center justify-center"
                >
                  <CheckCircle size={36} className="text-forest" />
                </motion.div>

                <div>
                  <h3 className="font-display font-bold
                                 text-white text-2xl mb-2">
                    Inquiry Received!
                  </h3>
                  <p className="text-white/50 text-sm font-body
                                max-w-xs mx-auto leading-relaxed">
                    Thank you! Our export team will send you
                    a detailed quote within 24 hours.
                  </p>
                </div>

                {/* Reference number */}
                <div className="bg-white/5 border border-white/10
                                rounded-2xl px-6 py-4 text-center">
                  <p className="text-white/40 text-xs font-body mb-1">
                    Reference Number
                  </p>
                  <p className="text-gold font-display font-bold
                                text-xl tracking-wider">
                    HH-{Math.random().toString(36)
                          .substring(2, 8).toUpperCase()}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setSubmitted(false)
                    form.reset()
                  }}
                  className="text-white/40 hover:text-white
                             text-sm font-body transition-colors
                             underline underline-offset-2"
                >
                  Submit another inquiry
                </button>
              </motion.div>

            ) : (

              /* ── Inquiry form ───────────────────────────── */
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >

                  {/* Form heading */}
                  <div className="mb-6">
                    <h3 className="font-display font-bold
                                   text-white text-xl">
                      Order Inquiry Form
                    </h3>
                    <p className="text-white/40 text-xs
                                  font-body mt-1">
                      All fields marked * are required
                    </p>
                  </div>

                  {/* Full Name + Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2
                                  gap-5">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/70
                                                font-bold text-sm
                                                font-body">
                            Full Name *
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your full name"
                              className={darkInput}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-400
                                                  text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/70
                                                font-bold text-sm
                                                font-body">
                            Company / Restaurant *
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your business name"
                              className={darkInput}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-400
                                                  text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Email + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2
                                  gap-5">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/70
                                                font-bold text-sm
                                                font-body">
                            Email Address *
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="your@email.com"
                              className={darkInput}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-400
                                                  text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/70
                                                font-bold text-sm
                                                font-body">
                            Phone Number *
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="+1 234 567 8900"
                              className={darkInput}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-400
                                                  text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Country */}
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/70
                                              font-bold text-sm
                                              font-body">
                          Country *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. United States"
                            className={darkInput}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400
                                                text-xs" />
                      </FormItem>
                    )}
                  />

                  {/* Product + Quantity */}
                  <div className="grid grid-cols-1 sm:grid-cols-2
                                  gap-5">

                    {/* Product select */}
                    <FormField
                      control={form.control}
                      name="product"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/70
                                                font-bold text-sm
                                                font-body">
                            Product Interest *
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger
                                className={`${darkInput} w-full`}
                              >
                                <SelectValue
                                  placeholder="Select product"
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent
                              className="bg-espresso-light
                                         border border-white/10
                                         text-white"
                            >
                              {productOptions.map((opt) => (
                                <SelectItem
                                  key={opt.value}
                                  value={opt.value}
                                  className="hover:bg-white/10
                                             focus:bg-white/10
                                             cursor-pointer"
                                >
                                  {opt.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-red-400
                                                  text-xs" />
                        </FormItem>
                      )}
                    />

                    {/* Quantity select */}
                    <FormField
                      control={form.control}
                      name="quantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/70
                                                font-bold text-sm
                                                font-body">
                            Quantity *
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger
                                className={`${darkInput} w-full`}
                              >
                                <SelectValue
                                  placeholder="Select quantity"
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent
                              className="bg-espresso-light
                                         border border-white/10
                                         text-white"
                            >
                              {quantityOptions.map((opt) => (
                                <SelectItem
                                  key={opt.value}
                                  value={opt.value}
                                  className="hover:bg-white/10
                                             focus:bg-white/10
                                             cursor-pointer"
                                >
                                  {opt.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-red-400
                                                  text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Message */}
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/70
                                              font-bold text-sm
                                              font-body">
                          Additional Message
                          <span className="text-white/30
                                           font-normal ml-1">
                            (optional)
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your specific needs,
delivery timeline, or any questions..."
                            rows={4}
                            className={`${darkInput} resize-none`}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400
                                                text-xs" />
                      </FormItem>
                    )}
                  />

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="w-full bg-terracotta
                               hover:bg-terracotta-dark
                               text-white font-bold text-sm
                               py-4 rounded-full
                               transition-all duration-300
                               hover:shadow-xl
                               hover:shadow-terracotta/40
                               hover:-translate-y-0.5
                               active:translate-y-0
                               flex items-center justify-center
                               gap-2 disabled:opacity-50
                               disabled:cursor-not-allowed"
                  >
                    <Send size={15} />
                    Send Inquiry
                    <ArrowRight size={15} />
                  </button>

                  {/* Fine print */}
                  <p className="text-center text-white/25
                                text-xs font-body leading-relaxed">
                    By submitting you agree to be contacted by our
                    export team. No spam — ever.
                  </p>

                </form>
              </Form>
            )}

          </motion.div>
        </div>
      </div>
    </section>
  )
}