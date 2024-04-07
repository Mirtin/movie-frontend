import { AppBar, Toolbar, Typography, IconButton, TextField, InputAdornment, Box } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
// #c4a61e
const HeaderComponent = () => {
    return (
    <AppBar position="static" style={{backgroundColor: '#e0c931'}}>
        <Toolbar>
            <Box sx={{width: '15%', display: 'flex'}}>          
                    <Typography variant="h5">
                        
                        Movie App
                    </Typography>
            </Box>
            <Box sx={{ backgroundColor: '#c4a61e', height: '5vh'}}>
                <TextField
                    variant="outlined"
                    placeholder="Search"
                    size="small"
                    InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                        <IconButton>
                            <SearchIcon />
                        </IconButton>
                        </InputAdornment>
                    ),
                    }}
                />
            </Box>    
        </Toolbar>
    </AppBar>
    );
};            

export default HeaderComponent;