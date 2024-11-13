import React from 'react'
import GPTSearchBar from './GPTSearchBar'
import GPTSuggetion from './GPTSuggetion'
import {backGroundUrl} from "../utils/constants"

const GptSearch = () => {
  return (
    <div>
      {/* 
      two thing in it
      1.gptSearchBar
      2.Gptsuggtion
      */}
      <div className='fixed -z-10'>
      <img className='-my-40 h-screen object-cover md:w-screen md:h-full' src={backGroundUrl} alt="bodyImage" />
      </div>
      <GPTSearchBar></GPTSearchBar>
      <GPTSuggetion></GPTSuggetion>
    </div>
  )
}

export default GptSearch
