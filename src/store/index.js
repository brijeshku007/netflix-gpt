// Store exports
export { default as store } from "./appStore";
export { addUser, removeUser } from "./userSlice";
export {
  addNowPlayingMovies,
  addPopularMovies,
  addTopRatedMovies,
  addUpcomingMovies,
  addTrailerVideo,
} from "./movieSlice";
export { toggleGptSearchView } from "./gptSlice";
export {
  addToWatchlist,
  removeFromWatchlist,
  setWatchlistUser,
  clearWatchlistUser,
  loadUserWatchlist,
} from "./watchlistSlice";
