import { useState } from "react";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { Button } from "./ui/button";
import { ChangePostModal } from "./ui/ChangePostModal";
import { changePostModalAtom, createPostModalAtom, deletePostModalAtom, deleteProjectModalAtom, selectedPostAtom, selectedProjectIdAtom, triggerAtom } from "@/atoms/modalAtoms";
import { useAtom, useSetAtom } from "jotai";
import { DeleteModal } from "./DeleteModal";

interface Props {
  data: IData;
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

export function Task({ data }: Props) {
  const [token] = useState(localStorage.getItem("token"));
  const [deletePostModal, setDeletePostModal] = useAtom(deletePostModalAtom);
  const [deleteProjectModal, setDeleteProjectModal] = useAtom(deleteProjectModalAtom);
  const [changeModal, setChangeModal] = useAtom(changePostModalAtom);
  const [postData, setPostData] = useAtom<IPost | undefined>(selectedPostAtom);
  const setProjectId = useSetAtom(selectedProjectIdAtom);
  const setPostModal = useSetAtom(createPostModalAtom);
  const trigger = useSetAtom(triggerAtom);

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
    trigger((prev) => !prev);

    if (!res) return;
  }

  function addPost(projectId: number) {
    setProjectId(projectId);
    setPostModal((prev) => !prev);
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
    trigger((prev) => !prev);

    if (!res) return;
  }

  function deletePostHandler(v: IPost) {
    setDeletePostModal(true);
    setPostData(v);
  }

  function changePostModal(v: IPost) {
    setChangeModal(true);
    setPostData(v);
  }

  function deleteProjectHandler() {
    setDeleteProjectModal(true);
    setProjectId(data.id);
  }

  return (
    <Card
      className="bg-black text-white w-[90%] xl:w-[30%] xl:m-5 min-h-[200px] rounded-xl my-2"
      key={data.id}
    >
      <CardHeader>
        <CardTitle className="text-3xl flex justify-between">
          {data.title}
          <div
            className="text-3xl hover:scale-120 duration-300 cursor-pointer"
            onClick={deleteProjectHandler}
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
                  className={`outline mt-3 outline-2 bg-white text-black hover:scale-105 hover:bg-white duration-300 transition-transform ${
                    value.status == "Может подождать"
                      ? "outline-yellow-500"
                      : value.status === "Когда-нибудь"
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
                  onClick={() => deletePostHandler(value)}
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
            onClick={() => addPost(data.id)}
          >
            +
          </Button>
        </div>
      </CardContent>
      {deletePostModal && (
        <DeleteModal
          title={postData?.title || ""}
          deleteThing={deletePost}
          closeModal={setDeletePostModal}
          id={postData?.id || 0}
        />
      )}
      {deleteProjectModal && (
        <DeleteModal
          title={data.title}
          deleteThing={deleteProject}
          closeModal={setDeleteProjectModal}
          id={data.id}
        />
      )}
      {changeModal && (
        <ChangePostModal
        />
      )}
    </Card>
  );
}
