// Built by Rakshita Dogra — Happy's Cookiez © 2025
const express = require('express')
const router = express.Router()
const prisma = require('../prisma')

// POST /api/analytics/event
// Tracks what customers do on the website
// e.g. add to cart, start checkout, complete purchase
// This data shows up in your admin dashboard later
router.post('/event', async (req, res) => {
  try {
    const {
      eventType,
      sessionId,
      customerEmail,
      productId,
      value,
      metadata,
    } = req.body

    if (!eventType) {
      return res.status(400).json({ error: 'Event type is required' })
    }

    // Valid event types
    const validEvents = [
      'page_view',
      'product_view',
      'add_to_cart',
      'remove_from_cart',
      'checkout_start',
      'checkout_complete',
      'promo_viewed',
      'promo_unlocked',
      'subscription_started',
      'corporate_inquiry',
    ]

    if (!validEvents.includes(eventType)) {
      return res.status(400).json({ error: 'Invalid event type' })
    }

    await prisma.conversionEvent.create({
      data: {
        eventType,
        sessionId,
        customerEmail: customerEmail?.toLowerCase(),
        productId,
        value: value ? parseFloat(value) : null,
        metadata: metadata || null,
      },
    })

    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: 'Could not track event' })
  }
})

// GET /api/analytics/summary
// Basic stats for admin dashboard
router.get('/summary', async (req, res) => {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const [
      totalEvents,
      todayEvents,
      addToCarts,
      checkouts,
      subscriptions,
    ] = await Promise.all([
      prisma.conversionEvent.count(),
      prisma.conversionEvent.count({
        where: { createdAt: { gte: today } },
      }),
      prisma.conversionEvent.count({
        where: { eventType: 'add_to_cart' },
      }),
      prisma.conversionEvent.count({
        where: { eventType: 'checkout_complete' },
      }),
      prisma.conversionEvent.count({
        where: { eventType: 'subscription_started' },
      }),
    ])

    res.json({
      summary: {
        totalEvents,
        todayEvents,
        addToCarts,
        checkouts,
        subscriptions,
      }
    })
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch analytics' })
  }
})

module.exports = router