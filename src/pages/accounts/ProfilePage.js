import { useEffect, useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Typography } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import StarIcon from '@mui/icons-material/Star';


import axios from "../../axiosInstance";

import getCurrentUser from "../../functions/getCurrentUser"

import HeaderComponent from '../../components/HeaderComponent';
import HorizontalScrollerComponent from '../../components/HorizontalScrollerComponent';
import IconButtonComponent from '../../components/IconButtonComponent';

import Cookies from 'universal-cookie';


const ProfilePage = () => {
    const cookies = useMemo(() => new Cookies(), []);
    const navigate = useNavigate();
    const [ratedMovie, setRatedMovie] = useState();
    const [savedMovie, setSavedMovie] = useState();
    const [userData, setUserData] = useState(null);
    const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('file', file);
        
        axios.put('http://127.0.0.1:8000/accounts/user/change_avatar/', formData)
        .then(res => {
            console.log('File uploaded successfully', res.data);
            window.location.reload();
        })
        .catch(error =>{
            console.error(error);
        })

    };
  };

    useEffect(() => {
        const fetchRatedMovie = () => {
            axios.get('http://127.0.0.1:8000/api/rated_movie/')
            .then(res => {
                setRatedMovie(res.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        };


        const fetchSavedMovie = () => {
            axios.get('http://127.0.0.1:8000/api/saved_movie/')
            .then(res => {
                setSavedMovie(res.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        };


        if (!cookies.get('access')) {
            navigate('/');
        } else {
            fetchRatedMovie();
            fetchSavedMovie();
            getCurrentUser().then(userData => {
                setUserData(userData);
            });

        }
    }, []);
    return (
        <>
        {userData ? (
            <>
            <HeaderComponent />
            <Box sx={{ display: 'flex', height: '91.9vh' }}>
                <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '40%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 5,
                }}
                >
                <Box
                    sx={{
                    display: 'flex',
                    width: '90%',
                    height: '40%',
                    backgroundColor: '#B3C8CF',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    borderRadius: '5%',
                    }}
                >
                    <IconButtonComponent
                    size={'100px'}
                    image={userData.profile.avatar}
                    onClick={handleButtonClick}
                    />
                    <input
                    type="file"
                    accept="image/png, image/gif, image/jpeg"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                    />
                    <Box>
                    <Typography fontSize={35}>{userData.username}</Typography>
                    <Typography fontSize={20}>{userData.email}</Typography>
                    </Box>
                </Box>

                <Box
                    sx={{
                    width: '90%',
                    height: '40%',
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    }}
                >
                    <IconButtonComponent size={'150px'} />
                    <IconButtonComponent size={'150px'} />
                    <IconButtonComponent size={'150px'} />
                </Box>
                </Box>

                <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '60%',
                    height: '100%',
                }}
                >
                <Box sx={{ display: 'flex', flexDirection: 'column', height: '48%', margin: 1 }}>
                    <Box sx={{ display: 'flex' }}>
                    <StarIcon />
                    <Typography>Your Rated Movies</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', height: '90%' }}>
                    <HorizontalScrollerComponent data={ratedMovie} />
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', height: '48%', margin: 1 }}>
                    <Box sx={{ display: 'flex' }}>
                    <BookmarkIcon />
                    <Typography>Your Saved Movies</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', height: '90%' }}>
                    <HorizontalScrollerComponent data={savedMovie} />
                    </Box>
                </Box>
                </Box>
            </Box>
            </>
        ) : (<Typography fontSize={20}>Loading...</Typography>)}
        </>
    );
};   
export default ProfilePage;
