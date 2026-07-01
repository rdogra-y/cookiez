'use client'
// Built by Rakshita Dogra — SugarNest Cookiez © 2025
import { useState, useEffect } from 'react'

export default function QRPromoPage() {
  const [email, setEmail] = useState('')
  const [step, setStep] = useState('enter')
  const [offer, setOffer] = useState(null)
  const [error, setError] = useState('')
  const [timeLeft, setTimeLeft] = useState(86400)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const hours = Math.floor(timeLeft / 3600)
  const minutes = Math.floor((timeLeft % 3600) / 60)
  const seconds = timeLeft % 60
  const pad = n => String(n).padStart(2, '0')

  const handleValidate = async () => {
    if (!email) {
      setError('Please enter your email address.')
      return
    }
    setStep('validating')
    setError('')
    try {
      const res = await fetch('http://localhost:4000/api/promo/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: 'HAPPYDROP', email }),
      })
      const data = await res.json()
      if (data.valid) {
        setOffer(data.offer)
        setStep('valid')
      } else {
        setError(data.error || 'This code is not valid.')
        setStep('enter')
      }
    } catch {
      setError('Could not connect. Please try again.')
      setStep('enter')
    }
  }

  const handleRedeem = async () => {
    try {
      await fetch('http://localhost:4000/api/promo/redeem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: 'HAPPYDROP', email }),
      })
      setStep('redeemed')
    } catch {
      setError('Could not redeem. Please try again.')
    }
  }

  const Timer = ({ darkBg }) => (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      gap: 'clamp(6px, 2vw, 10px)',
      marginBottom: '24px',
    }}>
      {[
        { value: pad(hours), label: 'HRS' },
        { value: pad(minutes), label: 'MIN' },
        { value: pad(seconds), label: 'SEC' },
      ].map(unit => (
        <div key={unit.label} style={{
          backgroundColor: darkBg ? '#FAF6F1' : '#E8D5C4',
          border: darkBg ? '2px solid #D4A853' : '2px solid transparent',
          padding: 'clamp(10px, 2.5vw, 14px) clamp(14px, 3vw, 20px)',
          minWidth: 'clamp(60px, 18vw, 80px)',
        }}>
          <div style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(1.5rem, 5vw, 2rem)',
            color: '#3B1F0E',
            lineHeight: '1',
            fontWeight: '400',
          }}>
            {unit.value}
          </div>
          <div style={{
            fontSize: '9px',
            color: '#8B5E3C',
            fontWeight: '700',
            letterSpacing: '2px',
            marginTop: '6px',
          }}>
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <main style={{
      minHeight: '100vh',
      backgroundColor: '#3B1F0E',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ghost cookie */}
      <div style={{
        position: 'absolute',
        bottom: '-80px',
        right: '-80px',
        fontSize: 'clamp(12rem, 30vw, 22rem)',
        opacity: 0.05,
        lineHeight: 1,
        pointerEvents: 'none',
      }}>
        🍪
      </div>

      <div style={{
        backgroundColor: '#FAF6F1',
        padding: 'clamp(32px, 6vw, 48px) clamp(24px, 5vw, 40px)',
        maxWidth: '480px',
        width: '100%',
        textAlign: 'center',
        position: 'relative',
        zIndex: 2,
      }}>
        {/* Header */}
        <div style={{
          paddingBottom: '20px',
          borderBottom: '1px dashed #C4A484',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '10px',
          color: '#3B1F0E',
          letterSpacing: '2px',
          fontWeight: '700',
        }}>
          <span style={{ fontFamily: 'Georgia, serif', fontSize: '14px', fontStyle: 'italic', letterSpacing: '0', fontWeight: '400' }}>
            SugarNest
          </span>
          <span>EXCLUSIVE OFFER</span>
        </div>

        {step === 'redeemed' ? (
          <>
            <div style={{ fontSize: 'clamp(3rem, 8vw, 4rem)', marginBottom: '16px' }}>🎉</div>
            <div style={{
              fontSize: '10px',
              color: '#C4622D',
              letterSpacing: '4px',
              fontWeight: '700',
              marginBottom: '14px',
            }}>
              ★ OFFER UNLOCKED ★
            </div>
            <h1 style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(1.6rem, 5vw, 2rem)',
              color: '#3B1F0E',
              margin: '0 0 16px',
              fontWeight: '400',
              lineHeight: '1.1',
            }}>
              You're <em>in.</em>
            </h1>
            <p style={{
              color: '#5A4030',
              lineHeight: '1.7',
              fontSize: 'clamp(0.9rem, 2vw, 0.95rem)',
              margin: '0 0 28px',
            }}>
              Your offer has been saved. Show this screen when ordering or mention your email at checkout.
            </p>
            <div style={{
              backgroundColor: '#3B1F0E',
              padding: 'clamp(20px, 4vw, 28px)',
              marginBottom: '28px',
            }}>
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(1.3rem, 4vw, 1.6rem)',
                fontStyle: 'italic',
                color: '#D4A853',
                marginBottom: '8px',
                lineHeight: '1.2',
              }}>
                5 cookies for $25 — 1 FREE
              </div>
              <div style={{
                color: '#C4A484',
                fontSize: '11px',
                letterSpacing: '1.5px',
                fontWeight: '700',
              }}>
                VALID FOR · {email.toUpperCase()}
              </div>
            </div>
            <a href="/shop" style={{
              display: 'block',
              backgroundColor: '#C4622D',
              color: '#FAF6F1',
              padding: '15px',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '12px',
              letterSpacing: '2.5px',
            }}>
              ORDER NOW →
            </a>
          </>
        ) : step === 'valid' ? (
          <>
            <div style={{ fontSize: 'clamp(3rem, 8vw, 4rem)', marginBottom: '16px' }}>🎊</div>
            <div style={{
              fontSize: '10px',
              color: '#C4622D',
              letterSpacing: '4px',
              fontWeight: '700',
              marginBottom: '14px',
            }}>
              ★ OFFER READY ★
            </div>
            <h1 style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(1.6rem, 5vw, 2rem)',
              color: '#3B1F0E',
              margin: '0 0 20px',
              fontWeight: '400',
              lineHeight: '1.1',
            }}>
              Your offer is <em>ready.</em>
            </h1>
            <div style={{
              backgroundColor: '#3B1F0E',
              padding: 'clamp(20px, 4vw, 28px)',
              marginBottom: '24px',
            }}>
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(1.3rem, 4vw, 1.6rem)',
                fontStyle: 'italic',
                color: '#D4A853',
                marginBottom: '8px',
                lineHeight: '1.2',
              }}>
                {offer?.offerText}
              </div>
              <div style={{
                color: '#C4A484',
                fontSize: '11px',
                letterSpacing: '1.5px',
                fontWeight: '700',
              }}>
                EXCLUSIVE FOR · {email.toUpperCase()}
              </div>
            </div>

            <Timer darkBg={true} />

            <button
              onClick={handleRedeem}
              style={{
                width: '100%',
                backgroundColor: '#C4622D',
                color: '#FAF6F1',
                padding: '16px',
                border: 'none',
                fontWeight: '700',
                fontSize: '12px',
                letterSpacing: '2.5px',
                cursor: 'pointer',
                marginBottom: '12px',
              }}
            >
              CLAIM THIS OFFER →
            </button>
            <p style={{
              fontSize: '10px',
              color: '#8B5E3C',
              letterSpacing: '1.5px',
              fontWeight: '600',
            }}>
              ONE USE PER EMAIL ADDRESS
            </p>
          </>
        ) : (
          <>
            <div style={{
              fontSize: '10px',
              color: '#C4622D',
              letterSpacing: '4px',
              fontWeight: '700',
              marginBottom: '16px',
            }}>
              ★ EXCLUSIVE 24-HOUR OFFER ★
            </div>

            <h1 style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(1.6rem, 5vw, 2rem)',
              color: '#3B1F0E',
              margin: '0 0 20px',
              fontWeight: '400',
              lineHeight: '1.1',
            }}>
              You've unlocked a <em>special deal.</em>
            </h1>

            <div style={{
              backgroundColor: '#3B1F0E',
              padding: 'clamp(20px, 4vw, 28px)',
              marginBottom: '24px',
            }}>
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(1.3rem, 4vw, 1.6rem)',
                fontStyle: 'italic',
                color: '#D4A853',
                marginBottom: '8px',
                lineHeight: '1.2',
              }}>
                5 cookies for $25 — 1 FREE
              </div>
              <div style={{
                color: '#C4A484',
                fontSize: '11px',
                letterSpacing: '1.5px',
                fontWeight: '700',
              }}>
                SCAN FROM YOUR DELIVERY BOX
              </div>
            </div>

            <Timer />

            <p style={{
              color: '#5A4030',
              margin: '0 0 16px',
              fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
            }}>
              Enter your email to claim this offer:
            </p>

            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleValidate()}
              style={{
                width: '100%',
                padding: '15px',
                border: '2px solid #E8D5C4',
                fontSize: '0.95rem',
                color: '#3B1F0E',
                marginBottom: '16px',
                outline: 'none',
                textAlign: 'center',
                fontFamily: 'inherit',
              }}
            />

            {error && (
              <p style={{
                color: '#C4622D',
                fontSize: '0.85rem',
                margin: '0 0 16px',
                fontWeight: '600',
              }}>
                {error}
              </p>
            )}

            <button
              onClick={handleValidate}
              disabled={step === 'validating'}
              style={{
                width: '100%',
                backgroundColor: step === 'validating' ? '#8B5E3C' : '#C4622D',
                color: '#FAF6F1',
                padding: '16px',
                border: 'none',
                fontWeight: '700',
                fontSize: '12px',
                letterSpacing: '2.5px',
                cursor: step === 'validating' ? 'not-allowed' : 'pointer',
                marginBottom: '12px',
              }}
            >
              {step === 'validating' ? 'CHECKING...' : 'UNLOCK MY OFFER →'}
            </button>

            <p style={{
              fontSize: '10px',
              color: '#8B5E3C',
              letterSpacing: '1.5px',
              fontWeight: '600',
            }}>
              ONE USE PER EMAIL · OFFER EXPIRES IN 24 HOURS
            </p>
          </>
        )}
      </div>
    </main>
  )
}