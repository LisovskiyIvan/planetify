import Navbar from "@/Components/Navbar";
import SignupForm from "@/Components/SingupForm";


export function Signup() {

    const url = "http://localhost:3000/auth/registration"

    return(
        <div className="w-[100%] min-h-[100dvh]">
            <Navbar></Navbar>
            <div className="flex justify-center ">
            <SignupForm url={url} btnName="Регистрация"></SignupForm>
            </div>
            
        </div>
    )
}