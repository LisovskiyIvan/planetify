import Navbar from "@/Components/Navbar";
import { Heading } from "@/Components/ui/Heading";
import { Planet } from "@/Components/ui/Planet";
import Lottie from "lottie-react";
import animationData from "@/assets/product.json";
import { useState } from "react";
import { useEffect } from "react";

export const Home = () => {

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <div className="w-[100%] bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500">
      <div className="min-h-[100dvh] pb-10">
        <Navbar></Navbar>
        <div className="mt-20 xl:mt-[50px] 2xl:mt-[10vh] flex flex-col md:flex-row justify-around items-center">
          <div className="w-[50%]">
          <div className="w-[100%] flex justify-center items-center">
            <Planet></Planet>
          </div>
          <div className="px-4 mt-12 2xl:mt-[7vh] text-center flex justify-center items-center ">
            <Heading></Heading>
          </div>
          </div>
          {screenWidth > 768 && <div  className="w-[50%] flex justify-center items-center">
            <Lottie animationData={animationData} className="w-[70%] h-[70%]" ></Lottie>
          </div>}
        </div>
      </div>
    </div>
  );
};
