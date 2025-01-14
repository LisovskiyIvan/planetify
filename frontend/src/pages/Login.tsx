import Navbar from "@/Components/Navbar";
import SignupForm from "@/Components/SingupForm";

export function Login() {
  const url = `/api/auth/login`;

  return (
    <div className="w-[100%] min-h-[100dvh]">
      <Navbar></Navbar>
      <div className="flex justify-center ">
        <SignupForm url={url} btnName="Войти"></SignupForm>
      </div>
    </div>
  );
}
