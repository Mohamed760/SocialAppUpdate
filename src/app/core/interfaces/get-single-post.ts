export interface GetSinglePost {
  message: string;
  post: Post;
}

export interface Post {
  _id: string;
  body: string;
  image: string;
  user: User;
  createdAt: string;
  comments: any[];
  id: string;
}

export interface User {
  _id: string;
  name: string;
  photo: string;
}