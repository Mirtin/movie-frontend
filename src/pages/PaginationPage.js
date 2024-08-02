import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

import { Card, CardMedia, CardContent, CardActionArea, Box, Typography, Pagination } from '@mui/material/';

import axios from 'axios';

import HeaderComponent from '../components/HeaderComponent';




const PaginationPage = () => {
  const { page_number } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const PAGE_SIZE = 10


  const handlePaginationClick = (event, value) => {
    navigate(`/movies/page/${value}`)
  }


  const getMovieData = (page_number) => {
    axios.get(`http://127.0.0.1:8000/api/movie_list/?page=${page_number}&page_size=${PAGE_SIZE}`)
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
        {data ? (
          <>
            <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              alignItems: 'center',
              padding: "15px",
              gap: "15px"
              }}>
              {data.results.map(movie => (
                  <Card key={movie.id}>
                    <CardActionArea href={`/movie/${movie.title}`}>
                      <CardMedia
                        sx={{height: '50vh'}}
                        component='img'
                        image={movie.image}
                      />
                      <CardContent>
                        <Typography variant='h5' sx={{whiteSpace: 'nowrap'}}>{movie.title}</Typography>
                      </CardContent>
                    </CardActionArea> 
                  </Card>
                ))}
            </Box>
            <Box sx={{display: 'felex', width: '100%', height: '15vh', justifyContent: 'center', alignItems: 'center'}}>
              <Pagination count={Math.ceil(data.count/PAGE_SIZE)} onChange={handlePaginationClick} size="large" />
            </Box>
          </>
        ) : (<Typography fontSize={20}>Loading...</Typography>)}
    </>
  );
};

export default PaginationPage;
