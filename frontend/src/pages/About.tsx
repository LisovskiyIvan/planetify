import Navbar from "@/Components/Navbar";
import { CardInfo } from "@/Components/ui/CardInfo";
import { ICard } from "@/models";

export function About() {
  const data: ICard[] = [
    {
      title: "Интуитивно понятный интерфейс",
      description:
        "Наше приложение разработано с учетом максимального удобства для пользователя. Современный дизайн, плавные анимации и продуманная навигация делают работу с приложением приятной и эффективной. Вы сможете сразу начать пользоваться всеми функциями без длительного обучения.",
    },
    {
      title: "Универсальный инструмент для организации",
      description:
        "Planetify объединяет в себе функционал заметок и канбан-досок. Создавайте подробные заметки для фиксации идей, а затем легко превращайте их в задачи на канбан-доске. Визуальное планирование помогает эффективно управлять проектами любой сложности.",
    },
    {
      title: "Безопасность и надежность",
      description: 
        "Ваши данные надежно защищены современными методами шифрования. Регулярное резервное копирование обеспечивает сохранность всей информации. Вы можете быть уверены в безопасности и конфиденциальности ваших проектов.",
    },
  ];
  return (
    <div className="w-[100vw] min-h-[100dvh] bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500">
      <Navbar></Navbar>
      <div className="pb-10 ">
        <h1 className="text-5xl raleway h-[20%] pt-16  xl:pt-20 xl:pl-10 text-center">
          Почему именно planetify?
        </h1>
        <div className=" flex flex-col lg:flex-row  justify-evenly items-center my-12">
          <CardInfo info={data[0]}></CardInfo>
          <CardInfo info={data[1]}></CardInfo>
          <CardInfo info={data[2]}></CardInfo>
        </div>
      </div>
    </div>
  );
}
