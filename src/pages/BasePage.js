import { Box, Card, CardMedia, CardActionArea } from "@mui/material";

import HeaderComponent from '../components/HeaderComponent';


const BasePage = () => {

    return (
        <Box sx={{ flexGrow: 1, height: '90vh' }}>
            <HeaderComponent />
            <Box sx={{ height: '90vh'}}
                display="flex"
                justifyContent="center"
                alignItems="center"
                 >
                
                <Card sx={{width: '40%' }}>
                    <CardActionArea href="movies/page/1">
                        <CardMedia
                            component={'img'}
                        
                            image='static/image/base_page.jpg'
                            />
                    </CardActionArea>    
                </Card>

            </Box>
        </Box>
    );
};

export default BasePage;
