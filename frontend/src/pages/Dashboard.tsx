import Navbar from "@/Components/Navbar";
import { Statistic } from "@/Components/Statistic";


export function Dashboard() {


  
  
    return (
        <div className="w-[100%] min-h-[100vh] bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500">
        
        <Navbar></Navbar>
        <div className="w-[100%]">
        <Statistic></Statistic>
        </div>
        
      </div>
    )
}