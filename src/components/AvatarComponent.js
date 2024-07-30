import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, IconButton, Avatar, Menu, MenuItem, Typography, ListItemText } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Cookies from 'universal-cookie';

import getCurrentUser from "../functions/getCurrentUser"


const AvatarComponent = ({ IsAuthenticated }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userData, setUserData] = useState(null);
  const cookies = new Cookies();

  const handleLogout = () => {
    const allCookie = cookies.getAll();
    Object.keys(allCookie).forEach(cookieName => {
      cookies.remove(cookieName, {path: '/'})
    })
    window.location.reload();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    getCurrentUser().then(userData => {
        setUserData(userData);
    });
  })

  return (
    <>
      {userData ? (
        <Box>
          <IconButton onClick={handleClick}>
            
            <Avatar src={`http://127.0.0.1:8000${userData.profile.avatar}`}>
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
            <ListItemText sx={{display: 'flex', justifyContent: 'center'}}><Typography>{userData.username}</Typography></ListItemText>
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
      ) : (<Typography fontSize={20}>Loading...</Typography>)}  
    </>  
  );
};

export default AvatarComponent;
