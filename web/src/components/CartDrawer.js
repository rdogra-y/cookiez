'use client'
// Built by Rakshita Dogra — SugarNest Cookiez © 2025
import { useCartStore, getCartCount } from '@/store/cart'
import { formatPrice } from '@/lib/shopify'

export default function CartDrawer() {
  const { cart, isOpen, isLoading, closeCart, updateItem, removeItem } = useCartStore()
  const count = getCartCount(cart)

  if (!isOpen) return null

  const lines = cart?.lines?.edges?.map(({ node }) => node) ?? []
  const subtotal = cart?.cost?.subtotalAmount
  const total = cart?.cost?.totalAmount

  return (
    <>
      <div
        onClick={closeCart}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 998,
        }}
      />

      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '100%',
        maxWidth: '440px',
        height: '100vh',
        backgroundColor: '#FAF6F1',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-8px 0 32px rgba(59,31,14,0.16)',
      }}>

        {/* Magazine-style Header */}
        <div style={{
          padding: '18px 22px',
          borderBottom: '1px dashed #C4A484',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div style={{
            fontFamily: 'Georgia, serif',
            fontSize: '14px',
            fontStyle: 'italic',
            color: '#3B1F0E',
          }}>
            SugarNest
          </div>
          <div style={{
            fontSize: '10px',
            color: '#3B1F0E',
            letterSpacing: '2px',
            fontWeight: '700',
          }}>
            YOUR BATCH
          </div>
          <button
            onClick={closeCart}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
              color: '#3B1F0E',
              padding: '4px 8px',
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>

        {/* Title */}
        <div style={{
          padding: '20px 22px 16px',
          borderBottom: '1px solid #E8D5C4',
        }}>
          <h2 style={{
            fontFamily: 'Georgia, serif',
            fontSize: '1.6rem',
            color: '#3B1F0E',
            margin: '0 0 4px',
            fontWeight: '400',
            lineHeight: '1',
          }}>
            Your <em>batch.</em>
          </h2>
          <p style={{
            color: '#8B5E3C',
            fontSize: '11px',
            letterSpacing: '1.5px',
            fontWeight: '700',
            margin: 0,
          }}>
            {count} {count === 1 ? 'COOKIE' : 'COOKIES'} READY FOR DELIVERY
          </p>
        </div>

        {/* Items */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px 22px',
        }}>
          {lines.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 16px' }}>
              <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🍪</div>
              <div style={{
                fontSize: '10px',
                color: '#C4622D',
                letterSpacing: '3px',
                fontWeight: '700',
                marginBottom: '12px',
              }}>
                ★ EMPTY BATCH ★
              </div>
              <h3 style={{
                fontFamily: 'Georgia, serif',
                color: '#3B1F0E',
                margin: '0 0 8px',
                fontWeight: '400',
                fontSize: '1.4rem',
              }}>
                Nothing here <em>yet.</em>
              </h3>
              <p style={{ color: '#5A4030', margin: '0 0 24px', fontSize: '0.9rem' }}>
                Add some cookies to get started.
              </p>
              <button
                onClick={closeCart}
                style={{
                  backgroundColor: '#C4622D',
                  color: '#FAF6F1',
                  padding: '13px 28px',
                  border: 'none',
                  fontWeight: '700',
                  cursor: 'pointer',
                  fontSize: '12px',
                  letterSpacing: '2.5px',
                }}
              >
                BROWSE COOKIES →
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {lines.map((line, i) => {
                const product = line.merchandise?.product
                const image = product?.images?.edges?.[0]?.node
                const price = line.merchandise?.price

                return (
                  <div key={line.id} style={{
                    backgroundColor: '#FFFFFF',
                    padding: '14px',
                    display: 'flex',
                    gap: '14px',
                    border: '1px solid #E8D5C4',
                  }}>
                    <div style={{
                      width: '70px',
                      height: '70px',
                      backgroundColor: '#FAF6F1',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2rem',
                      position: 'relative',
                    }}>
                      {image ? (
                        <img
                          src={image.url}
                          alt={image.altText || product?.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : '🍪'}
                      <span style={{
                        position: 'absolute',
                        top: '-6px',
                        left: '-6px',
                        background: '#3B1F0E',
                        color: '#D4A853',
                        fontSize: '8px',
                        padding: '2px 5px',
                        fontFamily: 'Georgia, serif',
                        fontStyle: 'italic',
                        fontWeight: '400',
                        letterSpacing: '1px',
                      }}>
                        N° {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontFamily: 'Georgia, serif',
                        fontSize: '1rem',
                        color: '#3B1F0E',
                        marginBottom: '2px',
                        lineHeight: '1.2',
                      }}>
                        {product?.title}
                      </div>
                      <div style={{
                        color: '#C4622D',
                        fontFamily: 'Georgia, serif',
                        fontSize: '1.05rem',
                        marginBottom: '8px',
                      }}>
                        {formatPrice(price?.amount, price?.currencyCode)}
                      </div>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                      }}>
                        <button
                          onClick={() => line.quantity > 1
                            ? updateItem(line.id, line.quantity - 1)
                            : removeItem(line.id)
                          }
                          disabled={isLoading}
                          style={{
                            width: '26px', height: '26px',
                            border: '1.5px solid #3B1F0E',
                            background: 'transparent',
                            color: '#3B1F0E',
                            cursor: isLoading ? 'not-allowed' : 'pointer',
                            fontSize: '14px',
                            fontWeight: '700',
                          }}
                        >
                          −
                        </button>
                        <span style={{
                          fontWeight: '700',
                          color: '#3B1F0E',
                          minWidth: '18px',
                          textAlign: 'center',
                          fontSize: '0.95rem',
                        }}>
                          {line.quantity}
                        </span>
                        <button
                          onClick={() => updateItem(line.id, line.quantity + 1)}
                          disabled={isLoading}
                          style={{
                            width: '26px', height: '26px',
                            border: '1.5px solid #3B1F0E',
                            background: 'transparent',
                            color: '#3B1F0E',
                            cursor: isLoading ? 'not-allowed' : 'pointer',
                            fontSize: '14px',
                            fontWeight: '700',
                          }}
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeItem(line.id)}
                          disabled={isLoading}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#C4622D',
                            cursor: isLoading ? 'not-allowed' : 'pointer',
                            fontSize: '10px',
                            fontWeight: '700',
                            letterSpacing: '1.5px',
                            marginLeft: 'auto',
                          }}
                        >
                          REMOVE
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}

              {count < 4 && (
                <div style={{
                  backgroundColor: '#E8D5C4',
                  padding: '14px 18px',
                  fontSize: '0.9rem',
                  color: '#3B1F0E',
                  textAlign: 'center',
                  borderLeft: '3px solid #C4622D',
                  fontStyle: 'italic',
                  fontFamily: 'Georgia, serif',
                }}>
                  Add {4 - count} more for a Box of 4 — <strong>$25.00</strong>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {lines.length > 0 && (
          <div style={{
            padding: '20px 22px',
            borderTop: '1px dashed #C4A484',
            backgroundColor: '#FFFFFF',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '6px',
              fontSize: '0.9rem',
              color: '#5A4030',
            }}>
              <span>Subtotal</span>
              <span>
                {subtotal ? formatPrice(subtotal.amount, subtotal.currencyCode) : '$0.00'}
              </span>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '14px',
              fontSize: '0.85rem',
              color: '#5A4030',
            }}>
              <span>Delivery Fee</span>
              <span style={{ color: '#C4622D', fontWeight: '600' }}>
                {parseFloat(subtotal?.amount ?? 0) >= 35
                  ? 'Free Shipping!'
                  : 'Calculated at checkout'}
              </span>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: '16px',
              paddingTop: '12px',
              borderTop: '1px dashed #C4A484',
            }}>
              <span style={{
                fontWeight: '700',
                fontSize: '0.95rem',
                color: '#3B1F0E',
                letterSpacing: '1.5px',
              }}>
                TOTAL
              </span>
              <span style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1.6rem',
                color: '#3B1F0E',
              }}>
                {total ? formatPrice(total.amount, total.currencyCode) : '$0.00'}
              </span>
            </div>

            <a
              href="/checkout"
              style={{
                display: 'block',
                backgroundColor: '#C4622D',
                color: '#FAF6F1',
                padding: '16px',
                textDecoration: 'none',
                fontWeight: '700',
                fontSize: '12px',
                letterSpacing: '2.5px',
                textAlign: 'center',
                marginBottom: '10px',
              }}
            >
              CHECKOUT NOW →
            </a>

            <p style={{
              textAlign: 'center',
              fontSize: '9px',
              color: '#8B5E3C',
              margin: 0,
              letterSpacing: '1.5px',
              fontWeight: '600',
            }}>
              DEMO CHECKOUT — NO SHOPIFY CONNECTION
            </p>
          </div>
        )}
      </div>
    </>
  )
}