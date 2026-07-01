// Built by Rakshita Dogra — Happy's Cookiez © 2025
const express = require('express')
const router = express.Router()
const prisma = require('../prisma')

// GET /api/products
// Returns all available cookies
// Website uses this to show the cookie grid
router.get('/', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: { isAvailable: true },
      orderBy: { createdAt: 'asc' },
    })
    res.json({ products })
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch products' })
  }
})

// GET /api/products/featured
// Returns only featured cookies for homepage
router.get('/featured', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: { 
        isAvailable: true,
        isFeatured: true,
      },
      orderBy: { createdAt: 'asc' },
    })
    res.json({ products })
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch featured products' })
  }
})

// GET /api/products/:handle
// Returns a single cookie by its handle (url name)
// e.g. /api/products/the-happy
router.get('/:handle', async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { shopifyHandle: req.params.handle },
      include: {
        reviews: {
          where: { status: 'APPROVED' },
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    if (!product) {
      return res.status(404).json({ error: 'Cookie not found' })
    }

    res.json({ product })
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch product' })
  }
})

module.exports = router