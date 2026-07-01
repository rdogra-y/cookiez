'use client'
// Built by Rakshita Dogra — Happy's Cookiez © 2025
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function CorporatePage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    city: '',
    province: 'Manitoba',
    postalCode: '',
    cookieCount: '50',
    customPackaging: false,
    deliveryAddress: '',
    isRecurring: false,
    notes: '',
  })

  const handleSubmit = async () => {
    if (!form.companyName || !form.contactName || !form.email || !form.cookieCount) {
      alert('Please fill in company name, contact name, email and cookie count!')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('http://localhost:4000/api/corporate/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
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
              ★ INQUIRY RECEIVED ★
            </div>
            <h1 style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(2rem, 6vw, 2.8rem)',
              color: '#3B1F0E',
              margin: '0 0 16px',
              fontWeight: '400',
            }}>
              We'll be in <em>touch.</em>
            </h1>
            <p style={{
              color: '#5A4030',
              fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
              maxWidth: '480px',
              lineHeight: '1.7',
              margin: '0 auto 32px',
            }}>
              Thanks {form.contactName}. We'll get back to {form.email} within 24 hours with a quote for {form.companyName}.
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
            ★ FOR BUSINESSES ★
          </div>
          <h1 style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            color: '#FAF6F1',
            margin: '0 0 16px',
            lineHeight: '1',
            fontWeight: '400',
          }}>
            Corporate <em>cookie</em> plans.
          </h1>
          <p style={{
            color: '#C4A484',
            fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
            maxWidth: '500px',
            margin: '0 auto',
            lineHeight: '1.6',
          }}>
            Treat your team, impress your clients, make your events memorable. Bulk orders with custom packaging and recurring deliveries.
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

      {/* Perks Strip */}
      <div style={{
        backgroundColor: '#E8D5C4',
        padding: 'clamp(16px, 3vw, 22px) 24px',
        display: 'flex',
        justifyContent: 'center',
        gap: 'clamp(16px, 4vw, 40px)',
        flexWrap: 'wrap',
      }}>
        {[
          { num: '01', text: 'Bulk orders any size' },
          { num: '02', text: 'Custom branded packaging' },
          { num: '03', text: 'Recurring deliveries' },
          { num: '04', text: 'Invoice billing' },
        ].map(perk => (
          <span key={perk.text} style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '8px',
            fontSize: 'clamp(0.8rem, 1.8vw, 0.9rem)',
            color: '#3B1F0E',
            fontWeight: '600',
          }}>
            <span style={{
              fontFamily: 'Georgia, serif',
              fontStyle: 'italic',
              color: '#C4622D',
              fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
            }}>
              {perk.num}
            </span>
            {perk.text}
          </span>
        ))}
      </div>

      {/* Form */}
      <section style={{
        padding: 'clamp(40px, 6vw, 64px) 24px',
        maxWidth: '800px',
        margin: '0 auto',
      }}>
        <div style={{
          fontSize: '10px',
          color: '#C4622D',
          letterSpacing: '3px',
          fontWeight: '700',
          marginBottom: '12px',
        }}>
          ★ GET A QUOTE
        </div>
        <h2 style={{
          fontFamily: 'Georgia, serif',
          fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
          color: '#3B1F0E',
          margin: '0 0 8px',
          lineHeight: '1',
          fontWeight: '400',
        }}>
          Tell us what you <em>need.</em>
        </h2>
        <p style={{
          color: '#5A4030',
          fontSize: 'clamp(0.9rem, 2vw, 1rem)',
          margin: '0 0 36px',
        }}>
          Fill in your details and we'll get back to you within 24 hours.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 'clamp(14px, 2.5vw, 20px)',
          marginBottom: '24px',
        }}>
          {[
            { key: 'companyName', label: 'Company Name *', placeholder: 'Acme Corp', type: 'text' },
            { key: 'contactName', label: 'Your Name *', placeholder: 'John Smith', type: 'text' },
            { key: 'email', label: 'Email Address *', placeholder: 'john@acmecorp.com', type: 'email' },
            { key: 'phone', label: 'Phone Number', placeholder: '(204) 555-0100', type: 'tel' },
            { key: 'city', label: 'City', placeholder: 'Winnipeg', type: 'text' },
            { key: 'postalCode', label: 'Postal Code', placeholder: 'R3C 0A1', type: 'text' },
            { key: 'deliveryAddress', label: 'Delivery Address', placeholder: '123 Main St, Winnipeg', type: 'text' },
            { key: 'cookieCount', label: 'How Many Cookies *', placeholder: '50', type: 'number' },
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

        {/* Checkboxes */}
        <div style={{
          display: 'flex',
          gap: 'clamp(16px, 3vw, 24px)',
          marginBottom: '24px',
          flexWrap: 'wrap',
        }}>
          {[
            { key: 'customPackaging', label: 'Custom branded packaging' },
            { key: 'isRecurring', label: 'Recurring weekly/monthly order' },
          ].map(item => (
            <label key={item.key} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              fontWeight: '600',
              color: '#3B1F0E',
              fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
            }}>
              <input
                type="checkbox"
                checked={form[item.key]}
                onChange={e => setForm({ ...form, [item.key]: e.target.checked })}
                style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#C4622D' }}
              />
              {item.label}
            </label>
          ))}
        </div>

        {/* Notes */}
        <div style={{ marginBottom: '32px' }}>
          <label style={{
            display: 'block',
            fontSize: '10px',
            color: '#8B5E3C',
            marginBottom: '8px',
            fontWeight: '700',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}>
            Additional Notes
          </label>
          <textarea
            placeholder="Any special requests, allergies, event details..."
            value={form.notes}
            onChange={e => setForm({ ...form, notes: e.target.value })}
            rows={4}
            style={{
              width: '100%',
              padding: '14px 16px',
              border: '2px solid #E8D5C4',
              fontSize: '0.95rem',
              color: '#3B1F0E',
              backgroundColor: '#FFFFFF',
              outline: 'none',
              resize: 'vertical',
              fontFamily: 'inherit',
            }}
          />
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
          }}
        >
          {loading ? 'SENDING...' : 'GET A QUOTE →'}
        </button>

        <p style={{
          textAlign: 'center',
          color: '#8B5E3C',
          fontSize: 'clamp(0.8rem, 1.8vw, 0.85rem)',
          marginTop: '16px',
        }}>
          We respond within 24 hours · hello@happyscookiez.com
        </p>
      </section>

      <Footer settings={null} />
    </main>
  )
}