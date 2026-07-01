// Built by Rakshita Dogra — Happy's Cookiez © 2025
const express = require('express')
const router = express.Router()
const prisma = require('../prisma')

// POST /api/corporate/inquiry
// Company fills out corporate contact form
// Creates account + first order inquiry in database
router.post('/inquiry', async (req, res) => {
  try {
    const {
      companyName,
      contactName,
      email,
      phone,
      city,
      province,
      postalCode,
      cookieCount,
      customPackaging,
      deliveryDate,
      deliveryAddress,
      isRecurring,
      notes,
    } = req.body

    // Validate required fields
    if (!companyName || !contactName || !email || !cookieCount) {
      return res.status(400).json({
        error: 'Company name, contact name, email and cookie count are required'
      })
    }

    // Check if account already exists
    let account = await prisma.corporateAccount.findUnique({
      where: { email: email.toLowerCase() },
    })

    // Create account if new
    if (!account) {
      account = await prisma.corporateAccount.create({
        data: {
          companyName,
          contactName,
          email: email.toLowerCase(),
          phone,
          city,
          province,
          postalCode,
          notes,
        },
      })
    }

    // Create the order inquiry
    const order = await prisma.corporateOrder.create({
      data: {
        accountId: account.id,
        cookieCount: parseInt(cookieCount),
        customPackaging: customPackaging || false,
        deliveryDate: deliveryDate ? new Date(deliveryDate) : null,
        deliveryAddress,
        isRecurring: isRecurring || false,
        internalNotes: notes,
        status: 'INQUIRY',
      },
    })

    res.status(201).json({
      success: true,
      message: "Thanks! We'll get back to you within 24 hours.",
      accountId: account.id,
      orderId: order.id,
    })

  } catch (error) {
    res.status(500).json({ error: 'Could not submit inquiry' })
  }
})

// GET /api/corporate/account/:email
// Get corporate account details by email
router.get('/account/:email', async (req, res) => {
  try {
    const account = await prisma.corporateAccount.findUnique({
      where: { email: req.params.email.toLowerCase() },
      include: {
        orders: {
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    if (!account) {
      return res.status(404).json({ error: 'Account not found' })
    }

    res.json({ account })
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch account' })
  }
})

module.exports = router