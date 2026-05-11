import { Product, Category, Testimonial, OrderStep, GalleryItem } from '@/types'

export const categories: Category[] = [
  {
    id: 'classic-teff',
    name: 'Classic Teff Injera',
    subtitle: 'Farm-fresh daily selections',
    info: '10 pieces/pack',
    buttonColor: 'bg-cta',
    buttonHover: 'hover:bg-green-600',
    image: '/images/injera.jpg',
  },
  {
    id: 'mixed-grain',
    name: 'Mixed Grain Injera',
    subtitle: 'Warm artisanal blend',
    info: '6 pieces/pack',
    buttonColor: 'bg-action',
    buttonHover: 'hover:bg-orange-600',
    image: '/images/injera.jpg',
  },
  {
    id: 'jumbo-export',
    name: 'Jumbo Export Rolls',
    subtitle: 'Vacuum-sealed for export',
    info: '10 pieces/pack',
    buttonColor: 'bg-gold',
    buttonHover: 'hover:bg-gold-dark',
    image: '/images/injera.jpg',
  },
]

export const products: Product[] = [
  {
    id: 'classic-teff',
    name: 'Classic Teff Injera',
    description:
      'Our flagship 100% teff injera. Traditionally fermented for 3 days, delivering the authentic sour taste and perfect spongy texture loved by Ethiopian families worldwide.',
    weightInfo: '500g · 10 pieces per pack',
    badge: 'Best Seller',
  },
  {
    id: 'mixed-grain',
    name: 'Mixed Grain Injera',
    description:
      'A milder blend of teff and barley — ideal for restaurants introducing injera to new customers. Softer flavor profile with the same traditional texture.',
    weightInfo: '500g · 10 pieces per pack',
    badge: 'Restaurant Favorite',
  },
  {
    id: 'jumbo-export',
    name: 'Jumbo Export Rolls',
    description:
      'Vacuum-sealed and nitrogen-flushed for maximum freshness. Purpose-built for international shipping — arrives at destination markets with full flavor intact.',
    weightInfo: '1kg · Bulk packs available',
    badge: 'Export Ready',
  },
]

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Selamawit Tesfaye',
    business: 'Blue Nile Restaurant',
    country: 'Washington D.C., USA',
    flag: '🇺🇸',
    rating: 5,
    quote:
      'Habesha Harvest injera tastes exactly like home. Our customers notice the quality difference immediately. We have been ordering for 3 years and will never switch.',
    initials: 'ST',
  },
  {
    id: '2',
    name: 'Mohammed Al-Rashid',
    business: 'Al Habesha Kitchen',
    country: 'Dubai, UAE',
    flag: '🇦🇪',
    rating: 5,
    quote:
      'Reliable delivery, consistent quality, and packaging that handles the journey from Addis to Dubai without any issues. Highly recommend for any Gulf-based restaurant.',
    initials: 'MA',
  },
  {
    id: '3',
    name: 'Tigist Bekele',
    business: 'Little Ethiopia',
    country: 'London, UK',
    flag: '🇬🇧',
    rating: 5,
    quote:
      'We tried four suppliers before finding Habesha Harvest. Nothing compares. The Classic Teff is 100% authentic and our entire diaspora community agrees.',
    initials: 'TB',
  },
]

export const stats = [
  { value: 20, suffix: '+', label: 'Years of Tradition' },
  { value: 15, suffix: '', label: 'Countries Served' },
  { value: 100, suffix: '%', label: 'Teff Sourced Locally' },
]

export const orderSteps: OrderStep[] = [
  {
    number: '01',
    iconName: 'ClipboardList',
    title: 'Submit Your Inquiry',
    description:
      'Fill out our order form with your product needs, quantity, and delivery country. Takes under 2 minutes.',
  },
  {
    number: '02',
    iconName: 'FileText',
    title: 'Receive a Custom Quote',
    description:
      'Our export team responds within 24 hours with pricing, shipping costs, and delivery dates.',
  },
  {
    number: '03',
    iconName: 'CheckCircle',
    title: 'Confirm & Pay Deposit',
    description:
      'Approve your quote and pay a 50% deposit to lock in your order via bank transfer.',
  },
  {
    number: '04',
    iconName: 'Truck',
    title: 'We Ship Worldwide',
    description:
      'Your injera is freshly packed, vacuum-sealed, and dispatched within 5 business days with tracking.',
  },
]

export const galleryItems: GalleryItem[] = [
  {
    id: '1',
    location: 'Washington D.C., USA',
    colorFrom: '#C8531A',
    colorTo: '#E8744A',
    height: 'h-72',
  },
  {
    id: '2',
    location: 'Dubai, UAE',
    colorFrom: '#2D5016',
    colorTo: '#3D6B1E',
    height: 'h-52',
  },
  {
    id: '3',
    location: 'London, UK',
    colorFrom: '#F5C842',
    colorTo: '#D4A520',
    height: 'h-64',
  },
  {
    id: '4',
    location: 'Toronto, Canada',
    colorFrom: '#1A1208',
    colorTo: '#2C1F0D',
    height: 'h-56',
  },
  {
    id: '5',
    location: 'Stockholm, Sweden',
    colorFrom: '#C8531A',
    colorTo: '#2D5016',
    height: 'h-72',
  },
  {
    id: '6',
    location: 'Sydney, Australia',
    colorFrom: '#F5C842',
    colorTo: '#C8531A',
    height: 'h-60',
  },
  {
    id: '7',
    location: 'Amsterdam, Netherlands',
    colorFrom: '#2D5016',
    colorTo: '#1A1208',
    height: 'h-64',
  },
  {
    id: '8',
    location: 'Oslo, Norway',
    colorFrom: '#E8744A',
    colorTo: '#F5C842',
    height: 'h-52',
  },
  {
    id: '9',
    location: 'Minneapolis, USA',
    colorFrom: '#1A1208',
    colorTo: '#C8531A',
    height: 'h-68',
  },
]
