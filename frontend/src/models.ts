export interface ICard {
    title: string,
    description:string
}


export interface IPost {
  id: number;
  content: string;
  title: string;
  status: string;
}
export interface IData {
  id: number;
  authorId: number;
  title: string;
  posts: IPost[];
}
    