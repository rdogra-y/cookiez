'use client'
// Built by Rakshita Dogra — SugarNest Cookie Co. © 2025
import Link from 'next/link'
import { useState } from 'react'

export default function Footer({ settings }) {
  const [mapHover, setMapHover] = useState(false)
  const [phoneCopied, setPhoneCopied] = useState(false)

  const address = "123 Sugar Street, Winnipeg, Manitoba R3C 0A1"
  const phone = '(204) 555-0188'
  const email = 'hello@sugarnestcookies.test'

  const encodedAddress = encodeURIComponent(address)
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`

  const handlePhoneClick = (e) => {
    const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)
    if (!isMobile) {
      e.preventDefault()
      navigator.clipboard.writeText(phone)
      setPhoneCopied(true)
      setTimeout(() => setPhoneCopied(false), 2000)
    }
  }

  return (
    <footer style={{
      backgroundColor: '#3B1F0E',
      padding: '64px 24px 32px',
      color: '#E8D5C4',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px',
          marginBottom: '48px',
        }}>
          <div>
            <h3 style={{
              fontFamily: 'Georgia, serif',
              fontSize: '1.5rem',
              color: '#FAF6F1',
              marginBottom: '16px',
            }}>
              SugarNest Cookie Co. 🍪
            </h3>
            <p style={{
              fontSize: '0.9rem',
              lineHeight: '1.7',
              color: '#E8D5C4',
              marginBottom: '16px',
            }}>
              Freshly baked happiness delivered to your door.
              Handcrafted with love in Winnipeg, Manitoba.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a href={settings?.instagram_url || '#'} target="_blank" rel="noopener noreferrer" style={socialStyle}>
                Instagram
              </a>
              <a href={settings?.tiktok_url || '#'} target="_blank" rel="noopener noreferrer" style={socialStyle}>
                TikTok
              </a>
            </div>
          </div>

          <div>
            <h4 style={footerHeading}>Shop</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link href="/shop" style={footerLink}>All Cookies</Link>
              <Link href="/subscription" style={footerLink}>Subscription Box</Link>
              <Link href="/corporate" style={footerLink}>Corporate Orders</Link>
            </div>
          </div>

          <div>
            <h4 style={footerHeading}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href={mapsLink} target="_blank" rel="noopener noreferrer" style={contactLink}>
                📍 {address}
              </a>
              <a
                href={`tel:${phone.replace(/\D/g, '')}`}
                onClick={handlePhoneClick}
                style={contactLink}
              >
                📞 {phoneCopied ? 'Copied to clipboard!' : phone}
              </a>
              <a href={`mailto:${email}`} style={contactLink}>
                ✉️ {email}
              </a>
            </div>
          </div>

          <div>
            <h4 style={footerHeading}>Hours</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { day: 'Monday', hours: settings?.hours_monday || 'Closed' },
                { day: 'Tue - Fri', hours: settings?.hours_tuesday || '9AM - 9PM' },
                { day: 'Saturday', hours: settings?.hours_saturday || '9AM - 5PM' },
                { day: 'Sunday', hours: settings?.hours_sunday || '9AM - 1PM' },
              ].map((h) => (
                <div key={h.day} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.85rem',
                  color: '#E8D5C4',
                }}>
                  <span>{h.day}</span>
                  <span style={{
                    color: h.hours === 'Closed' ? '#C4622D' : '#D4A853',
                    fontWeight: '500',
                  }}>
                    {h.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <h4 style={{ ...footerHeading, marginBottom: '16px' }}>Find Us</h4>
          <a
            href={mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setMapHover(true)}
            onMouseLeave={() => setMapHover(false)}
            style={{
              display: 'block',
              textDecoration: 'none',
              position: 'relative',
              height: '180px',
              overflow: 'hidden',
              borderRadius: '4px',
              border: `4px solid ${mapHover ? '#D4A853' : '#FAF6F1'}`,
              maxWidth: '480px',
              cursor: 'pointer',
              backgroundColor: '#FAF6F1',
              backgroundImage: `
                linear-gradient(90deg, transparent 49%, #C4A484 49%, #C4A484 51%, transparent 51%),
                linear-gradient(0deg, transparent 49%, #C4A484 49%, #C4A484 51%, transparent 51%)
              `,
              backgroundSize: '60px 60px',
              transform: mapHover ? 'translateY(-2px)' : 'translateY(0)',
              transition: 'all 0.2s ease',
              boxShadow: mapHover ? '0 8px 24px rgba(212,168,83,0.25)' : 'none',
            }}
          >
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: mapHover
                ? 'translate(-50%, -110%) rotate(-45deg) scale(1.1)'
                : 'translate(-50%, -100%) rotate(-45deg)',
              width: '38px',
              height: '38px',
              backgroundColor: '#C4622D',
              borderRadius: '50% 50% 50% 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 8px rgba(59,31,14,0.3)',
              transition: 'all 0.2s ease',
            }}>
              <div style={{
                width: '12px',
                height: '12px',
                backgroundColor: '#FAF6F1',
                borderRadius: '50%',
                transform: 'rotate(45deg)',
              }} />
            </div>

            <div style={{
              position: 'absolute',
              bottom: '12px',
              left: '12px',
              right: '12px',
              backgroundColor: mapHover ? '#C4622D' : 'rgba(59,31,14,0.92)',
              color: '#FAF6F1',
              padding: '10px 14px',
              fontSize: '11px',
              letterSpacing: '1.5px',
              fontWeight: '700',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              transition: 'background-color 0.2s ease',
            }}>
              <span>123 SUGAR STREET · WINNIPEG</span>
              <span>{mapHover ? 'OPENING...' : 'OPEN IN MAPS →'}</span>
            </div>
          </a>
        </div>

        <div style={{
          borderTop: '1px solid rgba(232,213,196,0.2)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '0.85rem',
          color: '#8B5E3C',
        }}>
          <span>© 2025 SugarNest Cookie Co.. Baked with Love in Winnipeg.</span>
          <span>Built by Rakshita Dogra</span>
        </div>
      </div>
    </footer>
  )
}

const footerHeading = {
  color: '#FAF6F1',
  fontWeight: '700',
  fontSize: '1rem',
  marginBottom: '16px',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
}

const footerLink = {
  color: '#E8D5C4',
  textDecoration: 'none',
  fontSize: '0.9rem',
  lineHeight: '1.5',
}

const contactLink = {
  color: '#E8D5C4',
  textDecoration: 'none',
  fontSize: '0.9rem',
  lineHeight: '1.5',
}

const socialStyle = {
  backgroundColor: 'rgba(232,213,196,0.1)',
  color: '#E8D5C4',
  padding: '8px 16px',
  borderRadius: '50px',
  textDecoration: 'none',
  fontSize: '0.85rem',
  fontWeight: '500',
}