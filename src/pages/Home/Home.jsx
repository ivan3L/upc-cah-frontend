import { Card, Button, Grid } from "@mui/material";
import React, { useContext, useEffect } from "react";
import logo from "../../assets/WTM Logo.png";
import "./Home.scss";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { v4 as uuidv4 } from "uuid";
import { Dropdown } from "../../components/Dropdown/Dropdown";

export const Home = () => {
  const navigate = useNavigate();
  const idUni = uuidv4();
  const { user, setUser } = useContext(UserContext);
  const handleUser = (data) => {
    setUser(data);
  };

  useEffect(() => {
    const item = localStorage.getItem("user");
    if (item) {
      handleUser(JSON.parse(item));
      navigate("/home");
    }
  }, []);

  const goToLobby = () => {
    // Perform logout logic if needed
    navigate("/lobby");
  };

  return (
    <div className="login-container">
      <Card
        className="card-login"
        sx={{
          width: "40%",
          minHeight: "75%",
          backgroundColor: "rgba(193, 193, 193, 0)",
          border: "none",
          boxShadow: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={logo} style={{ width: "45%", height: "45%" }} alt="Logo" />
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Grid item>
            <Button
              variant="contained"
              className="custom-button"
              style={{
                fontFamily: "Axiforma Heavy",
                backgroundColor: "#756BB1",
                borderRadius: 0,
              }}
            >
              CREAR SALA
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={goToLobby}
              variant="contained"
              className="custom-button"
              style={{
                fontFamily: "Axiforma Heavy",
                backgroundColor: "#503EB9",
                borderRadius: 0,
              }}
            >
              EXPLORAR SALAS
            </Button>
          </Grid>
        </Grid>
        <Grid item> {/* Wrap the Dropdown component in a separate Grid container */}
          <Dropdown />
        </Grid>
      </Card>
    </div>
  );
};
