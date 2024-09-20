import {createAsyncThunk} from "@reduxjs/toolkit";
import {Post, PostMutation} from "../../types";
import axiosApi from "../../axiosApi";
import {RootState} from "../../app/store";


export const fetchPosts = createAsyncThunk<Post[]>(
    'posts/fetch',
    async () => {
        try {
            const {data: posts} = await axiosApi.get('/posts');

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
            const {data: post} = await axiosApi.get(`/posts/${postId}`);

            if (!post) {
                return null;
            }

            return post;
        } catch (e) {
            throw e;
        }
    },
);

export const createPost = createAsyncThunk<void, PostMutation, {state: RootState}>(
    'posts/create',
    async (postMutation, {getState}) => {
        try {
            const token = getState().users.user?.token;
            await axiosApi.post(`/posts`, postMutation, {headers: {'Authorization': `Bearer ${token}`}});
        } catch (e) {
            throw e;
        }
    },
);