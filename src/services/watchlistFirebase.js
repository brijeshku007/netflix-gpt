import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./firebase";

// Get user's watchlist document reference
const getUserWatchlistRef = (userId) => {
  return doc(db, "watchlists", userId);
};

// Load user's watchlist from Firestore
export const loadWatchlistFromFirestore = async (userId) => {
  try {
    const docRef = getUserWatchlistRef(userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().movies || [];
    } else {
      // Create empty watchlist document
      await setDoc(docRef, { movies: [], updatedAt: new Date() });
      return [];
    }
  } catch (error) {
    console.error("Error loading watchlist from Firestore:", error);
    // Fallback to localStorage
    const localKey = `watchlist_${userId}`;
    return JSON.parse(localStorage.getItem(localKey)) || [];
  }
};

// Save entire watchlist to Firestore
export const saveWatchlistToFirestore = async (userId, movies) => {
  try {
    const docRef = getUserWatchlistRef(userId);
    await setDoc(
      docRef,
      {
        movies: movies,
        updatedAt: new Date(),
      },
      { merge: true }
    );

    // Also save to localStorage as backup
    const localKey = `watchlist_${userId}`;
    localStorage.setItem(localKey, JSON.stringify(movies));
  } catch (error) {
    console.error("Error saving watchlist to Firestore:", error);
    // Fallback to localStorage only
    const localKey = `watchlist_${userId}`;
    localStorage.setItem(localKey, JSON.stringify(movies));
  }
};

// Add movie to Firestore watchlist
export const addMovieToFirestore = async (userId, movie) => {
  try {
    const docRef = getUserWatchlistRef(userId);
    await updateDoc(docRef, {
      movies: arrayUnion(movie),
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error("Error adding movie to Firestore:", error);
    throw error; // Let the calling function handle fallback
  }
};

// Remove movie from Firestore watchlist
export const removeMovieFromFirestore = async (userId, movie) => {
  try {
    const docRef = getUserWatchlistRef(userId);
    await updateDoc(docRef, {
      movies: arrayRemove(movie),
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error("Error removing movie from Firestore:", error);
    throw error; // Let the calling function handle fallback
  }
};

// Clear entire watchlist in Firestore
export const clearWatchlistInFirestore = async (userId) => {
  try {
    const docRef = getUserWatchlistRef(userId);
    await setDoc(
      docRef,
      {
        movies: [],
        updatedAt: new Date(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error("Error clearing watchlist in Firestore:", error);
    throw error;
  }
};

// Set up real-time listener for watchlist changes
export const subscribeToWatchlist = (userId, callback) => {
  const docRef = getUserWatchlistRef(userId);

  return onSnapshot(
    docRef,
    (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        callback(data.movies || []);
      } else {
        callback([]);
      }
    },
    (error) => {
      console.error("Error in watchlist subscription:", error);
      // Fallback to localStorage
      const localKey = `watchlist_${userId}`;
      const localData = JSON.parse(localStorage.getItem(localKey)) || [];
      callback(localData);
    }
  );
};
