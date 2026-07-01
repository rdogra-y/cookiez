'use client'
// Built by Rakshita Dogra — Happy's Cookiez © 2025
import Link from 'next/link'

export default function HeroSection({ settings, products = [] }) {
  // Fallback cookie names if products not loaded
  const cookieList = products.length > 0
    ? products.slice(0, 3)
    : [
        { title: 'The Happy', shopifyHandle: 'the-happy' },
        { title: 'Midnight in Kyiv', shopifyHandle: 'midnight-in-kyiv' },
        { title: "Baba's Apple Doughkie", shopifyHandle: 'babas-apple-doughkie' },
      ]

  return (
    <>
      {/* Main Hero Poster */}
      <section style={{
        backgroundColor: '#C4622D',
        color: '#FAF6F1',
        padding: 'clamp(40px, 8vw, 60px) clamp(20px, 5vw, 40px)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Top tagline */}
        <div style={{
          fontSize: '10px',
          letterSpacing: '4px',
          opacity: 0.85,
          marginBottom: '14px',
          fontWeight: '700',
        }}>
          ★ HAPPY'S COOKIEZ · WINNIPEG ★
        </div>

        {/* Massive italic headline */}
        <h1 style={{
          fontFamily: 'Georgia, serif',
          fontSize: 'clamp(2.5rem, 9vw, 5rem)',
          lineHeight: '0.92',
          margin: '0 0 18px',
          fontWeight: '400',
          maxWidth: '75%',
          position: 'relative',
          zIndex: 2,
        }}>
          {settings?.hero_headline || (
            <>
              Freshly<br />
              baked, <em>warm</em><br />
              at your door.
            </>
          )}
        </h1>

        {/* Description */}
        <p style={{
          fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
          lineHeight: '1.5',
          margin: '0 0 28px',
          maxWidth: '480px',
          opacity: 0.95,
          position: 'relative',
          zIndex: 2,
        }}>
          {settings?.hero_subtext || 'Three signature flavors. Hand-made every morning. Ordered before noon, on your doorstep by sunset.'}
        </p>

        {/* CTA Buttons */}
        <div style={{
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
          position: 'relative',
          zIndex: 2,
        }}>
          <Link href="/shop" style={{
            backgroundColor: '#3B1F0E',
            color: '#FAF6F1',
            padding: '14px 28px',
            fontWeight: '700',
            fontSize: '12px',
            letterSpacing: '2px',
            textDecoration: 'none',
            display: 'inline-block',
          }}>
            ORDER NOW →
          </Link>
          <Link href="/shop" style={{
            backgroundColor: 'transparent',
            border: '1.5px solid #FAF6F1',
            color: '#FAF6F1',
            padding: '14px 28px',
            fontWeight: '700',
            fontSize: '12px',
            letterSpacing: '2px',
            textDecoration: 'none',
            display: 'inline-block',
          }}>
            SEE COOKIES
          </Link>
        </div>

        {/* Ghost cookie at corner */}
        <div className="hero-cookie" style={{
          position: 'absolute',
          top: '20px',
          right: '-40px',
          fontSize: 'clamp(8rem, 20vw, 16rem)',
          opacity: 0.18,
          lineHeight: 1,
          pointerEvents: 'none',
        }}>
          🍪
        </div>
      </section>

      {/* Cookie Menu Strip */}
      <section style={{
        backgroundColor: '#3B1F0E',
        color: '#FAF6F1',
        padding: '18px 24px',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
        }}>
          {cookieList.map((cookie, i) => {
            const num = String(i + 1).padStart(2, '0')
            const handle = cookie.shopifyHandle || cookie.handle
            return (
              <Link
                key={cookie.title}
                href={`/shop/${handle}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '11px',
                  letterSpacing: '1.5px',
                  fontWeight: '700',
                  color: '#FAF6F1',
                  textDecoration: 'none',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                <span style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '20px',
                  fontStyle: 'italic',
                  color: '#D4A853',
                }}>
                  N° {num}
                </span>
                <span>{cookie.title}</span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Existing Price Info Strip */}
      <section style={{
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
      </section>
    </>
  )
}