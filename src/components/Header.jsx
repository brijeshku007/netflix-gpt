import React, { useState ,useEffect} from 'react'
import Dropdown from './DropDown';
import {  signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser,removeUser } from '../utils/userSlice';
import {  onAuthStateChanged } from "firebase/auth";
import { logo } from '../utils/constants';
import { toggleGptSeacrhView } from '../utils/gptSlice';
import { suppoetedLanguage } from '../utils/constants';
import { suppoetedMovies } from '../utils/constants';
import MainContainer from './MainContainer';
import Login from './Login';

const Header = () => {
  const user=useSelector(store=>store.user)
  const showGptSearch=useSelector(store=>store.gpt.showGptSearch);
  const navigate=useNavigate();
  const dispatch=useDispatch();

  
  const handleclick=()=>{
    signOut(auth).then(() => { })
    .catch((error) => {
      // An error happened.
      navigate("*")
    });
  }


  useEffect(() => {
    const unsubscribe =onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const {uid,email,displayName,photoURL} = user;
        dispatch(addUser({
          uid:uid,
          email:email,
          displayName:displayName,
           photoURL:photoURL}));
           navigate("/browse")
        

        // ...
      } else {
        // User is signed out
        // ...
        dispatch(removeUser());
        navigate("/")
        
      }
    });
    return()=>unsubscribe(); // unsubscribe when the componenamt unmount

  }, [])
  const handleGpt=()=>{
    // toggle gpt search
    dispatch(toggleGptSeacrhView());
  }
    
  
  return (
    <div className='relative z-20'>
      <div className='flex flex-col bg-gray-950 text-white w-100 md:h-20 space-x-20 h-24 md:flex-row'>
      <img className='h-10 w-30 mx-auto md:mx-0' src={logo} alt="heder" />
       </div>
       
      { user &&<div ><ul className=' -mt-8 flex justify-end gap-10 cursor-pointer  h-10 md:-mt-12  '>
          
        { !showGptSearch?"":(<li><Dropdown names={suppoetedLanguage}></Dropdown></li>)}

        <li><button onClick={handleGpt} className=' h-10 md:h-10 -mt-5 text-white bg-purple-800 rounded-lg px-5 w-30 text-sm  '>{showGptSearch?"Home Page":
        "AI Search"}</button> </li>
        <li> <button className='bg-red-700  text-white w-35  h-10 w-50 -mt-5 my-1 px-5 rounded-md' onClick={handleclick}>Logout</button></li>
        {user &&
        <li> <img src={user?.photoURL} alt="user url" className='rounded-full w-12 h-14 -mt-6 md:-mt-4 ' /></li>
         }
        
        </ul></div>}
        </div>
        
   
    
  )
}

export default Header;