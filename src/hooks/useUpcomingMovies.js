import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../constants";
import { addUpcomingMovies } from "../store/movieSlice";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const upcomingMovies = useSelector((store) => store.movies.upcomingMovies);

  const getUpcomingMovies = useCallback(async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?page=1",
        API_OPTIONS
      );
      const response = await data.json();
      dispatch(addUpcomingMovies(response.results));
    } catch (error) {
      console.error("Error fetching upcoming movies:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    if (!upcomingMovies) {
      getUpcomingMovies();
    }
  }, [upcomingMovies, getUpcomingMovies]);
};

export default useUpcomingMovies;
