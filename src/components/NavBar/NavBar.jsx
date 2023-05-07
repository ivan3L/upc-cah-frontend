import React, { useContext, useEffect } from "react";
import { AppBar, Grid, Avatar } from "@mui/material";
import logoBlack from "../../assets/WTM Logo.png";
import "./NavBar.scss";
import useLocalStorage from "../../hooks/useLocalStorage";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../context/SocketContext";
import { useLocation } from "react-router-dom";

export const NavBar = () => {
  const [user] = useLocalStorage("user");
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("socket");
    navigate("/login");
  };

  return (
    <AppBar
      sx={{
        backgroundColor: "black",
        position: "relative",
      }}
    >
      <Grid container spacing={1} direction="row" alignItems="center">
        <Grid item xs={0.7}>
          <img className="logo-navbar" src={logoBlack} />
        </Grid>
        <Grid item xs={2}>
          <span>Cards Against Humanity</span>
        </Grid>
        {pathname === "/lobby" ? (
          <>
            <Grid className="avatar" item xs={8.9}>
              <p style={{ margin: "10px" }}>{user ? user.name : ""}</p>
              <Avatar alt="Remy Sharp" src={user ? user.picture : ""} />
            </Grid>
            <Grid item xs={0.1}>
              <ExitToAppIcon
                onClick={() => {
                  logout();
                }}
                style={{
                  transition: "color 0.2s ease-in-out",
                  cursor: "pointer",
                }}
              />
            </Grid>
          </>
        ) : null}
      </Grid>
    </AppBar>
  );
};
