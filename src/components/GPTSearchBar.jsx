import React, { useRef } from 'react'
import lang from '../utils/languageConstant'
import { useDispatch, useSelector } from 'react-redux'
// import openAi from '../utils/openAi'
import model from '../utils/openAi'
import { apiOption } from '../utils/constants'
import { addGptMoviesResult } from '../utils/gptSlice'

const GPTSearchBar = () => {
  const dispatch=useDispatch()
  const langkey=useSelector(store=>store.config.lang)
  const searchText=useRef(null);
  // this will do a search in dmdb database
  const fetchMOviesTMDB=async(movie)=>{
    const data= await fetch("https://api.themoviedb.org/3/search/movie?query="+movie+"&include_adult=false&language=en-US&page=1", apiOption)
    const json= await data.json();
    return json.results;
  }
  const handlegptSearchClick= async()=>{
     console.log(searchText.current.value);
     //make an api call to gpt api and get movie result
     const gptQuery="Act as a Movie Recommendation system and suggest some movies for the query:"+searchText.current.value+" only give me name of 5 movies,comma seperated. like the example given ahed. example Result:Gadar,Sholay,Don,Golmaal,Koi mil Gaya";
    const result = await model.generateContent(gptQuery);
    // console.log(result.response.text());
    if(!result.response.text()){
      alert(lang[langkey].noResultFound);
    }
    const getMovies=result.response.text().split(",").slice(0, -1); //this will the array of 5 movies
    // console.log(getMovies)
    //for each movies i will search tmdb
    //tmdb api call

    const promiseArray=getMovies.map(movie=>fetchMOviesTMDB(movie));
    const tmdbResult= await Promise.all(promiseArray);
    console.log(tmdbResult)
    dispatch(addGptMoviesResult({movieName:getMovies,movieResult:tmdbResult}));

    
    
  }
  return (
    <div className='pt-[10%] flex justify-center'>
      <form className=' w-full md:w-1/2 bg-black grid grid-cols-12' onSubmit={(e)=>e.preventDefault()}>
        <input ref={searchText} type="text" placeholder={lang[langkey].gptSearchPlaceholder}
        className='p-4 m-4  col-span-9 ' />
        <button onClick={handlegptSearchClick}
        className='py-2 px-4 bg-red-700 text-white rounded-lg col-span-3 m-4'>{lang[langkey].search}</button>
      </form>
    </div>
  )
}

export default GPTSearchBar
