import React, { useEffect } from 'react'
import Header from './Header';
import useNowPlayingMovies from './customHooks/useNowPlayingMovies';
import MainContainer from"./MainContainer";

import SecondaryContaioner from './SecondaryContaioner';
import usePopulerMovies from './customHooks/usePopulerMovies';
import useTopRatedMovies from './customHooks/useTopRatedMovies';
import useUpcomingMovies from './customHooks/useUpcomingMovies';
import GptSearch from './GptSearch';
import { useSelector } from 'react-redux';
const Browse = () => {
  //fetching the dat from tmdb api and sending into the strore
  // we create a hook
  const showGptSearch=useSelector(store=>store.gpt.showGptSearch);
useNowPlayingMovies();
usePopulerMovies();
useTopRatedMovies();
useUpcomingMovies();

  return (
    <div>
      <Header></Header>
      {showGptSearch?(
      <GptSearch></GptSearch>):( <>
      <MainContainer></MainContainer>
      <SecondaryContaioner></SecondaryContaioner>
      </>)} 
   
  

      {/* 
          maincontainer
           -- videobackground
           -- videotitle
          movielist Container
            -- movieslist*n 
          --card*n 
       */}
      
    </div>
  )
}

export default Browse;
