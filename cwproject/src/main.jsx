import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from 'react-router-dom';
import theme from "./theme.js";
import App from "./App.jsx";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { WebsiteProvider } from "./contexts/WebsiteContext.jsx";
import Auth0ProviderWithHistory from './auth0-provider-with-history';

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <Auth0ProviderWithHistory>
        <DndProvider backend={HTML5Backend}>
          <WebsiteProvider>
            <App />
          </WebsiteProvider>
        </DndProvider>
      </Auth0ProviderWithHistory>
    </BrowserRouter>
  </ChakraProvider>
);