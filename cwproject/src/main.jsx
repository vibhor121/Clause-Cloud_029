// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme.js";
import App from "./App.jsx";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { WebsiteProvider } from "./contexts/WebsiteContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={theme}>
    <DndProvider backend={HTML5Backend}>
      <WebsiteProvider>
        <App />
      </WebsiteProvider>
    </DndProvider>
  </ChakraProvider>
);
