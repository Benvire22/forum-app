import React, { useState } from 'react';
import Grid from '@mui/material/Grid2';
import { Button, Menu, MenuItem } from '@mui/material';
import { User } from '../../types';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { logout } from '../../features/users/usersThunks';
import { toast } from 'react-toastify';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isOpen = Boolean(anchorEl);
  const dispatch = useAppDispatch();

  const handleClick = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
    toast.warning('You are logged out!');
  };

  return (
    <Grid>
      <Button color='inherit' sx={{ fontSize: 20 }} onClick={handleClick}>
        {user.username}
      </Button>
      <Menu open={isOpen} onClose={handleClose} anchorEl={anchorEl} keepMounted>
        <MenuItem onClick={handleClose} component={NavLink} to='/add-new'>
          add new Post
        </MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Grid>
  );
};

export default UserMenu;
