import { createSlice } from "@reduxjs/toolkit";

const gptSlice=createSlice({
  name:"gpt",
  initialState:{
    showGptSearch:false,
    movieName:null,
    movieResult:null
  },
  reducers:{
    toggleGptSeacrhView:(state,action)=>{
       state.showGptSearch=!state.showGptSearch;
    },
    addGptMoviesResult:(state,action)=>{
      const{ movieName,movieResult}=action.payload
     state.movieName=movieName;
     state.movieResult=movieResult;
    }
  }
})
export const {toggleGptSeacrhView,addGptMoviesResult}=gptSlice.actions;
export default gptSlice.reducer;