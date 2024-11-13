import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContaioner = () => {
  const movies=useSelector(store=>store.movies)
  if(!movies.nowPlayingMovies) return;
  if(!movies.PopulerMovies) return;
  if(!movies.TopRatedMovies) return;
  if(!movies.UpcomingMovies) return;
  
 
  return (
    <div className=' bg-black md:bg-black'>
      <div className='-mt-30   md:-mt-80 z-10 relative'>
      <MovieList title={"Now Playing"}  movies={movies.nowPlayingMovies}></MovieList>
      <MovieList title={"Top Rated"}  movies={movies.TopRatedMovies}></MovieList>
      <MovieList title={"Poplur"}  movies={movies.PopulerMovies}></MovieList>
      <MovieList title={"Upcomming Movies"}  movies={movies.UpcomingMovies}></MovieList>
      {/* <MovieList title={"Horrer Movies"}  movies={movies.nowPlayingMovies}></MovieList> */}
      {/* movilist of [populer
      ] 
       movilist of now playing 
       movilist of trending
       movilist of horrrer
       */}
       </div>
    </div>
  )
}

export default SecondaryContaioner
