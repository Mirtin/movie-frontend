import React from 'react';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const IconButtonComponent = ({ size, image, onClick=null }) => (
  <IconButton onClick={onClick} sx={{ width: size,height: 'auto' }}>
    <Avatar sx={{ width: '100%', height: '100%', fontSize: '100%'}} src={`http://127.0.0.1:8000${image}`}>
      <AccountCircleIcon sx={{ width: '100%', height: '100%'}} />
    </Avatar>
  </IconButton>
);

export default IconButtonComponent;
