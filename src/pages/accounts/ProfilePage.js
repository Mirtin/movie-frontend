import HeaderComponent from '../../components/HeaderComponent';
import { Box } from '@mui/material';

const ProfilePage = () => {
    return (
        <>
            <HeaderComponent />
            <Box sx={{ display: 'flex', height: '91.9vh'}}>
                <Box sx={{ backgroundColor: 'red', width: '50%', height: '100%'}}>
                </Box>
                <Box sx={{ backgroundColor: 'blue', width: '50%', height: '100'}}>
                </Box>
            </Box>
        </>
    );
};

export default ProfilePage;
