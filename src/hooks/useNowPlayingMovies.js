import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../constants";
import { addNowPlayingMovies } from "../store/movieSlice";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies
  );

  const getNowPlayingMovies = useCallback(async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?page=1",
        API_OPTIONS
      );
      const response = await data.json();
      dispatch(addNowPlayingMovies(response.results));
    } catch (error) {
      console.error("Error fetching now playing movies:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    if (!nowPlayingMovies) {
      getNowPlayingMovies();
    }
  }, [nowPlayingMovies, getNowPlayingMovies]);
};

export default useNowPlayingMovies;
