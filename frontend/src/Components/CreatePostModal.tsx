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

interface Props {
  isOpen: boolean;
  onClose: () => void;
  trigger: () => void;
  projectId: number;
}

export function CreatePostModal({
  isOpen,
  onClose,
  trigger,
  projectId,
}: Props) {
  if (!isOpen) {
    return null;
  }

  const [title, setTitle] = useState("");
  const [error, setError] = useState(false);
  const [token] = useState(localStorage.getItem("token"));
  const [description, setDescription] = useState("");
  const [state, setState] = useState("");

  async function createProject() {
    if (!token) return;
    if (title.length < 5 || !state) {
      setError(true);
      return;
    } else setError(false);

    let id: number | string | null = localStorage.getItem("id");

    if (id) id = parseInt(id);
    else return;

    const res = await fetch(`${import.meta.env.VITE_DEV_URL}/projects/create/post`, {
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
      }),
    }).then((res) => res.json());

    if (res) {
      trigger();
      onClose();
    }
  }

  const handleSelect = (event: any) => {
    event.preventDefault(); // предотвращает действие по умолчанию
    console.log("Выбор был предотвращён!");
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-black  flex items-center justify-center z-1000">
      <div className="w-[97%]  rounded-md bg-white mt-[15px] text-white relative flex flex-col items-center">
        <div
          className="absolute top-0 right-1 text-black text-5xl cursor-pointer"
          onClick={onClose}
        >
          &times;
        </div>
        <div className="py-8 px-2 text-xl flex flex-col items-center w-[100%]">
          <div className="flex flex-col items-center pb-4 my-4 bg-black w-[100%] rounded-lg ">
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
          <div className="flex flex-col items-center pb-4 mb-2 bg-black w-[100%] rounded-lg">
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
          <div className="flex flex-col items-center pb-4 mb-2 bg-black w-[100%] rounded-lg">
            <label htmlFor="description" className="mb-1  text-2xl">
              Статус
            </label>
            <Select value={state} onValueChange={(n)=> setState(n)}>
              <SelectTrigger className="w-[60%] text-black" onClick={handleSelect}>
                <SelectValue placeholder="Статус задачи" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Статус</SelectLabel>
                  <SelectItem value="В процессе">В процессе</SelectItem>
                  <SelectItem value="Закончено">Закончено</SelectItem>
                  <SelectItem value="Не закончено">Не закончено</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button
          onClick={createProject}
          type="submit"
          className="w-[50%] my-4 text-lg rounded-lg px-4 py-2 bg-black"
        >
          Отправить
        </Button>
        {error && (
          <div className="text-black mb-4 text-lg text-center">
            Название должно быть не менее 5 символов и статус заполнен
          </div>
        )}
      </div>
    </div>
  );
}
