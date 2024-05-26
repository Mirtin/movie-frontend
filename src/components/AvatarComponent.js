import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const AvatarComponent = () => {
  const [anchorEl, setAnchorEl] = useState(null);

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
        <MenuItem onClick={handleClose}>
          <Link to="/accounts/registration" style={{ textDecoration: 'none', color: 'inherit' }}>Register</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/accounts/login" style={{ textDecoration: 'none', color: 'inherit' }}>login</Link>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default AvatarComponent;
