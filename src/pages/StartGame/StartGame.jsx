import React, { useContext, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { Game } from "../../components/Game/Game";
import { Counter } from "../../components/Counter/Counter";
import { SocketContext } from "../../context/SocketContext";
import "./StartGame.scss";

export const StartGame = () => {
  const [showCorrectCard, setShowCorrectCard] = useState(false);
  const { socket } = useContext(SocketContext);
  const [resetGame, setResetGame] = useState(false);

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
        <Grid
          container
          style={{ height: "calc(100vh - 20px)", marginTop: "-10px", marginBottom: "-10px" }}
        >
          <Grid item xs={2} style={{ padding: "10px" }}>
            <div className="list-players"></div>
          </Grid>
          <Grid
            item
            xs={8}
            style={{
              height: "100%",
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
          <Grid
            item
            xs={2}
            style={{
              padding: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            {!showCorrectCard ? <Counter /> : null}
          </Grid>
        </Grid>
      </div>
    </>
  );
};
