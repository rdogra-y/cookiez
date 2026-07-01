'use client'
// Built by Rakshita Dogra — SugarNest Cookie Co. © 2025
import { useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const close = () => setMenuOpen(false)

  return (
    <>
      <nav style={{
        backgroundColor: '#FAF6F1',
        borderBottom: '1px solid #E8D5C4',
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        {/* Logo */}
        <Link href="/" onClick={close} style={{
          fontFamily: 'Georgia, serif',
          fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
          fontWeight: 'bold',
          color: '#3B1F0E',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
        }}>
          SugarNest Cookie Co. 🍪
        </Link>

        {/* Desktop Links */}
        <div className="navbar-desktop" style={{
          display: 'flex',
          gap: '32px',
          alignItems: 'center',
        }}>
          <Link href="/shop" style={linkStyle}>Shop</Link>
          <Link href="/subscription" style={linkStyle}>Subscription</Link>
          <Link href="/corporate" style={linkStyle}>Corporate</Link>
          <Link href="/shop" style={orderBtnStyle}>Order Now</Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="navbar-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            flexDirection: 'column',
            gap: '5px',
          }}
        >
          <span style={{
            width: '24px',
            height: '2px',
            backgroundColor: '#3B1F0E',
            transition: 'all 0.3s',
            transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
          }}></span>
          <span style={{
            width: '24px',
            height: '2px',
            backgroundColor: '#3B1F0E',
            transition: 'all 0.3s',
            opacity: menuOpen ? 0 : 1,
          }}></span>
          <span style={{
            width: '24px',
            height: '2px',
            backgroundColor: '#3B1F0E',
            transition: 'all 0.3s',
            transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
          }}></span>
        </button>
      </nav>

      {/* Mobile menu drawer */}
      {menuOpen && (
        <>
          <div
            onClick={close}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.4)',
              zIndex: 98,
              top: '65px',
            }}
          />
          <div style={{
            position: 'fixed',
            top: '65px',
            left: 0,
            right: 0,
            backgroundColor: '#FAF6F1',
            zIndex: 99,
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            boxShadow: '0 8px 24px rgba(59,31,14,0.12)',
          }}>
            <Link href="/shop" onClick={close} style={mobileLinkStyle}>Shop</Link>
            <Link href="/subscription" onClick={close} style={mobileLinkStyle}>Subscription</Link>
            <Link href="/corporate" onClick={close} style={mobileLinkStyle}>Corporate</Link>
            <Link href="/shop" onClick={close} style={{
              ...orderBtnStyle,
              textAlign: 'center',
              marginTop: '16px',
              padding: '14px 24px',
            }}>
              Order Now
            </Link>
          </div>
        </>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .navbar-desktop {
            display: none !important;
          }
          .navbar-hamburger {
            display: flex !important;
          }
        }
      `}</style>
    </>
  )
}

const linkStyle = {
  color: '#3B1F0E',
  textDecoration: 'none',
  fontWeight: '500',
  fontSize: '0.95rem',
}

const mobileLinkStyle = {
  color: '#3B1F0E',
  textDecoration: 'none',
  fontWeight: '500',
  fontSize: '1.1rem',
  padding: '14px 0',
  borderBottom: '1px solid #E8D5C4',
}

const orderBtnStyle = {
  backgroundColor: '#C4622D',
  color: '#FAF6F1',
  padding: '10px 24px',
  borderRadius: '50px',
  textDecoration: 'none',
  fontWeight: '600',
  fontSize: '0.95rem',
}