import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import AppProvider from "./context/AppContext.jsx";

const theme = extendTheme({
  colors: {
    back: "#030821",
  },
  breakpoints: {
    sm: "320px",
    mid: "690px",
    md: "768px",
    lg: "1100px",
    xl: "1330px",
    "2xl": "1900px",
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <AppProvider>
        <App />
      </AppProvider>
    </ChakraProvider>
  </React.StrictMode>
);
