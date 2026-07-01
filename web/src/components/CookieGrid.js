'use client'

// Built by Rakshita Dogra — Happy's Cookiez © 2025

import CookieCard from '@/components/CookieCard'

export default function CookieGrid({ products }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px',
      padding: '0 24px',
      maxWidth: '1200px',
      margin: '0 auto',
    }}>
      {products.map((product) => (
        <CookieCard key={product.id} product={product} />
      ))}
    </div>
  )
}