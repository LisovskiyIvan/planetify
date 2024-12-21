import { Task } from "./Task";
import { IColumn, ITask } from "@/models";
import { Button } from "../ui/button";
export function Column({ column }: { column: IColumn }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex-grow-0 max-h-[400px] min-w-[350px]">
      <div className="flex justify-between"><h3 className="text-2xl font-semibold">{column.title}</h3><div
          className="text-3xl cursor-pointer  hover:scale-125 duration-200"
        >
          &times;
        </div></div>
      <div className="mt-4 flex flex-col gap-2 items-center">
        {column.tasks.map((task: ITask) => (
          <Task key={task.id} task={task} />
        ))}
        <Button className="mt-4">Добавить задачу</Button>
      </div>
    </div>
  );
}
