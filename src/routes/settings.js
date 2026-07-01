// Built by Rakshita Dogra — Happy's Cookiez © 2025
const express = require('express')
const router = express.Router()
const prisma = require('../prisma')

// GET /api/settings
// Returns all public site settings
// Website uses this for hero text, prices, hours, address etc.
router.get('/', async (req, res) => {
  try {
    const settings = await prisma.siteSetting.findMany({
      where: { isPublic: true },
    })

    // Convert array to a nice object like { hero_headline: '...', business_phone: '...' }
    const settingsMap = {}
    settings.forEach(s => {
      settingsMap[s.key] = s.value
    })

    res.json({ settings: settingsMap })
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch settings' })
  }
})

module.exports = router