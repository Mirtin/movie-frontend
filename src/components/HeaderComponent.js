import { AppBar, Toolbar, Typography, IconButton, TextField, InputAdornment, Box } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import AvatarComponent from "./AvatarComponent";
import Cookies from "universal-cookie";

const HeaderComponent = ({SearchBar}) => {
    const cookies = new Cookies();

    return (
    <AppBar position="static" style={{backgroundColor: '#B3C8CF'}}>
        <Toolbar>
            <Box sx={{width: '15%'}}>          
                    <Typography variant="h5">
                        Movie App
                    </Typography>
            </Box>
            {SearchBar && (                      
                <Box sx={{ backgroundColor: '#BED7DC', height: '5vh'}}>
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
                </Box>)}
            <Box sx={{position: 'absolute', right: '3%'}}>
                <AvatarComponent IsAuthenticated={(cookies.get("access") != undefined)} />
            </Box>

        </Toolbar>
    </AppBar>
    );
};            

export default HeaderComponent;