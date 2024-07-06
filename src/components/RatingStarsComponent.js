import { useEffect, useState } from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

import axios from 'axios';
import Cookies from 'universal-cookie';


const labels = {
  0.5: 'Bad',
  1: 'Bad+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};


function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}


function roundToNearestHalf(value) {
  return Math.round(value * 2) / 2;
}


const rateMovie = (movie_title, rating) => {
  const cookies = new Cookies();

  axios.post(`http://127.0.0.1:8000/api/rate_movie/${movie_title}/`,
    {rating: rating},
    {headers: {"Authorization": `Bearer ${cookies.get('access')}`}},
    ).then(res => {
          const responseData = res.data;
      })
      .catch(error => {
          console.error('Error fetching movie data:', error);
      });
};


const RatingStarsComponent = ({averageRating, movie_title}) => {
  const [value, setValue] = useState(averageRating);
  const [hover, setHover] = useState(-1);

  useEffect(() => {
    setValue(roundToNearestHalf(averageRating));
    
  }, [averageRating]);



  return (
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          rateMovie(movie_title, roundToNearestHalf(newValue));
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
  );
}

export default RatingStarsComponent;