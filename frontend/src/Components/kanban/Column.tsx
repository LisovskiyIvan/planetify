import { Task } from "./Task";
import { IColumn, ITask } from "@/models";
import { Button } from "../ui/button";
import { useSetAtom } from "jotai";
import { createTaskModalAtom, deleteColumnModalAtom } from "@/atoms/modalAtoms";
export function Column({ column }: { column: IColumn }) {

  const setDeleteColumnModal = useSetAtom(deleteColumnModalAtom);
  const setCreateTaskModal = useSetAtom(createTaskModalAtom);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex-grow-0 min-h-[200px] h-fit min-w-[350px]">
      <div className="flex justify-between"><h3 className="text-2xl font-semibold">{column.title}</h3><div
          className="text-3xl cursor-pointer  hover:scale-125 duration-200"
          onClick={() => setDeleteColumnModal({isOpen: true, id: column.id})}
        >
          &times;
        </div></div>
      <div className="mt-4 flex flex-col gap-2">
        {column.tasks.map((task: ITask) => (
          <Task key={task.id} task={task} />
        ))}
        <Button className="mt-4" onClick={() => setCreateTaskModal({isOpen: true, columnId: column.id, position: column.tasks.length})}>Добавить задачу</Button>
      </div>
    </div>
  );
}
