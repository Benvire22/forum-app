import mongoose, { Types } from 'mongoose';
import { CommentMutation } from '../types';
import User from './User';
import Post from './Post';

const Schema = mongoose.Schema;

const CommentSchema = new Schema<CommentMutation>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const user = await User.findById(value);
        return Boolean(user);
      },
      message: 'User not found!',
    },
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const post = await Post.findById(value);
        return Boolean(post);
      },
      message: 'Post not found!',
    },
  },
  message: {
    type: String,
    required: true,
  },
});

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;