'use client'
// Built by Rakshita Dogra — SugarNest Cookiez © 2025
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState('plan_50')
  const [selectedFrequency, setSelectedFrequency] = useState('WEEKLY')
  const [selectedDay, setSelectedDay] = useState('FRIDAY')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    addressLine1: '', city: '', province: '', postalCode: '',
  })

  const plans = [
    { id: 'plan_50', name: "Baker's Dozen", count: 50, price: 72.25, savings: 15 },
    { id: 'plan_100', name: 'Party Pack', count: 100, price: 130.00, savings: 30, best: true },
    { id: 'plan_150', name: 'Family Box', count: 150, price: 185.00, savings: 25 },
    { id: 'plan_200', name: 'Corporate Box', count: 200, price: 230.00, savings: 35 },
  ]

  const frequencies = [
    { value: 'WEEKLY', label: 'Every Week' },
    { value: 'BIWEEKLY', label: 'Every 2 Weeks' },
    { value: 'MONTHLY', label: 'Every Month' },
  ]

  const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']

  const handleSubmit = async () => {
    if (!form.name || !form.email) {
      alert('Please fill in your name and email!')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('http://localhost:4000/api/subscription/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: selectedPlan,
          frequency: selectedFrequency,
          deliveryDay: selectedDay,
          quantity: plans.find(p => p.id === selectedPlan)?.count,
          ...form,
        }),
      })
      const data = await res.json()
      if (data.success) setSubmitted(true)
      else alert('Something went wrong. Please try again!')
    } catch (error) {
      alert('Could not connect. Please try again!')
    }
    setLoading(false)
  }

  if (submitted) {
    return (
      <main>
        <Navbar />
        <div style={{
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(48px, 8vw, 80px) 24px',
          textAlign: 'center',
        }}>
          <div>
            <div style={{ fontSize: 'clamp(3.5rem, 8vw, 5rem)', marginBottom: '24px' }}>🎉</div>
            <div style={{
              fontSize: '10px',
              color: '#C4622D',
              letterSpacing: '4px',
              fontWeight: '700',
              marginBottom: '14px',
            }}>
              ★ CONFIRMED ★
            </div>
            <h1 style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(2rem, 6vw, 2.8rem)',
              color: '#3B1F0E',
              margin: '0 0 16px',
              fontWeight: '400',
            }}>
              You're <em>in.</em>
            </h1>
            <p style={{
              color: '#5A4030',
              fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
              maxWidth: '480px',
              lineHeight: '1.7',
              margin: '0 auto 32px',
            }}>
              Thanks {form.name}. We'll reach out to {form.email} shortly to confirm your subscription and first delivery date.
            </p>
            <a href="/" style={{
              backgroundColor: '#3B1F0E',
              color: '#FAF6F1',
              padding: '15px 32px',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '12px',
              letterSpacing: '2.5px',
            }}>
              BACK TO HOME →
            </a>
          </div>
        </div>
        <Footer settings={null} />
      </main>
    )
  }

  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section style={{
        backgroundColor: '#3B1F0E',
        padding: 'clamp(48px, 8vw, 80px) 24px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{
            fontSize: '10px',
            color: '#D4A853',
            letterSpacing: '4px',
            fontWeight: '700',
            marginBottom: '16px',
          }}>
            ★ MONTHLY SUBSCRIPTION ★
          </div>
          <h1 style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            color: '#FAF6F1',
            margin: '0 0 16px',
            lineHeight: '1',
            fontWeight: '400',
          }}>
            SugarNest Premium <em>Cookie Box.</em>
          </h1>
          <p style={{
            color: '#C4A484',
            fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
            maxWidth: '500px',
            margin: '0 auto',
            lineHeight: '1.6',
          }}>
            Fresh cookies delivered to your door. Choose your plan, pick your day, enjoy exclusive perks.
          </p>
        </div>
        <div style={{
          position: 'absolute',
          bottom: '-50px',
          right: '-50px',
          fontSize: 'clamp(10rem, 25vw, 18rem)',
          opacity: 0.05,
          lineHeight: 1,
          pointerEvents: 'none',
        }}>🍪</div>
      </section>

      {/* Form Sections */}
      <section style={{
        padding: 'clamp(40px, 6vw, 64px) 24px',
        maxWidth: '1000px',
        margin: '0 auto',
      }}>

        {/* Step 1 — Plan */}
        <div style={{ marginBottom: 'clamp(36px, 6vw, 48px)' }}>
          <StepHeader number="01" title="Choose Your Plan" subtitle="All plans include early access, free cookies every 5th box, and event invites." />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: 'clamp(12px, 2vw, 16px)',
            marginTop: '24px',
          }}>
            {plans.map(plan => (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                style={{
                  backgroundColor: selectedPlan === plan.id ? '#3B1F0E' : '#FFFFFF',
                  border: `2px solid ${selectedPlan === plan.id ? '#3B1F0E' : '#E8D5C4'}`,
                  padding: 'clamp(18px, 3vw, 24px)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  position: 'relative',
                }}
              >
                {plan.best && (
                  <div style={{
                    position: 'absolute',
                    top: '-10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#D4A853',
                    color: '#2A1408',
                    padding: '3px 12px',
                    fontSize: '9px',
                    fontWeight: '700',
                    letterSpacing: '2px',
                    whiteSpace: 'nowrap',
                  }}>
                    ★ BEST VALUE
                  </div>
                )}
                <div style={{
                  fontWeight: '700',
                  fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
                  color: selectedPlan === plan.id ? '#FAF6F1' : '#3B1F0E',
                  marginBottom: '4px',
                }}>
                  {plan.name}
                </div>
                <div style={{
                  fontSize: '0.85rem',
                  color: selectedPlan === plan.id ? '#C4A484' : '#8B5E3C',
                  marginBottom: '12px',
                }}>
                  {plan.count} cookies/box
                </div>
                <div style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 'clamp(1.3rem, 3vw, 1.5rem)',
                  color: selectedPlan === plan.id ? '#FAF6F1' : '#3B1F0E',
                }}>
                  ${plan.price}
                </div>
                <div style={{
                  fontSize: '9px',
                  color: selectedPlan === plan.id ? '#D4A853' : '#C4622D',
                  fontWeight: '700',
                  letterSpacing: '1.5px',
                  marginTop: '4px',
                }}>
                  SAVE {plan.savings}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step 2 — Frequency */}
        <div style={{ marginBottom: 'clamp(36px, 6vw, 48px)' }}>
          <StepHeader number="02" title="How Often?" />
          <div style={{ display: 'flex', gap: 'clamp(8px, 2vw, 14px)', flexWrap: 'wrap', marginTop: '20px' }}>
            {frequencies.map(freq => (
              <button
                key={freq.value}
                onClick={() => setSelectedFrequency(freq.value)}
                style={{
                  backgroundColor: selectedFrequency === freq.value ? '#C4622D' : '#FFFFFF',
                  color: selectedFrequency === freq.value ? '#FAF6F1' : '#3B1F0E',
                  border: `2px solid ${selectedFrequency === freq.value ? '#C4622D' : '#E8D5C4'}`,
                  padding: 'clamp(10px, 2vw, 13px) clamp(20px, 3vw, 28px)',
                  fontWeight: '700',
                  fontSize: 'clamp(11px, 2vw, 12px)',
                  letterSpacing: '1.5px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textTransform: 'uppercase',
                }}
              >
                {freq.label}
              </button>
            ))}
          </div>
        </div>

        {/* Step 3 — Day */}
        <div style={{ marginBottom: 'clamp(36px, 6vw, 48px)' }}>
          <StepHeader number="03" title="Pick Your Delivery Day" />
          <div style={{ display: 'flex', gap: 'clamp(6px, 1.5vw, 10px)', flexWrap: 'wrap', marginTop: '20px' }}>
            {days.map(day => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                style={{
                  backgroundColor: selectedDay === day ? '#3B1F0E' : '#FFFFFF',
                  color: selectedDay === day ? '#FAF6F1' : '#3B1F0E',
                  border: `2px solid ${selectedDay === day ? '#3B1F0E' : '#E8D5C4'}`,
                  padding: 'clamp(8px, 2vw, 11px) clamp(14px, 2.5vw, 20px)',
                  fontWeight: '700',
                  fontSize: 'clamp(10px, 2vw, 11px)',
                  letterSpacing: '1.5px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textTransform: 'uppercase',
                }}
              >
                {day.charAt(0) + day.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Step 4 — Details */}
        <div style={{ marginBottom: 'clamp(36px, 6vw, 48px)' }}>
          <StepHeader number="04" title="Your Details" />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 'clamp(12px, 2vw, 16px)',
            marginTop: '20px',
          }}>
            {[
              { key: 'name', label: 'Full Name *', placeholder: 'Rakshita Dogra', type: 'text' },
              { key: 'email', label: 'Email Address *', placeholder: 'hello@email.com', type: 'email' },
              { key: 'phone', label: 'Phone Number', placeholder: '(204) 555-0100', type: 'tel' },
              { key: 'addressLine1', label: 'Street Address', placeholder: '123 Cookie Lane', type: 'text' },
              { key: 'city', label: 'City', placeholder: 'Winnipeg', type: 'text' },
              { key: 'province', label: 'Province', placeholder: 'Manitoba', type: 'text' },
              { key: 'postalCode', label: 'Postal Code', placeholder: 'R2M 2Y1', type: 'text' },
            ].map(field => (
              <div key={field.key}>
                <label style={{
                  display: 'block',
                  fontSize: '10px',
                  color: '#8B5E3C',
                  marginBottom: '8px',
                  fontWeight: '700',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                }}>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={form[field.key]}
                  onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    border: '2px solid #E8D5C4',
                    fontSize: '0.95rem',
                    color: '#3B1F0E',
                    backgroundColor: '#FFFFFF',
                    outline: 'none',
                    fontFamily: 'inherit',
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div style={{
          backgroundColor: '#3B1F0E',
          padding: 'clamp(24px, 5vw, 36px)',
          marginBottom: '32px',
        }}>
          <div style={{
            fontSize: '10px',
            color: '#D4A853',
            letterSpacing: '3px',
            fontWeight: '700',
            marginBottom: '14px',
          }}>
            ★ YOUR SUBSCRIPTION SUMMARY ★
          </div>
          {(() => {
            const plan = plans.find(p => p.id === selectedPlan)
            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { label: 'Plan', value: plan?.name },
                  { label: 'Cookies per box', value: `${plan?.count} cookies` },
                  { label: 'Frequency', value: frequencies.find(f => f.value === selectedFrequency)?.label },
                  { label: 'Delivery day', value: selectedDay.charAt(0) + selectedDay.slice(1).toLowerCase() + 's' },
                ].map(item => (
                  <div key={item.label} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '1px dashed rgba(232,213,196,0.2)',
                    paddingBottom: '12px',
                    flexWrap: 'wrap',
                    gap: '8px',
                  }}>
                    <span style={{ color: '#C4A484', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}>{item.label}</span>
                    <span style={{ color: '#FAF6F1', fontWeight: '600', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}>{item.value}</span>
                  </div>
                ))}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '12px',
                  alignItems: 'baseline',
                  flexWrap: 'wrap',
                  gap: '8px',
                }}>
                  <span style={{
                    color: '#FAF6F1',
                    fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
                    fontWeight: '600',
                  }}>
                    Total per box
                  </span>
                  <span style={{
                    fontFamily: 'Georgia, serif',
                    color: '#D4A853',
                    fontSize: 'clamp(1.6rem, 4vw, 2rem)',
                  }}>
                    ${plan?.price}
                  </span>
                </div>
              </div>
            )
          })()}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: '100%',
            backgroundColor: loading ? '#8B5E3C' : '#C4622D',
            color: '#FAF6F1',
            padding: 'clamp(16px, 3vw, 20px)',
            border: 'none',
            fontWeight: '700',
            fontSize: 'clamp(12px, 2vw, 13px)',
            letterSpacing: '3px',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
          }}
        >
          {loading ? 'SUBMITTING...' : 'SUBSCRIBE NOW →'}
        </button>

        <p style={{
          textAlign: 'center',
          color: '#8B5E3C',
          fontSize: 'clamp(0.8rem, 1.8vw, 0.85rem)',
          marginTop: '16px',
        }}>
          No commitment — cancel anytime. We'll confirm your first delivery via email.
        </p>
      </section>

      <Footer settings={null} />
    </main>
  )
}

function StepHeader({ number, title, subtitle }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', marginBottom: subtitle ? '8px' : '0' }}>
        <span style={{
          fontFamily: 'Georgia, serif',
          fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
          fontStyle: 'italic',
          color: '#C4622D',
          lineHeight: '1',
          fontWeight: '400',
        }}>
          {number}
        </span>
        <h2 style={{
          fontFamily: 'Georgia, serif',
          fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
          color: '#3B1F0E',
          margin: 0,
          lineHeight: '1.1',
          fontWeight: '400',
        }}>
          {title}
        </h2>
      </div>
      {subtitle && (
        <p style={{
          color: '#5A4030',
          fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
          margin: '0',
          maxWidth: '600px',
          lineHeight: '1.5',
        }}>
          {subtitle}
        </p>
      )}
    </div>
  )
}