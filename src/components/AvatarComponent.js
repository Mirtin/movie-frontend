import { useState, useEffect } from 'react';
import { Box, IconButton, Avatar, Menu, MenuItem, Typography, ListItemText } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Cookies from 'universal-cookie';

import getCurrentUser from "../functions/getCurrentUser"


const AvatarComponent = ({ IsAuthenticated }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userData, setUserData] = useState(null);
  const [Isloaded, setIsloaded] = useState(false);
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
        setIsloaded(true);
        console.log(userData)
    });
  }, [])

  return (
    
    <>
    {Isloaded ? (
        <Box>
          <IconButton onClick={handleClick}>
          {IsAuthenticated && userData.profile.avatar ? (
            <Avatar src={`http://127.0.0.1:8000${userData.profile.avatar}`} />
          ) : (<AccountCircleIcon />)}
          </IconButton>
          <Menu
            id="avatar-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
          {IsAuthenticated && userData ? (
            <Box>
              <ListItemText sx={{display: 'flex', justifyContent: 'center'}}><Typography>{userData.username}</Typography></ListItemText>
              <MenuItem onClick={handleClose} component="a" href="/accounts/profile">
                  Profile Page
              </MenuItem>
              <MenuItem onClick={handleLogout} component="a" href="">
                Logout
              </MenuItem>
            </Box>
          ) : (
            <Box>
              <MenuItem onClick={handleClose} component="a" href="/accounts/registration">
                Register
              </MenuItem>
              <MenuItem onClick={handleClose} component="a" href="/accounts/login">
                Login
              </MenuItem>
            </Box>
          )}
            
          </Menu>
        </Box>
    ):(<Typography>Loading</Typography>)} 
    </>  
  );
};

export default AvatarComponent;
