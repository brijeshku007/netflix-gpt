import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList';

const GPTSuggetion = () => {
  const {movieResult,movieName}=useSelector(store=>store.gpt);
  if(!movieName ) return null;
  if(!movieResult) return null;

  
  return (
    <div className='p-4 m-4 bg-black text-white opacity-90'>
      <div>
        {movieName.map((movie,index)=><MovieList
         key={movie} 
         title={movie}
          movies ={ movieResult[index]?movieResult[index]:""}>

          </MovieList>)}
        
      </div>
      
    </div>
  )
}

export default GPTSuggetion
