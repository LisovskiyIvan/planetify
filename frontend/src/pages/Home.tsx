import Navbar from "@/Components/Navbar";
import { Heading } from "@/Components/ui/Heading";
import { Planet } from "@/Components/ui/Planet";




export const Home = () => {
  return (
    <div className="w-[100vw] bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500">
      <div className="min-h-[100dvh] pb-10">
      <Navbar></Navbar>
      <div className="mt-20 xl:mt-[90px] 2xl:mt-[150px] flex flex-col justify-around items-center">
        <div className="w-[90vw] flex justify-center ">
          <Planet></Planet>
        </div>
        <div className="px-4 mt-12 2xl:mt-[100px] text-center flex justify-center items-center ">
          <Heading></Heading>
        </div>
      </div>
      </div>
    </div>
  );
};
