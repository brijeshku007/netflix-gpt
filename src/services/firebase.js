// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// Validate required Firebase environment variables
const requiredFirebaseVars = [
  'REACT_APP_FIREBASE_API_KEY',
  'REACT_APP_FIREBASE_AUTH_DOMAIN',
  'REACT_APP_FIREBASE_PROJECT_ID',
  'REACT_APP_FIREBASE_STORAGE_BUCKET',
  'REACT_APP_FIREBASE_MESSAGING_SENDER_ID',
  'REACT_APP_FIREBASE_APP_ID'
];

const missingVars = requiredFirebaseVars.filter(varName => !process.env[varName]);
if (missingVars.length > 0) {
  const errorMessage = `Missing Firebase environment variables: ${missingVars.join(', ')}`;
  
  if (process.env.NODE_ENV === 'development') {
    console.error(`❌ ${errorMessage}`);
    console.error('💡 Make sure your .env file is in the project root and restart the server');
  } else {
    throw new Error(errorMessage);
  }
}

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Debug: Check if environment variables are loaded
if (process.env.NODE_ENV === "development") {
  // console.log("Firebase Config Check:", {
  //   apiKey: process.env.REACT_APP_FIREBASE_API_KEY ? "Set" : "Missing",
  //   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID ? "Set" : "Missing",
  //   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ? "Set" : "Missing",
  // });
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics only in production
if (process.env.NODE_ENV === "production") {
  getAnalytics(app);
}

export const auth = getAuth();
export const db = getFirestore(app);
