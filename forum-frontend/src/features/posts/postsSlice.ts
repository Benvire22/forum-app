import {Post} from "../../types";
import { createSlice} from "@reduxjs/toolkit";
import {createPost, fetchOnePost, fetchPosts} from "./postsThunks";

export interface PostsState {
    posts: Post[];
    loadingPosts: boolean;
    errorLoadingPost: boolean;
    onePost: Post | null;
    loadingOnePost: boolean;
    errorLoadingOnePost: boolean;
    isCreating: boolean;
    errorCreating: boolean;
}

const initialState: PostsState = {
    posts: [],
    loadingPosts: false,
    errorLoadingPost: false,
    onePost: null,
    loadingOnePost: false,
    errorLoadingOnePost: false,
    isCreating: false,
    errorCreating: false,
};

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state) => {
            state.errorLoadingPost = false;
            state.loadingPosts = true;
        }).addCase(fetchPosts.fulfilled, (state, {payload: posts}) => {
            state.loadingPosts = false;
            state.posts = posts;
        }).addCase(fetchPosts.rejected, (state) => {
            state.errorLoadingPost = true;
            state.loadingPosts = false;
        });

        builder.addCase(fetchOnePost.pending, (state) => {
            state.onePost = null;
            state.errorLoadingOnePost = false;
            state.loadingOnePost = true;
        }).addCase(fetchOnePost.fulfilled, (state, {payload: post}) => {
            state.loadingOnePost = false;
            state.onePost = post;
        }).addCase(fetchOnePost.rejected, (state) => {
            state.errorLoadingOnePost = true;
            state.loadingOnePost = false;
        });

        builder.addCase(createPost.pending, (state) => {
            state.errorCreating = false;
            state.isCreating = true;
        }).addCase(createPost.fulfilled, (state) => {
            state.isCreating = false;
        }).addCase(createPost.rejected, (state) => {
            state.errorCreating = true;
            state.isCreating = false;
        });
    },
    selectors: {
        selectPosts: (state) => state.posts,
        selectPostsLoading: (state) => state.loadingPosts,
        selectErrorLoadingPost: (state) => state.errorLoadingPost,
        selectOnePost: (state) => state.onePost,
        selectOnePostLoading: (state) => state.loadingOnePost,
        selectOnePostError: (state) => state.errorLoadingOnePost,
        selectCreatingPost: (state) => state.isCreating,
        selectErrorCreatingOnePost: (state) => state.errorCreating,
    }
})

export const postsReducer = postsSlice.reducer;

export const {
    selectPosts,
    selectPostsLoading,
    selectErrorLoadingPost,
    selectOnePost,
    selectOnePostLoading,
    selectOnePostError,
    selectCreatingPost,
    selectErrorCreatingOnePost,
} = postsSlice.selectors;
