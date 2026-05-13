import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import Categories from '@/components/sections/Categories'
import ProductShowcase from '@/components/sections/ProductShowcase'
import VideoSection from '@/components/sections/VideoSection'
import HowToOrder from '@/components/sections/HowToOrder'
import Gallery from '@/components/sections/Gallery'
import Feedback from '@/components/sections/Feedback'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Categories />
      <ProductShowcase />
      <VideoSection />
      <HowToOrder />
      <Gallery />
      <Feedback />

      {/* placeholder */}
      <div className="h-screen bg-white flex items-center justify-center">
        <p className="font-display text-2xl text-terracotta">
          About coming next...
        </p>
      </div>
    </main>
  )
}
