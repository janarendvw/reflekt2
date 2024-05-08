-- DropForeignKey
ALTER TABLE "ActionPoint" DROP CONSTRAINT "ActionPoint_authorId_fkey";

-- DropForeignKey
ALTER TABLE "ActionPoint" DROP CONSTRAINT "ActionPoint_reflectionId_fkey";

-- DropForeignKey
ALTER TABLE "Reflection" DROP CONSTRAINT "Reflection_authorId_fkey";

-- AddForeignKey
ALTER TABLE "Reflection" ADD CONSTRAINT "Reflection_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionPoint" ADD CONSTRAINT "ActionPoint_reflectionId_fkey" FOREIGN KEY ("reflectionId") REFERENCES "Reflection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionPoint" ADD CONSTRAINT "ActionPoint_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
