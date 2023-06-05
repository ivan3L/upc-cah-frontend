import React, { useContext, useEffect, useState } from "react";
import { Grid, Box, CardMedia } from "@mui/material";
import { Game } from "../../components/Game/Game";
import { Counter } from "../../components/Counter/Counter";
import { SocketContext } from "../../context/SocketContext";
import { useNavigate, useLocation } from "react-router-dom";
import "./StartGame.scss";
import logo from "../../assets/WTM Logo.png";

export const StartGame = () => {
  const [showCorrectCard, setShowCorrectCard] = useState(false);
  const { socket } = useContext(SocketContext);
  const [resetGame, setResetGame] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const url = location.pathname;
  const idRoom = url.split("/")[2];

  socket.on("reset-game", () => {
    console.log("reset-game-setimeout");
    setResetGame(true);
    setShowCorrectCard(false);
  });

  socket.on("end-czar-answer-selection", () => {
    setShowCorrectCard(true);
  });

  return (
    <>
      <div className="container-start-game">
      <Box>
      <img src={logo} style={{ width: "12%", height: "12%",  marginLeft: "3%", marginTop: "2%", }} alt="Logo" /> 
      </Box>
        <Box
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginRight: "3%",
            }}
          >
            {!showCorrectCard ? <Counter idRoom={idRoom} /> : null}
        </Box>
        <Grid
          container
          style={{
            marginTop: "5%",
            marginBottom: "-10px",
          }}
        >
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            <Game
              showCorrectCard={showCorrectCard}
              socket={socket}
              resetGame={resetGame}
              setResetGame={setResetGame}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
};
