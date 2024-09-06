import { useState } from "react"
import { Link } from "react-router-dom"



export default function Navbar  () {

    const [user, setUser] = useState('')

    return(
        <header className="bg-black py-4 px-2 sm:px-4 lg:px-4 2xl:px-4 text-white">
      <nav className="flex items-center justify-between">
        <div className="flex items-center ">
          <Link to="/">
            <img
              className=" w-10 sm:w-12 lg:w-14 2xl:w-16 hover:scale-110 duration-300"
              src="planets.png"
              alt=""
            />
          </Link>
          <Link
            className="text-sm sm:text-lg lg:text-xl 2xl:text-2xl ml-2 sm:ml-4 lg:ml-6 2xl:ml-8 relative hover:scale-110 duration-300 after:bg-white after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
            to="/"
          >
            Planetify
          </Link>
          <Link
                className="ml-2 text-sm sm:text-lg lg:text-xl 2xl:text-2xl lg:ml-6 2xl:ml-8 relative hover:scale-110 duration-300 after:bg-white after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
                to="/addwords"
              >
                Pricing
              </Link>
          {user && (
            <>
              <Link
                className="ml-2 text-sm sm:text-lg lg:text-xl 2xl:text-2xl lg:ml-6 2xl:ml-8 relative hover:scale-110 duration-300 after:bg-white after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
                to="/addwords"
              >
                Add
              </Link>
              <Link
                className="ml-2 text-sm sm:text-lg lg:text-xl 2xl:text-2xl lg:ml-6 2xl:ml-8 relative hover:scale-110 duration-300 after:bg-white after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
                to="/learn"
              >
                Learn
              </Link>
            </>
          )}
          <Link
            className="ml-2 text-sm sm:text-lg lg:text-xl 2xl:text-2xl lg:ml-6 2xl:ml-8 relative hover:scale-110 duration-300 after:bg-white after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
            to="/about"
          >
            About
          </Link>
        </div>
        <div className="flex items-center">
          {user ? (
            <div className="m-1 sm:mr-4 2xl:mr-6  text-sm sm:text-lg  lg:text-xl 2xl:text-2xl">
              {user}
            </div>
          ) : (
            <Link
              className="mr-15 text-sm sm:text-lg mr-6 lg:text-xl 2xl:text-2xl 2xl:ml-8 relative hover:scale-110 duration-300 after:bg-white after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
              to="/signup"
            >
              Sign up
            </Link>
          )}
        </div>
      </nav>
    </header>

    )
}