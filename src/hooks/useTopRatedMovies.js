import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../constants";
import { addTopRatedMovies } from "../store/movieSlice";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  const topRatedMovies = useSelector((store) => store.movies.topRatedMovies);

  const getTopRatedMovies = useCallback(async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?page=1",
        API_OPTIONS
      );
      const response = await data.json();
      dispatch(addTopRatedMovies(response.results));
    } catch (error) {
      console.error("Error fetching top rated movies:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    if (!topRatedMovies) {
      getTopRatedMovies();
    }
  }, [topRatedMovies, getTopRatedMovies]);
};

export default useTopRatedMovies;
