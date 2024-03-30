import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import MovieFilterIcon from '@mui/icons-material/MovieFilter';

const HeaderComponent = () => {
    return (
    <AppBar position="static" style={{backgroundColor: '#e0c931'}}>
        <Toolbar>
            <IconButton
                color="inherit"
                >
            <MovieFilterIcon />               
            </IconButton>

            <Typography variant="h6">
                Movie App
            </Typography>
            
        </Toolbar>
    </AppBar>
    );
};            

export default HeaderComponent;