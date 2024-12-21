import { ITask } from "@/models";



export function Task({ task }: { task: ITask }) {
  return (
    <div className="bg-gray-200 p-4 rounded-md mb-2">
      <h4 className="font-semibold">{task.title}</h4>
        <p>{task.description}</p>
      </div>
    );
  }
  