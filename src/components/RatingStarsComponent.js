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



const RatingStarsComponent = ({averageRating, func}) => {
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
          func(roundToNearestHalf(newValue));
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