import React from 'react'
import { useSelector } from 'react-redux'
import VideoTitle from './VideoTitle'
import VideoBackground from './VideoBackground'

const MainContainer = () => {

  const movies=useSelector((store)=>store.movies?.nowPlayingMovies)
  const clickeMovie=useSelector((store)=>store.movies?.clickedMovie)
  // const{original_title,overview,id }=clickeMovie
  console.log(clickeMovie);

  if(!movies) return;
  const mainMovie=movies[Math.floor(Math.random() * movies.length)];
  // index i = Math.floor(Math.random() * movies.length);

  const{original_title,overview,id }=!clickeMovie?mainMovie:clickeMovie
  // console.log(mainMovie);

  return (
    <div className='relative -mt-20 md:pt-0 pt-10'>
      <VideoTitle title={original_title} overview={overview}></VideoTitle>
      <VideoBackground movieId={id}></VideoBackground>
    </div>
  )
}

export default MainContainer
