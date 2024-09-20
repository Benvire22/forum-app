import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import PostForm from "./components/PostForm";
import {PostMutation} from "../../types";
import { Navigate } from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectUser} from "../users/usersSlice";

const NewPost = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectPostCreating);
  const user = useAppSelector(selectUser);

  const onFormSubmit = async (postMutation: PostMutation) => {
    try {
      await dispatch(createPost(postMutation)).unwrap();
      navigate('/');
    } catch (error) {
      // handle error
    }
  };

  return (
    <>
      {!user ? (
          <Navigate to="/" />
      ) : (
        <>
          <Typography variant="h4" sx={{ mb: 2 }}>New Post</Typography>
          <PostForm onSubmit={onFormSubmit} isLoading={isCreating} />
        </>
      )}
    </>
  );
};

export default NewPost;
