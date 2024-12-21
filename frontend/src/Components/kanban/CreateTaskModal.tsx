import { useState } from "react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

export function CreateTaskModal({
  setIsModalOpen,
  columnId,
}: {
  setIsModalOpen: (open: boolean) => void;
  columnId: number;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);

  const token = localStorage.getItem("token");

  const createTask = async () => {
    if (!token) return;
    if (title.length < 3) {
      setError(true);
      return;
    }

    const res = await fetch(`${import.meta.env.VITE_DEV_URL}/kanban/create-task`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        columnId,
        title,
        description,
      }),
    }).then((res) => res.json());

    if (res) {
      setIsModalOpen(false);
      setTitle("");
      setDescription("");
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-black flex items-center justify-center z-50">
      <motion.div
        className="w-[95%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[30%] 2xl:w-[25%] rounded-md bg-white text-black relative flex flex-col items-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        <div
          className="absolute top-0 right-1 text-black text-5xl cursor-pointer"
          onClick={() => setIsModalOpen(false)}
        >
          &times;
        </div>
        <div className="p-8 text-xl flex flex-col items-center w-[100%]">
          <label htmlFor="title" className="my-2 text-2xl">Название задачи</label>
          <input
            className="w-[70%] p-2 rounded-lg text-black"
            type="text"
            id="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError(false);
            }}
          />
          <label htmlFor="description" className="my-2 text-2xl">Описание задачи</label>
          <textarea
            className="w-[70%] p-2 rounded-lg text-black"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <Button onClick={createTask} className="my-4 text-lg rounded-lg px-4 py-2 bg-black">
          Создать
        </Button>
        {error && (
          <div className="text-black mb-4 text-lg text-center">
            Название должно быть не менее 3 символов
          </div>
        )}
      </motion.div>
    </div>
  );
}
