import React from "react";
import { Typography } from "@mui/material";
import { BlackCard } from "../BlackCard/BlackCard";
import { WhiteCard } from "../WhiteCard/WhiteCard";
import "./Game.scss";

export const Game = () => {
  return (
    <div className="game-container">
      <Typography
        variant="inherit"
        style={{
          fontWeight: 700,
          fontFamily: "Roboto",
          fontSize: 24,
          letterSpacing: "-0.015em",
          marginBottom: 4,
          width: "100%",
          textAlign: "center",
        }}
      >
        IPORTENIU IS THE CZAR
      </Typography>
      <BlackCard />
      <WhiteCard />
      <WhiteCard />
      <WhiteCard />
      <WhiteCard />
      <WhiteCard />
    </div>
  );
};
