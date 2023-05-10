import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { UserProvider } from "./context/UserProvider.jsx";
import { SocketProvider } from "./context/SocketProvider.jsx";
import "./index.css";
import { RoomProvider } from "./context/RoomProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <SocketProvider>
    <RoomProvider>
      <UserProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserProvider>
    </RoomProvider>
  </SocketProvider>
  // </React.StrictMode>
);
