// Built by Rakshita Dogra — Happy's Cookiez © 2025
require('dotenv').config()
const { PrismaClient } = require('@prisma/client')
const { PrismaPg } = require('@prisma/adapter-pg')
const { Pool } = require('pg')
const bcrypt = require('bcryptjs')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log("🍪 Seeding Happy's Cookiez database...")

  // ── Admin User ───────────────────────────────────────
  const passwordHash = await bcrypt.hash('admin123', 12)

  const admin = await prisma.adminUser.upsert({
    where: { email: 'admin@happyscookiez.com' },
    update: {},
    create: {
      email: 'admin@happyscookiez.com',
      passwordHash,
      name: 'Rakshita Dogra',
      role: 'SUPER_ADMIN',
    },
  })
  console.log('✅ Admin user created')

// ── Products ─────────────────────────────────────────

  // ORIGINALS

  const p1 = await prisma.product.upsert({
    where: { shopifyProductId: 'shopify_001' },
    update: {
      shopifyHandle: 'brown-butter-chocolate-chip',
      title: 'The Brown Butter Chocolate Chip',
      descriptor: 'Browned butter, chocolate chip, simple, irresistible.',
      description: 'Brown butter dough, dark chocolate chips, soft yielding center. The one that started it all.',
      isCultureDrop: false,
      tags: ['original', 'bestseller'],
    },
    create: {
      shopifyProductId: 'shopify_001',
      shopifyHandle: 'brown-butter-chocolate-chip',
      title: 'The Brown Butter Chocolate Chip',
      descriptor: 'Browned butter, chocolate chip, simple, irresistible.',
      description: 'Brown butter dough, dark chocolate chips, soft yielding center. The one that started it all.',
      price: 6.25,
      imageUrl: '/images/cookies/brown-butter-chocolate-chip.jpg',
      isFeatured: true,
      isCultureDrop: false,
      tags: ['original', 'bestseller'],
      allergens: ['Milk', 'Wheat', 'Eggs'],
      inventoryQty: 48,
    },
  })

  const p2 = await prisma.product.upsert({
    where: { shopifyProductId: 'shopify_002' },
    update: {
      shopifyHandle: 'hazelnut-crunch',
      title: 'Hazelnut Crunch',
      descriptor: 'Brown butter dough, toasted hazelnut, chocolate chips, nutella, chocolate icing, meringue.',
      description: 'Brown butter dough loaded with toasted hazelnuts and chocolate chips, swirled with nutella, finished with chocolate icing and crisp meringue.',
      isCultureDrop: false,
      tags: ['original'],
    },
    create: {
      shopifyProductId: 'shopify_002',
      shopifyHandle: 'hazelnut-crunch',
      title: 'Hazelnut Crunch',
      descriptor: 'Brown butter dough, toasted hazelnut, chocolate chips, nutella, chocolate icing, meringue.',
      description: 'Brown butter dough loaded with toasted hazelnuts and chocolate chips, swirled with nutella, finished with chocolate icing and crisp meringue.',
      price: 6.25,
      imageUrl: '/images/cookies/hazelnut-crunch.jpg',
      isFeatured: true,
      isCultureDrop: false,
      tags: ['original'],
      allergens: ['Milk', 'Wheat', 'Eggs', 'Nuts'],
      inventoryQty: 48,
    },
  })

  const p3 = await prisma.product.upsert({
    where: { shopifyProductId: 'shopify_003' },
    update: {
      shopifyHandle: 'babas-big-apple',
      title: "Baba's Big Apple",
      descriptor: 'Stuffed apple, cinnamon sugar, streusel, vanilla icing.',
      description: 'Soft dough stuffed with warm spiced apple, dusted with cinnamon sugar, finished with streusel and vanilla icing. Comforting, nostalgic, made to share.',
      isCultureDrop: false,
      tags: ['original'],
    },
    create: {
      shopifyProductId: 'shopify_003',
      shopifyHandle: 'babas-big-apple',
      title: "Baba's Big Apple",
      descriptor: 'Stuffed apple, cinnamon sugar, streusel, vanilla icing.',
      description: 'Soft dough stuffed with warm spiced apple, dusted with cinnamon sugar, finished with streusel and vanilla icing. Comforting, nostalgic, made to share.',
      price: 6.25,
      imageUrl: '/images/cookies/babas-big-apple.jpg',
      isFeatured: true,
      isCultureDrop: false,
      tags: ['original'],
      allergens: ['Milk', 'Wheat', 'Eggs'],
      inventoryQty: 48,
    },
  })

  const p4 = await prisma.product.upsert({
    where: { shopifyProductId: 'shopify_004' },
    update: {},
    create: {
      shopifyProductId: 'shopify_004',
      shopifyHandle: 'the-pb-cup',
      title: 'The PB Cup',
      descriptor: 'PB dough, peanut butter center, pb cups, vanilla icing.',
      description: 'Peanut butter dough with a molten peanut butter center, studded with chopped PB cups, finished with vanilla icing.',
      price: 6.25,
      imageUrl: '/images/cookies/the-pb-cup.jpg',
      isFeatured: false,
      isCultureDrop: false,
      tags: ['original'],
      allergens: ['Milk', 'Wheat', 'Eggs', 'Peanuts'],
      inventoryQty: 48,
    },
  })

  const p5 = await prisma.product.upsert({
    where: { shopifyProductId: 'shopify_005' },
    update: {},
    create: {
      shopifyProductId: 'shopify_005',
      shopifyHandle: 'the-churro',
      title: 'The Churro',
      descriptor: 'Dulce de leche, vanilla icing, cinnamon sugar, peanuts.',
      description: 'Soft cinnamon-sugar dough with a dulce de leche center, finished with vanilla icing and crushed peanuts. Best served warm.',
      storageHint: 'Serve Warm',
      price: 6.25,
      imageUrl: '/images/cookies/the-churro.jpg',
      isFeatured: false,
      isCultureDrop: false,
      tags: ['original', 'serve-warm'],
      allergens: ['Milk', 'Wheat', 'Eggs', 'Peanuts'],
      inventoryQty: 48,
    },
  })

  // CULTURE DROPS

  const p6 = await prisma.product.upsert({
    where: { shopifyProductId: 'shopify_006' },
    update: {},
    create: {
      shopifyProductId: 'shopify_006',
      shopifyHandle: 'crack-brulee',
      title: 'Crack Brulee',
      descriptor: 'Caramelized sugar · vanilla custard · crunch.',
      hook: 'Crack the top. Then everything melts.',
      story: 'A caramelized sugar shell that shatters into a soft, custard-like center. Sweet, rich, and made to be broken into.',
      cultureOrigin: 'France',
      price: 6.25,
      imageUrl: '/images/cookies/crack-brulee.jpg',
      isFeatured: true,
      isCultureDrop: true,
      isLimitedEdition: true,
      tags: ['culture-drop', 'france'],
      allergens: ['Milk', 'Wheat', 'Eggs'],
      inventoryQty: 30,
    },
  })

  const p7 = await prisma.product.upsert({
    where: { shopifyProductId: 'shopify_007' },
    update: {},
    create: {
      shopifyProductId: 'shopify_007',
      shopifyHandle: 'ube-coconut-cloud',
      title: 'Ube Coconut Cloud',
      descriptor: 'Ube · white chocolate · toasted coconut.',
      hook: 'Escape to the island, impossible to forget.',
      story: 'A soft ube cookie loaded with white chocolate, topped with coconut cream cheese frosting and toasted coconut. Creamy, nutty, and perfectly balanced.',
      storageHint: 'Keep Chilled',
      cultureOrigin: 'Philippines',
      price: 6.25,
      imageUrl: '/images/cookies/ube-coconut-cloud.jpg',
      isFeatured: true,
      isCultureDrop: true,
      isLimitedEdition: true,
      tags: ['culture-drop', 'philippines', 'keep-chilled'],
      allergens: ['Milk', 'Wheat', 'Eggs', 'Coconut'],
      inventoryQty: 30,
    },
  })

  const p8 = await prisma.product.upsert({
    where: { shopifyProductId: 'shopify_008' },
    update: {},
    create: {
      shopifyProductId: 'shopify_008',
      shopifyHandle: 'saskatoon-cheesecake',
      title: 'Saskatoon Cheesecake',
      descriptor: 'Saskatoon berry · cream cheese · graham.',
      hook: 'A local classic, reimagined.',
      story: 'A graham base topped with marshmallow cream cheese frosting and Saskatoon berry topping, finished with a hint of lemon zest.',
      storageHint: 'Keep Chilled',
      cultureOrigin: 'Canada',
      price: 6.25,
      imageUrl: '/images/cookies/saskatoon-cheesecake.jpg',
      isFeatured: false,
      isCultureDrop: true,
      isLimitedEdition: true,
      tags: ['culture-drop', 'canada', 'keep-chilled'],
      allergens: ['Milk', 'Wheat', 'Eggs'],
      inventoryQty: 30,
    },
  })

  const p9 = await prisma.product.upsert({
    where: { shopifyProductId: 'shopify_009' },
    update: {},
    create: {
      shopifyProductId: 'shopify_009',
      shopifyHandle: 'red-velvet-berry-cheesecake',
      title: 'Red Velvet Berry Cheesecake',
      descriptor: 'Red velvet · cream cheese · berry.',
      hook: 'Rich, layered, and worth every bite.',
      story: 'A red velvet cookie filled with cream cheese ganache and berry jam. Tangy with a melt-in-the-middle finish.',
      storageHint: 'Keep Chilled',
      cultureOrigin: 'Canada or USA',
      price: 6.25,
      imageUrl: '/images/cookies/red-velvet-berry-cheesecake.jpg',
      isFeatured: false,
      isCultureDrop: true,
      isLimitedEdition: true,
      tags: ['culture-drop', 'canada', 'usa', 'keep-chilled'],
      allergens: ['Milk', 'Wheat', 'Eggs'],
      inventoryQty: 30,
    },
  })

  console.log('✅ Products created (5 originals + 4 culture drops)')

  // ── Subscription Plans ────────────────────────────────
  await prisma.subscriberPlan.upsert({
    where: { id: 'plan_50' },
    update: {},
    create: {
      id: 'plan_50',
      name: "Baker's Dozen",
      description: 'Perfect for cookie lovers who want a regular treat.',
      cookieCount: 50,
      pricePerBox: 72.25,
      comparePrice: 85.00,
      savingsPct: 15,
      frequencies: ['WEEKLY', 'BIWEEKLY', 'MONTHLY'],
      deliveryDays: [
        'MONDAY', 'TUESDAY', 'WEDNESDAY',
        'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY',
      ],
      perks: [
        'Early access to new flavors',
        'Exclusive member-only drops',
        '1 free cookie every 5th box',
        'Priority bake queue',
        'Invite to tastings and cookie parties',
      ],
    },
  })

  await prisma.subscriberPlan.upsert({
    where: { id: 'plan_100' },
    update: {},
    create: {
      id: 'plan_100',
      name: 'Party Pack',
      description: 'For offices, events, or serious cookie lovers.',
      cookieCount: 100,
      pricePerBox: 130.00,
      comparePrice: 165.00,
      savingsPct: 30,
      badgeText: 'Best Value',
      frequencies: ['WEEKLY', 'BIWEEKLY', 'MONTHLY'],
      deliveryDays: [
        'MONDAY', 'TUESDAY', 'WEDNESDAY',
        'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY',
      ],
      perks: [
        "Everything in Baker's Dozen",
        'Custom flavor selection',
        'Free custom packaging',
        'Dedicated account manager',
        'Bulk discount on extras',
      ],
    },
  })

  await prisma.subscriberPlan.upsert({
    where: { id: 'plan_150' },
    update: {},
    create: {
      id: 'plan_150',
      name: 'Family Box',
      description: 'Enough cookies to keep the whole family happy.',
      cookieCount: 150,
      pricePerBox: 185.00,
      comparePrice: 235.00,
      savingsPct: 25,
      frequencies: ['WEEKLY', 'BIWEEKLY', 'MONTHLY'],
      deliveryDays: [
        'MONDAY', 'TUESDAY', 'WEDNESDAY',
        'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY',
      ],
      perks: [
        "Everything in Party Pack",
        'Monthly surprise flavor',
        'Free gift wrapping on special occasions',
      ],
    },
  })

  await prisma.subscriberPlan.upsert({
    where: { id: 'plan_200' },
    update: {},
    create: {
      id: 'plan_200',
      name: 'Corporate Box',
      description: 'Ideal for offices and large teams.',
      cookieCount: 200,
      pricePerBox: 230.00,
      comparePrice: 312.00,
      savingsPct: 35,
      badgeText: 'Best for Teams',
      frequencies: ['WEEKLY', 'BIWEEKLY', 'MONTHLY'],
      deliveryDays: [
        'MONDAY', 'TUESDAY', 'WEDNESDAY',
        'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY',
      ],
      perks: [
        'Everything in Family Box',
        'Custom branded packaging',
        'Dedicated account manager',
        'Invoice billing available',
        'Priority same-week delivery',
      ],
    },
  })
  console.log('✅ Subscription plans created')

  // ── Cookie Drop ───────────────────────────────────────
  // QR code goes on postcard inside delivery box
  // Customer scans → 24 hours to claim 5 cookies for $25
  const drop = await prisma.cookieDrop.create({
    data: {
      title: 'Limited 24-Hour Cookie Drop',
      description: 'Scan the QR code from your delivery and unlock this exclusive offer.',
      status: 'LIVE',
      startsAt: new Date(),
      endsAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      offerText: '5 cookies for $25 — 1 FREE',
      offerPrice: 25.00,
      originalPrice: 31.25,
      maxQuantity: 50,
      urgencyText: 'This offer expires in 24 hours from when you scanned!',
      createdById: admin.id,
    },
  })
  console.log('✅ Cookie drop created')

  // ── Promo Campaign ────────────────────────────────────
  // Locked to 1 use per email — sharing won't work twice
  const campaign = await prisma.promoCampaign.create({
    data: {
      name: 'Delivery QR Postcard Campaign',
      description: 'QR code printed on postcard inside every delivery box.',
      type: 'QR_CAMPAIGN',
      status: 'ACTIVE',
      freeItemCount: 1,
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      maxUses: 1000,
      landingSlug: 'qr-drop',
      createdById: admin.id,
    },
  })

  await prisma.promoCode.createMany({
    data: [
      { campaignId: campaign.id, code: 'HAPPYDROP', maxUses: 1000 },
      { campaignId: campaign.id, code: 'HSCBITE', maxUses: 200 },
    ],
  })
  console.log('✅ Promo codes created')

  // ── Reviews ───────────────────────────────────────────
  await prisma.review.createMany({
    data: [
      {
        productId: p1.id,
        reviewerName: 'Sarah M.',
        rating: 5,
        title: "Best cookies I've ever had!",
        body: "The Happy is life-changing. I order them every week and it's the highlight of my family's week.",
        isVerifiedBuyer: true,
        isFeatured: true,
        featuredOrder: 1,
        status: 'APPROVED',
        approvedById: admin.id,
        approvedAt: new Date(),
      },
      {
        productId: p2.id,
        reviewerName: 'James T.',
        rating: 5,
        title: 'Worth every penny',
        body: 'Midnight in Kyiv is absolutely incredible. Fresh, indulgent and delicious every single time.',
        isVerifiedBuyer: true,
        isFeatured: true,
        featuredOrder: 2,
        status: 'APPROVED',
        approvedById: admin.id,
        approvedAt: new Date(),
      },
      {
        productId: p3.id,
        reviewerName: 'Elena R.',
        rating: 5,
        title: 'Truly exceptional',
        body: "Baba's Apple Doughkie tastes like a warm hug. My coworkers are obsessed!",
        isVerifiedBuyer: true,
        isFeatured: true,
        featuredOrder: 3,
        status: 'APPROVED',
        approvedById: admin.id,
        approvedAt: new Date(),
      },
    ],
  })
  console.log('✅ Reviews created')

  // ── Corporate Account ─────────────────────────────────
  await prisma.corporateAccount.create({
    data: {
      companyName: 'Sample Corp',
      contactName: 'Dave',
      email: 'dave@samplecorp.com',
      phone: '+1 204 555 0100',
      city: 'Winnipeg',
      province: 'Manitoba',
      postalCode: 'R3C 0A1',
      discountPct: 15,
      notes: 'Monthly cookie drop subscription. Early access to new flavors.',
    },
  })
  console.log('✅ Corporate account created')

  // ── Site Settings ─────────────────────────────────────
  const settings = [
    { key: 'hero_headline', value: 'Freshly Baked Happiness Delivered', label: 'Hero Headline', group: 'homepage', isPublic: true },
    { key: 'hero_subtext', value: 'Handcrafted cookies made fresh and delivered warm.', label: 'Hero Subtext', group: 'homepage', isPublic: true },
    { key: 'single_cookie_price', value: '6.25', label: 'Single Cookie Price', group: 'pricing', isPublic: true },
    { key: 'box_of_4_price', value: '25.00', label: 'Box of 4 Price', group: 'pricing', isPublic: true },
    { key: 'free_shipping_threshold', value: '35.00', label: 'Free Shipping Threshold', group: 'pricing', isPublic: true },
    { key: 'fomo_offer_text', value: '5 cookies for $25 — 1 FREE', label: 'FOMO Offer Text', group: 'fomo', isPublic: true },
    { key: 'fomo_validity_hours', value: '24', label: 'FOMO Validity Hours', group: 'fomo', isPublic: true },
    { key: 'business_address', value: "123 Sugar Street, Winnipeg, Manitoba R3C 0A1", label: 'Business Address', group: 'contact', isPublic: true },
    { key: 'business_phone', value: '(204) 555-0188', label: 'Phone Number', group: 'contact', isPublic: true },
    { key: 'business_email', value: 'hello@sugarnestcookies.test', label: 'Contact Email', group: 'contact', isPublic: true },
    { key: 'hours_monday', value: 'Closed', label: 'Monday Hours', group: 'hours', isPublic: true },
    { key: 'hours_tuesday', value: '9:00 AM - 9:00 PM', label: 'Tuesday Hours', group: 'hours', isPublic: true },
    { key: 'hours_wednesday', value: '9:00 AM - 9:00 PM', label: 'Wednesday Hours', group: 'hours', isPublic: true },
    { key: 'hours_thursday', value: '9:00 AM - 9:00 PM', label: 'Thursday Hours', group: 'hours', isPublic: true },
    { key: 'hours_friday', value: '9:00 AM - 9:00 PM', label: 'Friday Hours', group: 'hours', isPublic: true },
    { key: 'hours_saturday', value: '9:00 AM - 5:00 PM', label: 'Saturday Hours', group: 'hours', isPublic: true },
    { key: 'hours_sunday', value: '9:00 AM - 1:00 PM', label: 'Sunday Hours', group: 'hours', isPublic: true },
    { key: 'instagram_url', value: 'https://instagram.com/sugarnestcookies', label: 'Instagram', group: 'social', isPublic: true },
    { key: 'tiktok_url', value: 'https://tiktok.com/@sugarnestcookies', label: 'TikTok', group: 'social', isPublic: true },
  ]

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    })
  }
  console.log('✅ Site settings created')

  console.log('\n🎉 Database seeded successfully!')
  console.log('👤 Admin login: admin@happyscookiez.com / admin123')
  console.log('🔒 Change your password after first login!')
}

main()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })