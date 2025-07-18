/*
  Warnings:

  - Added the required column `fatherName` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `motherName` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "students" ADD COLUMN     "documentUrl" TEXT,
ADD COLUMN     "fatherName" TEXT NOT NULL,
ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "motherName" TEXT NOT NULL;
