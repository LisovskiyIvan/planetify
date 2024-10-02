import Navbar from "@/Components/Navbar";
import { Heading } from "@/Components/ui/Heading";
import { Planet } from "@/Components/ui/Planet";




export const Home = () => {
  return (
    <div className="w-[100vw] bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500">
      <div className="min-h-[100dvh] pb-10">
      <Navbar></Navbar>
      <div className="mt-20 xl:mt-[120px] flex flex-col justify-around items-center">
        <div className="w-[90vw] flex justify-center hover:scale-110 duration-300">
          <Planet></Planet>
        </div>
        <div className="px-4 mt-12 text-center flex justify-center items-center ">
          <Heading></Heading>
        </div>
      </div>
      </div>
    </div>
  );
};
