import React from "react";
import { TextField, Typography, Grid } from "@mui/material";
import "./DialogPassword.scss";
import cards from '../../assets/img123.gif'

export const DialogPassword = ({room}) => {
  return (
    <>
      <div className="container-dialog">
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography
              variant="inherit"
              style={{
                fontWeight: 700,
                fontFamily: "Roboto",
                fontSize: 24,
                letterSpacing: "-0.015em",
                marginBottom: 4,
              }}
            >
              Ingrese la clave de la sala #{room.id}
            </Typography>
            <TextField
              required
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              sx={{ margin: "10px" }}
            />
          </Grid>
          <Grid item xs={4}>
            <img src={cards} style={{width: '20vh', height: '25vh'}}/>
          </Grid>
        </Grid>
      </div>
    </>
  );
};
