import React from 'react';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const IconButtonComponent = ({ size }) => (
  <IconButton sx={{ width: size, height: `calc(${size} * 1.9)` }}>
    <Avatar sx={{ width: '100%', height: '100%', fontSize: '100%' }}>
      <AccountCircleIcon sx={{ width: '100%', height: '100%'}} />
    </Avatar>
  </IconButton>
);

export default IconButtonComponent;
