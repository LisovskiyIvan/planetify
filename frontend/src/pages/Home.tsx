import Navbar from "@/Components/Navbar";
import { CardInfo } from "@/Components/ui/CardInfo";
import { Heading } from "@/Components/ui/Heading";
import { Planet } from "@/Components/ui/Planet";
import { ICard } from "@/models";

const data: ICard[] = [{
  title: 'Удобство хранения информации',
  description: 'Приложение для заметок позволяет удобно хранить все ваши мысли, идеи, задачи и другую важную информацию в одном месте. Вы всегда сможете быстро найти нужную заметку благодаря системе тегов, категорий и поиска.',
}, 
{
  title: 'Повышение продуктивности',
  description: 'Использование приложения для заметок помогает организовать ваше рабочее пространство и повысить эффективность работы. Вы можете создать списки задач, напоминания, расписания и многое другое. Это поможет вам лучше управлять своим временем и не забывать важные дела.',
},
{
  title: 'Доступность данных в любое время и в любом месте',
  description: 'Большинство приложений для заметок доступны на различных устройствах – смартфонах, планшетах, компьютерах. Вы сможете получить доступ к вашим заметкам где угодно, что особенно важно в современном мобильном мире.',
}]

export const Home = () => {
  return (
    <div className="w-[100%] bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500">
      <div className="min-h-[100dvh] ">
      <Navbar></Navbar>
      <div className="mt-[120px] flex justify-around items-center">
        <div className="w-[50%] flex justify-center hover:scale-110 duration-300">
          <Planet></Planet>
        </div>
        <div className="w-[50%] flex justify-center items-center ">
          <Heading></Heading>
        </div>
      </div>
      </div>
      <div className="h-[100dvh] ">
        <h1 className="text-5xl raleway h-[20%] pt-20 pl-10">Почему именно planetify?</h1>
        <div className=" h-[80%] flex justify-evenly items-center">
          <CardInfo info={data[0]}></CardInfo>
          <CardInfo info={data[1]}></CardInfo>
          <CardInfo info={data[2]}></CardInfo>
        </div>
        
      </div>
    </div>
  );
};
