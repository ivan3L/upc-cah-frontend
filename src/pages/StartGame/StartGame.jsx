import React from "react";
import { Grid } from "@mui/material";
import { Game } from "../../components/Game/Game";

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
