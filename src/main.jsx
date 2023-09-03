import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { router } from "./config/Router";
import { RouterProvider } from "react-router-dom";
import  UserProvider  from "./context/UserContext";
// 1. Import the extendTheme function
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const theme = extendTheme({ colors });

// 3. Pass the `theme` prop to the `ChakraProvider`

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <UserProvider>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </UserProvider>
  </React.StrictMode>
);
