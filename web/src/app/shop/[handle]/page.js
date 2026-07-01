'use client'
// Built by Rakshita Dogra — SugarNest Cookiez © 2025
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useCartStore } from '@/store/cart'
import { use } from 'react'
import { demoSettings, getDemoProduct } from '@/lib/demoData'

export default function CookiePage({ params }) {
  const { handle } = use(params)
  const [product, setProduct] = useState(null)
  const [settings, setSettings] = useState(demoSettings)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const { addItem, isLoading: addingToCart } = useCartStore()

  useEffect(() => {
    async function loadData() {
      try {
        const [productRes, settingsRes] = await Promise.all([
          fetch(`http://localhost:4000/api/products/${handle}`, { cache: 'no-store' }),
          fetch('http://localhost:4000/api/settings', { cache: 'no-store' }),
        ])
        const productData = await productRes.json()
        const settingsData = await settingsRes.json()
        setProduct(productData.product || getDemoProduct(handle))
        setSettings(settingsData.settings || demoSettings)
      } catch (err) {
        console.warn('Using demo detail data because API is not available.')
        setProduct(getDemoProduct(handle))
        setSettings(demoSettings)
      }
      setLoading(false)
    }
    loadData()
  }, [handle])

  const handleAddToCart = async () => {
    if (product) await addItem(product, quantity)
  }

  if (loading) {
    return (
      <main>
        <Navbar />
        <div style={{ textAlign: 'center', padding: '80px 24px', color: '#8B5E3C' }}>
          Loading...
        </div>
        <Footer settings={settings} />
      </main>
    )
  }

  if (!product) {
    return (
      <main>
        <Navbar />
        <div style={{
          textAlign: 'center',
          padding: 'clamp(48px, 8vw, 80px) 24px',
          minHeight: '50vh',
        }}>
          <div style={{ fontSize: 'clamp(3rem, 6vw, 4rem)', marginBottom: '20px' }}>🍪</div>
          <h1 style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
            color: '#3B1F0E',
            margin: '0 0 16px',
            fontWeight: '400',
          }}>
            Cookie not <em>found.</em>
          </h1>
          <Link href="/shop" style={{
            display: 'inline-block',
            backgroundColor: '#3B1F0E',
            color: '#FAF6F1',
            padding: '15px 32px',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '12px',
            letterSpacing: '2.5px',
          }}>
            BACK TO SHOP →
          </Link>
        </div>
        <Footer settings={settings} />
      </main>
    )
  }

  const totalPrice = (product.price * quantity).toFixed(2)
  const isCulture = product.isCultureDrop
  const topLabel = isCulture
    ? `★ FROM ${(product.cultureOrigin || '').toUpperCase()}`
    : '★ SIGNATURE FLAVOR'

  return (
    <main>
      <Navbar />

      {/* Breadcrumb */}
      <div style={{
        padding: '14px 24px',
        maxWidth: '1200px',
        margin: '0 auto',
        fontSize: '10px',
        color: '#8B5E3C',
        letterSpacing: '2px',
        fontWeight: '700',
        textTransform: 'uppercase',
      }}>
        <Link href="/" style={{ color: '#8B5E3C', textDecoration: 'none' }}>Home</Link>
        <span style={{ margin: '0 8px', color: '#C4A484' }}>/</span>
        <Link href="/shop" style={{ color: '#8B5E3C', textDecoration: 'none' }}>Shop</Link>
        <span style={{ margin: '0 8px', color: '#C4A484' }}>/</span>
        <span style={{ color: '#3B1F0E' }}>{product.title}</span>
      </div>

      {/* Product Section */}
      <section style={{
        padding: 'clamp(20px, 3vw, 32px) 24px clamp(48px, 8vw, 80px)',
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 'clamp(32px, 5vw, 64px)',
      }}>
        {/* Left — Image */}
        <div>
          <div style={{
            backgroundColor: '#E8D5C4',
            position: 'relative',
            aspectRatio: '1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              padding: '14px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '10px',
              color: '#3B1F0E',
              letterSpacing: '2px',
              fontWeight: '700',
              zIndex: 2,
            }}>
              <span style={{ fontFamily: 'Georgia, serif', fontSize: '14px', fontStyle: 'italic', letterSpacing: '0', fontWeight: '400' }}>
                SugarNest
              </span>
              <span>VOL 01 · ISSUE 03</span>
            </div>

            <div style={{
              fontSize: 'clamp(8rem, 25vw, 14rem)',
              lineHeight: 1,
            }}>
              🍪
            </div>

            <h1 style={{
              position: 'absolute',
              top: '50px',
              left: '24px',
              right: '24px',
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(1.6rem, 5vw, 3.4rem)',
              color: '#3B1F0E',
              lineHeight: '0.9',
              fontWeight: '400',
              maxWidth: '70%',
              margin: 0,
              zIndex: 2,
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
            </h1>

            {isCulture && (
              <div style={{
                position: 'absolute',
                bottom: '24px',
                right: '24px',
                backgroundColor: '#D4A853',
                color: '#3B1F0E',
                padding: '6px 14px',
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '2px',
                transform: 'rotate(-4deg)',
              }}>
                ★ CULTURE DROP
              </div>
            )}
            {!isCulture && product.isLimitedEdition && (
              <div style={{
                position: 'absolute',
                bottom: '24px',
                right: '24px',
                backgroundColor: '#C4622D',
                color: '#FAF6F1',
                padding: '6px 14px',
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '2px',
                transform: 'rotate(-4deg)',
              }}>
                ★ LIMITED
              </div>
            )}
          </div>
        </div>

        {/* Right — Details */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Top Label */}
          <div style={{
            fontSize: '10px',
            color: isCulture ? '#D4A853' : '#C4622D',
            letterSpacing: '3px',
            fontWeight: '700',
            marginBottom: '14px',
          }}>
            {topLabel}
          </div>

          {/* Title */}
          <h2 style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(1.8rem, 5vw, 2.4rem)',
            color: '#3B1F0E',
            margin: '0 0 14px',
            lineHeight: '1',
            fontWeight: '400',
          }}>
            {product.title}
          </h2>

          {/* Descriptor — short tagline always shown */}
          {product.descriptor && (
            <p style={{
              fontFamily: 'Georgia, serif',
              fontStyle: 'italic',
              color: '#5A4030',
              fontSize: 'clamp(1.05rem, 2.4vw, 1.2rem)',
              lineHeight: '1.5',
              margin: '0 0 24px',
            }}>
              {product.descriptor}
            </p>
          )}

          {/* Hook — for culture drops, big quote style */}
          {isCulture && product.hook && (
            <div style={{
              backgroundColor: '#3B1F0E',
              padding: 'clamp(20px, 3vw, 28px)',
              marginBottom: '24px',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute',
                top: '-12px',
                left: '20px',
                fontFamily: 'Georgia, serif',
                fontSize: '3.5rem',
                color: '#D4A853',
                lineHeight: '1',
                fontStyle: 'italic',
              }}>
                "
              </div>
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
                color: '#FAF6F1',
                fontStyle: 'italic',
                margin: '8px 0 0',
                lineHeight: '1.4',
              }}>
                {product.hook}
              </p>
            </div>
          )}

          {/* Story — for culture drops */}
          {isCulture && product.story && (
            <p style={{
              color: '#5A4030',
              fontSize: 'clamp(1rem, 2.2vw, 1.05rem)',
              lineHeight: '1.7',
              margin: '0 0 24px',
            }}>
              {product.story}
            </p>
          )}

          {/* Description — for originals only */}
          {!isCulture && product.description && (
            <p style={{
              color: '#5A4030',
              fontSize: 'clamp(1rem, 2.2vw, 1.05rem)',
              lineHeight: '1.7',
              margin: '0 0 24px',
            }}>
              {product.description}
            </p>
          )}

          {/* Storage Hint Badge */}
          {product.storageHint && (
            <div style={{
              backgroundColor: '#E8D5C4',
              padding: '14px 18px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              borderLeft: `3px solid ${product.storageHint === 'Serve Warm' ? '#C4622D' : '#5A8FA8'}`,
            }}>
              <span style={{ fontSize: '1.3rem' }}>
                {product.storageHint === 'Serve Warm' ? '🔥' : '❄️'}
              </span>
              <div>
                <div style={{
                  color: '#3B1F0E',
                  fontWeight: '700',
                  fontSize: '11px',
                  letterSpacing: '2px',
                  marginBottom: '2px',
                }}>
                  {product.storageHint.toUpperCase()}
                </div>
                <div style={{
                  color: '#5A4030',
                  fontSize: 'clamp(0.85rem, 2vw, 0.9rem)',
                }}>
                  {product.storageHint === 'Serve Warm'
                    ? 'Heat for 10 seconds in microwave for the full experience.'
                    : 'Keep refrigerated. Best enjoyed within 3 days.'}
                </div>
              </div>
            </div>
          )}

          {/* Allergens */}
          {product.allergens?.length > 0 && (
            <div style={{
              marginBottom: '24px',
              fontSize: '11px',
              color: '#8B5E3C',
              letterSpacing: '1.5px',
              fontWeight: '700',
              textTransform: 'uppercase',
            }}>
              Contains: {product.allergens.join(' · ')}
            </div>
          )}

          {/* Price + Quantity Row */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '20px',
            paddingBottom: '20px',
            borderTop: '1px dashed #C4A484',
            borderBottom: '1px dashed #C4A484',
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '16px',
          }}>
            <div>
              <div style={{
                fontSize: '9px',
                color: '#8B5E3C',
                letterSpacing: '2px',
                fontWeight: '700',
                marginBottom: '2px',
              }}>
                PRICE
              </div>
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
                color: '#3B1F0E',
                lineHeight: '1',
              }}>
                ${product.price}
                <span style={{
                  fontSize: '11px',
                  color: '#8B5E3C',
                  letterSpacing: '2px',
                  fontWeight: '700',
                  marginLeft: '8px',
                }}>
                  EACH
                </span>
              </div>
            </div>

            <div>
              <div style={{
                fontSize: '9px',
                color: '#8B5E3C',
                letterSpacing: '2px',
                fontWeight: '700',
                marginBottom: '4px',
                textAlign: 'right',
              }}>
                QUANTITY
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  style={{
                    width: '34px', height: '34px',
                    border: '1.5px solid #3B1F0E',
                    background: 'transparent',
                    color: '#3B1F0E',
                    cursor: 'pointer',
                    fontWeight: '700',
                    fontSize: '16px',
                  }}
                >
                  −
                </button>
                <span style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '1.4rem',
                  color: '#3B1F0E',
                  minWidth: '24px',
                  textAlign: 'center',
                  fontWeight: '400',
                }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  style={{
                    width: '34px', height: '34px',
                    border: '1.5px solid #3B1F0E',
                    background: 'transparent',
                    color: '#3B1F0E',
                    cursor: 'pointer',
                    fontWeight: '700',
                    fontSize: '16px',
                  }}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Box deal */}
          <div style={{
            backgroundColor: '#FAF6F1',
            border: '2px solid #C4622D',
            padding: 'clamp(10px, 2.5vw, 16px) clamp(12px, 3vw, 20px)',
            marginBottom: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '8px',
          }}>
            <div>
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(1rem, 2.5vw, 1.15rem)',
                color: '#3B1F0E',
                fontStyle: 'italic',
                marginBottom: '2px',
              }}>
                Box of 4 — best value
              </div>
              <div style={{
                fontSize: '11px',
                color: '#8B5E3C',
                letterSpacing: '1.5px',
                fontWeight: '600',
              }}>
                Mix and match any 4 cookies
              </div>
            </div>
            <div style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(1.4rem, 3vw, 1.6rem)',
              color: '#C4622D',
            }}>
              $25.00
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={addingToCart}
            style={{
              width: '100%',
              backgroundColor: addingToCart ? '#8B5E3C' : '#C4622D',
              color: '#FAF6F1',
              padding: '18px',
              border: 'none',
              fontWeight: '700',
              fontSize: '13px',
              letterSpacing: '3px',
              cursor: addingToCart ? 'not-allowed' : 'pointer',
              marginBottom: '12px',
            }}
          >
            {addingToCart ? 'ADDING...' : `ADD ${quantity} — $${totalPrice} →`}
          </button>

          <Link href="/shop" style={{
            display: 'block',
            textAlign: 'center',
            color: '#8B5E3C',
            textDecoration: 'none',
            fontSize: '11px',
            letterSpacing: '2px',
            fontWeight: '600',
            padding: '12px',
          }}>
            ← BACK TO ALL COOKIES
          </Link>
        </div>
      </section>

      {/* Reviews Section */}
      {product.reviews?.length > 0 && (
        <section style={{
          padding: 'clamp(48px, 8vw, 80px) 24px',
          backgroundColor: '#E8D5C4',
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{
              fontSize: '10px',
              color: '#C4622D',
              letterSpacing: '3px',
              fontWeight: '700',
              marginBottom: '14px',
              textAlign: 'center',
            }}>
              ★ WHAT PEOPLE SAY ★
            </div>
            <h2 style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
              color: '#3B1F0E',
              textAlign: 'center',
              margin: '0 0 40px',
              lineHeight: '1',
              fontWeight: '400',
            }}>
              Reviews for <em>{product.title}.</em>
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'clamp(16px, 3vw, 24px)',
            }}>
              {product.reviews.map((review, i) => (
                <div key={review.id} style={{
                  backgroundColor: '#FAF6F1',
                  padding: 'clamp(20px, 3vw, 28px)',
                  border: '1px solid rgba(59,31,14,0.08)',
                  position: 'relative',
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-8px',
                    left: '20px',
                    fontFamily: 'Georgia, serif',
                    fontSize: '4rem',
                    color: '#C4622D',
                    lineHeight: '1',
                    fontStyle: 'italic',
                  }}>
                    "
                  </div>
                  <div style={{
                    fontSize: '9px',
                    color: '#8B5E3C',
                    letterSpacing: '2.5px',
                    fontWeight: '700',
                    marginTop: '16px',
                    marginBottom: '12px',
                  }}>
                    N° {String(i + 1).padStart(2, '0')}
                  </div>
                  <div style={{ marginBottom: '12px', letterSpacing: '2px' }}>
                    {'⭐'.repeat(review.rating)}
                  </div>
                  {review.title && (
                    <h3 style={{
                      fontFamily: 'Georgia, serif',
                      fontSize: '1.05rem',
                      color: '#3B1F0E',
                      margin: '0 0 12px',
                      fontStyle: 'italic',
                      fontWeight: '400',
                    }}>
                      {review.title}
                    </h3>
                  )}
                  <p style={{
                    color: '#5A4030',
                    fontSize: '0.9rem',
                    lineHeight: '1.7',
                    margin: '0 0 18px',
                  }}>
                    {review.body}
                  </p>
                  <div style={{
                    borderTop: '1px solid #E8D5C4',
                    paddingTop: '14px',
                    fontWeight: '600',
                    color: '#3B1F0E',
                    fontSize: '0.9rem',
                  }}>
                    — {review.reviewerName}
                    {review.isVerifiedBuyer && (
                      <span style={{
                        color: '#C4622D',
                        fontSize: '10px',
                        letterSpacing: '1.5px',
                        fontWeight: '700',
                        marginLeft: '10px',
                      }}>
                        ✓ VERIFIED
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer settings={settings} />
    </main>
  )
}