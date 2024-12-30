import { IPost } from "@/models";
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
import { useState } from "react";
import { motion } from "framer-motion";
import {
  changePostModalAtom,
  selectedPostAtom,
  triggerAtom,
} from "@/atoms/modalAtoms";
import { useAtom, useSetAtom } from "jotai";

export function ChangePostModal() {
  const [postData] = useAtom<IPost | undefined>(selectedPostAtom);
  const setChangeModal = useSetAtom(changePostModalAtom);
  const [title, setTitle] = useState(postData?.title || "");
  const [error, setError] = useState(false);
  const token = localStorage.getItem("token");
  const [description, setDescription] = useState(postData?.content || "");
  const [state, setState] = useState(postData?.status || "");
  const trigger = useSetAtom(triggerAtom);
  const handleSelect = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  async function changePost() {
    if (!token) return;
    if (title.length < 3 || !state) {
      setError(true);
      return;
    } else setError(false);

    const res = await fetch(`/api/projects/post`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        oldPost: {
          id: postData?.id,
          title: postData?.title,
          content: postData?.content,
          status: postData?.status,
        },
        newPost: {
          id: postData?.id,
          title: title,
          content: description,
          status: state,
        },
      }),
    }).then((res) => res.json());

    if (res) {
      trigger((prev) => !prev);
      setChangeModal(false);
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
          Изменить задачу {postData?.title}?
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
          <div className="flex flex-col items-center pb-4 mb-2 bg-black w-[85%] rounded-lg">
            <label htmlFor="description" className="mb-1  text-2xl">
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
        <div className="flex justify-center">
          <Button className="mx-2 w-16" onClick={changePost}>
            Да
          </Button>
          <Button className="mx-2 w-16" onClick={() => setChangeModal(false)}>
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
