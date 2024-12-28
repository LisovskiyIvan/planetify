import Navbar from "@/Components/Navbar";
import { useEffect } from "react";
import { Board } from "../Components/kanban/Board";
import { useAtom, useAtomValue } from "jotai";
import { CreateBoardModal } from "../Components/kanban/CreateBoardModal";
import {
  boardsAtom,
  changeTaskModalAtom,
  createBoardModalAtom,
  createColumnModalAtom,
  createTaskModalAtom,
  deleteBoardModalAtom,
  deleteColumnModalAtom,
  deleteTaskModalAtom,
  triggerBoardAtom,
} from "@/atoms/modalAtoms";
import { Button } from "@/Components/ui/button";
import { DeleteModal } from "@/Components/DeleteModal";
import { Column } from "@/Components/kanban/Column";
import { CreateColumnModal } from "@/Components/kanban/CreateColumnModal";
import { CreateTaskModal } from "@/Components/kanban/CreateTaskModal";
import { ChangeTaskModal } from "@/Components/kanban/ChangeTaskModal";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useDelete } from "@/hooks/useDelete";
import { useSearchParams } from "react-router-dom";

export function Kanban() {
  const [searchParams] = useSearchParams();
  const boardId = searchParams.get("board");
  const [boards, setBoards] = useAtom(boardsAtom);
  const [isCreateBoardOpen, setIsCreateBoardOpen] = useAtom(createBoardModalAtom);
  const triggerBoard = useAtomValue(triggerBoardAtom);
  const [deleteBoardModal, setDeleteBoard] = useAtom(deleteBoardModalAtom);
  const selectedBoard = boardId ? parseInt(boardId) : undefined;
  const currentBoard = boards.find(board => board.id === selectedBoard);
  const createColumnModal = useAtomValue(createColumnModalAtom);
  const [deleteColumnModal, setDeleteColumnModal] = useAtom(deleteColumnModalAtom);
  const createTaskModal = useAtomValue(createTaskModalAtom);
  const [deleteTaskModal, setDeleteTaskModal] = useAtom(deleteTaskModalAtom);
  const changeTaskModal = useAtomValue(changeTaskModalAtom);
  const {deleteBoard, deleteColumn, deleteTask} = useDelete();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("id");

    if (!token || !userId) return;

    const fetchBoards = async () => {
      const res = await fetch(
        `/api/kanban/${userId}/boards`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        setBoards(data);
      }
    };

    fetchBoards();
  }, [triggerBoard, setBoards]);


  function handleDragEnd(event: DragEndEvent) {
    const {active, over} = event;
    if (!over) return;
    
    const taskId = active.id;
    const newColumnId = over.id as number;
    const oldColumnId = currentBoard?.columns.find(column => 
      column.tasks.some(task => task.id === taskId)
    )?.id;

    if (!oldColumnId || oldColumnId === newColumnId) return;

    const oldColumn = currentBoard?.columns.find(col => col.id === oldColumnId);
    const newColumn = currentBoard?.columns.find(col => col.id === newColumnId);
    
    if (!oldColumn || !newColumn) return;

    const task = oldColumn.tasks.find(t => t.id === taskId);
    if (!task) return;

    const updatedOldColumn = {
      ...oldColumn,
      tasks: oldColumn.tasks.filter(t => t.id !== taskId)
    };

    const updatedNewColumn = {
      ...newColumn, 
      tasks: [...newColumn.tasks, {...task, columnId: newColumnId}]
    };

    setBoards(prevBoards => prevBoards.map(board =>
      board.id === selectedBoard
        ? {
            ...board,
            columns: board.columns.map(col => {
              if (col.id === oldColumnId) return updatedOldColumn;
              if (col.id === newColumnId) return updatedNewColumn;
              return col;
            })
          }
        : board
    ));

    const token = localStorage.getItem("token");
    if (!token) return;

    fetch(`/api/kanban/update-task/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        columnId: newColumnId
      })
    });
  }

  
  return (
    <div className="w-[100%] min-h-[100dvh] bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 flex flex-col">
      <Navbar />
      <h1 className="text-5xl mt-10 ml-20">Мои доски</h1>

      <div className="flex mt-10 px-5 flex-grow">
        <div className="flex flex-col items-center flex-wrap gap-4 p-4">
          {boards.map((board) => (
            <Board key={board.id} board={board} />
          ))}
          <Button
            onClick={() => setIsCreateBoardOpen(true)}
            className="bg-black w-9/12 text-xl text-white p-2 rounded-md hover:bg-white hover:text-black hover:scale-105 duration-300 transition-all"
          >
            Создать новую доску
          </Button>
        </div>
        <DndContext onDragEnd={handleDragEnd}>
        <div className="flex gap-10 px-10 w-full" style={selectedBoard && currentBoard && currentBoard.columns.length === 0 ? {justifyContent: "center"} : {justifyContent: "flex-start"}}>
          {selectedBoard  && currentBoard ? (
            currentBoard.columns.length > 0 ? (
              boards
                .find((board) => board.id === selectedBoard)
                ?.columns.map((column) => (
                  <Column key={column.id} column={column} />
                ))
            ) : (
              <div className="flex max-h-[30%] content-center w-3/6 flex-col items-center justify-center p-8 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg text-3xl text-white">
                <svg className="w-20 h-20 mb-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-center">Упс, кажется вы еще не создали колонки!</p>
                <p className="mt-2 text-xl text-white/80">Добавьте первую колонку, чтобы начать работу</p>
              </div>
            )
          ) : null}
        </div>
        </DndContext>
      </div>

      {isCreateBoardOpen && <CreateBoardModal />}
      {createColumnModal.isOpen && <CreateColumnModal />}
      {createTaskModal.isOpen && <CreateTaskModal />}
      {deleteBoardModal.isOpen && (
        <DeleteModal
          title="доску"
          deleteThing={deleteBoard}
          closeModal={() => setDeleteBoard({ isOpen: false, id: 0 })}
          id={deleteBoardModal.id}
        />
      )}
      {deleteColumnModal.isOpen && (
        <DeleteModal
          title="колонку"
          deleteThing={deleteColumn}
          closeModal={() => setDeleteColumnModal({ isOpen: false, id: 0 })}
          id={deleteColumnModal.id}
        />
      )}
      {deleteTaskModal.isOpen && (
        <DeleteModal
          title="задачу"
          deleteThing={deleteTask}
          closeModal={() => setDeleteTaskModal({ isOpen: false, id: 0 })}
          id={deleteTaskModal.id}
        />
      )}
      {changeTaskModal.isOpen && <ChangeTaskModal />}
    </div>
  );
}
