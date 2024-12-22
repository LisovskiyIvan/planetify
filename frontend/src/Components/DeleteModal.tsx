import { motion } from "framer-motion";
import { Button } from "./ui/button";

interface Props {
  title: string;
  deleteThing: (id: number) => void;
  closeModal: (boolean: boolean) => void;
  id: number;
}
export function DeleteModal({ title, deleteThing, closeModal, id }: Props) {
  return (
    <motion.div
      className="fixed top-[35%] shadow-2xl border border-black bottom-[35%] left-[10%] sm:left-[20%] md:left-[25%] lg:left-[30%] xl:left-[35%] right-[10%] sm:right-[20%] md:right-[25%] lg:right-[30%] xl:right-[35%] bg-white text-black rounded-2xl flex items-center justify-center z-1000"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <div className="flex flex-col">
        <h1 className="text-center text-2xl mb-5 px-2">Удалить {title}?</h1>
        <div className="flex justify-center">
          <Button
            className="mx-2 w-16"
            onClick={() => {
              deleteThing(id);
              closeModal(false);
            }}
          >
            Да
          </Button>
          <Button className="mx-2 w-16" onClick={() => closeModal(false)}>
            Нет
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
