import { useState } from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { useAtom, useSetAtom } from "jotai";
import { createProjectModalAtom, triggerAtom } from "@/atoms/modalAtoms";

export function CreateProjectModal() {
  const [projectModal, setProjectModal] = useAtom(createProjectModalAtom);
  const [title, setTitle] = useState("");
  const [error, setError] = useState(false);
  const trigger = useSetAtom(triggerAtom);
  if (!projectModal) {
    return null;
  }

  const token = localStorage.getItem("token");

  async function createProject() {
    if (!token) return;
    if (title.length < 5) {
      setError(true);
      return;
    }
    let id: number | string | null = localStorage.getItem("id");

    if (id) id = parseInt(id);
    else return;

    const res = await fetch(`${import.meta.env.VITE_DEV_URL}/projects/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: id,
        title: title,
      }),
    }).then((res) => res.json());

    if (res) {
      trigger((prev) => !prev);
      setProjectModal(false);
      setTitle("");
    }
  }

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-black  flex items-center justify-center z-1000">
      <motion.div
        className="w-[95%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[30%] 2xl:w-[25%] rounded-md bg-white 2xl:h-[300px] text-white relative flex flex-col items-center"
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
          onClick={() => setProjectModal(false)}
        >
          &times;
        </div>
        <div className="p-8 text-xl flex flex-col items-center w-[100%]">
          <div className="flex flex-col items-center pb-4 my-3 bg-black w-[85%] rounded-lg ">
            <label htmlFor="title" className="my-2  text-2xl">
              Название
            </label>
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
          </div>
        </div>
        <Button
          onClick={createProject}
          type="submit"
          className="w-[50%] xl:w-[30%] 2xl:w-[25%] my-4 text-lg rounded-lg px-4 py-2 bg-black"
        >
          Добавить
        </Button>
        {error && (
          <div className="text-black mb-4 text-lg text-center">
            Название должно быть не менее 5 символов
          </div>
        )}
      </motion.div>
    </div>
  );
}
