/*
  Warnings:

  - You are about to drop the column `authorEmail` on the `Testimonial` table. All the data in the column will be lost.
  - You are about to drop the column `authorName` on the `Testimonial` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Testimonial` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Testimonial` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TestimonialTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Widget` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[googleId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "TestimonialTag" DROP CONSTRAINT "TestimonialTag_tagId_fkey";

-- DropForeignKey
ALTER TABLE "TestimonialTag" DROP CONSTRAINT "TestimonialTag_testimonialId_fkey";

-- DropForeignKey
ALTER TABLE "Widget" DROP CONSTRAINT "Widget_userId_fkey";

-- AlterTable
ALTER TABLE "Testimonial" DROP COLUMN "authorEmail",
DROP COLUMN "authorName",
DROP COLUMN "rating",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "password",
DROP COLUMN "updatedAt",
ADD COLUMN     "avatarUrl" TEXT,
ADD COLUMN     "googleId" TEXT,
ADD COLUMN     "passwordHash" TEXT,
ALTER COLUMN "name" DROP NOT NULL;

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "TestimonialTag";

-- DropTable
DROP TABLE "Widget";

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");
