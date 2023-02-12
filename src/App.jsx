import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { AppRouter } from "./router/AppRouter";
import WebSocketServer from "./components/websocket/websocket";

function App() {

  return (
    <>
      <WebSocketServer/>
      <AppRouter />
    </>
  );
}

export default App;
