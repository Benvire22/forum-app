import React, { useState } from 'react';
import Grid from '@mui/material/Grid2';
import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';

interface Props {
  isLoading: boolean;
  onSubmit: (message: string) => void;
}

const CommentForm: React.FC<Props> = ({ isLoading, onSubmit }) => {
  const [state, setState] = useState('');

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state);
    setState('');
  };

  return (
    <Grid container spacing={2} component='form' alignItems='center' onSubmit={submitFormHandler}>
      <Grid size={11}>
        <TextField
          multiline
          minRows={2}
          required
          label='Message'
          id='message'
          name='message'
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </Grid>
      <Grid size={1}>
        <LoadingButton
          type='submit'
          loading={isLoading}
          loadingPosition='start'
          startIcon={<SaveIcon />}
          variant='contained'
        >
          <span>Send</span>
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default CommentForm;