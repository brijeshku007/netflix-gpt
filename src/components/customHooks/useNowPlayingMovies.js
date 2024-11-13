
import { apiOption } from "../../utils/constants";
import { useEffect } from "react";
import { addNowPlayingMovies } from "../../utils/movieSlice";
import { useDispatch, useSelector } from "react-redux";
const useNowPlayingMovies=()=>{
  const dispatch=useDispatch();

  const nowPlayingMovies=useSelector(store=>store.movies.nowPlayingMovies);

  const getNowPlaylingMovies=async()=>{
    const data=await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1',apiOption)
    const response=await data.json();
    console.log(response.results);
    dispatch(addNowPlayingMovies(response.results));
  }
   useEffect(()=>{
    !nowPlayingMovies && getNowPlaylingMovies();
   },[]);
}
export default useNowPlayingMovies;