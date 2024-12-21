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

export interface IBoard {
  id: number;
  title: string;
  userId: number;
  columns: IColumn[];
}


export interface IColumn {
  id: number;
  boardId: number;
  title: string;
  position: number;
  tasks: ITask[];
}

export interface ITask {
  id: number;
  columnId: number;
  title: string;
  description: string;
  position: number;
}
