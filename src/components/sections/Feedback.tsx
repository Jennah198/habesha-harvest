'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Send, CheckCircle, Quote } from 'lucide-react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { testimonials } from '@/data/content'
import StarRating from '@/components/ui/StarRating'
import { ClayButton, Reveal, SectionHeader } from '@/components/ui/clay'
import { Field, inputClass } from '@/components/ui/form'

const feedbackSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  business: z.string().optional(),
  country: z.string().min(2, 'Please enter your country'),
  rating: z.number().min(1, 'Please select a rating').max(5),
  message: z.string().min(20, 'Message must be at least 20 characters'),
})
type FeedbackFormData = z.infer<typeof feedbackSchema>

const avatarTones = ['bg-blush', 'bg-butter', 'bg-mint']

export default function Feedback() {
  const [[index, dir], setSlide] = useState<[number, number]>([0, 0])
  const [paused, setPaused] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const go = (d: number) =>
    setSlide(([i]) => [(i + d + testimonials.length) % testimonials.length, d])

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => go(1), 6000)
    return () => clearInterval(t)
  }, [paused])

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: { name: '', business: '', country: '', rating: 0, message: '' },
  })

  const onSubmit = async (data: FeedbackFormData) => {
    // In production: POST to /api/feedback
    await new Promise((r) => setTimeout(r, 600))
    console.log('Feedback submitted:', data)
    setSubmitted(true)
  }

  const t = testimonials[index]

  return (
    <section id="feedback" className="section-pad">
      <div className="max-container">
        <SectionHeader
          eyebrow="Client stories"
          title={
            <>
              What our <span className="text-terracotta">partners</span> say
            </>
          }
        />

        {/* Carousel */}
        <div
          className="mx-auto max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="clay relative overflow-hidden bg-white p-8 sm:p-12">
            <span className="clay-sm absolute -left-2 -top-2 flex h-16 w-16 items-center justify-center rounded-full bg-gold">
              <Quote size={24} className="fill-cocoa text-cocoa" />
            </span>
            <div className="min-h-64 sm:min-h-52">
              <AnimatePresence mode="wait" custom={dir}>
                <motion.figure
                  key={t.id}
                  custom={dir}
                  initial={{ opacity: 0, x: dir >= 0 ? 60 : -60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: dir >= 0 ? -60 : 60 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center text-center"
                >
                  <StarRating value={t.rating} readonly size="md" />
                  <blockquote className="mt-5 font-display text-xl font-medium leading-relaxed text-cocoa sm:text-2xl">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <span className={`clay-sm flex h-12 w-12 items-center justify-center rounded-full font-bold text-cocoa ${avatarTones[index % 3]}`}>
                      {t.initials}
                    </span>
                    <span className="text-left leading-tight">
                      <span className="block font-bold text-cocoa">{t.name}</span>
                      <span className="text-sm text-cocoa-soft">
                        {t.business} · {t.flag} {t.country}
                      </span>
                    </span>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-5">
            <button onClick={() => go(-1)} aria-label="Previous testimonial" className="clay-btn flex h-12 w-12 cursor-pointer items-center justify-center bg-white text-cocoa [--clay-drop:rgb(150_95_55/0.3)]">
              <ChevronLeft size={20} />
            </button>
            <div className="clay-inset flex gap-2 rounded-full bg-clay px-3 py-2.5">
              {testimonials.map((x, i) => (
                <button
                  key={x.id}
                  onClick={() => setSlide([i, i > index ? 1 : -1])}
                  aria-label={`Show testimonial ${i + 1}`}
                  className={`h-2.5 cursor-pointer rounded-full transition-all ${i === index ? 'w-8 bg-terracotta' : 'w-2.5 bg-cocoa-soft/30'}`}
                />
              ))}
            </div>
            <button onClick={() => go(1)} aria-label="Next testimonial" className="clay-btn flex h-12 w-12 cursor-pointer items-center justify-center bg-white text-cocoa [--clay-drop:rgb(150_95_55/0.3)]">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Feedback form */}
        <Reveal className="clay mx-auto mt-20 grid max-w-5xl overflow-hidden bg-blush [--clay-drop:rgb(168_72_31/0.3)] lg:grid-cols-[1fr_1.5fr]">
          <div className="flex flex-col justify-center gap-3 p-8 sm:p-10">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-terracotta-dark">Your voice matters</span>
            <h3 className="font-display text-3xl font-semibold text-cocoa">Share your experience</h3>
            <p className="text-sm leading-relaxed text-cocoa-soft">
              Your feedback helps us serve our partners better. All reviews are read by our team
              in Addis Ababa.
            </p>
          </div>

          <div className="clay m-3 bg-cream p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-4 py-10 text-center"
                >
                  <span className="clay flex h-20 w-20 items-center justify-center rounded-full bg-mint">
                    <CheckCircle size={36} className="text-forest" />
                  </span>
                  <p className="font-display text-2xl font-semibold text-cocoa">Thank you!</p>
                  <p className="max-w-xs text-sm text-cocoa-soft">
                    Your feedback has been received and is under review. We appreciate you taking the time.
                  </p>
                  <button
                    onClick={() => {
                      reset()
                      setSubmitted(false)
                    }}
                    className="cursor-pointer text-sm font-semibold text-terracotta underline underline-offset-4"
                  >
                    Submit another review
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="grid gap-5"
                  noValidate
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Your name *" error={errors.name?.message}>
                      <input {...register('name')} placeholder="Full name" className={inputClass} />
                    </Field>
                    <Field label="Business" optional error={errors.business?.message}>
                      <input {...register('business')} placeholder="Restaurant or store" className={inputClass} />
                    </Field>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Country *" error={errors.country?.message}>
                      <input {...register('country')} placeholder="e.g. Canada" className={inputClass} />
                    </Field>
                    <Field label="Rating *" error={errors.rating?.message}>
                      <Controller
                        control={control}
                        name="rating"
                        render={({ field }) => (
                          <div className="clay-inset flex h-12 items-center bg-white/60 px-4">
                            <StarRating value={field.value} onChange={field.onChange} size="md" />
                          </div>
                        )}
                      />
                    </Field>
                  </div>
                  <Field label="Your message *" error={errors.message?.message}>
                    <textarea
                      {...register('message')}
                      rows={4}
                      placeholder="Tell us about the taste, packaging, delivery…"
                      className={`${inputClass} h-auto resize-none py-3`}
                    />
                  </Field>
                  <ClayButton type="submit" disabled={isSubmitting} className="w-full">
                    <Send size={16} />
                    {isSubmitting ? 'Sending…' : 'Send Feedback'}
                  </ClayButton>
                  <p className="text-center text-xs text-cocoa-soft">
                    Reviews are moderated before publishing — usually within 48 hours.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
