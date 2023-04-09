import React, { useContext, useState } from "react";
import { Grid } from "@mui/material";
import { Game } from "../../components/Game/Game";
import { SocketContext } from "../../context/SocketContext";
import useLocalStorage from "../../hooks/useLocalStorage";

export const StartGame = () => {
  
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <div className="list-players">LIST PLAYERS</div>
        </Grid>
        <Grid item xs={11}>
          <Game />
        </Grid>
      </Grid>
    </>
  );
};
