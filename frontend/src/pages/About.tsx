import Navbar from "@/Components/Navbar";
import { CardInfo } from "@/Components/ui/CardInfo";
import { ICard } from "@/models";


export function About() {

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
    return(
        <div className="w-[100vw] min-h-[100dvh] bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500">
            <Navbar></Navbar>
            <div className="pb-10 ">
        <h1 className="text-5xl raleway h-[20%] pt-16  xl:pt-20 xl:pl-10 text-center">Почему именно planetify?</h1>
        <div className=" flex flex-col lg:flex-row  justify-evenly items-center my-12">
          <CardInfo info={data[0]}></CardInfo>
          <CardInfo info={data[1]}></CardInfo>
          <CardInfo info={data[2]}></CardInfo>
        </div>
        
      </div>
        </div>
    )
}