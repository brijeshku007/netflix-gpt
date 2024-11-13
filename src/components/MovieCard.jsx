import React from 'react'
import { imageCDNURL } from '../utils/constants'
import { useSelector } from 'react-redux';
import { addClickedMovies } from '../utils/movieSlice';
import { useDispatch } from 'react-redux';
const MovieCard = ({posterpath}) => {
  const dispatch = useDispatch();
  const movies=useSelector((store)=>store.movies?.nowPlayingMovies)
  if(!movies) return;
 
  if(!posterpath)return null;
  
  const handleclick=(e)=>{
    console.log(e)
    const movie = movies.find((movie) => movie.poster_path === posterpath);
    // console.log(movie)
    dispatch(addClickedMovies(movie));
  }
  return (
    <div className=' w-36 md:w-48 pr-4 cursor-pointer hover:opacity-35' onClick={handleclick}>
      <img src={imageCDNURL+posterpath}
       alt="imgage card" />
    </div>
  )
}

export default MovieCard
