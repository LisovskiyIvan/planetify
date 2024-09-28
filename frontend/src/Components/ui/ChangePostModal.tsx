import { IPost } from "@/pages/User";
import { Button } from "./button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./select";
import { useState } from "react";


interface Props {
    onClose: (a: boolean) => void;
    post: IPost |  undefined,
    trigger: ()=>void
  }


export function ChangePostModal({ onClose, post,  trigger}: Props){

    const [title, setTitle] = useState(post?.title || '');
    const [error, setError] = useState(false);
    const [token] = useState(localStorage.getItem("token"));
    const [description, setDescription] = useState(post?.content || '');
    const [state, setState] = useState(post?.status || '');


    const handleSelect = (event: any) => {
        event.preventDefault(); // предотвращает действие по умолчанию
        console.log("Выбор был предотвращён!");
      };


    async function changePost() {
        if (!token) return;
        if (title.length < 5 || !state) {
      setError(true);
      return;
    } else setError(false);


    const res = await fetch("http://localhost:3000/projects/post", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        oldPost: {
            id: post?.id,
            title: post?.title,
            content: post?.content,
            status: post?.status
        },
        newPost: {
            id: post?.id,
            title: title,
            content: description,
            status: state
        }
      }),
    }).then((res) => res.json());

    if (res) {
      trigger();
      onClose(false);
    }
    }
   
    return(
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-black text-white  flex items-center justify-center z-1000">
          <div className="flex flex-col w-[98%] bg-white rounded-lg py-5">
            <h1 className="text-center text-3xl mb-5 px-2 text-black ">
              Изменить задачу {post?.title}?
            </h1>
            <div className="py-4 px-2 text-xl flex flex-col items-center w-[100%]">
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
            <div className="flex justify-center">
              <Button
                className="mx-2 w-16"
                onClick={changePost}
              >
                Да
              </Button>
              <Button className="mx-2 w-16" onClick={()=>onClose(false)}>
                Нет
              </Button>
            </div>
            {error && (
          <div className="text-black mb-4 text-lg text-center">
            Название должно быть не менее 5 символов и статус заполнен
          </div>
        )}
          </div>
        </div>
    )
}