'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Send, CheckCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { testimonials } from '@/data/content'
import StarRating from '@/components/ui/StarRating'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

// ─── Zod validation schema ─────────────────────────────────────────
const feedbackSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  business: z.string().optional(),
  country: z.string().min(2, 'Please enter your country'),
  rating: z.number().min(1, 'Please select a rating').max(5),
  message: z.string().min(20, 'Message must be at least 20 characters'),
})

type FeedbackFormData = z.infer<typeof feedbackSchema>

// ─── Slide animation variants ──────────────────────────────────────
const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -60 : 60,
    opacity: 0,
    transition: { duration: 0.3 },
  }),
}

export default function Feedback() {
  // ─── Carousel state ──────────────────────────────────────────────
  const [activeIndex, setActiveIndex] = useState(0)
  // direction: 1 = going forward, -1 = going backward
  const [direction, setDirection] = useState(1)

  // ─── Form state ──────────────────────────────────────────────────
  const [rating, setRating] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  // ─── Auto-play carousel every 5 seconds ─────────────────────────
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setActiveIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1,
      )
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  // ─── Navigate carousel ───────────────────────────────────────────
  const goTo = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1)
    setActiveIndex(index)
  }

  const prev = () => {
    setDirection(-1)
    setActiveIndex((p) => (p === 0 ? testimonials.length - 1 : p - 1))
  }

  const next = () => {
    setDirection(1)
    setActiveIndex((p) => (p === testimonials.length - 1 ? 0 : p + 1))
  }

  // ─── Form setup ───────────────────────────────────────────────────
  const form = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      name: '',
      business: '',
      country: '',
      rating: 0,
      message: '',
    },
  })

  const onSubmit = (data: FeedbackFormData) => {
    console.log('Feedback submitted:', data)
    // In production: POST to /api/feedback
    setSubmitted(true)
  }

  const currentTestimonial = testimonials[activeIndex]

  return (
    <section
      id="feedback"
      className="bg-linen py-20 px-8 sm:px-12 lg:px-16
                 relative overflow-hidden"
    >
      {/* ── Decorative blobs ─────────────────────────────────────── */}
      <div
        className="absolute top-0 right-0 w-80 h-80
                      bg-terracotta/5 rounded-full blur-3xl
                      pointer-events-none translate-x-1/2
                      -translate-y-1/2"
      />
      <div
        className="absolute bottom-0 left-0 w-80 h-80
                      bg-gold/5 rounded-full blur-3xl
                      pointer-events-none -translate-x-1/2
                      translate-y-1/2"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* ════════════════════════════════════════════════════════
            TOP HALF — Testimonials carousel
            ════════════════════════════════════════════════════════ */}

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span
            className="inline-block text-xs font-bold uppercase
                           tracking-widest text-terracotta font-body mb-3"
          >
            Client Stories
          </span>
          <h2
            className="font-display font-bold text-warmBrown
                         text-3xl md:text-5xl"
          >
            What Our Partners Say
          </h2>
          <div
            className="w-16 h-1 bg-terracotta rounded-full
                          mx-auto mt-4"
          />
        </motion.div>

        {/* Carousel container */}
        <div className="max-w-2xl mx-auto">
          {/* Testimonial card with slide animation */}
          <div className="relative overflow-hidden">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="bg-white rounded-3xl p-8 md:p-10
                           shadow-xl shadow-warmBrown/8
                           border border-gray-100"
              >
                {/* Top row — stars + flag */}
                <div
                  className="flex items-center
                                justify-between mb-6"
                >
                  <StarRating
                    value={currentTestimonial.rating}
                    readonly
                    size="sm"
                  />
                  <span className="text-2xl">{currentTestimonial.flag}</span>
                </div>

                {/* Large decorative opening quote */}
                <div
                  className="font-display text-8xl
                                text-terracotta/15 leading-none
                                -mb-6 -mt-2 select-none"
                >
                  "
                </div>

                {/* Quote text */}
                <p
                  className="font-display italic text-warmBrown/75
                              text-lg leading-relaxed mb-6"
                >
                  {currentTestimonial.quote}
                </p>

                {/* Divider */}
                <div className="w-full h-px bg-gray-100 mb-6" />

                {/* Customer info row */}
                <div className="flex items-center gap-4">
                  {/* Avatar circle */}
                  <div
                    className="w-12 h-12 rounded-full
                                  bg-terracotta flex items-center
                                  justify-center flex-shrink-0
                                  shadow-md"
                  >
                    <span
                      className="text-white font-bold
                                     font-body text-sm"
                    >
                      {currentTestimonial.initials}
                    </span>
                  </div>

                  {/* Name + business */}
                  <div>
                    <p
                      className="font-bold text-warmBrown
                                  font-body text-sm"
                    >
                      {currentTestimonial.name}
                    </p>
                    <p
                      className="text-warmBrown/50 text-xs
                                  font-body mt-0.5"
                    >
                      {currentTestimonial.business} ·{' '}
                      {currentTestimonial.country}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Prev arrow */}
            <button
              onClick={prev}
              className="w-11 h-11 rounded-full border-2
                         border-terracotta/30 text-terracotta
                         flex items-center justify-center
                         hover:bg-terracotta hover:text-white
                         hover:border-terracotta
                         transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`rounded-full transition-all duration-300
                    ${
                      i === activeIndex
                        ? 'w-6 h-2.5 bg-terracotta'
                        : 'w-2.5 h-2.5 bg-terracotta/25 hover:bg-terracotta/50'
                    }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            {/* Next arrow */}
            <button
              onClick={next}
              className="w-11 h-11 rounded-full border-2
                         border-terracotta/30 text-terracotta
                         flex items-center justify-center
                         hover:bg-terracotta hover:text-white
                         hover:border-terracotta
                         transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* ── Divider between two halves ───────────────────────── */}
        <div className="w-full h-px bg-warmBrown/10 my-20" />

        {/* ════════════════════════════════════════════════════════
            BOTTOM HALF — Feedback form
            ════════════════════════════════════════════════════════ */}

        <div className="max-w-2xl mx-auto">
          {/* Form section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <span
              className="inline-block text-xs font-bold uppercase
                             tracking-widest text-terracotta
                             font-body mb-3"
            >
              Your Voice Matters
            </span>
            <h2
              className="font-display font-bold text-warmBrown
                           text-3xl md:text-4xl"
            >
              Share Your Experience
            </h2>
            <div
              className="w-16 h-1 bg-terracotta rounded-full
                            mx-auto mt-4"
            />
            <p
              className="text-warmBrown/50 text-sm font-body
                          mt-4 max-w-sm mx-auto"
            >
              Your feedback helps us serve our partners better. All reviews are
              verified before publishing.
            </p>
          </motion.div>

          {/* Form card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-white rounded-3xl p-8 md:p-10
                       shadow-xl shadow-warmBrown/8
                       border border-gray-100"
          >
            {/* ── Success state ─────────────────────────────── */}
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center
                           justify-center py-10 text-center gap-4"
              >
                <div
                  className="w-16 h-16 rounded-full
                                bg-forest/10 flex items-center
                                justify-center"
                >
                  <CheckCircle size={32} className="text-forest" />
                </div>
                <h3
                  className="font-display font-bold
                               text-warmBrown text-2xl"
                >
                  Thank You!
                </h3>
                <p
                  className="text-warmBrown/50 text-sm
                              font-body max-w-xs"
                >
                  Your feedback has been received and is under review. We
                  appreciate your time.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false)
                    form.reset()
                    setRating(0)
                  }}
                  className="mt-2 text-terracotta font-bold
                             text-sm font-body underline
                             underline-offset-2 hover:text-terracotta-dark
                             transition-colors"
                >
                  Submit another review
                </button>
              </motion.div>
            ) : (
              /* ── Feedback form ────────────────────────────── */
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  {/* Name + Business row */}
                  <div
                    className="grid grid-cols-1 sm:grid-cols-2
                                  gap-5"
                  >
                    {/* Name */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel
                            className="text-warmBrown
                                                font-bold text-sm
                                                font-body"
                          >
                            Your Name *
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Tigist Bekele"
                              className="rounded-xl border-gray-200
                                         focus:border-terracotta
                                         focus:ring-terracotta/20
                                         font-body text-warmBrown
                                         placeholder:text-gray-300"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    {/* Business */}
                    <FormField
                      control={form.control}
                      name="business"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel
                            className="text-warmBrown
                                                font-bold text-sm
                                                font-body"
                          >
                            Business / Restaurant
                            <span
                              className="text-warmBrown/40
                                             font-normal ml-1"
                            >
                              (optional)
                            </span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Blue Nile Restaurant"
                              className="rounded-xl border-gray-200
                                         focus:border-terracotta
                                         focus:ring-terracotta/20
                                         font-body text-warmBrown
                                         placeholder:text-gray-300"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
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
                        <FormLabel
                          className="text-warmBrown
                                              font-bold text-sm
                                              font-body"
                        >
                          Country *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. United States"
                            className="rounded-xl border-gray-200
                                       focus:border-terracotta
                                       focus:ring-terracotta/20
                                       font-body text-warmBrown
                                       placeholder:text-gray-300"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  {/* Star rating */}
                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          className="text-warmBrown
                                              font-bold text-sm
                                              font-body"
                        >
                          Your Rating *
                        </FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-3">
                            <StarRating
                              value={rating}
                              size="lg"
                              onChange={(val) => {
                                setRating(val)
                                field.onChange(val)
                              }}
                            />
                            {rating > 0 && (
                              <span
                                className="text-sm font-bold
                                               text-gold font-body"
                              >
                                {
                                  [
                                    '',
                                    'Poor',
                                    'Fair',
                                    'Good',
                                    'Great',
                                    'Excellent!',
                                  ][rating]
                                }
                              </span>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  {/* Message */}
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          className="text-warmBrown
                                              font-bold text-sm
                                              font-body"
                        >
                          Your Review *
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your experience with our injera..."
                            rows={4}
                            className="rounded-xl border-gray-200
                                       focus:border-terracotta
                                       focus:ring-terracotta/20
                                       font-body text-warmBrown
                                       placeholder:text-gray-300
                                       resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                        {/* Character count */}
                        <p
                          className="text-right text-xs
                                      text-warmBrown/30 font-body mt-1"
                        >
                          {field.value?.length ?? 0} / 20 min
                        </p>
                      </FormItem>
                    )}
                  />

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="w-full bg-terracotta
                               hover:bg-terracotta-dark text-white
                               font-bold text-sm py-4 rounded-full
                               transition-all duration-300
                               hover:shadow-lg
                               hover:shadow-terracotta/30
                               hover:-translate-y-0.5
                               active:translate-y-0
                               flex items-center justify-center
                               gap-2 disabled:opacity-60
                               disabled:cursor-not-allowed"
                  >
                    <Send size={15} />
                    Send Feedback
                  </button>

                  <p
                    className="text-center text-warmBrown/30
                                text-xs font-body"
                  >
                    Reviews are moderated before publishing. Usually approved
                    within 48 hours.
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
