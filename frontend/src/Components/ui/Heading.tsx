import { Link } from "react-router-dom";
import { Button } from "./button";

export function Heading() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl font-bold mb-10 rubik">Planetify</h1>
      <p className=" text-3xl font-bold raleway mb-10">
        Пусть мысли и задачи всегда будут на своих орбитах
      </p>
      <div className="">
        <Link to={'/signup'}>
        <Button className="text-2xl p-5 mx-5 hover:scale-110 duration-500 transition-all">
          Опробовать
        </Button>
        </Link>
        
        <Link to={'/about'}>
        <Button className="text-2xl p-5 mx-5 hover:scale-110 duration-500 transition-all">
          О нас
        </Button>
        </Link>
      </div>
    </div>
  );
}
