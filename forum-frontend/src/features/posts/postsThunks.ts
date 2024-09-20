import { createAsyncThunk } from '@reduxjs/toolkit';
import { Post, PostMutation, ValidationError } from '../../types';
import axiosApi from '../../axiosApi';
import { RootState } from '../../app/store';
import { isAxiosError } from 'axios';


export const fetchPosts = createAsyncThunk<Post[]>(
  'posts/fetch',
  async () => {
    try {
      const { data: posts } = await axiosApi.get('/posts');

      if (!posts) {
        return [];
      }

      return posts;
    } catch (e) {
      throw e;
    }
  },
);

export const fetchOnePost = createAsyncThunk<Post, string>(
  'posts/fetchOne',
  async (postId) => {
    try {
      const { data: post } = await axiosApi.get(`/posts/${postId}`);

      if (!post) {
        return null;
      }

      return post;
    } catch (e) {
      throw e;
    }
  },
);

export const createPost = createAsyncThunk<void, PostMutation, { state: RootState, rejectValue: ValidationError }>(
  'posts/create',
  async (postMutation, { getState, rejectWithValue }) => {
    try {
      const formData = new FormData();

      const keys = Object.keys(postMutation) as (keyof PostMutation)[];
      keys.forEach((key) => {
        const value = postMutation[key];
        if (value !== null) {
          formData.append(key, value);
        }
      });

      const token = getState().users.user?.token;

      await axiosApi.post(`/posts`, formData, { headers: { 'Authorization': `Bearer ${token}` } });
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  },
);