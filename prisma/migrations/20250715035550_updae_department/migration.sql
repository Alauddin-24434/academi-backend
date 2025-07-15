/*
  Warnings:

  - Added the required column `category` to the `Department` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DepartmentCategory" AS ENUM ('SCIENCE', 'HUMANITIES', 'COMMERCE');

-- AlterTable
ALTER TABLE "Department" ADD COLUMN     "category" "DepartmentCategory" NOT NULL;
