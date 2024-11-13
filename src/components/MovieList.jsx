import React, { useState } from 'react'
import MovieCard from './MovieCard'

const MovieList = ({title,movies}) => {
  // console.log(movies)
  // console.log(movies[0]?.poster_path)
  
  return (
    <div className='px-6'>
      <h1 className=' text-lg  md:text-2xl font-bold py-4 text-white'>{title?title:"Bhai aur details de de"}</h1>
    <div className='flex overflow-x-scroll  '>
      <div>
        </div>
        <div className='flex'>
          
        { movies.map((movie)=> movie)?movies.map((movie)=> (
          <MovieCard key={movie.id} posterpath={ movie.poster_path}/>
          )):<MovieCard key={1} posterpath={ "/g4CNrkOL6r374IxG3XpVgOlGe2E.jpg"}/>}
          
        </div>
      
    </div>
    </div>
  )
}

export default MovieList
