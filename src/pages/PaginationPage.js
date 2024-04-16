import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

import { Card, CardMedia, CardContent, CardActionArea, Box, Typography } from '@mui/material/';

import axios from 'axios';

import HeaderComponent from '../components/HeaderComponent';




const PaginationPage = () => {
    const { page_number } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({ count: 0, next: null, previous: null, results: [] });

    const getMovieData = (page_number) => {
      axios.get(`http://127.0.0.1:8000/api/movie_list/?page=${page_number}&page_size=2`)
        .then(res => {
          const responseData = res.data;
          setData(responseData);
        })
        .catch(error => {
          console.error('Error fetching movie data:', error);
        });
    };

    useEffect(() => {
      if (!/^\d+$/.test(page_number)) {
        return navigate('/');
      }
      getMovieData(page_number);
    }, [navigate, page_number]);
  
    return (
        <>
            <HeaderComponent />
            <Box sx={{ display: 'flex'}}>
              {data.results.map(movie => (
                  <Card key={movie.id} sx={{ maxWidth: 345, margin: '1%', width: '20%' }}>
                    <CardActionArea href={`/movie/${movie.title}`}>
                      <CardMedia
                        sx={{height: '50vh'}}
                        component='img'
                        image={movie.image}
                      />
                      <CardContent>
                        <Typography variant='h5'>{movie.title}</Typography>
                      </CardContent>
                    </CardActionArea> 
                  </Card>
                ))}
              <Typography>{data.count}</Typography>
            </Box>
        </>
    );
};

export default PaginationPage;
