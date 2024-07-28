import React from 'react';
import ReactPlayer from 'react-player';

const TrailerPlayerComponent = ({url}) => {
  return (
    <ReactPlayer
        url={url}
        width="80%"
        height="auto"
        loop
        volume={0.5}
        controls
        
    
    />
  );
}

export default TrailerPlayerComponent;