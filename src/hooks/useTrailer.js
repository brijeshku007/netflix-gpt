import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../constants";
import { addTrailerVideo } from "../store/movieSlice";

const useTrailer = (movieId) => {
  const dispatch = useDispatch();

  const TrailerVideo = useSelector((store) => store.movies.TrailerVideo);
  const getMovieVideo = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?language=en-US",
      API_OPTIONS
    );
    const response = await data.json();
    // console.log(response)
    const trailers = response.results.filter((x) => x.type === "Trailer");
    // console.log(trailers)
    const trailer = trailers.length ? trailers[0] : response.results[0];
    // console.log(trailer)
    dispatch(addTrailerVideo(trailer));
  };
  useEffect(() => {
    !TrailerVideo && getMovieVideo();
  }, []);
};
export default useTrailer;
