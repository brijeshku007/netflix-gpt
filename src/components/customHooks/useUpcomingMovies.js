
import { apiOption } from "../../utils/constants";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { addUpcomingMovies } from "../../utils/movieSlice";
import { useDispatch } from "react-redux";
const useUpcomingMovies=()=>{
  const dispatch=useDispatch();
  const UpcomingMovies=useSelector(store=>store.movies.UpcomingMovies);
  const getUpcomingMovies=async()=>{
    const data=await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?page=1" ,
      apiOption)
    const response=await data.json();
    console.log(response.results);
    dispatch(addUpcomingMovies(response.results));
  }
   useEffect(()=>{
    !UpcomingMovies && getUpcomingMovies();
   },[]);
}
export default useUpcomingMovies;