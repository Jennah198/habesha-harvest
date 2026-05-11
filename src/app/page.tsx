import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import Categories from '@/components/sections/Categories'
import ProductShowcase from '@/components/sections/ProductShowcase'
import VideoSection from '@/components/sections/VideoSection'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Categories />
      <ProductShowcase />
      <VideoSection />

      {/* placeholder */}
      <div className="h-screen bg-linen flex items-center justify-center">
        <p className="font-display text-2xl text-terracotta">
          How To Order coming next...
        </p>
      </div>
    </main>
  )
}
