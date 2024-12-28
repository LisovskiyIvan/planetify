import { CreatePostModal } from "@/Components/CreatePostModal";
import { CreateProjectModal } from "@/Components/CreateProjectModal";
import Navbar from "@/Components/Navbar";
import { Task } from "@/Components/Task";
import { Button } from "@/Components/ui/button";
import { createProjectModalAtom, triggerAtom } from "@/atoms/modalAtoms";
import { useSetAtom, useAtomValue } from "jotai";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

export interface IPost {
  id: number;
  content: string;
  title: string;
  status: string;
}

interface IData {
  id: number;
  authorId: number;
  title: string;
  posts: IPost[];
}

export function Notes() {
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();
  const [token] = useState(localStorage.getItem("token"));
  const [data, setData] = useState<IData[]>();
  const setCreateProjectModal = useSetAtom(createProjectModalAtom);
  const trigger = useAtomValue(triggerAtom);
  const tokenRef = useRef(token);
  const idRef = useRef(id);

  useEffect(() => {
    async function getData() {
      if (!tokenRef.current) navigate("/login");
      const data = await fetch(
        `/api/projects/${idRef.current}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${tokenRef.current}`,
          },
        }
      ).then((res) => res.json());
      if (data.status === 401) {
        navigate("/login");
        localStorage.setItem("token", "");
        localStorage.setItem("id", "");
        localStorage.setItem("username", "");
        return;
      }
      setData(data);
    }
    getData();
  }, [trigger, navigate]);

  return (
    <div className="w-[100%] min-h-[100dvh] bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500">
      <Navbar></Navbar>
      <div className="flex flex-col ">
        <div className="items-center flex flex-col xl:flex-row xl: flex-wrap align-baseline">
          {data?.map((value) => (
            <Task data={value} key={value.id} />
          ))}
        </div>

        <Button
          className="text-sm sm:text-lg w-[20%] xl:w-[15%] 2xl:w-[10%] self-center hover:scale-110 duration-300  transition-all mt-5 mb-10"
          onClick={() => setCreateProjectModal((prev) => !prev)}
        >
          Добавить
        </Button>
      </div>
      <CreateProjectModal></CreateProjectModal>
      <CreatePostModal></CreatePostModal>
    </div>
  );
}
