import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PostForm from './components/PostForm';
import { PostMutation } from '../../types';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser } from '../users/usersSlice';
import { selectCreatingPost } from './postsSlice';
import { createPost } from './postsThunks';
import { toast } from 'react-toastify';

const NewPost = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectCreatingPost);
  const user = useAppSelector(selectUser);

  const onFormSubmit = async (postMutation: PostMutation) => {
    try {
      await dispatch(createPost(postMutation)).unwrap();
      navigate(-1);
      toast.success('Post has been created!');
    } catch (error) {
      console.error(error);
      toast.error('Error creating post!');
    }
  };

  return (
    <>
      {!user ? (
        <Navigate to='/login' />
      ) : (
        <>
          <Typography variant='h4' sx={{ mb: 2 }}>New Post</Typography>
          <PostForm onSubmit={onFormSubmit} isLoading={isCreating} />
        </>
      )}
    </>
  );
};

export default NewPost;
