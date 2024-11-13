
 import { addTrailerVideo } from "../../utils/movieSlice";
 import { useDispatch } from "react-redux";
 import { apiOption } from "../../utils/constants";
 import { useEffect } from "react";
 import { useSelector } from "react-redux";
 
 
const useTrailer=(movieId)=>{
  const dispatch=useDispatch();
  
  const TrailerVideo=useSelector(store=>store.movies.TrailerVideo);
  const getMovieVideo=async()=>{
    const data=await fetch("https://api.themoviedb.org/3/movie/"+movieId+"/videos?language=en-US",apiOption)
    const response= await data.json();
    // console.log(response)
    const trailers=response.results.filter((x)=>x.type==="Trailer");
    // console.log(trailers)
    const trailer= trailers.length? trailers[0]:response.results[0];
    // console.log(trailer)
    dispatch(addTrailerVideo(trailer))
   
  }
  useEffect(()=>{
    !TrailerVideo&& getMovieVideo();
  },[])

}
export default useTrailer;