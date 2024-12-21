import { deleteBoardModalAtom, selectedBoardAtom } from "@/atoms/modalAtoms";
import { IBoard } from "@/models";
import { useAtom, useSetAtom } from "jotai";

export function Board({ board }: { board: IBoard }) {

  const [selectedBoard, setSelectedBoard] = useAtom(selectedBoardAtom);
  const setDeleteBoard = useSetAtom(deleteBoardModalAtom);
  return (
    <div className="bg-black text-white rounded-lg flex justify-between items-baseline shadow-md p-4 w-80 cursor-pointer" style={selectedBoard === board.id ? { backgroundColor: "white", color: "black"} : {}} onClick={() => setSelectedBoard(board.id)}>
      <h2 className="text-xl font-semibold">{board.title}</h2>
      <div
          className="text-3xl cursor-pointer  hover:scale-125 duration-200"
          style={selectedBoard === board.id ? { color: "black"} : { color: "white"}}
          onClick={() => setDeleteBoard({isOpen: true, id: board.id})}
        >
          &times;
        </div>
    </div>
  );
}
