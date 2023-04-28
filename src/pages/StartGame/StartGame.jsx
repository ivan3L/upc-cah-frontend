import React, { useContext, useState } from "react";
import { Grid } from "@mui/material";
import { Game } from "../../components/Game/Game";
import { Counter } from "../../components/Counter/Counter";

export const StartGame = () => {
  return (
    <>
      <Grid container spacing={2} style={{ height: "90VH" }}>
        <Grid item xs={2}>
          <div className="list-players">LIST PLAYERS</div>
        </Grid>
        <Grid
          item
          xs={8}
          style={{ height: "100%", display: "flex", alignContent: "center" }}
        >
          <Game />
        </Grid>
        <Grid item xs={2}>
          <Counter />
        </Grid>
      </Grid>
    </>
  );
};
