export interface IPost {
  title: string,
  content:  string,
  projectId: number,
  status: string
}

export interface IOldPost {
  id: number,
  title: string,
  content:  string,
  status: string
}


export interface INewPost {
  id: number,
  title?: string,
  content?:  string,
  status: string
}