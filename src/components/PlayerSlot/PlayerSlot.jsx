import React from "react";
import "./PlayerSlot.scss";
import { Avatar, Typography, Grid } from "@mui/material";
import imagen from "../../assets/WTM Logo.png";
import StarIcon from "@mui/icons-material/Star";
import "../../fonts.css";

export const PlayerSlot = ({ player }) => {
  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      bgcolor={"white"}
      width={"20rem"}
      marginTop={2}
      padding={1}
      border={"5px solid black;"}
    >
      <Grid item>
        <Avatar src={player.user.picture} sx={{ width: 50, height: 50 }} />
      </Grid>
      <Grid item sx={{ marginLeft: 2 }}>
        <Typography
          variant="subtitle1"
          color="textPrimary"
          alignItems="center"
          display={"flex"}
          style={{ fontFamily: "Axiforma Heavy, sans-serif" }}
          className="player-name"
        >
          {player.name}{" "}
          {player.owner && (
            <StarIcon style={{ marginLeft: "8", color: "#F2DF35" }} />
          )}
        </Typography>
      </Grid>
    </Grid>
  );
};
