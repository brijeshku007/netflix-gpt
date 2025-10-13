import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../constants";
import { addPopularMovies } from "../store/movieSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const popularMovies = useSelector((store) => store.movies.popularMovies);

  const getPopularMovies = useCallback(async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/popular?page=1",
        API_OPTIONS
      );
      const response = await data.json();
      dispatch(addPopularMovies(response.results));
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    if (!popularMovies) {
      getPopularMovies();
    }
  }, [popularMovies, getPopularMovies]);
};

export default usePopularMovies;
