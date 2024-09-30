import { useState } from "react"
import { Link } from "react-router-dom"



export default function Navbar  () {

    const [user] = useState(localStorage.getItem('username'))
    const [userId] = useState(localStorage.getItem('id'))

    return(
        <header className="bg-black w-[100%] py-4 px-2 sm:px-4 lg:px-4 2xl:px-4 text-white">
      <nav className="flex items-center justify-between">
        <div className="flex items-center ">
          <Link to="/">
            <img
              className=" w-10 sm:w-12 lg:w-14 2xl:w-16 hover:scale-110 duration-300"
              src="/planets.png"
              alt=""
            />
          </Link>
          <Link
            className="text-sm sm:text-lg lg:text-xl 2xl:text-2xl ml-2 sm:ml-4 lg:ml-6 2xl:ml-8 relative hover:scale-110 duration-300 after:bg-white after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
            to="/"
          >
            Planetify
          </Link>
          {/* <Link
                className="ml-2 text-sm sm:text-lg lg:text-xl 2xl:text-2xl lg:ml-6 2xl:ml-8 relative hover:scale-110 duration-300 after:bg-white after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
                to="/prices"
              >
                Цены
              </Link> */}
          <Link
            className="ml-2 text-sm sm:text-lg lg:text-xl 2xl:text-2xl lg:ml-6 2xl:ml-8 relative hover:scale-110 duration-300 after:bg-white after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
            to="/about"
          >
            О нас
          </Link>
        </div>
        <div className="flex items-center">
          {user ? (<>
            <Link to={`/user/${userId}`} className="m-1 sm:mr-4 2xl:mr-6  text-md sm:text-lg  lg:text-xl 2xl:text-2xl hover:scale-110 duration-300 after:bg-white after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer">
              {user}
            </Link>
            <Link to={`/logout`} className="m-1 sm:mr-4 2xl:mr-6  text-md sm:text-lg  lg:text-xl 2xl:text-2xl hover:scale-110 duration-300 after:bg-white after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer">
              Выйти
            </Link>
            </>
          ) : (
            <>
            <Link
              className="mr-15 text-sm sm:text-lg mr-[4vw] lg:text-xl 2xl:text-2xl 2xl:ml-8 relative hover:scale-110 duration-300 after:bg-white after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
              to="/login"
            >
              Войти
            </Link>
             <Link
             className=" text-sm sm:text-lg mr-[2vw] lg:text-xl 2xl:text-2xl 2xl:ml-8 relative hover:scale-110 duration-300 after:bg-white after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
             to="/signup"
           >
             Регистрация
           </Link></>
          )}
        </div>
      </nav>
    </header>

    )
}