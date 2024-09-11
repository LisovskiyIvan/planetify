import { FormEvent, useState } from "react";
import { Button } from "./ui/button";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await fetch(`http://localhost:8081/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "username": name,
        "password": password
      })
    }).then(res => res.json())
    
    
    // Здесь должна быть логика валидации и отправки данных
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center min-mt-[50px] mt-[25%] sm:mt-[15%] lg:mt-[10%] items-center mb-[50px] w-[90%] sm:w-[65%] lg:w-[50%] xl:w-[40%]"
    >
      <div className="w-[100%] flex min-h-[400px] bg-black text-white rounded-lg justify-center items-center text-3xl flex-col py-[25px]">
        <h1>Aniziga</h1>

        <div className="w-[85%] my-6">
          <label htmlFor="name" className="block text-sm text-gray-700">
            Username
          </label>
          <input
            type="text"
            name="name"
            id="name"
            autoComplete="off"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full px-4 py-3 mt-1 text-gray-900  bg-white text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="w-[85%] mb-6">
          <label htmlFor="password" className="block text-sm text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full px-4 py-3 mt-1 text-gray-900 bg-white text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <Button
          type="submit"
          className=" w-[70%] text-2xl flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm font-medium text-white  bg-blue-600 hover:bg-blue-700 hover:scale-105 duration-300 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Регистрация
        </Button>
      </div>
    </form>
  );
}