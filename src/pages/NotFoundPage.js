import { Box, Typography, IconButton} from "@mui/material";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

const NotFoundPage = () => {
    return (
        <Box sx={{
            display: "flex", 
            flexDirection: "column", 
            justifyContent: "center",
            alignItems: "center", 
            width: "100%", 
            height: "100vh"
        }}>
            <Box sx={{
                display: "flex", 
                justifyContent: "space-evenly", 
                width: '100%'
            }}>
                <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", width: "400px", height: "20vh"}}>
                    <Typography variant="h1">404</Typography>
                    <Typography variant="h4">oops... Page Not Found</Typography>
                </Box>
                
                <Box sx={{display: "flex", flexDirection: "column", alignItems:"center", height: "200px", rotate: '-30deg', marginBottom: "100px"}}>
                    <Typography variant="h3">We Broke Something</Typography>
                    <Typography variant="h3">or</Typography>
                    <Typography variant="h3"> You Can't Type</Typography>
                </Box>
            </Box>

            <Box sx={{position: "absolute", bottom: "100px", cursor: "pointer"}} onClick={() => { window.location.replace('/')}}>
                <Typography variant="h5">Return To Website</Typography>       
            </Box>
            
        </Box>
    );
};

export default NotFoundPage;