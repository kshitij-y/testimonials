/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Testimonial` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Testimonial` table. All the data in the column will be lost.
  - Added the required column `email` to the `Testimonial` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Testimonial` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spaceId` to the `Testimonial` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Testimonial" DROP CONSTRAINT "Testimonial_userId_fkey";

-- AlterTable
ALTER TABLE "Testimonial" DROP COLUMN "createdAt",
DROP COLUMN "userId",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "spaceId" INTEGER NOT NULL,
ADD COLUMN     "videoUrl" TEXT;

-- CreateTable
CREATE TABLE "Space" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "logoUrl" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "Questions" TEXT[],
    "thankGif" TEXT NOT NULL,
    "thankTitle" TEXT NOT NULL,
    "thankMsg" TEXT NOT NULL,

    CONSTRAINT "Space_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Space" ADD CONSTRAINT "Space_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Testimonial" ADD CONSTRAINT "Testimonial_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
