import React from "react";
import { Routes, Route } from "react-router-dom";
import { NavBar } from "../components/NavBar/NavBar";
import { Lobby } from "./Lobby/Lobby";
import { Room } from "./Room/Room";

export const CardsRouter = () => {
  return (
    <>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/lobby" element={<Lobby />}></Route>
          <Route path="/room123" element={<Room/>}></Route>
        </Routes>
      </div>
    </>
  )
};
