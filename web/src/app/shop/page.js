// Built by Rakshita Dogra — SugarNest Cookie Co. © 2025
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CookieGrid from '@/components/CookieGrid'
import { demoProducts, demoSettings } from '@/lib/demoData'

export const metadata = {
  title: "Shop — All Cookies | SugarNest Cookie Co.",
  description: 'Browse all our freshly baked cookies. Menu changes every season!',
}

export default async function ShopPage() {
  let products = demoProducts
  let settings = demoSettings

  try {
    const [productsRes, settingsRes] = await Promise.all([
      fetch('http://localhost:4000/api/products', { cache: 'no-store' }),
      fetch('http://localhost:4000/api/settings', { cache: 'no-store' }),
    ])
    const productsData = await productsRes.json()
    const settingsData = await settingsRes.json()
    products = productsData.products ?? products
    settings = settingsData.settings ?? settings
  } catch (error) {
    console.warn('Using demo shop data because API is not available.')
  }

  // Split into two sections
  const originals = products.filter(p => !p.isCultureDrop)
  const cultureDrops = products.filter(p => p.isCultureDrop)

  return (
    <main>
      <Navbar />

      {/* Magazine-style hero */}
      <section style={{
        backgroundColor: '#3B1F0E',
        padding: 'clamp(48px, 8vw, 80px) 24px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{
            fontSize: '10px',
            color: '#D4A853',
            letterSpacing: '4px',
            fontWeight: '700',
            marginBottom: '16px',
          }}>
            ★ FRESH BAKED DAILY · WINNIPEG ★
          </div>

          <h1 style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(2.2rem, 7vw, 4rem)',
            color: '#FAF6F1',
            margin: '0 0 16px',
            lineHeight: '1',
            fontWeight: '400',
          }}>
            This week's <em>cookies.</em>
          </h1>

          <p style={{
            color: '#C4A484',
            fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
            maxWidth: '500px',
            margin: '0 auto',
            lineHeight: '1.6',
          }}>
            Handcrafted fresh every day. Menu changes every season.
          </p>
        </div>

        <div style={{
          position: 'absolute',
          bottom: '-50px',
          right: '-50px',
          fontSize: 'clamp(10rem, 25vw, 18rem)',
          opacity: 0.05,
          lineHeight: 1,
          pointerEvents: 'none',
        }}>
          🍪
        </div>
      </section>

      {/* Price strip */}
      <div style={{
        backgroundColor: '#E8D5C4',
        padding: '16px 24px',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        gap: 'clamp(20px, 5vw, 48px)',
        flexWrap: 'wrap',
      }}>
        <span style={{ color: '#3B1F0E', fontWeight: '600', fontSize: '0.9rem' }}>
          Single Cookie — $6.25
        </span>
        <span style={{ color: '#C4622D', fontWeight: '700', fontSize: '0.9rem' }}>
          Box of 4 — $25.00 (Best Value!)
        </span>
        <span style={{ color: '#3B1F0E', fontWeight: '600', fontSize: '0.9rem' }}>
          Free shipping over $35
        </span>
      </div>

      {/* Originals Section */}
      {originals.length > 0 && (
        <section style={{
          padding: 'clamp(48px, 6vw, 72px) 24px clamp(24px, 4vw, 40px)',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          <div style={{ marginBottom: '32px' }}>
            <div style={{
              fontSize: '10px',
              color: '#C4622D',
              letterSpacing: '3px',
              fontWeight: '700',
              marginBottom: '12px',
              textTransform: 'uppercase',
            }}>
              ★ The Originals ★
            </div>
            <h2 style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(2rem, 5vw, 2.8rem)',
              color: '#3B1F0E',
              margin: '0 0 8px',
              lineHeight: '1',
              fontWeight: '400',
            }}>
              The classics, <em>always.</em>
            </h2>
            <p style={{
              color: '#5A4030',
              fontSize: 'clamp(0.9rem, 2vw, 1rem)',
              margin: 0,
              maxWidth: '500px',
            }}>
              Five signature cookies, baked fresh every morning.
            </p>
          </div>

          <CookieGrid products={originals} />
        </section>
      )}

      {/* Culture Drops Section */}
      {cultureDrops.length > 0 && (
        <section style={{
          padding: 'clamp(40px, 6vw, 72px) 24px clamp(48px, 8vw, 80px)',
          maxWidth: '1200px',
          margin: '0 auto',
          borderTop: '1px dashed #C4A484',
          marginTop: 'clamp(24px, 4vw, 40px)',
        }}>
          <div style={{ marginBottom: '32px', paddingTop: 'clamp(32px, 4vw, 48px)' }}>
            <div style={{
              fontSize: '10px',
              color: '#D4A853',
              letterSpacing: '3px',
              fontWeight: '700',
              marginBottom: '12px',
              textTransform: 'uppercase',
            }}>
              ★ Culture Drops · Limited ★
            </div>
            <h2 style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(2rem, 5vw, 2.8rem)',
              color: '#3B1F0E',
              margin: '0 0 8px',
              lineHeight: '1',
              fontWeight: '400',
            }}>
              Flavors from <em>around the world.</em>
            </h2>
            <p style={{
              color: '#5A4030',
              fontSize: 'clamp(0.9rem, 2vw, 1rem)',
              margin: 0,
              maxWidth: '500px',
            }}>
              Limited-edition cookies inspired by global traditions. Here this season only.
            </p>
          </div>

          <CookieGrid products={cultureDrops} />
        </section>
      )}

      <Footer settings={settings} />
    </main>
  )
}