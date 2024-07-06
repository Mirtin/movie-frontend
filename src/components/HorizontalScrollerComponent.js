import React, { useState, useRef } from 'react';
import { Box, Button, Card, CardMedia, CardContent, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const HorizontalScrollerComponent = () => {
  const scrollerRef = useRef(null);
  const [scrollAmount, setScrollAmount] = useState(0);

  const scrollLeft = () => {
    const newScrollAmount = Math.max(scrollAmount - 500, 0);
    setScrollAmount(newScrollAmount);
    scrollerRef.current.scrollTo({ left: newScrollAmount, behavior: 'smooth' });
  };

  const scrollRight = () => {
    const scroller = scrollerRef.current;
    const maxScroll = scroller.scrollWidth - scroller.clientWidth;
    const newScrollAmount = Math.min(scrollAmount + 500, maxScroll);
    setScrollAmount(newScrollAmount);
    scroller.scrollTo({ left: newScrollAmount, behavior: 'smooth' });
  };

  return (
    <Box display="flex" alignItems="center" sx={{width: "100%", height: "100%",backgroundColor: '#E5DDC5'}}>
      <Button variant="contained" onClick={scrollLeft} sx={{ height: "100%", backgroundColor: '#B3C8CF'}}><ArrowBackIosIcon /></Button>
      <Box ref={scrollerRef} overflow="hidden" sx={{height: "100%"}}  mx={2} >
        <Box display="flex" sx={{height: "100%"}}>
          {Array.from({ length: 20 }, (_, index) => (
            <Card mx={0.5} sx={{height: "100%", minWidth: "30%"}}>
               <CardMedia
                  sx={{height: "80%"}}
                  component='img'
                  image={'https://t2.gstatic.com/licensed-image?q=tbn:ANd9GcSbqp7csGgz5CIfQm5MGhXXXTzn4E1pQaj-xz7vd2plu1NbIZlrPpSUwQpUyO60W0s3'}
                />
                <CardContent>
                  <Typography variant='h5'>{index + 1}</Typography>
                </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
      <Button variant="contained" onClick={scrollRight} sx={{ height: "100%", backgroundColor: '#B3C8CF'}}><ArrowForwardIosIcon /></Button>
    </Box>
  );
};

export default HorizontalScrollerComponent;
