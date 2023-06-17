import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Score } from "../../components/Score/Score";
import imagen from "../../assets/WTM Logo.png";
import top5 from "../../assets/top5.png";

export const Scoreboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    console.log(location.state.data.playersInRoom);
    setPlayers(location.state.data.playersInRoom);
  }, []);

  console.log("players,", players);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card
        sx={{
          width: "45%",
          height: "auto",
          border: "5px solid black",
          borderRadius: 0,
        }}
      >
        <CardContent
          style={{
            marginTop: "0px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: "35%",
              height: "auto",
              objectFit: "contain",
              margin: "auto",
            }}
            image={imagen}
            alt="WTM Logo"
          />
          <CardMedia
            component="img"
            sx={{
              width: "20%",
              height: "auto",
              objectFit: "contain",
              margin: "auto",
            }}
            image={top5}
            alt="scoreboard"
          />

          {players.map((player, index) => (
            <Score key={player.id} player={player} index={index} />
          ))}
        </CardContent>
      </Card>
      <div style={{ display: "flex", marginTop: "40px" }}>
        <Button
          variant="contained"
          className="custom-button"
          style={{
            fontFamily: "Axiforma Heavy",
            backgroundColor: "#1D0F71",
            borderRadius: 0,
            margin: 10,
          }}
          onClick={() => {
            navigate("/home");
          }}
        >
          IR A INICIO
        </Button>
        <Button
          variant="contained"
          className="custom-button"
          style={{
            fontFamily: "Axiforma Heavy",
            backgroundColor: "#1D0F71",
            borderRadius: 0,
            margin: 10,
          }}
          onClick={() => {
            window.open("https://forms.gle/YWSQJwhauUVDbDLA7", "_blank");
          }}
        >
          REALIZAR ENCUESTA
        </Button>
      </div>
    </div>
  );
};
