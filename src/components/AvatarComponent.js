import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, IconButton, Avatar, Menu, MenuItem, Typography, ListItemText } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Cookies from 'universal-cookie';

const AvatarComponent = ({ IsAuthenticated }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const cookies = new Cookies();

  const handleLogout = () => {
    cookies.remove('access', { path: '/' });
    cookies.remove('refresh', { path: '/' });
    window.location.reload();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton onClick={handleClick}>
        <Avatar>
          <AccountCircleIcon />
        </Avatar>
      </IconButton>
      <Menu
        id="avatar-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
      {IsAuthenticated ? (<Box>
        <ListItemText sx={{display: 'flex', justifyContent: 'center'}}><Typography>{cookies.get('username')}</Typography></ListItemText>
        <MenuItem onClick={handleClose}>
          <Link to="/accounts/profile" style={{ textDecoration: 'none', color: 'inherit' }}>Profile Page</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}><Typography component={'span'} onClick={handleLogout}>Logout</Typography></MenuItem>
        </Box>
      ):(<Box>
        <MenuItem onClick={handleClose}>
          <Link to="/accounts/registration" style={{ textDecoration: 'none', color: 'inherit' }}>Register</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/accounts/login" style={{ textDecoration: 'none', color: 'inherit' }}>login</Link>
        </MenuItem>
        </Box>)}
        
      </Menu>
    </Box>
  );
};

export default AvatarComponent;
