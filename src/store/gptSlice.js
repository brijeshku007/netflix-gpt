import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    movieName: null,
    movieResult: null,
    searchTerm: "",
  },
  reducers: {
    toggleGptSearchView: (state, action) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addGptMoviesResult: (state, action) => {
      const { movieName, movieResult, searchTerm } = action.payload;
      state.movieName = movieName;
      state.movieResult = movieResult;
      state.searchTerm = searchTerm || "";
    },
    clearGptMoviesResult: (state) => {
      state.movieName = null;
      state.movieResult = null;
      state.searchTerm = "";
    },
  },
});

export const { toggleGptSearchView, addGptMoviesResult, clearGptMoviesResult } =
  gptSlice.actions;
export default gptSlice.reducer;
