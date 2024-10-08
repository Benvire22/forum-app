import React, { useState } from 'react';
import { Avatar, Box, TextField, Typography, Link } from '@mui/material';
import Grid from '@mui/material/Grid2';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectRegisterError, selectRegisterLoading } from './usersSlice';
import { RegisterMutation } from '../../types';
import { register } from './usersThunks';
import { toast } from 'react-toastify';
import { LoadingButton } from '@mui/lab';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector(selectRegisterError);
  const registerLoading = useAppSelector(selectRegisterLoading);

  const [state, setState] = useState<RegisterMutation>({
    username: '',
    password: '',
  });

  const getFieldError = (fieldName: string) => {
    return error?.errors[fieldName]?.message;
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(register(state)).unwrap();
      navigate(-1);
      setState({
        username: '',
        password: '',
      });

      toast.success('You have been registered!');
    } catch (e) {
      console.error(e);
      toast.error('Register error!');
    }
  };

  return (
    <Box
      sx={{
        mt: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component='h1' variant='h5'>
        Sign up
      </Typography>
      <Box component='form' noValidate onSubmit={submitFormHandler} sx={{ mt: 3 }}>
        <Grid container direction='column' spacing={2}>
          <Grid>
            <TextField
              label='Username'
              name='username'
              value={state.username}
              autoComplete='new-username'
              onChange={inputChangeHandler}
              required
              error={Boolean(getFieldError('username'))}
              helperText={getFieldError('username')}
            />
          </Grid>
          <Grid>
            <TextField
              type='password'
              label='Password'
              name='password'
              value={state.password}
              autoComplete='new-password'
              onChange={inputChangeHandler}
              required
              error={Boolean(getFieldError('password'))}
              helperText={getFieldError('password')}
            />
          </Grid>
        </Grid>
        <LoadingButton
          type='submit'
          fullWidth
          sx={{ mt: 3, mb: 2 }}
          color='primary'
          loading={registerLoading}
          loadingPosition='end'
          endIcon={<ExitToAppIcon />}
          variant='contained'
        >
          <span>Sign in</span>
        </LoadingButton>
        <Link component={RouterLink} to={'/login'} variant='body2'>
          Already have an component account? Sign in
        </Link>
      </Box>
    </Box>
  );
};

export default Register;
