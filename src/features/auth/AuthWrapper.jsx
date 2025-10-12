import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services";
import { addUser, removeUser } from "../../store/userSlice";
import {
  setWatchlistUser,
  clearWatchlistUser,
  loadUserWatchlist,
} from "../../store/watchlistSlice";

const AuthWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Check if email is verified
        if (!user.emailVerified) {
          // Redirect unverified users to verification page
          if (location.pathname !== "/verify-email") {
            navigate("/verify-email");
          }
          return;
        }

        // User is signed in and verified
        const { uid, email, displayName, photoURL, emailVerified } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
            emailVerified: emailVerified,
          })
        );

        // Set user and load watchlist from Firestore
        dispatch(setWatchlistUser(uid));
        dispatch(loadUserWatchlist(uid));

        // Only redirect to browse if user is on login page
        if (location.pathname === "/") {
          navigate("/browse");
        }
      } else {
        // User is signed out
        dispatch(removeUser());

        // Clear user-specific watchlist
        dispatch(clearWatchlistUser());

        // Only redirect to login if user is not already on login or verification page
        if (
          location.pathname !== "/" &&
          location.pathname !== "/verify-email"
        ) {
          navigate("/");
        }
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate, location.pathname]);

  return children;
};

export default AuthWrapper;
