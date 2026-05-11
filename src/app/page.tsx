import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />

      {/* placeholder so page has scroll room */}
      <div className="h-screen bg-white flex items-center justify-center">
        <p className="font-display text-2xl text-terracotta">
          Categories section coming next...
        </p>
      </div>
    </main>
  )
}
