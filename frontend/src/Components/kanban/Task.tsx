import { changeTaskModalAtom, deleteTaskModalAtom } from "@/atoms/modalAtoms";
import { ITask } from "@/models";
import { useSetAtom } from "jotai";
import { useDraggable } from "@dnd-kit/core";

export function Task({ task }: { task: ITask }) {
  const setDeleteTask = useSetAtom(deleteTaskModalAtom);
  const setChangeTaskModal = useSetAtom(changeTaskModalAtom);
  const {attributes, listeners, setNodeRef, transform} = useDraggable({id: task.id});

  const handleDelete = (e: React.PointerEvent) => {
    e.stopPropagation();
    setDeleteTask({isOpen: true, id: task.id});
  };

  const handleChange = (e: React.PointerEvent) => {
    e.stopPropagation();
    setChangeTaskModal({isOpen: true, task: task});
  };

  return (
    <div className="p-4 rounded-md mb-2 border border-black" ref={setNodeRef} style={{transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined}} {...attributes} {...listeners}>
      <div className="flex justify-between">
        <h4 className="text-3xl">{task.title}</h4>
        <div className="flex gap-4">
          <button
            className="text-2xl hover:scale-110 duration-300 cursor-pointer"
            onPointerDown={handleChange}
          >
            &#9997;
          </button>
          <button
            className="text-3xl cursor-pointer hover:scale-125 duration-200"
            onPointerDown={handleDelete}
          >
            &times;
          </button>
        </div>
      </div>
      <p className="px-2 py-2 text-xl">{task.description}</p>
    </div>
  );
}
