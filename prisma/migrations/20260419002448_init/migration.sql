-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'BAKERY_MANAGER', 'STAFF');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'PAUSED', 'CANCELLED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "SubscriptionFrequency" AS ENUM ('WEEKLY', 'BIWEEKLY', 'MONTHLY');

-- CreateEnum
CREATE TYPE "DeliveryDay" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateEnum
CREATE TYPE "PromoType" AS ENUM ('QR_CAMPAIGN', 'DISCOUNT_CODE', 'FOMO_DROP', 'BUNDLE');

-- CreateEnum
CREATE TYPE "PromoStatus" AS ENUM ('ACTIVE', 'SCHEDULED', 'EXPIRED', 'PAUSED');

-- CreateEnum
CREATE TYPE "DropStatus" AS ENUM ('UPCOMING', 'LIVE', 'SOLD_OUT', 'ENDED');

-- CreateEnum
CREATE TYPE "ReviewStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'FLAGGED');

-- CreateEnum
CREATE TYPE "CorporateOrderStatus" AS ENUM ('INQUIRY', 'QUOTED', 'CONFIRMED', 'BAKING', 'DELIVERED', 'CANCELLED');

-- CreateTable
CREATE TABLE "admin_users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'STAFF',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastLoginAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "shopifyProductId" TEXT NOT NULL,
    "shopifyHandle" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "compareAtPrice" DECIMAL(10,2),
    "imageUrl" TEXT,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isLimitedEdition" BOOLEAN NOT NULL DEFAULT false,
    "tags" TEXT[],
    "ingredients" TEXT,
    "allergens" TEXT[],
    "calories" INTEGER,
    "inventoryQty" INTEGER NOT NULL DEFAULT 0,
    "lowStockThreshold" INTEGER NOT NULL DEFAULT 10,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cookie_drops" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" "DropStatus" NOT NULL DEFAULT 'UPCOMING',
    "startsAt" TIMESTAMP(3) NOT NULL,
    "endsAt" TIMESTAMP(3) NOT NULL,
    "offerText" TEXT,
    "offerPrice" DECIMAL(10,2) NOT NULL,
    "originalPrice" DECIMAL(10,2) NOT NULL,
    "maxQuantity" INTEGER,
    "soldCount" INTEGER NOT NULL DEFAULT 0,
    "urgencyText" TEXT,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cookie_drops_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cookie_drop_products" (
    "id" TEXT NOT NULL,
    "dropId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "cookie_drop_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "promo_campaigns" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" "PromoType" NOT NULL,
    "status" "PromoStatus" NOT NULL DEFAULT 'ACTIVE',
    "discountPct" DECIMAL(5,2),
    "discountFixed" DECIMAL(10,2),
    "freeItemCount" INTEGER,
    "startsAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "maxUses" INTEGER,
    "usedCount" INTEGER NOT NULL DEFAULT 0,
    "qrCodeUrl" TEXT,
    "landingSlug" TEXT,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "promo_campaigns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "promo_codes" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "dropId" TEXT,
    "code" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "maxUses" INTEGER NOT NULL DEFAULT 1,
    "usedCount" INTEGER NOT NULL DEFAULT 0,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "promo_codes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "promo_redemptions" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "codeId" TEXT,
    "customerEmail" TEXT NOT NULL,
    "customerName" TEXT,
    "shopifyOrderId" TEXT,
    "discountAmount" DECIMAL(10,2),
    "redeemedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "promo_redemptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriber_plans" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "cookieCount" INTEGER NOT NULL,
    "pricePerBox" DECIMAL(10,2) NOT NULL,
    "comparePrice" DECIMAL(10,2),
    "savingsPct" INTEGER,
    "frequencies" "SubscriptionFrequency"[],
    "deliveryDays" "DeliveryDay"[],
    "perks" TEXT[],
    "badgeText" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subscriber_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriber_leads" (
    "id" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "status" "SubscriptionStatus" NOT NULL DEFAULT 'ACTIVE',
    "email" TEXT NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "frequency" "SubscriptionFrequency" NOT NULL,
    "deliveryDay" "DeliveryDay" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "shopifyOrderId" TEXT,
    "nextDeliveryAt" TIMESTAMP(3),
    "lastDeliveredAt" TIMESTAMP(3),
    "totalDeliveries" INTEGER NOT NULL DEFAULT 0,
    "loyaltyPoints" INTEGER NOT NULL DEFAULT 0,
    "addressLine1" TEXT,
    "addressLine2" TEXT,
    "city" TEXT,
    "province" TEXT,
    "postalCode" TEXT,
    "country" TEXT DEFAULT 'CA',
    "pausedUntil" TIMESTAMP(3),
    "cancelledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subscriber_leads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscription_deliveries" (
    "id" TEXT NOT NULL,
    "subscriberId" TEXT NOT NULL,
    "deliveredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "shopifyOrderId" TEXT,
    "amount" DECIMAL(10,2) NOT NULL,
    "cookieCount" INTEGER NOT NULL,

    CONSTRAINT "subscription_deliveries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "corporate_accounts" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "city" TEXT,
    "province" TEXT,
    "postalCode" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "discountPct" DECIMAL(5,2),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "corporate_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "corporate_orders" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "status" "CorporateOrderStatus" NOT NULL DEFAULT 'INQUIRY',
    "cookieCount" INTEGER NOT NULL,
    "customPackaging" BOOLEAN NOT NULL DEFAULT false,
    "quotedPrice" DECIMAL(10,2),
    "finalPrice" DECIMAL(10,2),
    "deliveryDate" TIMESTAMP(3),
    "deliveryAddress" TEXT,
    "isRecurring" BOOLEAN NOT NULL DEFAULT false,
    "shopifyOrderId" TEXT,
    "internalNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "corporate_orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "productId" TEXT,
    "status" "ReviewStatus" NOT NULL DEFAULT 'PENDING',
    "reviewerName" TEXT NOT NULL,
    "reviewerEmail" TEXT,
    "isVerifiedBuyer" BOOLEAN NOT NULL DEFAULT false,
    "rating" INTEGER NOT NULL,
    "title" TEXT,
    "body" TEXT NOT NULL,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "featuredOrder" INTEGER,
    "approvedById" TEXT,
    "approvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "site_settings" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "label" TEXT,
    "group" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "site_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "email_subscribers" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "source" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "confirmedAt" TIMESTAMP(3),
    "unsubscribedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "email_subscribers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conversion_events" (
    "id" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "sessionId" TEXT,
    "customerEmail" TEXT,
    "productId" TEXT,
    "value" DECIMAL(10,2),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "conversion_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_users_email_key" ON "admin_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "products_shopifyProductId_key" ON "products"("shopifyProductId");

-- CreateIndex
CREATE UNIQUE INDEX "products_shopifyHandle_key" ON "products"("shopifyHandle");

-- CreateIndex
CREATE UNIQUE INDEX "cookie_drop_products_dropId_productId_key" ON "cookie_drop_products"("dropId", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "promo_campaigns_landingSlug_key" ON "promo_campaigns"("landingSlug");

-- CreateIndex
CREATE UNIQUE INDEX "promo_codes_code_key" ON "promo_codes"("code");

-- CreateIndex
CREATE UNIQUE INDEX "corporate_accounts_email_key" ON "corporate_accounts"("email");

-- CreateIndex
CREATE UNIQUE INDEX "site_settings_key_key" ON "site_settings"("key");

-- CreateIndex
CREATE UNIQUE INDEX "email_subscribers_email_key" ON "email_subscribers"("email");

-- CreateIndex
CREATE INDEX "conversion_events_eventType_idx" ON "conversion_events"("eventType");

-- CreateIndex
CREATE INDEX "conversion_events_createdAt_idx" ON "conversion_events"("createdAt");

-- AddForeignKey
ALTER TABLE "cookie_drops" ADD CONSTRAINT "cookie_drops_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "admin_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cookie_drop_products" ADD CONSTRAINT "cookie_drop_products_dropId_fkey" FOREIGN KEY ("dropId") REFERENCES "cookie_drops"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cookie_drop_products" ADD CONSTRAINT "cookie_drop_products_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promo_campaigns" ADD CONSTRAINT "promo_campaigns_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "admin_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promo_codes" ADD CONSTRAINT "promo_codes_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "promo_campaigns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promo_codes" ADD CONSTRAINT "promo_codes_dropId_fkey" FOREIGN KEY ("dropId") REFERENCES "cookie_drops"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promo_redemptions" ADD CONSTRAINT "promo_redemptions_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "promo_campaigns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promo_redemptions" ADD CONSTRAINT "promo_redemptions_codeId_fkey" FOREIGN KEY ("codeId") REFERENCES "promo_codes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriber_leads" ADD CONSTRAINT "subscriber_leads_planId_fkey" FOREIGN KEY ("planId") REFERENCES "subscriber_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscription_deliveries" ADD CONSTRAINT "subscription_deliveries_subscriberId_fkey" FOREIGN KEY ("subscriberId") REFERENCES "subscriber_leads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "corporate_orders" ADD CONSTRAINT "corporate_orders_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "corporate_accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "admin_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
