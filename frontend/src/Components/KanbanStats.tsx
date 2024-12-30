import { useState } from "react";
import { Card } from "./ui/Card";
import { useEffect } from "react";

interface IStats {
  boardsCount: { count: number };
  averageColumns: { average: number };
  averageTasks: { average: number };
  topColumns: {
    id: number;
    title: string;
    taskCount: number;
  }[];
  taskCreation: Record<string, number>;
  userActivity: { tasksCount: number; projectsCount: number };
}

interface IStatsState {
  boardsCount: number;
  avgColumns: number;
  avgTasks: number;
  topColumns: { id: number; title: string; taskCount: number }[];
  taskCreation: Record<string, number>;
  userActivity: { tasksCount: number; projectsCount: number };
}


export function KanbanStats() {
  const [stats, setStats] = useState<IStatsState>({
    boardsCount: 0,
    avgColumns: 0,
    avgTasks: 0,
    topColumns: [],
    taskCreation: {},
    userActivity: { tasksCount: 0, projectsCount: 0 },
  });

  useEffect(() => {
    async function fetchStats() {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("id");
      if (!userId || !token) return;

      const responses = await fetch(
        `/api/kanban/stats/${userId}?days=7`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const {boardsCount, averageColumns, averageTasks, topColumns, taskCreation, userActivity} = await responses.json() as IStats;

      setStats({
        boardsCount: boardsCount.count,
        avgColumns: averageColumns.average,
        avgTasks: averageTasks.average,
        topColumns,
        taskCreation,
        userActivity,
      });
    }

    fetchStats();
  }, []);

  const formatDate = (date: string) => {
    // @ts-expect-error asdasd
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [year, month, day] = date.split("-");
    return `${day}.${month}`;
  };



  return (
    <Card className="bg-black text-white h-[100%]  w-[100%] rounded-xl my-5 flex flex-col items-center px-5 py-10">
      <h2 className="text-2xl font-bold mb-5">Немного статистики</h2>

      <div className="grid grid-cols-2 gap-6 w-full">
        {/* Общее количество досок */}
        <div className="flex flex-col items-center justify-center bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Всего досок</h3>
          <span className="text-4xl font-bold text-teal-400 mt-2">
            {stats.boardsCount || 0}
          </span>
        </div>

        {/* Среднее количество колонок */}
        <div className="flex flex-col items-center justify-center bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-center">
            Среднее колонок на доску
          </h3>
          <span className="text-4xl font-bold text-teal-400 mt-2">
            {stats.avgColumns.toFixed(1) || 0}
          </span>
        </div>

        {/* Среднее количество задач */}
        <div className="flex flex-col items-center justify-center bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-center">
            Среднее задач на колонку
          </h3>
          <span className="text-4xl font-bold text-teal-400 mt-2">
            {stats.avgTasks.toFixed(1) || 0}
          </span>
        </div>

        {/* Топ-3 колонок */}
        <div className="flex flex-col items-center justify-center bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-center">
            Топ-3 досок по задачам
          </h3>
          <ul className="mt-2 text-teal-400">
            <li className="text-sm md:text-xl">
              {stats.topColumns.length > 0 &&
                `1. ${stats.topColumns[0]?.title}`}
            </li>
            <li className="text-sm md:text-xl">
              {stats.topColumns.length > 1 &&
                `2. ${stats.topColumns[1]?.title}`}
            </li>
            <li className="text-sm md:text-xl">
              {stats.topColumns.length > 2 &&
                `3. ${stats.topColumns[2]?.title}`}
            </li>
          </ul>
        </div>

        {/* График задач по времени */}
        <div className="flex flex-col items-center justify-center bg-gray-800 p-4 rounded-lg shadow-md col-span-2">
          <h3 className="text-xl font-semibold text-center">
            Задачи по времени (за месяц)
          </h3>
          <div className="w-full h-24 bg-gray-700 mt-2 rounded-lg flex items-center justify-center">
            {/* Здесь может быть график или текст */}
            <span className="text-2xl text-gray-300">
              {Object.keys(stats.taskCreation).map((date) => (
                <div key={date} className="flex items-center justify-center">
                  <span className="text-gray-300">
                    {formatDate(date) + " - " + stats.taskCreation[date]}
                  </span>
                </div>
              ))}
            </span>
          </div>
        </div>

        {/* Активность пользователя */}
        <div className="flex flex-col items-center justify-center bg-gray-800 p-4 rounded-lg shadow-md col-span-2">
          <h3 className="text-lg font-semibold text-center">
            Активность за последние 7 дней
          </h3>
          <span className="text-4xl font-bold text-teal-400 mt-2">
            {stats.userActivity.tasksCount} задач
          </span>
        </div>
      </div>
    </Card>
  );
}
