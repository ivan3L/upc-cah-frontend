import React, { useContext, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { Game } from "../../components/Game/Game";
import { Counter } from "../../components/Counter/Counter";
import { SocketContext } from "../../context/SocketContext";

export const StartGame = () => {
  const [showCorrectCard, setShowCorrectCard] = useState(false);
  const { socket } = useContext(SocketContext);
  const [resetGame, setResetGame] = useState(false);

  socket.on("reset-game", () => {
    console.log("reset-game-setimeout")
      setResetGame(true);
      setShowCorrectCard(false);
  });

  socket.on("end-czar-answer-selection", () => {
    setShowCorrectCard(true);
  });

  return (
    <>
      <Grid container spacing={2} style={{ height: "90VH" }}>
        <Grid item xs={2}>
          <div className="list-players">LIST PLAYERS</div>
        </Grid>
        <Grid
          item
          xs={8}
          style={{
            height: "100%",
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Game
            showCorrectCard={showCorrectCard}
            socket={socket}
            resetGame={resetGame}
            setResetGame={setResetGame}
          />
        </Grid>
        <Grid item xs={2}>
          {!showCorrectCard ? <Counter /> : null}
        </Grid>
      </Grid>
    </>
  );
};
