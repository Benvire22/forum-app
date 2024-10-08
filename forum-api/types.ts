import mongoose, { Model } from 'mongoose';

export interface UserFields {
  username: string;
  password: string;
  token: string;
}

export interface PostMutation {
  user: mongoose.Types.ObjectId | string;
  title: string;
  description: string | null;
  image: string | null;
  createdAt: Date;
}


export interface CommentMutation {
  user: mongoose.Types.ObjectId | string;
  post: mongoose.Types.ObjectId | string;
  message: string;
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>;