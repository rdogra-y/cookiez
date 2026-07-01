-- AlterTable
ALTER TABLE "products" ADD COLUMN     "cultureOrigin" TEXT,
ADD COLUMN     "descriptor" TEXT,
ADD COLUMN     "hook" TEXT,
ADD COLUMN     "isCultureDrop" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "storageHint" TEXT,
ADD COLUMN     "story" TEXT;
