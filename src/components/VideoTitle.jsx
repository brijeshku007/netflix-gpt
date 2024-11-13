import React from 'react'

const VideoTitle = ({title,overview}) => {
  return (
    <div className=' w-screen aspect-video  pt-[12%] px-4 md:px-24 absolute text-white bg-gradient-to-r from-black'>
      <h1 className='md:text-6xl font-bold text-2xl'>{title}</h1>
      <p className='py-6 text-sm md:text-lg md:w-1/2 w-full hidden md:inline-block'>{overview}</p>
      <div className='mt-16 md:-mt-0'>
        <button className='bg-gray-500  md:text-black md:bg-white p-4 md:px-12 px-4 text-sm md:text-xl  rounded-lg  py-2 md:py-4 hover:bg-opacity-50'>▶️Play</button>
        <button className='bg-gray-500 text-white p-4  px-3 md:px-12 mx-2 md:text-xl text-sm rounded-lg py-2 md:py-4 '> ℹ️ MoreInfo...</button>
      </div>
    </div>
  )
}

export default VideoTitle
