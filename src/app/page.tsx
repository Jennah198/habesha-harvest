import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import Categories from '@/components/sections/Categories'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Categories />

      {/* placeholder */}
      <div className="h-screen bg-linen flex items-center justify-center">
        <p className="font-display text-2xl text-terracotta">
          Product Showcase coming next...
        </p>
      </div>
    </main>
  )
}
