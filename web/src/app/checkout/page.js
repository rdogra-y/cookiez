'use client'

import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useCartStore, getCartCount } from '@/store/cart'

export default function CheckoutPage() {
  const { cart, clearCart } = useCartStore()
  const count = getCartCount(cart)
  const total = cart?.cost?.totalAmount?.amount || '0.00'

  return (
    <main>
      <Navbar />
      <section style={{
        minHeight: '65vh',
        padding: 'clamp(56px, 9vw, 96px) 24px',
        background: 'linear-gradient(135deg, #FAF6F1 0%, #E8D5C4 100%)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div style={{ fontSize: '4rem', marginBottom: '18px' }}>✅🍪</div>
          <div style={{ color: '#C4622D', fontSize: '11px', letterSpacing: '3px', fontWeight: '700', marginBottom: '14px', textTransform: 'uppercase' }}>
            Demo Checkout Complete
          </div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2.2rem, 7vw, 4.5rem)', color: '#3B1F0E', lineHeight: '0.95', fontWeight: '400', margin: '0 0 18px' }}>
            Your fake order is <em>done.</em>
          </h1>
          <p style={{ color: '#5A4030', fontSize: 'clamp(1rem, 2.4vw, 1.15rem)', lineHeight: '1.7', margin: '0 auto 28px', maxWidth: '540px' }}>
            This is a portfolio demo checkout. No Shopify store, payment gateway, or real order was connected.
            {count > 0 ? ` Your demo batch has ${count} cookie${count === 1 ? '' : 's'} for $${total}.` : ''}
          </p>

          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8D5C4', padding: '22px', margin: '0 auto 28px', maxWidth: '460px', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#3B1F0E' }}><strong>Order type</strong><span>Demo / Fake</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#3B1F0E' }}><strong>Payment</strong><span>Not collected</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#3B1F0E' }}><strong>Status</strong><span>Confirmed for demo</span></div>
          </div>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={clearCart} style={{ backgroundColor: '#C4622D', color: '#FAF6F1', padding: '15px 28px', border: 'none', fontWeight: '700', fontSize: '12px', letterSpacing: '2.5px', cursor: 'pointer' }}>CLEAR DEMO CART</button>
            <Link href="/shop" style={{ backgroundColor: '#3B1F0E', color: '#FAF6F1', padding: '15px 28px', textDecoration: 'none', fontWeight: '700', fontSize: '12px', letterSpacing: '2.5px' }}>BACK TO COOKIES →</Link>
          </div>
        </div>
      </section>
      <Footer settings={{}} />
    </main>
  )
}
