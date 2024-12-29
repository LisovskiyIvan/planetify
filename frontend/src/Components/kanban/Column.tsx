import { Task } from "./Task";
import { IColumn, ITask } from "@/models";
import { Button } from "../ui/button";
import { useSetAtom } from "jotai";
import { createTaskModalAtom, deleteColumnModalAtom } from "@/atoms/modalAtoms";
import {  useDroppable } from "@dnd-kit/core";
import { motion } from "framer-motion";

export function Column({ column, index }: { column: IColumn, index: number }) {

  const setDeleteColumnModal = useSetAtom(deleteColumnModalAtom);
  const setCreateTaskModal = useSetAtom(createTaskModalAtom);



  const {setNodeRef} = useDroppable({id: column.id});

  return (
    <motion.div
      initial={{ opacity: 0,  x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 + index * 0.1, ease: "easeInOut" }}
      className="bg-white p-4 rounded-lg shadow-md flex-grow-0 min-h-[200px] h-fit min-w-[350px]"
    >
      <div className="flex justify-between"><h3 className="text-2xl font-semibold">{column.title}</h3><div
          className="text-3xl cursor-pointer  hover:scale-125 duration-200"
          onClick={() => setDeleteColumnModal({isOpen: true, id: column.id})}
        >
          &times;
        </div></div>
      <div className="mt-4 flex flex-col gap-2" ref={setNodeRef}>
        {column.tasks.map((task: ITask, index: number) => (
          <Task key={task.id} task={task} index={index} />
        ))}
        <Button className="mt-4" onClick={() => setCreateTaskModal({isOpen: true, columnId: column.id, position: column.tasks.length})}>Добавить задачу</Button>
      </div>
    </motion.div>
  );
}
