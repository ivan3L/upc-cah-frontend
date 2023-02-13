import React, { useContext } from "react";
import { AppBar, Grid, Avatar } from "@mui/material";
import logoBlack from "../../assets/logoBlack.png";
import "./NavBar.scss";
import { UserContext } from "../../context/UserContext";

export const NavBar = () => {
  const {user} = useContext(UserContext)
  // console.log("USER", user)
  return (
    <AppBar
      sx={{
        backgroundColor: "black",
        position: "relative",
      }}
    >
      <Grid
        container
        spacing={1}
        direction="row"
        alignItems="center"
      >
        <Grid item xs={0.7}>
          <img className="logo-navbar" src={logoBlack} />
        </Grid>
        <Grid item xs={2}>
          <span>Cards Against Humanity</span>
        </Grid>
        <Grid className="avatar" item xs={9}>
        <p style={{ margin: '10px' }}>{user ? user.name : ''}</p>
        <Avatar alt="Remy Sharp" src={user ? user.picture: ''} />
        </Grid>
      </Grid>
    </AppBar>
  );
};
