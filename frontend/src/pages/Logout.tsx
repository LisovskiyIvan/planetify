import Navbar from "@/Components/Navbar";
import { Button } from "@/Components/ui/button";
import { useNavigate } from "react-router-dom";

export function Logout() {

    const navigate  = useNavigate()

    function deleteData() {
        localStorage.clear()
        navigate('/')
    }
  return (
    <div className="w-[100%] min-h-[100dvh]">
      <Navbar></Navbar>
      <div className="flex justify-center ">
      <div className="fixed top-[35%] bottom-[35%] left-[10%] right-[10%] bg-black text-white rounded-2xl flex items-center justify-center z-1000">
          <div className="flex flex-col">
            <h1 className="text-center text-2xl mb-5 px-2">
              Выйти из аккаунта?
            </h1>
            <div className="flex justify-center">
              <Button
                className="mx-2 w-16"
                onClick={deleteData}
              >
                Да
              </Button>
              <Button className="mx-2 w-16" onClick={()=>navigate('/')}>
                Нет
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
