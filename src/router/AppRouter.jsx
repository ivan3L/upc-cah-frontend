import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { CardsRouter } from '../pages/CardsRouter'
import { Lobby } from '../pages/Lobby/Lobby'
import { Login } from '../pages/Login/Login'

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/*" element={<CardsRouter />}></Route>
        <Route path="/" element={<Login />}></Route>
      </Routes>
    </>
  )
}
