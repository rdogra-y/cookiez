// Built by Rakshita Dogra — SugarNest Cookie Co. © 2025
import HeroSection from '@/components/HeroSection'
import CookiesSection from '@/components/CookiesSection'
import FomoSection from '@/components/FomoSection'
import ReviewsSection from '@/components/ReviewsSection'
import SubscriptionTeaser from '@/components/SubscriptionTeaser'
import CorporateSection from '@/components/CorporateSection'
import HowItWorks from '@/components/HowItWorks'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { demoProducts, demoSettings, demoReviews, demoDrop } from '@/lib/demoData'

export default async function HomePage() {
  let products = demoProducts.filter((p) => p.isFeatured).slice(0, 3)
  let settings = demoSettings
  let reviews = demoReviews
  let drop = demoDrop

  try {
    const [productsRes, settingsRes, reviewsRes, dropsRes] = await Promise.all([
      fetch('http://localhost:4000/api/products/featured', { cache: 'no-store' }),
      fetch('http://localhost:4000/api/settings', { cache: 'no-store' }),
      fetch('http://localhost:4000/api/reviews', { cache: 'no-store' }),
      fetch('http://localhost:4000/api/drops/active', { cache: 'no-store' }),
    ])

    const productsData = await productsRes.json()
    const settingsData = await settingsRes.json()
    const reviewsData = await reviewsRes.json()
    const dropsData = await dropsRes.json()

    products = (productsData.products || products).slice(0, 3)
    settings = settingsData.settings || settings
    reviews = reviewsData.reviews || reviews
    drop = dropsData.drop || drop
  } catch (error) {
    console.warn('Using demo homepage data because API is not available.')
  }

  return (
    <main>
      <Navbar />
      <HeroSection settings={settings} products={products} />
      <CookiesSection products={products} />
      <FomoSection drop={drop} />
      <HowItWorks />
      <ReviewsSection reviews={reviews} />
      <SubscriptionTeaser />
      <CorporateSection />
      <Footer settings={settings} />
    </main>
  )
}