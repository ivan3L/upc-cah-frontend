import React from "react";
import { Routes, Route } from "react-router-dom";
import { NavBar } from "../components/NavBar/NavBar";
import { Lobby } from "./Lobby/Lobby";
import { Room } from "./Room/Room";
import { Login } from "../pages/Login/Login";
import { StartGame } from "../pages/StartGame/StartGame";
import { Scoreboard } from "./Scoreboard/Scoreboard";

export const CardsRouter = () => {
  return (
    <>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/lobby" element={<Lobby />}></Route>
          <Route path="/room/:id" element={<Room />}></Route>
          <Route path="/startgame/:id" element={<StartGame />}></Route>
          <Route path="/scoreboard/:id" element={<Scoreboard />}></Route>
          <Route path="/*" element={<Login />}></Route>
        </Routes>
      </div>
    </>
  );
};
