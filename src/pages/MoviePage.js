import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';

import { Box, Typography } from '@mui/material/';
import axios from 'axios';

import HeaderComponent from '../components/HeaderComponent';
import RatingStarsComponent from "../components/RatingStarsComponent";
import TrailerPlayerComponent from "../components/TrailerPlayerComponent";

const MoviePage = () => {
    const { movie_title } = useParams();

    const [data, setData] = useState({ id: 0, title: null, description: null, image: null, trailer: null });
    const [averageRating, setAverageRating] = useState(null);

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

    useEffect(() => {
        getAverageRating(movie_title);
        getMovieData(movie_title);
    }, [movie_title]);


    return (
        <>
            <HeaderComponent />
            <Box sx={{
                padding: 2,
                height: "60vh",
                display: "flex",
                justifyContent: "center",
            }}>
                <Box sx={{ height: "100%", width: '30%' }}>
                    <img src={data.image} alt={data.title} style={{ borderRadius: "5%", height: "80%" }} />
                    <RatingStarsComponent averageRating={averageRating} />
                    <Typography variant='h3'>{data.title}</Typography>
                </Box>
                <Box sx={{
                    height: "100%",
                    width: '70%',
                    display: "flex",
                    justifyContent: "center"
                }}>
                    <TrailerPlayerComponent url={data.trailer} />
                </Box>
            </Box>
            <Box sx={{ backgroundColor: "#E5DDC5", height: "27vh" }}>
                <Typography variant='h4'>{data.description}</Typography>
            </Box>
        </>
    );
};

export default MoviePage;
