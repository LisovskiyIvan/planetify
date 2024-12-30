import {
  createColumnModalAtom,
  deleteBoardModalAtom,
} from "@/atoms/modalAtoms";
import { IBoard } from "@/models";
import {  useSetAtom } from "jotai";
import { Button } from "../ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

export function Board({ board }: { board: IBoard }) {
  const setDeleteBoard = useSetAtom(deleteBoardModalAtom);
  const setCreateColumnModal = useSetAtom(createColumnModalAtom);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const boardId = parseInt(searchParams.get("board") || "0");
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 + board.id * 0.1, ease: "easeInOut" }}  
      className={`rounded-lg flex justify-between items-baseline shadow-md p-4 w-80 cursor-pointer ${
        boardId === board.id 
          ? "bg-white text-black"
          : "bg-black text-white"
      }`}
      onClick={() => {
        navigate(`?board=${board.id}`);
      }}
    >
      <h2 className="text-xl font-semibold break-words">{board.title}</h2>
      <div className="flex gap-4">
      <Button
        className="text-2xl bg-black text-white cursor-pointer hover:scale-105 duration-200 transition-all"
        onClick={() =>
          setCreateColumnModal({
            isOpen: true,
            boardId: board.id,
            position: board.columns.length,
          })
        }
      >
        +
      </Button>
      <div
        className="text-3xl cursor-pointer  hover:scale-125 duration-200"
        style={
          boardId === board.id ? { color: "black" } : { color: "white" }
        }
        onClick={() => setDeleteBoard({ isOpen: true, id: board.id })}
      >
        &times;
      </div>
      </div>
    </motion.div>
  );
}
