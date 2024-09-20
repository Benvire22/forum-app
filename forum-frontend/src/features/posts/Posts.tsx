import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectPosts, selectPostsLoading } from './postsSlice';
import { Alert, CircularProgress, Grid2, Typography } from '@mui/material';
import PostItem from './components/PostItem';
import { fetchPosts } from './postsThunks';
import { toast } from 'react-toastify';

const Posts = () => {
  const posts = useAppSelector(selectPosts);
  const isFetching = useAppSelector(selectPostsLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      void dispatch(fetchPosts()).unwrap();
    } catch (e) {
      console.error(e);
      toast.error('Error fetching posts!');
    }
  }, [dispatch]);

  let content: React.ReactNode = (
    <Alert severity='info' sx={{ width: '100%' }}>
      There are no Posts here!
    </Alert>
  );

  if (isFetching) {
    content = <CircularProgress />;
  } else if (posts.length > 0) {
    content = posts.map((post) => (
      <PostItem
        key={post._id}
        id={post._id}
        user={post.user.username}
        title={post.title}
        createdAt={post.createdAt}
        image={post.image}
      />
    ));
  }

  return (
    <Grid2 container spacing={5} flexDirection='column' alignItems='center'>
      <Grid2 container>
        <Grid2>
          <Typography sx={{ m: '20px 0' }} variant='h3'>Forum Posts</Typography>
        </Grid2>
      </Grid2>
      <Grid2 container spacing={1}>
        {content}
      </Grid2>
    </Grid2>
  );
};

export default Posts;