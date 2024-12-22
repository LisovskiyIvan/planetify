import Navbar from "@/Components/Navbar";
import { useEffect } from "react";
import { Board } from "../Components/kanban/Board";
import { useAtom, useAtomValue } from "jotai";
import { CreateBoardModal } from "../Components/kanban/CreateBoardModal";
import {
  boardsAtom,
  createBoardModalAtom,
  createColumnModalAtom,
  createTaskModalAtom,
  currentBoardAtom,
  deleteBoardModalAtom,
  deleteColumnModalAtom,
  deleteTaskModalAtom,
  selectedBoardAtom,
  triggerBoardAtom,
} from "@/atoms/modalAtoms";
import { Button } from "@/Components/ui/button";
import { DeleteModal } from "@/Components/DeleteModal";
import { Column } from "@/Components/kanban/Column";
import { CreateColumnModal } from "@/Components/kanban/CreateColumnModal";
import { CreateTaskModal } from "@/Components/kanban/CreateTaskModal";

export function Kanban() {
  const [boards, setBoards] = useAtom(boardsAtom);
  const [isCreateBoardOpen, setIsCreateBoardOpen] =
    useAtom(createBoardModalAtom);
  const [triggerBoard, setTriggerBoard] = useAtom(triggerBoardAtom);
  const [deleteBoardModal, setDeleteBoard] = useAtom(deleteBoardModalAtom);
  const selectedBoard = useAtomValue(selectedBoardAtom);
  const currentBoard = useAtomValue(currentBoardAtom);
  const createColumnModal = useAtomValue(createColumnModalAtom);
  const [deleteColumnModal, setDeleteColumnModal] = useAtom(
    deleteColumnModalAtom
  );
  const createTaskModal = useAtomValue(createTaskModalAtom);
  const [deleteTaskModal, setDeleteTaskModal] = useAtom(deleteTaskModalAtom);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("id");

    if (!token || !userId) return;

    const fetchBoards = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_DEV_URL}/kanban/${userId}/boards`,
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

  const deleteBoard = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    if (id === 0) return;

    const res = await fetch(
      `${import.meta.env.VITE_DEV_URL}/kanban/delete-board/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.ok) {
      setTriggerBoard((prev) => !prev);
    }
  };

  const deleteColumn = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    if (id === 0) return;

    const res = await fetch(
      `${import.meta.env.VITE_DEV_URL}/kanban/delete-column/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.ok) {
      setTriggerBoard((prev) => !prev);
    }
  };

  const deleteTask = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    if (id === 0) return;

    const res = await fetch(
      `${import.meta.env.VITE_DEV_URL}/kanban/delete-task/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.ok) {
      setTriggerBoard((prev) => !prev);
    }
  };
  //TODO: сделать хук и просто передавать url в функцию

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
        <div className="flex gap-10 px-10">
          {selectedBoard !== undefined ? (
            currentBoard.columns.length > 0 ? (
              boards
                .find((board) => board.id === selectedBoard)
                ?.columns?.map((column) => (
                  <Column key={column.id} column={column} />
                ))
            ) : (
              <div className="text-3xl">
                <p>Упс, кажется вы еще не создали колонки</p>
              </div>
            )
          ) : null}
        </div>
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
    </div>
  );
}
