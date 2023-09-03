import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import PublicLayout from "../layouts/PublicLayout.jsx";
import { weatherData } from "./functions";
import PrivateLayout from "../layouts/PrivateLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    
    children: [
      {
        path: "/",
        index: "true",
        element: <Home />,
        
      },
      {
        path: "/profile",
        element: <PrivateLayout />,
        
        children: [
          {
            path: "/profile",
            element: <Profile />,
            
          },
        ],
      },
    ],

    errorElement: <NotFound />,
  },
]);
