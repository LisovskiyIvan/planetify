/*
  Warnings:

  - You are about to drop the `_BoardColumns` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ColumnTasks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BoardColumns" DROP CONSTRAINT "_BoardColumns_A_fkey";

-- DropForeignKey
ALTER TABLE "_BoardColumns" DROP CONSTRAINT "_BoardColumns_B_fkey";

-- DropForeignKey
ALTER TABLE "_ColumnTasks" DROP CONSTRAINT "_ColumnTasks_A_fkey";

-- DropForeignKey
ALTER TABLE "_ColumnTasks" DROP CONSTRAINT "_ColumnTasks_B_fkey";

-- DropTable
DROP TABLE "_BoardColumns";

-- DropTable
DROP TABLE "_ColumnTasks";
