export interface Product {
  id: string
  name: string
  description: string
  weightInfo: string
  badge: string
  image: string
}

export interface Category {
  id: string
  name: string
  subtitle: string
  info: string
  tone: 'mint' | 'blush' | 'butter' | 'sky' | 'lilac'
  image: string
}

export interface Testimonial {
  id: string
  name: string
  business: string
  country: string
  rating: number
  quote: string
  initials: string
}

export interface OrderStep {
  number: string
  iconName: string
  title: string
  description: string
}

export interface GalleryItem {
  id: string
  location: string
  colorFrom: string
  colorTo: string
  image: string
  height: string
}
