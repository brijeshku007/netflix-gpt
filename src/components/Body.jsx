import React, { useEffect } from 'react'
import Login from './Login';
import Browse from './Browse';
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';
import Error from './Error';

const Body = () => {
  const appRouter=createBrowserRouter([
    {path:"/",
      element:<Login></Login>
    },
    {path:"/browse",
      element:<Browse></Browse>
    },
    {path:"*",
      element:<Error></Error>
    }
  ])
  return (
    <div>
     <RouterProvider router={appRouter}>  
     </RouterProvider>
  
    </div>

  )
}

export default Body;
