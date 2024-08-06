import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from 'react';

import { Box, IconButton, Typography } from '@mui/material/';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import axios from '../axiosInstance';
import Cookies from "universal-cookie";

import HeaderComponent from '../components/HeaderComponent';
import RatingStarsComponent from "../components/RatingStarsComponent";
import TrailerPlayerComponent from "../components/TrailerPlayerComponent";


const MoviePage = () => {
    const { movie_title } = useParams();
    const navigate = useNavigate();
    const cookies = useMemo(() => new Cookies(), []);
    const [data, setData] = useState(null);
    const [averageRating, setAverageRating] = useState(null);
    const [isSaved, setIsSaved] = useState(false);


    const checkIsSaved = (movie_title) => {
        axios.get(`http://localhost:8000/api/is_saved/${movie_title}`)
        .then(res => {
            const responseData = res.data;
            console.log(responseData);
            setIsSaved(responseData.IsSaved)
        })
    }


    const handleAddToSaved = () => {
        axios.post(`http://localhost:8000/api/add_to_saved/${data.title}`)
        .then(res => {
            const responseData = res.data;
            console.log(responseData)
        })
        .catch(error => {
            console.error(error)
        })
    }


    const handleRemoveFromSaved = () => {
        axios.post(`http://localhost:8000/api/remove_from_saved/${data.title}`)
        .then(res => {
            const responseData = res.data;
            console.log(responseData)
        })
        .catch(error => {
            console.error(error)
        })
    }


    const handleBookMarkClick = () => {
        if (cookies.get('access')){
          if (isSaved === true){
            handleRemoveFromSaved();
            setIsSaved(false);
        }else{
            handleAddToSaved();
            setIsSaved(true);
        };
        console.log(isSaved)  
        }else{
            navigate('/accounts/login');
        };
    };

    const getMovieData = (movie_title) => {
        axios.get(`http://127.0.0.1:8000/api/movie/${movie_title}`)
            .then(res => {
                const responseData = res.data;
                setData(responseData);
            })
            .catch(error => {
                console.error('Error fetching movie data:', error);
            });
    };

    const getAverageRating = (movie_title) => {
        axios.get(`http://127.0.0.1:8000/api/average_rating/${movie_title}`)
            .then(res => {
                const res_rating = res.data.average_rating;
                setAverageRating(res_rating);
            })
            .catch(error => {
                console.error('Error fetching rating data:', error);
            });
    };

    const rateMovie = (rating) => {
        if (cookies.get('access')) {
            axios.post(`http://127.0.0.1:8000/api/rate_movie/${movie_title}/`,
            {rating: rating}
            ).then(res => {
                    const responseData = res.data;
                    // console.log(responseData);
                })
                .catch(error => {
                    console.error('Error fetching movie data:', error);
                });
        }else{
            navigate('/accounts/login');
        };
    };    

    useEffect(() => {
        getAverageRating(movie_title);
        getMovieData(movie_title);
        if (cookies.get('access')){
            checkIsSaved(movie_title);
        }
    }, [cookies, navigate, movie_title]);


    return (

        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <HeaderComponent />
            {data ? (
                <>
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ height: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
                            <Box sx={{ width: '30%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <img src={data.image} alt={data.title} style={{ borderRadius: '5%', width: '50%' }} />
                                <Box sx={{display: 'flex'}}>
                                    {isSaved ? (
                                        <IconButton onClick={handleBookMarkClick}>
                                                <BookmarkIcon />
                                        </IconButton>
                                    ) : (
                                        <IconButton onClick={handleBookMarkClick}>
                                            <BookmarkBorderIcon />
                                        </IconButton>

                                        )
                                    }
                                    <RatingStarsComponent averageRating={averageRating} func={rateMovie} />
                                </Box>    
                                <Typography variant='h3' sx={{ textAlign: 'center', fontSize: `${600 / data.title.length}px`}}>{data.title}</Typography>
                            </Box>
                            <Box sx={{ width: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <TrailerPlayerComponent url={data.trailer} />
                            </Box>
                        </Box>


                        <Box sx={{backgroundColor: '#E5DDC5',
                                minHeight: '27vh', 
                                display: 'flex', 
                                justifyContent: 'center', 
                                alignItems: 'center', 
                                padding: 2,
                                position: 'relative',

                                '&::before' : {
                                    content: '""',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    height: '10px', 
                                    background: 'linear-gradient(to bottom, #F1EEDC, transparent)',
                                }}}>
                            <Typography variant='h4' sx={{ textAlign: 'center', maxWidth: '80%' }}>{data.description}</Typography>
                        </Box>
                    </Box>
                </>
                ) : (<Typography fontSize={20}>Loading...</Typography>)}
        </Box>
    );
};

export default MoviePage;
