'use client'
// Built by Rakshita Dogra — SugarNest Cookiez © 2025
import Link from 'next/link'

export default function SubscriptionTeaser() {
  const perks = [
    'Early access to new flavors',
    'Free cookie every 5th box',
    'Invites to tastings & parties',
    '50 to 150+ cookies per box',
  ]

  const plans = [
    { name: "Baker's Dozen", count: '50 Cookies', price: '$72.25/box', savings: 'SAVE 15%' },
    { name: 'Party Pack', count: '100 Cookies', price: '$130.00/box', savings: 'SAVE 30%', best: true },
    { name: 'Family Box', count: '150 Cookies', price: '$185.00/box', savings: 'SAVE 25%' },
  ]

  return (
    <section style={{
      padding: 'clamp(48px, 8vw, 80px) 24px',
      backgroundColor: '#FAF6F1',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: '#3B1F0E',
        padding: 'clamp(36px, 6vw, 56px) clamp(24px, 5vw, 48px)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 'clamp(32px, 5vw, 48px)',
        alignItems: 'center',
      }}>
        {/* Left — Text + Perks */}
        <div>
          <div style={{
            fontSize: '10px',
            color: '#D4A853',
            letterSpacing: '3px',
            fontWeight: '700',
            marginBottom: '14px',
          }}>
            ★ MONTHLY SUBSCRIPTION ★
          </div>

          <h2 style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
            color: '#FAF6F1',
            margin: '0 0 14px',
            lineHeight: '1',
            fontWeight: '400',
          }}>
            SugarNest <em>Premium</em><br />Cookie Box.
          </h2>

          <p style={{
            color: '#C4A484',
            fontSize: 'clamp(0.9rem, 2vw, 1rem)',
            lineHeight: '1.6',
            margin: '0 0 24px',
            maxWidth: '440px',
          }}>
            Freshly baked cookies delivered weekly. Choose your quantity, pick your delivery day, enjoy member perks.
          </p>

          <div style={{ marginBottom: '28px' }}>
            {perks.map((perk, i) => (
              <div key={perk} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '10px',
                color: '#E8D5C4',
                fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
              }}>
                <span style={{
                  color: '#D4A853',
                  fontFamily: 'Georgia, serif',
                  fontStyle: 'italic',
                  fontSize: '18px',
                  minWidth: '28px',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{perk}</span>
              </div>
            ))}
          </div>

          <Link href="/subscription" style={{
            backgroundColor: '#C4622D',
            color: '#FAF6F1',
            padding: '15px 32px',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '12px',
            letterSpacing: '2.5px',
            display: 'inline-block',
          }}>
            SUBSCRIBE NOW →
          </Link>
        </div>

        {/* Right — Plans */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}>
          {plans.map((plan) => (
            <Link
              key={plan.name}
              href="/subscription"
              style={{
                backgroundColor: plan.best ? '#C4622D' : '#FAF6F1',
                color: plan.best ? '#FAF6F1' : '#3B1F0E',
                padding: 'clamp(14px, 3vw, 18px) clamp(16px, 3vw, 22px)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                textDecoration: 'none',
                position: 'relative',
                borderLeft: plan.best ? '3px solid #D4A853' : '3px solid transparent',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(4px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
            >
              {plan.best && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '14px',
                  background: '#D4A853',
                  color: '#2A1408',
                  padding: '3px 10px',
                  fontSize: '9px',
                  fontWeight: '700',
                  letterSpacing: '2px',
                }}>
                  ★ BEST
                </span>
              )}

              <div>
                <div style={{
                  fontWeight: '700',
                  fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)',
                  marginBottom: '2px',
                }}>
                  {plan.name}
                </div>
                <div style={{
                  fontSize: 'clamp(0.8rem, 2vw, 0.85rem)',
                  opacity: plan.best ? 0.9 : 0.7,
                }}>
                  {plan.count}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 'clamp(1.05rem, 2.5vw, 1.2rem)',
                  marginBottom: '2px',
                }}>
                  {plan.price}
                </div>
                <div style={{
                  fontSize: '9px',
                  fontWeight: '700',
                  letterSpacing: '1.5px',
                  color: plan.best ? '#FAF6F1' : '#C4622D',
                }}>
                  {plan.savings}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}