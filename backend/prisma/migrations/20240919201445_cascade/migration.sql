-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_projectsId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_authorId_fkey";

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_projectsId_fkey" FOREIGN KEY ("projectsId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
