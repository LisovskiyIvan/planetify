import { Button } from "../ui/button";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  changeTaskModalAtom,
  triggerBoardAtom,
} from "@/atoms/modalAtoms";
import { useAtom, useSetAtom } from "jotai";

export function ChangeTaskModal() {
  const [changeModal, setChangeModal] = useAtom(changeTaskModalAtom);
  const [title, setTitle] = useState(changeModal.task?.title || "");
  const [error, setError] = useState(false);
  const token = localStorage.getItem("token");
  const [description, setDescription] = useState(changeModal.task?.description || "");
  const trigger = useSetAtom(triggerBoardAtom);

  async function changeTask() {
    if (!token) return;
    if (title.length < 3) {
      setError(true);
      return;
    } else setError(false);

    const res = await fetch(`/api/kanban/update-task/${changeModal.task?.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          id: changeModal.task?.id,
          title: title,
          description: description,
      })
    }).then((res) => res.json());

    if (res) {
      trigger((prev) => !prev);
      setChangeModal({isOpen: false, task: undefined});
    }
  }


  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-black text-white  flex items-center justify-center z-1000">
      <motion.div
        className="flex flex-col w-[95%]  sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[30%] bg-white rounded-lg py-5"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        <h1 className="text-center text-3xl mb-5 px-2 text-black ">
          Изменить задачу {changeModal.task?.title}?
        </h1>
        <div className="py-4 px-2 text-xl flex flex-col items-center w-[100%]">
          <div className="flex flex-col items-center pb-4 my-4 bg-black w-[85%] rounded-lg ">
            <label htmlFor="title" className="my-2  text-2xl">
              Задание
            </label>
            <input
              className=" p-2 rounded-lg text-black"
              type="text"
              id="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setError(false);
              }}
            />
          </div>
          <div className="flex flex-col items-center pb-4 mb-2 bg-black w-[85%] rounded-lg">
            <label htmlFor="description" className="mb-1  text-2xl">
              Описание
            </label>
            <textarea
              id="description"
              className="w-[85%] p-2 rounded-lg text-black"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="flex justify-center">
          <Button className="mx-2 w-16" onClick={changeTask}>
            Да
          </Button>
          <Button className="mx-2 w-16" onClick={() => setChangeModal({isOpen: false, task: undefined})}>
            Нет
          </Button>
        </div>
        {error && (
          <div className="text-black mb-4 text-lg text-center">
            Название должно быть не менее 3 символов и статус заполнен
          </div>
        )}
      </motion.div>
    </div>
  );
}
