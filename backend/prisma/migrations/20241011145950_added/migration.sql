-- AlterTable
ALTER TABLE "User" ADD COLUMN     "all_posts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "all_projects" INTEGER NOT NULL DEFAULT 0;