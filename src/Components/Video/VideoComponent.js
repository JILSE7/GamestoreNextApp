import React from 'react';
import ReactPlayer from 'react-player/lazy'

const VideoComponent = ({videoUrl}) => {

    
  return (
      <div className="game_video">
          <ReactPlayer width='100%' height='100%'  url={videoUrl} controls={true}/>
      </div>
  )
}

export default VideoComponent