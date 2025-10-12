import React from "react";
import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  // Background videos are independent of user clicks

  if (!movies) return;
  const mainMovie = movies[Math.floor(Math.random() * movies.length)];
  // index i = Math.floor(Math.random() * movies.length);

  // Always use random movie for background, ignore clicked movie
  const { original_title, overview, id } = mainMovie;
  // console.log(mainMovie);

  return (
    <div className="relative -mt-20 md:pt-0 pt-10">
      <VideoTitle title={original_title} overview={overview}></VideoTitle>
      <VideoBackground movieId={id}></VideoBackground>
    </div>
  );
};

export default MainContainer;
