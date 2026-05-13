import Navbar          from '@/components/layout/Navbar'
import Footer          from '@/components/layout/Footer'
import Hero            from '@/components/sections/Hero'
import Categories      from '@/components/sections/Categories'
import ProductShowcase from '@/components/sections/ProductShowcase'
import VideoSection    from '@/components/sections/VideoSection'
import HowToOrder      from '@/components/sections/HowToOrder'
import Gallery         from '@/components/sections/Gallery'
import Feedback        from '@/components/sections/Feedback'
import About           from '@/components/sections/About'
import ContactForm     from '@/components/sections/ContactForm'

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
      <About />
      <ContactForm />
      <Footer />
    </main>
  )
}