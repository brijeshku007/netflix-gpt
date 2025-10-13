import { useSelector } from "react-redux";
import { Header } from "../components/layout";
import {
  useNowPlayingMovies,
  usePopularMovies,
  useTopRatedMovies,
  useUpcomingMovies,
} from "../hooks";
import { MainContainer, SecondaryContainer } from "../features/movies";
import { GptSearch } from "../features/search";

const Browse = () => {
  //fetching the dat from tmdb api and sending into the strore
  // we create a hook
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  return (
    <div>
      <Header></Header>

      {showGptSearch ? (
        <GptSearch></GptSearch>
      ) : (
        <>
          <MainContainer></MainContainer>
          <SecondaryContainer></SecondaryContainer>
        </>
      )}

      {/* 
          maincontainer
           -- videobackground
           -- videotitle
          movielist Container
            -- movieslist*n 
          --card*n 
       */}
    </div>
  );
};

export default Browse;
