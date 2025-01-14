import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { Button } from "./ui/button";
import { ChangePostModal } from "./ChangePostModal";
import {
  changePostModalAtom,
  createPostModalAtom,
  deletePostModalAtom,
  deleteProjectModalAtom,
  selectedPostAtom,
  selectedProjectAtom,
} from "@/atoms/modalAtoms";
import { useAtom, useSetAtom } from "jotai";
import { IData, IPost } from "@/models";
import { motion } from "framer-motion";

interface Props {
  data: IData;
}

export function Task({ data }: Props) {
  const setDeletePostModal = useSetAtom(deletePostModalAtom);
  const setDeleteProjectModal = useSetAtom(deleteProjectModalAtom);
  const [changeModal, setChangeModal] = useAtom(changePostModalAtom);
  const setPostModal = useSetAtom(createPostModalAtom);
  const setSelectedProject = useSetAtom(selectedProjectAtom);
  const setSelectedPost = useSetAtom(selectedPostAtom);

  const handleAddPost = (data: IData) => {
    setSelectedProject(data);
    setPostModal((prev) => !prev);
  };

 
  const handleDeletePostModal = (v: IPost) => {
    setDeletePostModal(true);
    setSelectedPost(v);
  };

  const handleChangePostModal = (v: IPost) => {
    setChangeModal(true);
    setSelectedPost(v);
  };

  const handleDeleteProjectModal = () => {
    setDeleteProjectModal(true);
    setSelectedProject(data);
  };

  return (
    <Card
      className="bg-black text-white w-[90%] xl:w-[30%] xl:m-5 min-h-[200px] rounded-xl my-2"
      key={data.id}
    >
      <CardHeader>
        <CardTitle className="text-3xl flex justify-between">
          {data.title}
          <div
            className="text-3xl hover:scale-110 duration-300 cursor-pointer"
            onClick={handleDeleteProjectModal}
          >
            &times;
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {data.posts.map((value, index) => {
          return (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 + index * 0.1, ease: "easeInOut" }}
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
              <div className="flex gap-2">
                <div
                  className="text-2xl hover:scale-110 duration-300 cursor-pointer"
                  onClick={() => handleChangePostModal(value)}
                >
                  &#9997;
                </div>
                <div
                  className="text-3xl hover:scale-110 duration-300 cursor-pointer"
                  onClick={() => handleDeletePostModal(value)}
                >
                  &times;
                </div>
              </div>
            </motion.div>
          );
        })}
        <div className="flex justify-center">
          <Button
            className="rounded-[100%] text-black mt-4 mb-1 bg-white active:bg-slate hover:scale-110 duration-300 transition-all"
            onClick={() => handleAddPost(data)}
          >
            +
          </Button>
        </div>
      </CardContent>
      {changeModal && <ChangePostModal />}
    </Card>
  );
}
