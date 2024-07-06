import HeaderComponent from '../../components/HeaderComponent';
import { Box, Typography, Avatar } from '@mui/material';
import HorizontalScrollerComponent from '../../components/HorizontalScrollerComponent';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButtonComponent from '../../components/IconButtonComponent';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';


const ProfilePage = () => {
    const cookies = new Cookies();
    const navigate = useNavigate();

    useEffect(() => {
        if (!cookies.get('access')){
            return(navigate('/'));
        }
    });

    return (
        <>
            <HeaderComponent />
            <Box sx={{ display: 'flex', height: '91.9vh' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '40%', height: '100%', justifyContent: 'center', alignItems: 'center', gap: 5 }}>
                    <Box sx={{display: 'flex', width: '90%', height: '40%', backgroundColor: '#B3C8CF', alignItems: 'center', justifyContent: 'space-evenly', borderRadius: '5%'}}>
                        <IconButtonComponent size={'20%'} />
                        <Box>
                            <Typography fontSize={35}>{cookies.get('username')}</Typography>
                            <Typography fontSize={20}>{cookies.get('email')}</Typography>
                        </Box>    
                    </Box>

                    <Box sx={{width: '90%', height: '40%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'}}>
                        <IconButtonComponent size={'25%'} />
                        <IconButtonComponent size={'25%'} />
                        <IconButtonComponent size={'25%'} />
                    </Box>

                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', width: '60%', height: '100%', justifyContent: 'space-between'}}>
                    <Box sx={{ display: "flex", flexDirection: "column", height: "50%", margin: 1 }}>
                        <Typography variant="h6" sx={{ marginBottom: 1 }}>
                            Liked Movies
                        </Typography>
                        <HorizontalScrollerComponent />
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", height: "50%", margin: 1 }}>
                        <Typography variant="h6" sx={{ marginBottom: 1 }}>
                            Saved Movies
                        </Typography>
                        <HorizontalScrollerComponent />
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default ProfilePage;
