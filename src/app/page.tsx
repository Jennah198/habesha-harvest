import Navbar from '@/components/layout/Navbar'

export default function Home() {
  return (
    <main>
      <Navbar />

      {/* Temporary spacer so we can see the navbar */}
      <div
        id="home"
        className="min-h-screen bg-linen flex items-center justify-center"
      >
        <p className="font-display text-3xl text-terracotta">
          Habesha Harvest — Navbar Done ✓
        </p>
      </div>
    </main>
  )
}
