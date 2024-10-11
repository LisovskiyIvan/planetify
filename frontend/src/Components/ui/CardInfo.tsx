import { ICard } from "@/models";
import { Card, CardHeader, CardTitle, CardContent } from "./Card";

interface Props {
  info: ICard;
}

export function CardInfo({ info }: Props) {
  return (
    <Card className="bg-black  text-white w-[85%] lg:w-[25%] min-h-[300px] lg:min-h-[400px] rounded-xl hover:scale-110 duration-500 my-5">
      <CardHeader>
        <CardTitle className="text-3xl">{info.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg ">{info.description}</p>
      </CardContent>
    </Card>
  );
}
