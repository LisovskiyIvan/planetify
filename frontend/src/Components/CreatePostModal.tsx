import { useState } from "react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { motion } from "framer-motion";
import {
  createPostModalAtom,
  selectedProjectIdAtom,
  triggerAtom,
} from "@/atoms/modalAtoms";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

export function CreatePostModal() {
  const [postModal, setPostModal] = useAtom(createPostModalAtom);
  const [title, setTitle] = useState("");
  const [error, setError] = useState(false);
  const [token] = useState(localStorage.getItem("token"));
  const [description, setDescription] = useState("");
  const [state, setState] = useState("");
  const projectId = useAtomValue(selectedProjectIdAtom);
  const trigger = useSetAtom(triggerAtom);

  if (!postModal) return null;

  const handleSelect = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("Выбор был предотвращён!");
  };

  const createProject = async () => {
    if (!token || title.length < 3 || !state) {
      setError(true);
      return;
    }
    setError(false);

    const id = localStorage.getItem("id");
    if (!id) return;

    const res = await fetch(`/api/projects/create/post`, {
      method: "POST",
      headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          content: description,
          projectId: projectId,
          status: state,
          userId: parseInt(id),
        }),
      }
    ).then((res) => res.json());

    if (res) {
      trigger((prev) => !prev);
      setPostModal(false);
      setTitle("");
      setDescription("");
      setState("");
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-black flex items-center justify-center z-1000">
      <motion.div
        className="w-[95%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[30%] rounded-md bg-white text-white relative flex flex-col items-center"
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
          onClick={() => setPostModal(false)}
        >
          &times;
        </div>
        <div className="py-8 px-2 text-xl flex flex-col items-center w-[100%]">
          <div className="flex flex-col items-center pb-4 my-4 bg-black w-[85%] rounded-lg">
            <label htmlFor="title" className="my-2 text-2xl">
              Задание
            </label>
            <input
              className="p-2 rounded-lg text-black 2xl:w-[50%]"
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
            <label htmlFor="description" className="mb-1 text-2xl">
              Описание
            </label>
            <textarea
              id="description"
              className="w-[85%] p-2 rounded-lg text-black 2xl:h-[100px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="flex flex-col items-center pb-4 mb-2 bg-black w-[85%] rounded-lg">
            <label htmlFor="description" className="mb-1 text-2xl">
              Статус
            </label>
            <Select value={state} onValueChange={(n) => setState(n)}>
              <SelectTrigger
                className="w-[60%] text-black"
                onClick={handleSelect}
              >
                <SelectValue placeholder="Статус задачи" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Статус</SelectLabel>
                  <SelectItem value="Когда-нибудь">Когда-нибудь</SelectItem>
                  <SelectItem value="Может подождать">
                    Может подождать
                  </SelectItem>
                  <SelectItem value="Важно">Важно</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button
          onClick={createProject}
          type="submit"
          className="w-[50%] xl:w-[30%] 2xl:w-[25%] my-4 text-lg rounded-lg px-4 py-2 bg-black"
        >
          Отправить
        </Button>
        {error && (
          <div className="text-black mb-4 text-lg text-center">
            Название должно быть не менее 3 символов и статус заполнен
          </div>
        )}
      </motion.div>
    </div>
  );
}
