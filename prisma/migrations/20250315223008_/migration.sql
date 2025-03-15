/*
  Warnings:

  - The primary key for the `Space` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Testimonial` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Space" DROP CONSTRAINT "Space_userId_fkey";

-- DropForeignKey
ALTER TABLE "Testimonial" DROP CONSTRAINT "Testimonial_spaceId_fkey";

-- AlterTable
ALTER TABLE "Space" DROP CONSTRAINT "Space_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Space_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Space_id_seq";

-- AlterTable
ALTER TABLE "Testimonial" DROP CONSTRAINT "Testimonial_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "spaceId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Testimonial_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AddForeignKey
ALTER TABLE "Space" ADD CONSTRAINT "Space_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Testimonial" ADD CONSTRAINT "Testimonial_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
