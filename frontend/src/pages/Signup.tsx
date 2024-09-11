import Navbar from "@/Components/Navbar";
import SignupForm from "@/Components/SingupForm";


export function Signup() {
    return(
        <div className="w-[100%] min-h-[100dvh]">
            <Navbar></Navbar>
            <div className="flex justify-center ">
            <SignupForm></SignupForm>
            </div>
            
        </div>
    )
}