/*
  Warnings:

  - You are about to drop the column `tagId` on the `Reflection` table. All the data in the column will be lost.
  - You are about to drop the `ReflectionTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ReflectionTag" DROP CONSTRAINT "ReflectionTag_reflectionId_fkey";

-- DropForeignKey
ALTER TABLE "ReflectionTag" DROP CONSTRAINT "ReflectionTag_tagId_fkey";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_userId_fkey";

-- AlterTable
ALTER TABLE "Reflection" DROP COLUMN "tagId",
ADD COLUMN     "tags" TEXT[];

-- DropTable
DROP TABLE "ReflectionTag";

-- DropTable
DROP TABLE "Tag";
