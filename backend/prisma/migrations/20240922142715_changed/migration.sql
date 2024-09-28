/*
  Warnings:

  - You are about to drop the column `projectsId` on the `Post` table. All the data in the column will be lost.
  - Added the required column `Status` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_projectsId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "projectsId",
ADD COLUMN     "Status" TEXT NOT NULL,
ADD COLUMN     "projectId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
