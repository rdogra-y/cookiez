// Built by Rakshita Dogra — Happy's Cookiez © 2025
const express = require('express')
const router = express.Router()
const prisma = require('../prisma')

// POST /api/promo/validate
// Customer scans QR code → website checks if code is valid
// Locked to 1 use per email — sharing won't work twice
router.post('/validate', async (req, res) => {
  try {
    const { code, email } = req.body

    if (!code || !email) {
      return res.status(400).json({ error: 'Code and email are required' })
    }

    // Find the promo code
    const promoCode = await prisma.promoCode.findUnique({
      where: { code: code.toUpperCase() },
      include: { campaign: true },
    })

    // Code doesn't exist
    if (!promoCode) {
      return res.status(404).json({ error: 'Invalid promo code' })
    }

    // Code is inactive
    if (!promoCode.isActive) {
      return res.status(400).json({ error: 'This promo code is no longer active' })
    }

    // Code has expired
    if (promoCode.expiresAt && new Date() > promoCode.expiresAt) {
      return res.status(400).json({ error: 'This promo code has expired' })
    }

    // Code has hit max total uses
    if (promoCode.usedCount >= promoCode.maxUses) {
      return res.status(400).json({ error: 'This promo code has reached its limit' })
    }

    // Check if THIS email already used this code
    const alreadyUsed = await prisma.promoRedemption.findFirst({
      where: {
        codeId: promoCode.id,
        customerEmail: email.toLowerCase(),
      },
    })

    if (alreadyUsed) {
      return res.status(400).json({ 
        error: 'This code has already been used with this email address' 
      })
    }

    // Campaign expired
    if (promoCode.campaign.expiresAt && new Date() > promoCode.campaign.expiresAt) {
      return res.status(400).json({ error: 'This promotion has ended' })
    }

    // ✅ Code is valid!
    res.json({
      valid: true,
      offer: {
        code: promoCode.code,
        offerText: '5 cookies for $25 — 1 FREE',
        discountPct: promoCode.campaign.discountPct,
        freeItemCount: promoCode.campaign.freeItemCount,
      }
    })

  } catch (error) {
    res.status(500).json({ error: 'Could not validate promo code' })
  }
})

// POST /api/promo/redeem
// Called after customer completes order with promo code
// Records the redemption so code can't be used again
router.post('/redeem', async (req, res) => {
  try {
    const { code, email, name, shopifyOrderId } = req.body

    if (!code || !email) {
      return res.status(400).json({ error: 'Code and email are required' })
    }

    const promoCode = await prisma.promoCode.findUnique({
      where: { code: code.toUpperCase() },
      include: { campaign: true },
    })

    if (!promoCode) {
      return res.status(404).json({ error: 'Invalid promo code' })
    }

    // Check again if already redeemed (double safety check)
    const alreadyUsed = await prisma.promoRedemption.findFirst({
      where: {
        codeId: promoCode.id,
        customerEmail: email.toLowerCase(),
      },
    })

    if (alreadyUsed) {
      return res.status(400).json({ error: 'Code already redeemed' })
    }

    // Record the redemption
    await prisma.promoRedemption.create({
      data: {
        campaignId: promoCode.campaignId,
        codeId: promoCode.id,
        customerEmail: email.toLowerCase(),
        customerName: name,
        shopifyOrderId,
      },
    })

    // Increment used count
    await prisma.promoCode.update({
      where: { id: promoCode.id },
      data: { usedCount: { increment: 1 } },
    })

    await prisma.promoCampaign.update({
      where: { id: promoCode.campaignId },
      data: { usedCount: { increment: 1 } },
    })

    res.json({ success: true, message: 'Promo code redeemed successfully!' })

  } catch (error) {
    res.status(500).json({ error: 'Could not redeem promo code' })
  }
})

module.exports = router