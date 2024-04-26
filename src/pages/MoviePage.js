import { useParams } from "react-router-dom";
import { useEffect, useState} from 'react';
import HeaderComponent from '../components/HeaderComponent';
import { Box, Typography } from '@mui/material/';
import axios from 'axios';

const MoviePage = () => {

    const { movie_title } = useParams();

    const [data, setData] = useState({ id: 0, title: null, description: null, image: null });

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
  
      useEffect(() => {
        getMovieData(movie_title);
      }, [movie_title]);


    return (
        <>
            <HeaderComponent />
            <Box sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 2,
                height: "60vh"
                }}>
                <img src={data.image} alt={data.title} style={{borderRadius: "5%"}}/>
                <Typography variant='h3'>{data.title}</Typography>
                <Typography variant='h1'>5</Typography>
            </Box>
                <Typography variant='h4'>{data.description}</Typography>
            <Box>

            </Box>
        </>
    );
};

export default MoviePage;