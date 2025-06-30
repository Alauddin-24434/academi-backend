/*
  Warnings:

  - Added the required column `boardName` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registrationNo` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rollNo` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "boardName" TEXT NOT NULL,
ADD COLUMN     "registrationNo" TEXT NOT NULL,
ADD COLUMN     "rollNo" TEXT NOT NULL;
