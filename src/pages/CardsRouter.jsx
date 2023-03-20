import React from "react";
import { Routes, Route } from "react-router-dom";
import { NavBar } from "../components/NavBar/NavBar";
import { Lobby } from "./Lobby/Lobby";
import { Room } from "./Room/Room";
<<<<<<< HEAD
import { Login } from "../pages/Login/Login";
=======
import { StartGame } from "./StartGame/StartGame";
>>>>>>> main

export const CardsRouter = () => {
  return (
    <>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/lobby" element={<Lobby />}></Route>
<<<<<<< HEAD
          <Route path="/room/:id" element={<Room />}></Route>
          <Route path="/*" element={<Login />}></Route>
=======
          <Route path="/room123" element={<Room/>}></Route>
          <Route path="/startgame" element={<StartGame/>}></Route>
>>>>>>> main
        </Routes>
      </div>
    </>
  );
};
