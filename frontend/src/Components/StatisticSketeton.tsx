import { Skeleton } from "@/Components/ui/skeleton"


export function StatisticSkeleton() {
    return (
        <div className="flex flex-col sm:flex-row w-[100%] ">
        <div className="flex flex-col sm:w-[60%] px-[2%]">
                <div>
                <Skeleton className="bg-black flex justify-between text-white h-[200px] rounded-xl my-5 p-5">
                    <div className="flex flex-col items-center justify-around">
                        <h3 className="text-sm sm:text-md md:text-lg xl:text-xl">Всего проектов</h3>
                        <Skeleton className={` w-12 h-12 rounded-full md:w-16 md:h-16 flex justify-center text-2xl text-black hover:bg-black hover:text-white hover:border-white duration-300 `}></Skeleton>
                    </div>
                    <div className="flex flex-col items-center justify-around">
                        <h3 className="text-sm sm:text-md md:text-lg xl:text-xl">Всего заданий</h3>
                        <Skeleton className={` w-12 h-12 rounded-full md:w-16 md:h-16 flex justify-center text-2xl text-black hover:bg-black hover:text-white hover:border-white  duration-300 `}></Skeleton>
                    </div>
                    <div className="flex flex-col items-center justify-around">
                        <h3 className="text-sm sm:text-md md:text-lg xl:text-xl">Сейчас проектов</h3>
                        <Skeleton className={` w-12 h-12 rounded-full md:w-16 md:h-16 flex justify-center text-2xl text-black hover:bg-black hover:text-white hover:border-white  duration-300 `}></Skeleton>
                    </div>
                    <div className="flex flex-col items-center justify-around">
                        <h3 className="text-sm sm:text-md md:text-lg xl:text-xl">Сейчас заданий</h3>
                        <Skeleton className={` w-12 h-12 rounded-full md:w-16 md:h-16 flex justify-center text-2xl text-black hover:bg-black hover:text-white hover:border-white  duration-300 `}></Skeleton>
                    </div>
                </Skeleton>
                </div>
                <div>
                <Skeleton className="bg-black text-white h-[400px] flex flex-col justify-around px-[3%] py-5 rounded-xl mt-5 ">
                    <div className="w-[100%] pr-3">
                    <h3 className="text-xl mb-3">Количество срочных заданий </h3>
                    <Skeleton className="w-[100%] h-[20px]"></Skeleton>
                    </div>
                    <div className="w-[100%] pr-3">
                    <h3 className="text-xl mb-3">Количество заданий средней важности </h3>
                    <Skeleton className="w-[100%] h-[20px]"></Skeleton>
                    </div>
                    <div className="w-[100%] pr-3">
                    <h3 className="text-xl mb-3">Количество заданий низкой важности </h3>
                    <Skeleton className="w-[100%] h-[20px]"></Skeleton>
                    </div>
                </Skeleton>
                </div>
            </div>
            <div className="sm:w-[40%]  bg-blue px-[3%]">
            <Skeleton className="bg-black text-white h-[100%] flex flex-col justify-around items-center  w-[100%] rounded-xl my-5 py-5 text-white">
                    <Skeleton className="w-[90%] h-[200px] my-5"></Skeleton>
                    <Skeleton className="w-[80%] h-[20px] my-5"></Skeleton>
                    <Skeleton className="w-[60%] h-[20px] my-5"></Skeleton>
                </Skeleton>
            </div>
        </div>
    )
}
