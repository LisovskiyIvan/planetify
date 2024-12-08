import { Link } from "react-router-dom";
import { Button } from "./button";
import { useState } from "react";

export function Heading() {
  const [user] = useState(localStorage.getItem("id"));

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl font-bold mb-10 rubik">Planetify</h1>
      <p className=" text-3xl font-bold raleway mb-10">
        Пусть мысли и задачи всегда будут на своих орбитах.
      </p>
      <p className=" text-2xl font-bold raleway mb-10">
        Удобный инструмент для управления проектами
      </p>
      <div className="flex flex-col md:flex-row">
        <Link to={user ? `/user/${user}` : "/signup"}>
          <Button className="text-2xl p-5 mx-5 my-4 hover:scale-110 duration-500 transition-all">
            {user ? "К задачам" : "Опробовать"}
          </Button>
        </Link>

        <Link to={"/about"}>
          <Button className="text-2xl p-5 mx-5 my-4 hover:scale-110 duration-500 transition-all">
            О нас
          </Button>
        </Link>
      </div>
    </div>
  );
}
