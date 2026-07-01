'use client'
// Built by Rakshita Dogra — SugarNest Cookiez © 2025
import Link from 'next/link'
import { useState } from 'react'
import { useCartStore } from '@/store/cart'

export default function CookieCard({ product }) {
  const [hovered, setHovered] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const { addItem, isLoading } = useCartStore()

  const handle = product.shopifyHandle || product.handle
  const totalPrice = (product.price * quantity).toFixed(2)

  const handleAddToCart = async () => {
    if (product) await addItem(product, quantity)
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: '#E8D5C4',
        overflow: 'hidden',
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: hovered
          ? '0 12px 40px rgba(59,31,14,0.18)'
          : '0 4px 20px rgba(59,31,14,0.08)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.25s ease',
      }}
    >
      {/* Header bar — desktop only */}
      <div
        className="cookie-card-header"
        style={{
          padding: '14px 20px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{
          fontFamily: 'Georgia, serif',
          fontSize: '14px',
          color: '#3B1F0E',
          fontStyle: 'italic',
        }}>
          SugarNest
        </div>
        <div style={{
          fontSize: '9px',
          color: '#3B1F0E',
          letterSpacing: '2px',
          fontWeight: '700',
        }}>
          VOL 01 · ISSUE 03
        </div>
      </div>

      {/* Image area with overlapping title */}
      <div style={{
        position: 'relative',
        height: '280px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          fontSize: 'clamp(7rem, 18vw, 12rem)',
          lineHeight: 1,
        }}>
          🍪
        </div>

        {/* Title overlapping the cookie */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          fontFamily: 'Georgia, serif',
          fontSize: 'clamp(2rem, 5.5vw, 2.6rem)',
          color: '#3B1F0E',
          lineHeight: '0.9',
          fontWeight: '400',
          maxWidth: '70%',
        }}>
          {product.title.split(' ').map((word, i, arr) =>
            i === arr.length - 1 ? (
              <span key={i}><br /><em>{word}</em></span>
            ) : i === 0 ? (
              <span key={i}>{word}</span>
            ) : (
              <span key={i}> {word}</span>
            )
          )}
        </div>

        {/* Tilted limited badge */}
        {product.isLimitedEdition && (
          <div style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            backgroundColor: '#C4622D',
            color: '#FAF6F1',
            padding: '6px 12px',
            fontSize: '10px',
            fontWeight: '700',
            letterSpacing: '2px',
            transform: 'rotate(-4deg)',
          }}>
            ★ LIMITED
          </div>
        )}

        {product.tags?.includes('culture-drop') && !product.isLimitedEdition && (
          <div style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            backgroundColor: '#D4A853',
            color: '#3B1F0E',
            padding: '6px 12px',
            fontSize: '10px',
            fontWeight: '700',
            letterSpacing: '2px',
            transform: 'rotate(-4deg)',
          }}>
            ★ CULTURE DROP
          </div>
        )}
      </div>

      {/* Dark info section */}
      <div style={{
        backgroundColor: '#3B1F0E',
        color: '#FAF6F1',
        padding: '20px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}>
        <p style={{
          fontSize: '13px',
          lineHeight: '1.5',
          margin: '0 0 14px',
          opacity: 0.92,
        }}>
{product.descriptor || product.description}
        </p>

        {product.allergens?.length > 0 && (
          <p style={{
            fontSize: '10px',
            color: '#C4A484',
            margin: '0 0 14px',
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}>
            Contains: {product.allergens.join(', ')}
          </p>
        )}

        <div style={{ marginTop: 'auto' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '14px',
          }}>
            <span style={{
              fontFamily: 'Georgia, serif',
              fontSize: '26px',
            }}>
              ${product.price}
              <span style={{ fontSize: '11px', opacity: 0.6, marginLeft: '6px' }}>each</span>
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                style={{
                  width: '32px', height: '32px',
                  border: '1.5px solid #FAF6F1',
                  background: 'transparent',
                  color: '#FAF6F1',
                  cursor: 'pointer',
                  fontWeight: '700',
                  fontSize: '16px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                −
              </button>
              <span style={{
                fontWeight: '700',
                minWidth: '20px',
                textAlign: 'center',
                fontSize: '18px',
              }}>
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                style={{
                  width: '32px', height: '32px',
                  border: '1.5px solid #FAF6F1',
                  background: 'transparent',
                  color: '#FAF6F1',
                  cursor: 'pointer',
                  fontWeight: '700',
                  fontSize: '16px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isLoading}
            style={{
              width: '100%',
              backgroundColor: isLoading ? '#8B5E3C' : '#C4622D',
              color: '#FAF6F1',
              padding: '15px',
              border: 'none',
              fontWeight: '700',
              fontSize: '12px',
              letterSpacing: '2.5px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              marginBottom: '10px',
            }}
          >
            {isLoading ? 'ADDING...' : `ADD ${quantity} — $${totalPrice} →`}
          </button>

          <Link href={`/shop/${handle}`} style={{
            display: 'block',
            textAlign: 'center',
            color: '#C4A484',
            textDecoration: 'none',
            fontSize: '11px',
            letterSpacing: '2px',
            fontWeight: '600',
          }}>
            VIEW DETAILS · BOX OF 4 — $25
          </Link>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          .cookie-card-header {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}