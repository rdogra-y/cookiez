// Built by Rakshita Dogra — Happy's Cookiez © 2025
import Link from 'next/link'

export default function CorporateSection() {
  const perks = [
    'Bulk orders for any team size',
    'Weekly office deliveries',
    'Custom branded packaging',
    'Invoice billing available',
  ]

  const stats = [
    { number: '200+', label: 'Cookies per order' },
    { number: '24hr', label: 'Turnaround time' },
    { number: '100%', label: 'Fresh baked' },
    { number: '4.8', label: 'Average rating', star: true },
  ]

  return (
    <section style={{
      padding: 'clamp(48px, 8vw, 80px) 24px',
      backgroundColor: '#FAF6F1',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: '#E8D5C4',
        padding: 'clamp(36px, 6vw, 56px) clamp(24px, 5vw, 48px)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 'clamp(32px, 5vw, 48px)',
        alignItems: 'center',
      }}>
        {/* Left */}
        <div>
          <div style={{
            fontSize: '10px',
            color: '#C4622D',
            letterSpacing: '3px',
            fontWeight: '700',
            marginBottom: '14px',
          }}>
            ★ FOR BUSINESSES ★
          </div>

          <h2 style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
            color: '#3B1F0E',
            margin: '0 0 14px',
            lineHeight: '1',
            fontWeight: '400',
          }}>
            Corporate <em>cookie</em><br />plans.
          </h2>

          <p style={{
            color: '#5A4030',
            fontSize: 'clamp(0.9rem, 2vw, 1rem)',
            lineHeight: '1.6',
            margin: '0 0 24px',
            maxWidth: '440px',
          }}>
            Treat your team, clients, or events with fresh baked cookies.
            Bulk orders, custom packaging, and recurring deliveries available.
          </p>

          <div style={{ marginBottom: '28px' }}>
            {perks.map((perk, i) => (
              <div key={perk} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '10px',
                color: '#3B1F0E',
                fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
              }}>
                <span style={{
                  color: '#C4622D',
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

          <Link href="/corporate" style={{
            backgroundColor: '#3B1F0E',
            color: '#FAF6F1',
            padding: '15px 32px',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '12px',
            letterSpacing: '2.5px',
            display: 'inline-block',
          }}>
            CONTACT US →
          </Link>
        </div>

        {/* Right — Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(10px, 2vw, 16px)',
        }}>
          {stats.map((stat) => (
            <div key={stat.label} style={{
              backgroundColor: '#FAF6F1',
              padding: 'clamp(20px, 4vw, 28px) clamp(16px, 3vw, 20px)',
              textAlign: 'center',
              border: '1px solid rgba(59,31,14,0.08)',
            }}>
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(2rem, 5vw, 2.8rem)',
                color: '#C4622D',
                marginBottom: '8px',
                lineHeight: '1',
                fontWeight: '400',
              }}>
                {stat.star && <span style={{ color: '#D4A853', marginRight: '4px' }}>★</span>}
                {stat.number}
              </div>
              <div style={{
                fontSize: '10px',
                color: '#8B5E3C',
                fontWeight: '700',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}