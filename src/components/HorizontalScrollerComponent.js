import React, { useState, useRef } from 'react';
import { Box, Button, Card, CardMedia, CardContent, CardActionArea, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const HorizontalScrollerComponent = ({data = null}) => {
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
    <Box display="flex" alignItems="center" sx={{width: "100%", maxHeight: "100%",backgroundColor: '#E5DDC5'}}>
      <Button variant="contained" onClick={scrollLeft} sx={{ height: "100%", backgroundColor: '#B3C8CF'}}><ArrowBackIosIcon /></Button>
      <Box ref={scrollerRef} overflow="hidden" sx={{height: "100%", width: "90%", minWidth: "200px"}}  mx={2} >
        <Box display="flex" sx={{height: "100%", gap: 0.5, alignItems: "center"}}>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((item, index) => (
              <Card key={index} mx={0.5} sx={{height: "100%", minWidth: "200px"}}>
                <CardActionArea sx={{height: "100%", minWidth: "100%"}}  href={`/movie/${item.movie.title}`}>
                  <CardMedia
                      sx={{height: "80%"}}
                      component='img'
                      image={item.movie.image}
                    />
                    <CardContent>
                      <Typography variant='h6' sx={{whiteSpace: 'nowrap'}}>{item.movie.title}</Typography>
                    </CardContent>
                </CardActionArea>
              </Card>
          ))) : (
            <Typography variant='h1'> Empty</Typography>
          )
        } 
        </Box>
      </Box>
      <Button variant="contained" onClick={scrollRight} sx={{ height: "100%", backgroundColor: '#B3C8CF'}}><ArrowForwardIosIcon /></Button>
    </Box>
  );
};

export default HorizontalScrollerComponent;
