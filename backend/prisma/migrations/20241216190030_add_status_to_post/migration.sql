-- CreateTable
CREATE TABLE "KanbanBoard" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KanbanBoard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KanbanColumn" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "boardId" INTEGER NOT NULL,

    CONSTRAINT "KanbanColumn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KanbanTask" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "columnId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KanbanTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BoardColumns" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_BoardColumns_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ColumnTasks" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ColumnTasks_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_BoardColumns_B_index" ON "_BoardColumns"("B");

-- CreateIndex
CREATE INDEX "_ColumnTasks_B_index" ON "_ColumnTasks"("B");

-- AddForeignKey
ALTER TABLE "KanbanBoard" ADD CONSTRAINT "KanbanBoard_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KanbanColumn" ADD CONSTRAINT "KanbanColumn_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "KanbanBoard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KanbanTask" ADD CONSTRAINT "KanbanTask_columnId_fkey" FOREIGN KEY ("columnId") REFERENCES "KanbanColumn"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BoardColumns" ADD CONSTRAINT "_BoardColumns_A_fkey" FOREIGN KEY ("A") REFERENCES "KanbanBoard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BoardColumns" ADD CONSTRAINT "_BoardColumns_B_fkey" FOREIGN KEY ("B") REFERENCES "KanbanColumn"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ColumnTasks" ADD CONSTRAINT "_ColumnTasks_A_fkey" FOREIGN KEY ("A") REFERENCES "KanbanColumn"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ColumnTasks" ADD CONSTRAINT "_ColumnTasks_B_fkey" FOREIGN KEY ("B") REFERENCES "KanbanTask"("id") ON DELETE CASCADE ON UPDATE CASCADE;
