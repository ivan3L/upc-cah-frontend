import React from "react";
import "./PlayerSlot.scss";
import { Avatar, Typography, Grid } from "@mui/material";
import imagen from "../../assets/logo.png";
import { margin } from "@mui/system";
import StarIcon from "@mui/icons-material/Star";

export const PlayerSlot = ({ player }) => {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      spacing={1}
      direction="column"
      sx={{ margin: 10 }}
    >
      <Grid item>
        <Avatar src={player.user.picture} sx={{ width: 120, height: 120 }} />
      </Grid>
      <Grid item>
        <Grid container>
          <Grid item>
            <Typography
              variant="subtitle1"
              color="textPrimary"
              alignItems="center"
              display={"flex"}
            >
              {player.name}{" "}
              {player.owner && <StarIcon style={{ color: "yellow" }} />}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
