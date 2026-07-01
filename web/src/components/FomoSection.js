'use client'
// Built by Rakshita Dogra — Happy's Cookiez © 2025
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function FomoSection({ drop }) {
  const [timeLeft, setTimeLeft] = useState(drop?.timeRemainingSeconds || 0)

  useEffect(() => {
    if (!drop) return
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [drop])

  const hours = Math.floor(timeLeft / 3600)
  const minutes = Math.floor((timeLeft % 3600) / 60)
  const seconds = timeLeft % 60

  const pad = (n) => String(n).padStart(2, '0')

  if (!drop) return null

  return (
    <section style={{
      backgroundColor: '#3B1F0E',
      padding: 'clamp(48px, 8vw, 80px) 24px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Magazine-style top tag */}
        <div style={{
          fontSize: '10px',
          letterSpacing: '4px',
          color: '#D4A853',
          fontWeight: '700',
          marginBottom: '16px',
        }}>
          ★ LIMITED · 24-HOUR DROP ★
        </div>

        {/* Title */}
        <h2 style={{
          fontFamily: 'Georgia, serif',
          fontSize: 'clamp(2rem, 6vw, 3.2rem)',
          color: '#FAF6F1',
          margin: '0 0 16px',
          lineHeight: '1',
          fontWeight: '400',
        }}>
          {drop.title}
        </h2>

        {/* Offer */}
        <p style={{
          fontFamily: 'Georgia, serif',
          fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
          fontStyle: 'italic',
          color: '#D4A853',
          margin: '0 0 8px',
        }}>
          {drop.offerText}
        </p>

        <p style={{
          color: '#C4A484',
          margin: '0 0 36px',
          fontSize: 'clamp(0.9rem, 2vw, 1rem)',
          lineHeight: '1.5',
        }}>
          {drop.urgencyText}
        </p>

        {/* Countdown */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'clamp(8px, 2vw, 16px)',
          marginBottom: '32px',
          flexWrap: 'wrap',
        }}>
          {[
            { value: pad(hours), label: 'Hours' },
            { value: pad(minutes), label: 'Minutes' },
            { value: pad(seconds), label: 'Seconds' },
          ].map((unit) => (
            <div key={unit.label} style={{
              backgroundColor: '#FAF6F1',
              padding: 'clamp(14px, 3vw, 22px) clamp(18px, 4vw, 30px)',
              minWidth: 'clamp(80px, 18vw, 110px)',
              border: '2px solid #D4A853',
            }}>
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(2rem, 6vw, 3rem)',
                fontWeight: '400',
                color: '#3B1F0E',
                lineHeight: '1',
              }}>
                {unit.value}
              </div>
              <div style={{
                fontSize: '9px',
                color: '#8B5E3C',
                marginTop: '8px',
                letterSpacing: '2px',
                fontWeight: '700',
              }}>
                {unit.label}
              </div>
            </div>
          ))}
        </div>

        {/* Spots remaining */}
        <p style={{
          color: '#C4A484',
          margin: '0 0 28px',
          fontSize: 'clamp(0.9rem, 2vw, 1rem)',
          letterSpacing: '1px',
        }}>
          Only <strong style={{ color: '#D4A853', fontSize: '1.2em' }}>
            {drop.spotsLeft}
          </strong> spots remaining
        </p>

        {/* CTA */}
        <Link href="/promo/qr-drop" style={{
          backgroundColor: '#C4622D',
          color: '#FAF6F1',
          padding: '16px 40px',
          textDecoration: 'none',
          fontWeight: '700',
          fontSize: '12px',
          letterSpacing: '2.5px',
          display: 'inline-block',
        }}>
          UNLOCK THIS OFFER →
        </Link>
      </div>

      {/* Ghost cookie at corner */}
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
  )
}