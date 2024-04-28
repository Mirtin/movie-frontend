import React from 'react';
import ReactPlayer from 'react-player';

const TrailerPlayerComponent = ({url}) => {
  return (
    <ReactPlayer
        url={url}
        width="80%"
        height="auto"
        controls
        
    
    />
  );
}

export default TrailerPlayerComponent;