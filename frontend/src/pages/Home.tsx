import Navbar from "@/Components/Navbar";
import { Heading } from "@/Components/ui/Heading";
import { Planet } from "@/Components/ui/Planet";

export const Home = () => {
  return (
    <div className="w-[100%] min-h-[100dvh] bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500">
      <Navbar></Navbar>
      <div className="mt-[120px] flex justify-around items-center">
        <div className="w-[50%] flex justify-center ">
          <Planet></Planet>
        </div>
        <div className="w-[50%] flex justify-center items-center ">
          <Heading></Heading>
        </div>
      </div>
    </div>
  );
};
