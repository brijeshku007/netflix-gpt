import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    movieName: null,
    movieResult: null,
  },
  reducers: {
    toggleGptSearchView: (state, action) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addGptMoviesResult: (state, action) => {
      const { movieName, movieResult } = action.payload;
      state.movieName = movieName;
      state.movieResult = movieResult;
    },
    clearGptMoviesResult: (state) => {
      state.movieName = null;
      state.movieResult = null;
    },
  },
});

export const { toggleGptSearchView, addGptMoviesResult, clearGptMoviesResult } =
  gptSlice.actions;
export default gptSlice.reducer;
