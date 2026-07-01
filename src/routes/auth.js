// Built by Rakshita Dogra — Happy's Cookiez © 2025
const express = require('express')
const router = express.Router()
const prisma = require('../prisma')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// POST /api/auth/login
// Admin login — returns a JWT token
// This token is used to access protected admin routes
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    // Find admin by email
    const admin = await prisma.adminUser.findUnique({
      where: { email: email.toLowerCase() },
    })

    // Don't tell hackers which part is wrong
    // Just say invalid credentials for both wrong email and wrong password
    if (!admin || !admin.isActive) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // Check password
    const validPassword = await bcrypt.compare(password, admin.passwordHash)
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // Update last login time
    await prisma.adminUser.update({
      where: { id: admin.id },
      data: { lastLoginAt: new Date() },
    })

    // Create JWT token — expires in 7 days
    const token = jwt.sign(
      { 
        id: admin.id, 
        email: admin.email, 
        role: admin.role,
        name: admin.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      success: true,
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    })

  } catch (error) {
    res.status(500).json({ error: 'Login failed' })
  }
})

// POST /api/auth/verify
// Check if a token is still valid
// Used by admin panel to keep user logged in
router.post('/verify', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')

    if (!token) {
      return res.status(401).json({ error: 'No token provided' })
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET)
    res.json({ valid: true, admin: payload })

  } catch (error) {
    res.status(401).json({ valid: false, error: 'Invalid or expired token' })
  }
})

module.exports = router