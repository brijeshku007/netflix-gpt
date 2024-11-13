// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDd6oMmPnj4Aei3EQDJMUNIDPvswVKUOT0",
  authDomain: "netflixgpt-d6a76.firebaseapp.com",
  projectId: "netflixgpt-d6a76",
  storageBucket: "netflixgpt-d6a76.appspot.com",
  messagingSenderId: "655443859635",
  appId: "1:655443859635:web:2b9c68c51efb0dd40938c6",
  measurementId: "G-GPE8G5QJ27"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
 export const auth=getAuth();