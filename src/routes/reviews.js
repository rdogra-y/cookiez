// Built by Rakshita Dogra — Happy's Cookiez © 2025
const express = require('express')
const router = express.Router()
const prisma = require('../prisma')

// GET /api/reviews
// Returns featured approved reviews for homepage
router.get('/', async (req, res) => {
  try {
    const reviews = await prisma.review.findMany({
      where: {
        status: 'APPROVED',
        isFeatured: true,
      },
      orderBy: { featuredOrder: 'asc' },
      include: {
        product: {
          select: { title: true, shopifyHandle: true }
        }
      }
    })
    res.json({ reviews })
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch reviews' })
  }
})

// POST /api/reviews
// Customer submits a new review — goes to PENDING until you approve it
router.post('/', async (req, res) => {
  try {
    const { reviewerName, reviewerEmail, rating, title, body, productId } = req.body

    if (!reviewerName || !rating || !body) {
      return res.status(400).json({ error: 'Name, rating and review are required' })
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' })
    }

    const review = await prisma.review.create({
      data: {
        reviewerName,
        reviewerEmail,
        rating: parseInt(rating),
        title,
        body,
        productId: productId || null,
        status: 'PENDING',
      },
    })

    res.status(201).json({ 
      message: 'Review submitted! It will appear after approval.',
      review 
    })
  } catch (error) {
    res.status(500).json({ error: 'Could not submit review' })
  }
})

module.exports = router