import { createAsyncThunk } from '@reduxjs/toolkit';
import { GlobalError, PostCommentMutation } from '../../types';
import axiosApi from '../../axiosApi';
import { RootState } from '../../app/store';
import { isAxiosError } from 'axios';

export const fetchComments = createAsyncThunk<Comment[], string>('comments/fetch', async (postId) => {
  try {
    const { data: comments } = await axiosApi.get<Comment[]>(`/comments?post=${postId}`);

    if (!comments) {
      return [];
    }

    return comments;
  } catch (e) {
    console.error(e);
  }
});


export const createComment = createAsyncThunk<void, PostCommentMutation, { rejectValue: GlobalError; state: RootState }>(
  'comments/create',
  async (postCommentMutation, { rejectWithValue, getState }) => {
    try {
      const token = getState().users.user?.token;

      await axiosApi.post('/comments', postCommentMutation, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data);
      }

      throw e;
    }
  },
);
