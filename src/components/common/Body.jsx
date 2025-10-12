import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Login,
  ForgotPassword,
  EmailVerification,
  Browse,
  MovieDetails,
  SearchMovie,
  Watchlist,
  Profile,
} from "../../pages";
import { AuthWrapper } from "../../features/auth";
import { Error } from "../common";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <AuthWrapper>
          <Login />
        </AuthWrapper>
      ),
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/verify-email",
      element: <EmailVerification />,
    },
    {
      path: "/browse",
      element: (
        <AuthWrapper>
          <Browse />
        </AuthWrapper>
      ),
    },
    {
      path: "/search-movie",
      element: (
        <AuthWrapper>
          <SearchMovie />
        </AuthWrapper>
      ),
    },
    {
      path: "/watchlist",
      element: (
        <AuthWrapper>
          <Watchlist />
        </AuthWrapper>
      ),
    },
    {
      path: "/profile",
      element: (
        <AuthWrapper>
          <Profile />
        </AuthWrapper>
      ),
    },
    {
      path: "/movie/:id",
      element: (
        <AuthWrapper>
          <MovieDetails />
        </AuthWrapper>
      ),
    },
    {
      path: "*",
      element: <Error />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
