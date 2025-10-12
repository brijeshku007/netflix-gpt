// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:
    process.env.REACT_APP_FIREBASE_API_KEY ||
    "AIzaSyDd6oMmPnj4Aei3EQDJMUNIDPvswVKUOT0",
  authDomain:
    process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ||
    "netflixgpt-d6a76.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "netflixgpt-d6a76",
  storageBucket:
    process.env.REACT_APP_FIREBASE_STORAGE_BUCKET ||
    "netflixgpt-d6a76.appspot.com",
  messagingSenderId:
    process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "655443859635",
  appId:
    process.env.REACT_APP_FIREBASE_APP_ID ||
    "1:655443859635:web:2b9c68c51efb0dd40938c6",
  measurementId:
    process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-GPE8G5QJ27",
};

// Debug: Check if environment variables are loaded
if (process.env.NODE_ENV === "development") {
  console.log("Firebase Config Check:", {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY ? "Set" : "Missing",
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID ? "Set" : "Missing",
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ? "Set" : "Missing",
  });
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics only in production
if (process.env.NODE_ENV === "production") {
  getAnalytics(app);
}

export const auth = getAuth();
export const db = getFirestore(app);
