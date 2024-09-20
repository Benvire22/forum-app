import { Route, Routes } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import AppToolbar from './UI/AppToolbar/AppToolbar';
import Register from './features/users/Register';
import Login from './features/users/Login';
import Posts from './features/posts/Posts';
import NewPost from './features/posts/NewPost';
import OnePost from './features/posts/OnePost';

const App = () => {
  return (
    <>
      <header>
        <AppToolbar />
      </header>
      <Container maxWidth='xl' component='main'>
        <Routes>
          <Route path='/' element={<Posts />} />
          <Route path='/add-new' element={<NewPost />} />
          <Route path='/posts/:id' element={<OnePost />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<Typography variant='h1'>Not found</Typography>} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
