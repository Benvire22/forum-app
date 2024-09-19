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
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>;