import React, { useRef, useState } from 'react'
import Header from './Header';
import Dropdown from './DropDown';
import { chackVaildate } from '../utils/Vaildates';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';
import { updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { dp } from '../utils/constants';
import { backGroundUrl } from '../utils/constants';




const Login = () => {
 
  const[isSignIn,setisSignIn]=useState(true)
  const [error,seterror]=useState(null);
  const dispatch=useDispatch();

  const toggleSignIn=()=>{
     setisSignIn(!isSignIn)
  }
  const name=useRef(null);
  const email=useRef(null);
  const password=useRef(null);
  const handleButton=()=>{
    // vaildate form
     const message=chackVaildate(email.current.value,password.current.value)
     seterror(message);
     if(message) return;

     //signin/signUp

     if(!isSignIn){
      //signUp
      createUserWithEmailAndPassword(auth, email.current.value,password.current.value)
      .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // update profile
    updateProfile(user, {
      displayName: name.current.value, photoURL: dp
    }).then(() => {
       
      const {uid,email,displayName,photoURL} = auth.currentUser;
        dispatch(addUser({
          uid:uid,
          email:email,
          displayName:displayName,
           photoURL:photoURL}));

     
      // Profile updated!
      // ...
    }).catch((error) => {
      seterror(error.message)
      // An error occurred
      // ...
    });
    // console.log(user)
    
    // ...
    })
   .catch((error) => {

    const errorCode = error.code;
    const errorMessage = error.message;
    seterror("Email Already Exist")
    // ..
  });
     }
     else{
      //signIn
      signInWithEmailAndPassword(auth,email.current.value,password.current.value)
     .then((userCredential) => {
    // Signed in 
     const user = userCredential.user;
    //  console.log(user);
     
    // ...
    })
     .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    seterror("User NOT Found");
  });

     }
    
  }
 
  return (
    <div>
      <Header ></Header>
      <div className='absolute '>
      <img className='-my-40 h-screen object-cover md:h-full md:bg-' src={backGroundUrl} alt="bodyImage" />
      </div>
   <form 
   onSubmit={(e)=>e.preventDefault()}
   action="" 
   className='relative bg-black w-full md:w-1/4 md:my-40  mx-auto text-white bg-opacity-80 rounded-sm '>
   <h1 className='font-bold md:text-3xl py-4 md:mx-2 mx-6'>{isSignIn?"SignIn":"SignUp"}</h1>
   {!isSignIn &&<input ref={name} type="text"
     placeholder='Enter the  full Name'
      className='p-2 my-2 w-80 md:mx-2 mx-6 bg-gray-600 rounded-lg'
       />}
    <input
    ref={email}
     type="text" 
      placeholder='Enter the email' 
      className='p-2 my-2 w-80 bg-gray-600 rounded-lg md:mx-2 mx-6'
      />
    <input 
    ref={password}
    type="password"
     placeholder='Enter the password'
      className='p-2 my-2 w-80 md:mx-2 mx-6 bg-gray-600 rounded-lg'
       />
  
    <br />
    <p className='px-4 text-red-700 font-bold'>{error}</p>
    <button className='bg-red-700 w-60  p-2 my-4 rounded-lg md:mx-2 mx-6 md:text-lg text-sm' onClick={handleButton}>{isSignIn?"SignIn":"SignUp"}</button>
    <p className=' text-sm md:text-lg py-4 text-white md:mx-2 mx-6 cursor-pointer'  onClick={toggleSignIn}>{!isSignIn?"Already User? SignIn Now":"New User? Crerate Account"} </p>
   </form> 



    </div>
  )
}

export default Login;
