// Built by Rakshita Dogra — Happy's Cookiez © 2025
export default function ReviewsSection({ reviews }) {
  return (
    <section style={{
      padding: 'clamp(48px, 8vw, 80px) 24px',
      backgroundColor: '#E8D5C4',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 60px)' }}>
          <div style={{
            fontSize: '10px',
            color: '#C4622D',
            letterSpacing: '3px',
            fontWeight: '700',
            marginBottom: '14px',
            textTransform: 'uppercase',
          }}>
            ★ Real Reviews ★
          </div>
          <h2 style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            color: '#3B1F0E',
            margin: '0 0 16px',
            lineHeight: '1',
            fontWeight: '400',
          }}>
            Loved by <em>cookie lovers.</em>
          </h2>
          {/* Overall Rating */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            paddingTop: '8px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
            <span style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)', letterSpacing: '2px' }}>
              ⭐⭐⭐⭐⭐
            </span>
            <span style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
              color: '#3B1F0E',
              fontStyle: 'italic',
            }}>
              4.8/5
            </span>
            <span style={{
              color: '#5A4030',
              fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
              letterSpacing: '1px',
            }}>
              from happy customers
            </span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(16px, 3vw, 24px)',
        }}>
          {reviews?.map((review, i) => (
            <div key={review.id} style={{
              backgroundColor: '#FAF6F1',
              padding: 'clamp(24px, 4vw, 32px)',
              border: '1px solid rgba(59,31,14,0.08)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
            }}>
              {/* Big editorial quote mark */}
              <div style={{
                position: 'absolute',
                top: '-8px',
                left: '20px',
                fontFamily: 'Georgia, serif',
                fontSize: '5rem',
                color: '#C4622D',
                lineHeight: '1',
                fontStyle: 'italic',
              }}>
                "
              </div>

              {/* Review number */}
              <div style={{
                fontSize: '9px',
                color: '#8B5E3C',
                letterSpacing: '2.5px',
                fontWeight: '700',
                marginBottom: '14px',
                marginTop: '20px',
              }}>
                N° {String(i + 1).padStart(2, '0')}
              </div>

              {/* Stars */}
              <div style={{
                marginBottom: '12px',
                fontSize: '0.95rem',
                letterSpacing: '2px',
              }}>
                {'⭐'.repeat(review.rating)}
              </div>

              {/* Title */}
              {review.title && (
                <h3 style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 'clamp(1.05rem, 2.5vw, 1.2rem)',
                  color: '#3B1F0E',
                  margin: '0 0 12px',
                  fontStyle: 'italic',
                  lineHeight: '1.3',
                  fontWeight: '400',
                }}>
                  {review.title}
                </h3>
              )}

              {/* Body */}
              <p style={{
                color: '#5A4030',
                lineHeight: '1.7',
                fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                margin: '0 0 24px',
                flex: 1,
              }}>
                {review.body}
              </p>

              {/* Reviewer */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                borderTop: '1px solid #E8D5C4',
                paddingTop: '16px',
              }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: '#E8D5C4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem',
                  flexShrink: 0,
                }}>
                  🍪
                </div>
                <div>
                  <div style={{
                    fontWeight: '600',
                    color: '#3B1F0E',
                    fontSize: '0.9rem',
                  }}>
                    {review.reviewerName}
                  </div>
                  {review.isVerifiedBuyer && (
                    <div style={{
                      fontSize: '10px',
                      color: '#C4622D',
                      fontWeight: '700',
                      letterSpacing: '1.5px',
                      marginTop: '2px',
                    }}>
                      ✓ VERIFIED BUYER
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}