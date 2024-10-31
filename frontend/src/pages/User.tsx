import { CreatePostModal } from "@/Components/CreatePostModal";
import { CreateProjectModal } from "@/Components/CreateProjectModal";
import Navbar from "@/Components/Navbar";
import { Task } from "@/Components/Task";
import { Button } from "@/Components/ui/button";
import { useEffect, useState } from "react";
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

export function User() {
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();
  const [token] = useState(localStorage.getItem("token"));
  const [data, setData] = useState<IData[]>();
  const [projectModal, setProjectModal] = useState(false);
  const [postModal, setPostModal] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [projectId, setProjectId] = useState(0);

  useEffect(() => {
    async function getData() {
      if (!token) navigate("/login");
      const data = await fetch(
        `${import.meta.env.VITE_DEV_URL}/projects/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
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
  }, [trigger]);

  function toggleProjectModal() {
    setProjectModal((prev) => !prev);
  }

  function handleProjectId(e: number) {
    setProjectId(e);
  }
  function togglePostModal() {
    setPostModal((prev) => !prev);
  }

  function triggerRerender() {
    setTrigger((prev) => !prev);
  }
  return (
    <div className="w-[100%] min-h-[100dvh] bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500">
      <Navbar></Navbar>
      <div className="flex flex-col ">
        <div className="items-center flex flex-col xl:flex-row xl: flex-wrap align-baseline">
          {data?.map((value) => {
            return (
              <Task
                data={value}
                key={value.id}
                trigger={triggerRerender}
                togglePostModal={togglePostModal}
                getProjectId={handleProjectId}
              />
            );
          })}
        </div>

        <Button
          className="text-sm sm:text-lg w-[20%] self-center hover:scale-110 duration-300 transition-all mt-5 mb-10"
          onClick={toggleProjectModal}
        >
          Добавить
        </Button>
      </div>
      <CreateProjectModal
        isOpen={projectModal}
        onClose={toggleProjectModal}
        trigger={triggerRerender}
      ></CreateProjectModal>
      <CreatePostModal
        isOpen={postModal}
        onClose={togglePostModal}
        trigger={triggerRerender}
        projectId={projectId}
      ></CreatePostModal>
    </div>
  );
}
