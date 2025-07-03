-- CreateEnum
CREATE TYPE "MethodType" AS ENUM ('CUSTOM', 'GOOGLE', 'FACEBOOK', 'GITHUB');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "method" "MethodType" NOT NULL DEFAULT 'CUSTOM';
