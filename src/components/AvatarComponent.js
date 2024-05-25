import { Avatar, Toolbar, Typography, IconButton, TextField, InputAdornment, Box } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const AvatarComponent = () => {
    return (
        <Box>
            <IconButton>
                <Avatar>
                    <AccountCircleIcon />
                </Avatar>
            </IconButton>
        </Box>
    );
};


export default AvatarComponent;