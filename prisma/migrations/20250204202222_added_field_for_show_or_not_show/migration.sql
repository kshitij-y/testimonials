/*
  Warnings:

  - Added the required column `rating` to the `Testimonial` table without a default value. This is not possible if the table is not empty.
  - Added the required column `show` to the `Testimonial` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Testimonial" ADD COLUMN     "rating" INTEGER NOT NULL,
ADD COLUMN     "show" BOOLEAN NOT NULL;
