import React, { useState } from 'react';
import { TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import {PostMutation} from "../../../types";
import FileInput from "../../../UI/FileInput/FileInput";

interface Props {
  onSubmit: (post: PostMutation) => void;
  isLoading: boolean;
}

const PostForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [state, setState] = useState<PostMutation>({
    title: '',
    description: '',
    image: null,
  });

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ ...state });
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    const value = files && files[0] ? files[0] : null;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Grid container direction="column" spacing={2} component="form" onSubmit={submitFormHandler}>
      <Grid>
        <TextField
            required
            label="Title"
            id="title"
            name="title"
            value={state.title}
            onChange={inputChangeHandler}
        />
      </Grid>
      <Grid>
        <TextField
          required={!!(state.image || state.description)}
          multiline
          minRows={3}
          label="Description"
          id="description"
          name="description"
          value={state.description}
          onChange={inputChangeHandler}
        />
      </Grid>
      <Grid>
        <FileInput
            required={!!(state.description || state.image)}
            label="Image"
            name="image"
            onChange={fileInputChangeHandler}
        />
      </Grid>
      <Grid>
        <LoadingButton
          type="submit"
          loading={isLoading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="contained"
        >
          <span>Save</span>
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default PostForm;
