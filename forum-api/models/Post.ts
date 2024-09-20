import mongoose, { HydratedDocument, Types } from 'mongoose';
import { PostMutation } from '../types';
import User from './User';

const Schema = mongoose.Schema;

const PostSchema = new Schema<PostMutation>({
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
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    validate: {
      async validator(value?: string) {
        const currentDocument = (this as HydratedDocument<PostMutation>);
        return !!(value || currentDocument.image);
      },
      message: 'Either image or description must be present!',
    },
  },
  image: {
    type: String,
    validate: {
      async validator(value?: string) {
        const currentDocument = (this as HydratedDocument<PostMutation>);
        return !!(value || currentDocument.description);
      },
      message: 'Either image or description must be present!',
    },
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

const Post = mongoose.model('Post', PostSchema);

export default Post;