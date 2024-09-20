import {PostComment} from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import {createComment, fetchComments} from "./commentsThunks";

export interface CommentsState {
    comments: PostComment[];
    fetchingComments: boolean;
    errorFetchingComments: boolean;
    createLoadingComment: boolean;
    errorCreatingComment: boolean;
}

export const initialState: CommentsState = {
    comments: [],
    fetchingComments: false,
    errorFetchingComments: false,
    createLoadingComment: false,
    errorCreatingComment: false,
};

export const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.fetchingComments = true;
                state.errorFetchingComments = false;
            })
            .addCase(fetchComments.fulfilled, (state, { payload: comments }) => {
                state.fetchingComments = false;
                state.comments = comments;
            })
            .addCase(fetchComments.rejected, (state) => {
                state.fetchingComments = false;
                state.errorFetchingComments = true;
            });

        builder
            .addCase(createComment.pending, (state) => {
                state.createLoadingComment = true;
                state.errorCreatingComment = false;
            })
            .addCase(createComment.fulfilled, (state ) => {
                state.createLoadingComment = false;
            })
            .addCase(createComment.rejected, (state) => {
                state.createLoadingComment = false;
                state.errorCreatingComment = true;
            });
    },
    selectors: {
        selectComments: (state) => state.comments,
        selectFetchingComments: (state) => state.fetchingComments,
        selectErrorFetchingComments: (state) => state.errorFetchingComments,
        selectCreatingComment: (state) => state.createLoadingComment,
        selectErrorCreatingComment: (state) => state.errorCreatingComment,
    },
});

export const commentsReducer = commentsSlice.reducer;

export const {
    selectComments,
    selectFetchingComments,
    selectErrorFetchingComments,
    selectCreatingComment,
    selectErrorCreatingComment,
} = commentsSlice.selectors;
