import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import Categories from '@/components/sections/Categories'
import ProductShowcase from '@/components/sections/ProductShowcase'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Categories />
      <ProductShowcase />

      {/* placeholder */}
      <div className="h-screen bg-espresso flex items-center justify-center">
        <p className="font-display text-2xl text-gold">
          Video Section coming next...
        </p>
      </div>
    </main>
  )
}
