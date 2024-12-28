import { changeTaskModalAtom, deleteTaskModalAtom } from "@/atoms/modalAtoms";
import { ITask } from "@/models";
import { useSetAtom } from "jotai";

export function Task({ task }: { task: ITask }) {

  const setDeleteTask = useSetAtom(deleteTaskModalAtom);
  const setChangeTaskModal = useSetAtom(changeTaskModalAtom);

  return (
    <div className=" p-4 rounded-md mb-2 border border-black ">
      <div className="flex justify-between">
        <h4 className="text-3xl">{task.title}</h4>
        <div className="flex gap-4">
          <div
            className="text-2xl hover:scale-110 duration-300 cursor-pointer"
            onClick={() => setChangeTaskModal({isOpen: true, task: task})}
          >
            &#9997;
          </div>
          <div
            className="text-3xl cursor-pointer  hover:scale-125 duration-200"
            onClick={() => setDeleteTask({isOpen: true, id: task.id})}
          >
            &times;
          </div>
        </div>
      </div>
      <p className="px-2 py-2 text-xl">{task.description}</p>
    </div>
  );
}
