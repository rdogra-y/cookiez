// Built by Rakshita Dogra — Happy's Cookiez © 2025
const express = require('express')
const router = express.Router()
const prisma = require('../prisma')

// GET /api/subscription/plans
// Returns all active subscription plans for the subscription page
router.get('/plans', async (req, res) => {
  try {
    const plans = await prisma.subscriberPlan.findMany({
      where: { isActive: true },
      orderBy: { cookieCount: 'asc' },
    })
    res.json({ plans })
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch plans' })
  }
})

// POST /api/subscription/leads
// Customer fills out subscription form → saved to database
// You then follow up with them to complete the order
router.post('/leads', async (req, res) => {
  try {
    const {
      planId,
      email,
      name,
      phone,
      frequency,
      deliveryDay,
      quantity,
      addressLine1,
      addressLine2,
      city,
      province,
      postalCode,
    } = req.body

    // Validate required fields
    if (!planId || !email || !frequency || !deliveryDay || !quantity) {
      return res.status(400).json({ 
        error: 'Plan, email, frequency, delivery day and quantity are required' 
      })
    }

    // Check plan exists
    const plan = await prisma.subscriberPlan.findUnique({
      where: { id: planId },
    })

    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' })
    }

    // Save subscriber lead
    const lead = await prisma.subscriberLead.create({
      data: {
        planId,
        email: email.toLowerCase(),
        name,
        phone,
        frequency,
        deliveryDay,
        quantity: parseInt(quantity),
        addressLine1,
        addressLine2,
        city,
        province,
        postalCode,
        country: 'CA',
      },
    })

    res.status(201).json({
      success: true,
      message: "You're subscribed! We'll be in touch shortly.",
      leadId: lead.id,
    })

  } catch (error) {
    res.status(500).json({ error: 'Could not save subscription' })
  }
})

// POST /api/subscription/pause
// Customer pauses their subscription from their dashboard
router.post('/pause', async (req, res) => {
  try {
    const { subscriberId, pauseUntil } = req.body

    if (!subscriberId) {
      return res.status(400).json({ error: 'Subscriber ID is required' })
    }

    await prisma.subscriberLead.update({
      where: { id: subscriberId },
      data: {
        status: 'PAUSED',
        pausedUntil: pauseUntil ? new Date(pauseUntil) : null,
      },
    })

    res.json({ success: true, message: 'Subscription paused successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Could not pause subscription' })
  }
})

// POST /api/subscription/cancel
// Customer cancels their subscription
router.post('/cancel', async (req, res) => {
  try {
    const { subscriberId, reason } = req.body

    if (!subscriberId) {
      return res.status(400).json({ error: 'Subscriber ID is required' })
    }

    await prisma.subscriberLead.update({
      where: { id: subscriberId },
      data: {
        status: 'CANCELLED',
        cancelledAt: new Date(),
        cancellationReason: reason,
      },
    })

    res.json({ success: true, message: 'Subscription cancelled' })
  } catch (error) {
    res.status(500).json({ error: 'Could not cancel subscription' })
  }
})

module.exports = router