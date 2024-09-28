/*
  Warnings:

  - You are about to drop the column `Status` on the `Post` table. All the data in the column will be lost.
  - Added the required column `status` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "Status",
ADD COLUMN     "status" TEXT NOT NULL;
