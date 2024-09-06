import  Navbar  from "@/Components/Navbar"
import Ball from "@/Components/ui/Ball"



export const Home = () => {
    return  (
        <div className="w-[100] min-h-[100dvh] bg-white">
            <Navbar></Navbar>
            <div className=" h-[500px] ">
            <Ball></Ball>
            </div>
           
        </div>
    )
}