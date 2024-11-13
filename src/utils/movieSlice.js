import { createSlice } from "@reduxjs/toolkit";

const movieSlice=createSlice({
  name:"movies",
  initialState:{
    nowPlayingMovies:null,
    PopulerMovies:null,
    TopRatedMovies:null,
    UpcomingMovies:null,
    trailerVideo:null,
    clickedMovie:null
  },
  reducers:{
    addNowPlayingMovies:(state,action)=>{
      state.nowPlayingMovies=action.payload;
    },
    addPopulerMovies:(state,action)=>{
      state.PopulerMovies=action.payload;
    },
    addTopRatedMovies:(state,action)=>{
      state.TopRatedMovies=action.payload;
    },
    addUpcomingMovies:(state,action)=>{
      state.UpcomingMovies=action.payload;
    },
    addTrailerVideo:(state,action)=>{
      state.trailerVideo=action.payload;
    },
    addClickedMovies:(state,action)=>{
      state.clickedMovie=action.payload;
    }
  }
})
export const {addNowPlayingMovies,addTrailerVideo,addPopulerMovies,addTopRatedMovies,addUpcomingMovies,addClickedMovies}=movieSlice.actions;
export default movieSlice.reducer;