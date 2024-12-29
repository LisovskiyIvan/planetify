import { useState, useEffect } from "react";
import { Card } from "./ui/Card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { KanbanStats } from "./KanbanStats";
import { boardsAtom } from "@/atoms/modalAtoms";
import { useAtom } from "jotai";
import { StatisticSkeleton } from "./StatisticSketeton";

interface IStatistic {
  currentPosts: number;
  currentProjects: number;
  postsCount: number;
  projectsCount: number;
  highPriorityPosts: number;
  mediumPriorityPosts: number;
  lowPriorityPosts: number;
}
// interface IJoke {
//   type: string;
//   setup: string;
//   punchline: string;
//   id: number;
// }

export function Statistic() {
  const [data, setData] = useState<IStatistic>();
  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);
  const [boards, setBoards] = useAtom(boardsAtom);

  useEffect(() => {
    async function getData() {
      if (!id || !token) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        if (boards.length === 0) {
          const [resData, resBoards] = await Promise.all([
            fetch(`/api/statistic/all/${id}`, {
              method: "GET", 
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
            fetch(`/api/kanban/${id}/boards`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
          ]);

          if (resData.ok && resBoards.ok) {
            setData(await resData.json());
            setBoards(await resBoards.json());
          }
        } else {
          const resData = await fetch(`/api/statistic/all/${id}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (resData.ok) {
            setData(await resData.json());
          }
        }
      } catch (error: unknown) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [id, token, boards.length, setBoards]);

  function getRandomColor() {
    switch (Math.floor(Math.random() * 5)) {
      case 0:
        return "bg-lime-500";
      case 1:
        return "bg-emerald-500";
      case 2:
        return "bg-cyan-400";
      case 3:
        return "bg-sky-500";
      case 4:
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
                  Срочных заданий{" "}
                  {data.currentPosts === 0
                    ? "нет"
                    : ((data.highPriorityPosts / data.currentPosts) * 100).toFixed(0) + "%"}
                </h3>
                <Progress
                  value={data.currentPosts === 0 
                    ? 0 
                    : (data.highPriorityPosts / data.currentPosts) * 100}
                  className={`${getRandomColor()}`}
                ></Progress>
              </div>
              <div className="w-[100%] pr-3">
                <h3 className="text-xl mb-3">
                  Средней важности{" "}
                  {data.currentPosts === 0
                    ? "нет"
                    : ((data.mediumPriorityPosts / data.currentPosts) * 100).toFixed(0) + "%"}
                </h3>
                <Progress
                  value={data.currentPosts === 0
                    ? 0
                    : (data.mediumPriorityPosts / data.currentPosts) * 100}
                  className={`${getRandomColor()}`}
                ></Progress>
              </div>
              <div className="w-[100%] pr-3">
                <h3 className="text-xl mb-3">
                  Низкой важности{" "}
                  {data.currentPosts === 0
                    ? "нет"
                    : ((data.lowPriorityPosts / data.currentPosts) * 100).toFixed(0) + "%"}
                </h3>
                <Progress
                  value={data.currentPosts === 0
                    ? 0
                    : (data.lowPriorityPosts / data.currentPosts) * 100}
                  className={`${getRandomColor()}`}
                ></Progress>
              </div>
            </Card>
          </div>
        </div>
      )}
        <div className="sm:w-[40%]  bg-blue px-[3%]">
        <KanbanStats />
        </div>
    </div>
  );
}
