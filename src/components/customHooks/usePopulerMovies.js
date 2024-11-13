
import { apiOption } from "../../utils/constants";
import { useEffect } from "react";

import { addPopulerMovies } from "../../utils/movieSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const usePopulerMovies=()=>{
  const dispatch=useDispatch();
  const PopulerMovies=useSelector(store=>store.movies.PopulerMovies);

  const getPopulerMovies=async()=>{
    const data=await fetch(
      "https://api.themoviedb.org/3/movie/popular?page=1" ,
      apiOption)
    const response=await data.json();
    console.log(response.results);
    dispatch(addPopulerMovies(response.results));
  }
   useEffect(()=>{
    !PopulerMovies&& getPopulerMovies();
   },[]);
}
export default usePopulerMovies;