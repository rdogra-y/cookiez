// Built by Rakshita Dogra — Happy's Cookiez © 2025
const express = require('express')
const router = express.Router()
const prisma = require('../prisma')

// GET /api/drops/active
// Returns the current live FOMO drop for homepage countdown
router.get('/active', async (req, res) => {
  try {
    const drop = await prisma.cookieDrop.findFirst({
      where: {
        status: 'LIVE',
        endsAt: { gt: new Date() }, // not expired yet
      },
      orderBy: { createdAt: 'desc' },
    })

    if (!drop) {
      return res.json({ drop: null })
    }

    // Calculate time remaining in seconds
    const timeRemainingMs = new Date(drop.endsAt) - new Date()
    const timeRemainingSeconds = Math.max(0, Math.floor(timeRemainingMs / 1000))

    res.json({ 
      drop: {
        ...drop,
        timeRemainingSeconds,
        spotsLeft: drop.maxQuantity - drop.soldCount,
      }
    })
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch drop' })
  }
})

module.exports = router