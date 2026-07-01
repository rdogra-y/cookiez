'use client'
// Built by Rakshita Dogra — Happy's Cookiez © 2025
import Link from 'next/link'
import CookieCard from '@/components/CookieCard'

export default function CookiesSection({ products }) {
  return (
    <section style={{
      padding: 'clamp(48px, 8vw, 80px) 24px',
      maxWidth: '1200px',
      margin: '0 auto',
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 'clamp(32px, 5vw, 48px)' }}>
        <div style={{
          fontSize: '10px',
          color: '#C4622D',
          letterSpacing: '3px',
          fontWeight: '700',
          marginBottom: '14px',
          textTransform: 'uppercase',
        }}>
          ★ This Week's Menu ★
        </div>
        <h2 style={{
          fontFamily: 'Georgia, serif',
          fontSize: 'clamp(2rem, 5vw, 3.2rem)',
          color: '#3B1F0E',
          margin: '0 0 16px',
          lineHeight: '1',
          fontWeight: '400',
        }}>
          Three flavors, <em>baked fresh.</em>
        </h2>
        <p style={{
          color: '#5A4030',
          fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
          maxWidth: '500px',
          margin: '0 auto',
          lineHeight: '1.6',
        }}>
          Our menu changes every season — grab them while they're here.
        </p>
      </div>

      {/* Use new CookieCard for consistency */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px',
        marginBottom: '48px',
        alignItems: 'stretch',
      }}>
        {products?.map((product) => (
          <div key={product.id} style={{ display: 'flex' }}>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
              <CookieCard product={product} />
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div style={{ textAlign: 'center' }}>
        <Link href="/shop" style={{
          backgroundColor: '#3B1F0E',
          color: '#FAF6F1',
          padding: '15px 32px',
          textDecoration: 'none',
          fontWeight: '700',
          fontSize: '12px',
          letterSpacing: '2.5px',
          display: 'inline-block',
        }}>
          VIEW ALL COOKIES →
        </Link>
      </div>
    </section>
  )
}