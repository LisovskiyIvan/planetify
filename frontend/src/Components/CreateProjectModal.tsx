import { useState } from "react";
import { Button } from "./ui/button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  trigger: () => void
}

export function CreateProjectModal({ isOpen, onClose, trigger }: Props) {
  if (!isOpen) {
    return null;
  }

  const [title, setTitle] = useState("");
  const [error, setError] = useState(false)
  const [token] = useState(localStorage.getItem("token"));
  


  async function createProject() {
    if(!token) return
    if(title.length < 5) {
      setError(true)
      return
    }
    let id: number | string | null = localStorage.getItem("id")


    if(id) id = parseInt(id) 
    else return

    const res = await fetch(`${import.meta.env.VITE_DEV_URL}/projects/create`, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: id,
        title: title
      })
    }).then(res => res.json())
    
    if(res) {
      trigger()
      onClose()
    }
    
    
  }

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-black  flex items-center justify-center z-1000" >
      <div className="w-[95%]  rounded-md bg-white mt-[15px] text-white relative flex flex-col items-center">
        <div
          className="absolute top-0 right-1 text-black text-5xl cursor-pointer"
          onClick={onClose}
        >
          &times;
        </div>
        <div className="p-8 text-xl flex flex-col items-center w-[100%]">
          <div className="flex flex-col items-center pb-4 my-3 bg-black w-[100%] rounded-lg ">
            <label htmlFor="title" className="my-2  text-2xl">
              Название
            </label>
            <input
              className="max-w-[250px] p-2 rounded-lg text-black"
              type="text"
              id="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setError(false)
              }}
            />
          </div>
        </div>
        <Button
          onClick={createProject}
          type="submit"
          className="w-[50%] my-4 text-lg rounded-lg px-4 py-2 bg-black"
        >
          Добавить
        </Button>
        {error && <div className="text-black mb-4 text-lg text-center" >Название должно быть не менее 5 символов</div>}
      </div>
    </div>
  );
}
