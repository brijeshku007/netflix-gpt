
import { apiOption } from "../../utils/constants";
import { useEffect } from "react";
import { addTopRatedMovies } from "../../utils/movieSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const useTopRatedMovies=()=>{
  const dispatch=useDispatch();
  const TopRatedMovies=useSelector(store=>store.movies.TopRatedMovies);

  const getTopRatedMovies=async()=>{
    const data=await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?page=1" ,
      apiOption)
    const response=await data.json();
    console.log(response.results);
    dispatch(addTopRatedMovies(response.results));
  }
   useEffect(()=>{
    !TopRatedMovies && getTopRatedMovies();
   },[]);
}
export default useTopRatedMovies;