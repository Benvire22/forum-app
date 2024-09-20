import React, {useEffect} from 'react';
import Grid from "@mui/material/Grid2";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectOnePost, selectOnePostLoading} from "./postsSlice";
import {Button, CardMedia, CircularProgress, styled, Typography} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Link, useParams} from "react-router-dom";
import imageNotFound from "../../assets/images/image-not-found.png";
import {API_URL} from "../../constants";
import {fetchOnePost} from "./postsThunks";

const ImageCardMedia = styled(CardMedia)({
    height: '600px',
    width: '500px'
});

const OnePost = () => {
    const post = useAppSelector(selectOnePost);
    const isFetching = useAppSelector(selectOnePostLoading);
    const dispatch = useAppDispatch();
    const {id} = useParams() as {id: string};

    useEffect(() => {
        try {
            void dispatch(fetchOnePost(id)).unwrap();
        } catch (e) {
            console.error(e);
        }
    }, [dispatch, id]);


    let cardImage = imageNotFound;

    if (post && post.image) {
        cardImage = `${API_URL}/${post.image}`;
    }

    let content: React.ReactNode = <CircularProgress />;

    if (!isFetching && post) {
        content = (
            <Grid container justifyContent="space-between" spacing={2} alignItems="center">
                <Grid container sx={{ justifyContent: 'space-between'}}>
                    <Grid sx={{width: '90%', border: '1px solid red'}}>
                        <Typography variant="h5">
                            {post.description}
                        </Typography>
                    </Grid>
                    <Grid size={1}>
                        <ImageCardMedia image={cardImage} title={post.title} />
                    </Grid>
                </Grid>
            </Grid>
        );
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
                <Button variant="text" startIcon={<ArrowBackIcon />} component={Link} to="/">
                    Back to all posts
                </Button>
            </Grid>
            {content}
        </Grid>
    );
};

export default OnePost;