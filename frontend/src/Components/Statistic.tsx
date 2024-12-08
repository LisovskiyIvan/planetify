import { useState, useEffect } from "react";
import { Card } from "./ui/Card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import animationData from "@/assets/idea.json";
import Lottie from "lottie-react";
import { StatisticSkeleton } from "./StatisticSketeton";
import { Skeleton } from "./ui/skeleton";

interface IStatistic {
  currentPosts: number;
  currentProjects: number;
  postsCount: number;
  projectsCount: number;
  highPriorityPosts: number;
  mediumPriorityPosts: number;
  lowPriorityPosts: number;
}
interface IJoke {
  type: string;
  setup: string;
  punchline: string;
  id: number;
}

export function Statistic() {
  const [data, setData] = useState<IStatistic>();
  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const [joke, setJoke] = useState<IJoke>();
  const [isLoading, setIsLoading] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  useEffect(() => {
    async function getData() {
      if (!id || !token) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        const [resData, jokeData] = await Promise.all([
          fetch(`${import.meta.env.VITE_DEV_URL}/statistic/all/${id}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then((res) => res.json()),
          fetch("https://official-joke-api.appspot.com/jokes/random").then(
            (res) => res.json()
          ),
        ]);

        setData(resData);
        setJoke(jokeData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [id, token]);

  function getRandomColor() {
    switch (Math.floor(Math.random() * 5) + 1) {
      case 1:
        return "bg-lime-500";
      case 2:
        return "bg-emerald-500";
      case 3:
        return "bg-cyan-400";
      case 4:
        return "bg-sky-500";
      case 5:
        return "bg-indigo-500";
    }
  }

  return (
    <div className="flex flex-col sm:flex-row w-[100%] ">
      {isLoading && <StatisticSkeleton />}
      {data && (
        <div className="flex flex-col sm:w-[60%] px-[2%]">
          <div>
            <Card className="bg-black flex justify-between text-white h-[200px] rounded-xl my-5 p-5">
              <div className="flex flex-col items-center justify-around">
                <h3 className="text-sm sm:text-md md:text-lg xl:text-xl">
                  Всего проектов
                </h3>
                <Badge
                  className={` w-12 h-12 md:w-16 md:h-16 flex justify-center text-2xl text-black hover:bg-black hover:text-white hover:border-white duration-300 ${getRandomColor()}`}
                >
                  {data.projectsCount}
                </Badge>
              </div>
              <div className="flex flex-col items-center justify-around">
                <h3 className="text-sm sm:text-md md:text-lg xl:text-xl">
                  Всего заданий
                </h3>
                <Badge
                  className={` w-12 h-12 md:w-16 md:h-16 flex justify-center text-2xl text-black hover:bg-black hover:text-white hover:border-white  duration-300 ${getRandomColor()}`}
                >
                  {data.postsCount}
                </Badge>
              </div>
              <div className="flex flex-col items-center justify-around">
                <h3 className="text-sm sm:text-md md:text-lg xl:text-xl">
                  Сейчас проектов
                </h3>
                <Badge
                  className={` w-12 h-12 md:w-16 md:h-16 flex justify-center text-2xl text-black hover:bg-black hover:text-white hover:border-white  duration-300 ${getRandomColor()}`}
                >
                  {data.currentProjects}
                </Badge>
              </div>
              <div className="flex flex-col items-center justify-around">
                <h3 className="text-sm sm:text-md md:text-lg xl:text-xl">
                  Сейчас заданий
                </h3>
                <Badge
                  className={` w-12 h-12 md:w-16 md:h-16 flex justify-center text-2xl text-black hover:bg-black hover:text-white hover:border-white  duration-300 ${getRandomColor()}`}
                >
                  {data.currentPosts}
                </Badge>
              </div>
            </Card>
          </div>
          <div>
            <Card className="bg-black text-white h-[400px] flex flex-col justify-around px-[3%] py-5 rounded-xl mt-5 ">
              <div className="w-[100%] pr-3">
                <h3 className="text-xl mb-3">
                  Количество срочных заданий{" "}
                  {((data.highPriorityPosts / data.currentPosts) * 100).toFixed(
                    0
                  )}
                  %
                </h3>
                <Progress
                  value={(data.highPriorityPosts / data.currentPosts) * 100}
                  className={`${getRandomColor()}`}
                ></Progress>
              </div>
              <div className="w-[100%] pr-3">
                <h3 className="text-xl mb-3">
                  Количество заданий средней важности{" "}
                  {((data.mediumPriorityPosts / data.currentPosts) * 100).toFixed(
                    0
                  )}
                  %
                </h3>
                <Progress
                  value={(data.mediumPriorityPosts / data.currentPosts) * 100}
                  className={`${getRandomColor()}`}
                ></Progress>
              </div>
              <div className="w-[100%] pr-3">
                <h3 className="text-xl mb-3">
                  Количество заданий низкой важности{" "}
                  {((data.lowPriorityPosts / data.currentPosts) * 100).toFixed(0)}
                  %
                </h3>
                <Progress
                  value={(data.lowPriorityPosts / data.currentPosts) * 100}
                  className={`${getRandomColor()}`}
                ></Progress>
              </div>
            </Card>
          </div>
        </div>
      )}
      {joke && (
        <div className="sm:w-[40%]  bg-blue px-[3%]">
          <Card className="bg-black text-white h-[100%]  w-[100%] rounded-xl my-5 py-5 flex flex-col items-center">
            <Lottie animationData={animationData}></Lottie>
            <div className="text-xl  text-center mt-20 px-3">{joke.setup}</div>
            {isHover ? (
              <div
                onMouseLeave={handleMouseLeave}
                className="text-lg text-center mt-10 w-[50%]"
              >
                {joke.punchline}
              </div>
            ) : (
              <Skeleton
                onMouseEnter={handleMouseEnter}
                onTouchStart={handleMouseEnter}
                className="mt-10  w-[50%] h-[20px]"
              />
            )}
          </Card>
        </div>
      )}
    </div>
  );
}
