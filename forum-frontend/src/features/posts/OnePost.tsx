import React, {useEffect} from 'react';
import Grid from "@mui/material/Grid2";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectOnePost, selectOnePostLoading} from "./postsSlice";
import {Alert, Button, CardMedia, CircularProgress, Link, styled, Typography} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Link as RouterLink, useParams} from "react-router-dom";
import imageNotFound from "../../assets/images/image-not-found.png";
import {API_URL} from "../../constants";
import {fetchOnePost} from "./postsThunks";
import {selectUser} from "../users/usersSlice";
import CommentForm from "../comments/components/CommentForm";
import {selectComments, selectCreatingComment, selectFetchingComments} from "../comments/commentsSlice";
import {createComment, fetchComments} from "../comments/commentsThunks";
import CommentItem from "../comments/components/CommentItem";

const ImageCardMedia = styled(CardMedia)({
    height: '600px',
    width: '500px'
});

const OnePost = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const post = useAppSelector(selectOnePost);
    const isFetching = useAppSelector(selectOnePostLoading);
    const {id} = useParams() as {id: string};
    const isCreating = useAppSelector(selectCreatingComment);
    const commentsLoading = useAppSelector(selectFetchingComments);
    const comments = useAppSelector(selectComments);

    useEffect(() => {
        try {
            void dispatch(fetchOnePost(id)).unwrap();
            void dispatch(fetchComments(id)).unwrap();
        } catch (e) {
            console.error(e);
        }
    }, [dispatch, id]);


    let cardImage = '';

    if (post && post.image) {
        cardImage = `${API_URL}/${post.image}`;
    }

    let content: React.ReactNode = <CircularProgress />;

    if (!isFetching && post) {
        content = (
            <Grid container justifyContent="center" spacing={2}>
                {post.description && (
                    <Grid flexGrow="1" sx={{ border: '1px solid #ccc'}} borderRadius={2} padding={2}>
                        <Typography variant="h5">
                            {post.description}
                        </Typography>
                    </Grid>
                )}
                {post.image && (
                    <Grid size={6}>
                        <ImageCardMedia image={cardImage} title={post.title} />
                    </Grid>
                )}
            </Grid>
        );
    }

    const onSubmit = async (message: string) => {
        try {
            console.log(id)
            await dispatch(createComment({
                message,
                post: id,
            })).unwrap();

            await dispatch(fetchComments(id)).unwrap();

        } catch (e) {
            console.error(e);
        }
    };

    let commentsContent: React.ReactNode = (
        <Alert severity="info" sx={{ width: '100%' }}>
            No comments here...
        </Alert>
    );

    if (commentsLoading) {
        commentsContent = <CircularProgress />
    } else if (comments.length > 1) {
        commentsContent = comments.map((comment) => (
            <CommentItem
                key={comment._id}
                author={comment.user.username}
                message={comment.message}
            />
        ));
    }



    return (
        <Grid container direction="column" spacing={4}>
            <Grid container justifyContent="space-between" spacing={2} alignItems="center">
                <Grid>
                    <Typography variant="h2" marginBottom="20px">
                        {post?.title}
                    </Typography>
                    <Typography variant="h4" color="secondary">
                        Author: {post?.user.username}
                    </Typography>
                </Grid>
            </Grid>
            <Grid>
                <Button variant="text" startIcon={<ArrowBackIcon />} component={RouterLink} to="/">
                    Back to all posts
                </Button>
            </Grid>
            {content}
            {!user ? (
                <Alert severity="info" sx={{ width: '100%' }}>
                    <Link component={RouterLink} to={'/register'} variant="body2">Register </Link> or
                    <Link component={RouterLink} to={'/login'} variant="body2"> Login </Link>
                    to comment this post
                </Alert>
            ) : (
                <CommentForm isLoading={isCreating} onSubmit={onSubmit} />
            )}
            <Grid container direction="column" spacing={2} alignItems="center">
                {commentsContent}
            </Grid>
        </Grid>
    );
};

export default OnePost;