import { useSetAtom } from "jotai";
import { triggerBoardAtom } from "@/atoms/modalAtoms";

export const useDelete = () => {
  const setTriggerBoard = useSetAtom(triggerBoardAtom);

  const deleteItem = async (id: number, type: 'board' | 'column' | 'task') => {
    const token = localStorage.getItem("token");
    if (!token) return;
    if (id === 0) return;

    const res = await fetch(
      `/api/kanban/delete-${type}/${id}`,
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

  return {
    deleteBoard: (id: number) => deleteItem(id, 'board'),
    deleteColumn: (id: number) => deleteItem(id, 'column'), 
    deleteTask: (id: number) => deleteItem(id, 'task')
  };
};