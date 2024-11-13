
import {  useSelector } from 'react-redux'
import useTrailer from './customHooks/useTrailer';


const VideoBackground = ({movieId}) => {

  //fetch trailer
  useTrailer(movieId);
  const trailerVideo=useSelector(store=>store.movies?.trailerVideo)
 
  
  
  return (
    <div className='w-screen aspect-video'>
      <iframe
      className='w-screen aspect-video'
      src={"https://www.youtube.com/embed/"+trailerVideo?.key+"?&autoplay=1&mute=1"} 
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share">   
      </iframe>
    </div>
  )
}

export default VideoBackground
