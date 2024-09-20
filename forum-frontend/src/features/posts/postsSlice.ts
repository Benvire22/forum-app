import {Post} from "../../types";
import { createSlice} from "@reduxjs/toolkit";

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
    reducers: {
        unsetPost: (state) => {
            state.post = null;
        },
    },
    extraReducers: (builder) => {

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
