// Built by Rakshita Dogra — Happy's Cookiez © 2025
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')

const app = express()
const PORT = process.env.PORT || 4000

// ── Security ──────────────────────────────────────────
app.use(helmet())
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://happyscookiez.com',
    'https://www.happyscookiez.com',
  ],
  credentials: true,
}))

// ── Rate Limiting ─────────────────────────────────────
// Stops hackers from hammering your API with requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per 15 min per IP
  message: { error: 'Too many requests, please try again later.' }
})
app.use('/api/', limiter)

// ── Body Parsing ──────────────────────────────────────
app.use(express.json({ limit: '1mb' }))
app.use(morgan('dev'))

// ── Routes ────────────────────────────────────────────
app.use('/api/auth',         require('./routes/auth'))
app.use('/api/products',     require('./routes/products'))
app.use('/api/drops',        require('./routes/drops'))
app.use('/api/promo',        require('./routes/promo'))
app.use('/api/subscription', require('./routes/subscription'))
app.use('/api/corporate',    require('./routes/corporate'))
app.use('/api/reviews',      require('./routes/reviews'))
app.use('/api/settings',     require('./routes/settings'))
app.use('/api/analytics',    require('./routes/analytics'))

// ── Health Check ──────────────────────────────────────
// Visit http://localhost:4000/health to confirm API is running
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: "Happy's Cookiez API is running! 🍪",
    timestamp: new Date().toISOString() 
  })
})

// ── 404 Handler ───────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// ── Error Handler ─────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({ 
    error: process.env.NODE_ENV === 'production' 
      ? 'Something went wrong' 
      : err.message 
  })
})

app.listen(PORT, () => {
  console.log(`🍪 Happy's Cookiez API running on http://localhost:${PORT}`)
  console.log(`💚 Health check: http://localhost:${PORT}/health`)
})