import Lottie from "lottie-react";
import animationData from "@/assets/planets.json"
export function Planet() {



  return (
    <Lottie className="hover:scale-110 duration-300"  animationData={animationData}/>  
  );
}
