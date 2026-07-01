// Built by Rakshita Dogra — Happy's Cookiez © 2025
export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: '🍪',
      title: 'Choose Your Cookies',
      description: 'Pick from our freshly baked selection. Menu changes every season.',
    },
    {
      number: '02',
      icon: '🛒',
      title: 'Add to Your Batch',
      description: 'Mix and match your favourites. Box of 4 gets you the best deal.',
    },
    {
      number: '03',
      icon: '💳',
      title: 'Easy Checkout',
      description: 'Demo checkout page confirms the order instantly without connecting to Shopify.',
    },
    {
      number: '04',
      icon: '🚚',
      title: 'Fresh Delivery',
      description: 'Baked fresh and delivered warm right to your door.',
    },
  ]

  return (
    <section style={{
      padding: 'clamp(48px, 8vw, 80px) 24px',
      backgroundColor: '#FAF6F1',
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
            ★ Simple Process ★
          </div>
          <h2 style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            color: '#3B1F0E',
            margin: 0,
            lineHeight: '1',
            fontWeight: '400',
          }}>
            How <em>it works.</em>
          </h2>
        </div>

        {/* Steps */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 'clamp(16px, 3vw, 24px)',
        }}>
          {steps.map((step, i) => (
            <div key={step.number} style={{
              padding: 'clamp(24px, 4vw, 32px) clamp(20px, 3vw, 28px)',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E8D5C4',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
            }}>
              {/* Big number top-left */}
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
                fontStyle: 'italic',
                color: '#C4622D',
                lineHeight: '1',
                marginBottom: '12px',
                fontWeight: '400',
              }}>
                {step.number}
              </div>

              {/* Step label */}
              <div style={{
                fontSize: '9px',
                color: '#8B5E3C',
                letterSpacing: '2.5px',
                fontWeight: '700',
                marginBottom: '20px',
                textTransform: 'uppercase',
              }}>
                Step {step.number}
                {i < steps.length - 1 && <span style={{ marginLeft: '6px', color: '#C4A484' }}>—→</span>}
              </div>

              {/* Icon */}
              <div style={{
                fontSize: 'clamp(2.2rem, 5vw, 2.8rem)',
                marginBottom: '14px',
                lineHeight: '1',
              }}>
                {step.icon}
              </div>

              {/* Title */}
              <h3 style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
                color: '#3B1F0E',
                margin: '0 0 10px',
                lineHeight: '1.2',
                fontWeight: '400',
              }}>
                {step.title}
              </h3>

              {/* Description */}
              <p style={{
                color: '#5A4030',
                fontSize: 'clamp(0.85rem, 1.8vw, 0.95rem)',
                lineHeight: '1.6',
                margin: 0,
              }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}