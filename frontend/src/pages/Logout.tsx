import Navbar from "@/Components/Navbar";
import { Button } from "@/Components/ui/button";
import { useNavigate } from "react-router-dom";

export function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="w-[100%] min-h-[100dvh]">
      <Navbar />
      <div className="flex justify-center">
        <div className="fixed top-[35%] bottom-[35%] left-[10%] sm:left-[20%] md:left-[25%] lg:left-[30%] xl:left-[35%] right-[10%] sm:right-[20%] md:right-[25%] lg:right-[30%] xl:right-[35%] bg-black text-white rounded-2xl flex items-center justify-center z-1000">
          <div className="flex flex-col">
            <h1 className="text-center text-2xl mb-5 px-2">
              Выйти из аккаунта?
            </h1>
            <div className="flex justify-center">
              <Button className="mx-2 w-16" onClick={handleLogout}>
                Да
              </Button>
              <Button className="mx-2 w-16" onClick={() => navigate("/")}>
                Нет
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
