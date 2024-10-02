import { useState } from "react";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { Button } from "./ui/button";
import { ChangePostModal } from "./ui/ChangePostModal";
import { motion } from "framer-motion";

interface Props {
  data: IData;
  trigger: () => void;
  togglePostModal: () => void;
  getProjectId: (projectId: number) => void;
}
interface IPost {
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

export function Task({ data, trigger, togglePostModal, getProjectId }: Props) {
  const [token] = useState(localStorage.getItem("token"));
  const [deleteModal, setDeleteModal] = useState(false);
  const [changeModal, setChangeModal] = useState(false);
  const [postData, setPostData] = useState<IPost>();

  async function deleteProject() {
    if (!token) return;

    const res = await fetch(
      `${import.meta.env.VITE_DEV_URL}/projects/${data.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((r) => r.json());
    trigger();

    if (!res) return;
  }

  function handleClick() {
    getProjectId(data.id);
    togglePostModal();
  }
  async function deletePost(id: number | undefined) {
    if (!id) return;
    if (!token) return;
    const res = await fetch(
      `${import.meta.env.VITE_DEV_URL}/projects/post/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((r) => r.json());
    trigger();

    if (!res) return;
  }

  function deletePostModal(v: IPost) {
    setDeleteModal(true);
    setPostData(v);
  }

  function changePostModal(v: IPost) {
    setChangeModal(true);
    setPostData(v);
  }

  return (
    <Card
      className="bg-black text-white w-[90%] min-h-[200px] rounded-xl my-2"
      key={data.id}
    >
      <CardHeader>
        <CardTitle className="text-3xl flex justify-between">
          {data.title}
          <div
            className="text-3xl hover:scale-120 duration-300 cursor-pointer"
            onClick={deleteProject}
          >
            &times;
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {data.posts.map((value) => {
          return (
            <div
              className="space-y-1 space-x-3 flex my-4 justify-between"
              key={value.id}
            >
              <div>
                <p className="text-lg font-medium leading-none">
                  {value.title}
                </p>
                <p className="text-md mt-1 text-slate -foreground">
                  {value.content}
                </p>
                <Badge
                  className={`outline mt-3 outline-2 bg-white text-black hover:scale-105 duration-300 transition-transform ${
                    value.status == "В процессе"
                      ? "outline-yellow-500"
                      : value.status === "Закончено"
                      ? "outline-green-500"
                      : "outline-red-500"
                  }`}
                >
                  {value.status}
                </Badge>
              </div>
              <div className="flex">
                <div
                  className="text-2xl hover:scale-110 duration-300 cursor-pointer"
                  onClick={() => changePostModal(value)}
                >
                  &#9997;
                </div>
                <div
                  className="text-3xl hover:scale-120 duration-300 cursor-pointer"
                  onClick={() => deletePostModal(value)}
                >
                  &times;
                </div>
              </div>
            </div>
          );
        })}
        <div className="flex justify-center">
          <Button
            className="rounded-[100%] text-black mt-4 mb-1 bg-white active:bg-slate hover:scale-110 duration-300 transition-all"
            onClick={handleClick}
          >
            +
          </Button>
        </div>
      </CardContent>
      {deleteModal && (
        <motion.div
          className="fixed top-[35%] bottom-[35%] left-[10%] right-[10%] bg-white text-black rounded-2xl flex items-center justify-center z-1000"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          <div className="flex flex-col">
            <h1 className="text-center text-2xl mb-5 px-2">
              Удалить задачу {postData?.title}?
            </h1>
            <div className="flex justify-center">
              <Button
                className="mx-2 w-16"
                onClick={() => {
                  deletePost(postData?.id);
                  setDeleteModal(false);
                }}
              >
                Да
              </Button>
              <Button
                className="mx-2 w-16"
                onClick={() => setDeleteModal(false)}
              >
                Нет
              </Button>
            </div>
          </div>
        </motion.div>
      )}
      {changeModal && (
        <ChangePostModal
          onClose={setChangeModal}
          post={postData}
          trigger={trigger}
        />
      )}
    </Card>
  );
}
