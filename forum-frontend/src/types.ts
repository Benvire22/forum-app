
export interface Post {
  _id: string;
  title: string
  user: {
    _id: string;
    username: string;
  }
  description: string;
  image: string | null;
  createdAt: Date;
}

export interface PostMutation {
  title: string
  description: string;
  image: string | null;
}

export interface PostComment {
  _id: string;
  user: {
    _id: string;
    username: string;
  }
  post: string;
  message: string;
}

export interface PostCommentMutation {
  message: string;
  post: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}