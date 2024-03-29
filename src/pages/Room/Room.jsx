import React, { useState, useEffect, useContext } from "react";
import { PlayerSlot } from "../../components/PlayerSlot/PlayerSlot";
import { SocketContext } from "../../context/SocketContext";
import instrucciones from "../../assets/instrucciones.png";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Box,
} from "@mui/material";
import "./Room.scss";
import { useLocation, useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useGeBlackCard } from "../../hooks/useGetBlackCard";
import { useGeWhiteCard } from "../../hooks/useGetWhiteCard";
import { ReturnToLobby } from "../../components/ReturnToLobby/ReturnToLobby";
import "../../fonts.css";
import imagen from "../../assets/WTM Logo.png";

export const Room = () => {
  const { blackCards } = useGeBlackCard();
  const { whiteCards } = useGeWhiteCard();
  const [open, setOpen] = useState(false);
  const [nPlayer, setNplayer] = useState(0);
  const [playersList, setplayersList] = useState([]);
  const [newPlayer, setnewPlayer] = useState(false);
  const [user] = useLocalStorage("user");
  const { socket } = useContext(SocketContext);
  const location = useLocation();
  const url = location.pathname;
  const navigate = useNavigate();
  const idRoom = url.split("/")[2];

  useEffect(() => {
    socket.on("playersInRoom", (data) => {
      console.log("DATA", data.max_number_player);
      setNplayer(data.max_number_player);
      setplayersList(data.playersInRoom);
      if (data.playersInRoom) {
        data.playersInRoom.map((item) => {
          if (item.owner) {
            if (item.idUser == user.id) {
              setnewPlayer(true);
            }
          }
        });
      }
    });
  }, [playersList]);

  socket.on("missingOnePlayer", () => {
    console.log("MISSING");
    setOpen(true);
  });

  const handleClose = () => {
    setOpen(false);
  };

  const leaveRoom = () => {
    socket.emit("leave-room", {
      idRoom: idRoom,
      idUser: user.id,
    });
    navigate("/lobby");
  };

  socket.on("moveToStartGame", (id) => {
    navigate(`/startgame/${id}`);
  });
  return (
    <div className="container-room">
      {/* <Typography
        variant="inherit"
        style={{
          fontWeight: 700,
          fontFamily: "Axiforma Heavy",
          fontSize: 24,
          letterSpacing: "-0.015em",
          marginTop: 40,
          width: "100%",
          textAlign: "center",
        }}
      >
        Esperando a los jugadores...
      </Typography> */}

      <Grid
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
        }}
        container
        spacing={2}
      >
        <Grid
          item
          xs={1}
          sx={{
            display: "grid",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              backgroundColor: "black",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: 180,
              height: 160,
              clipPath: "polygon(7% 0, 92% 8%, 100% 90%, 0% 100%)",
              border: "none",
            }}
          >
            <Typography
              color="white"
              fontFamily="Axiforma Heavy"
              fontSize={50}
              sx={{ textAlign: "center" }}
            >
              {playersList.length}/{nPlayer}
            </Typography>
            <Typography
              color="white"
              fontFamily="Axiforma Heavy"
              fontSize={20}
              sx={{ textAlign: "center" }}
            >
              JUGADORES LISTOS
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            display: "grid",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          {playersList && playersList.length > 0 ? (
            <>
              {playersList.map((player) => (
                <PlayerSlot key={player.id} player={player} />
              ))}
            </>
          ) : (
            <h1>ERROR</h1>
          )}
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Card
            sx={{
              width: "100%",
              border: "5px solid black",
              borderRadius: 0,
              marginLeft: "-45px",
            }}
          >
            <CardContent
              style={{
                marginTop: "0px",
                marginBottom: "0px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  width: "30%",
                  height: "auto",
                  objectFit: "contain",
                }}
                image={imagen}
                alt="WTM Logo"
              />
              <CardMedia
                component="img"
                sx={{
                  width: "70%",
                  height: "100%",
                  marginTop: "12px",
                  marginBottom: "12px",
                  objectFit: "contain",
                }}
                image={instrucciones}
                alt="WTM Logo"
              />
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography
                  variant="h6"
                  component="h1"
                  align="left"
                  style={{
                    fontFamily: "Axiforma Heavy",
                    color: "black",
                    marginTop: "10px",
                    marginBottom: "2px",
                    fontWeight: "bold",
                    textStroke: "none",
                  }}
                >
                  En cada ronda, se designa aleatoriamente al "zar". Los
                  jugadores no designados como zar elegirán una respuesta que
                  confunda al zar en su elección. Luego, el zar deberá adivinar
                  la respuesta correcta entre todas las cartas que los demás
                  jugadores seleccionaron para confundirlo. Si el zar elige la
                  respuesta correcta, obtiene 1 punto.
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <div className="container-buttons">
        {newPlayer && (
          <Button
            variant="contained"
            className="custom-button"
            style={{
              fontFamily: "Axiforma Heavy",
              backgroundColor: "#503EB9",
              borderRadius: 0,
              margin: 10,
              marginBottom: 80,
            }}
            onClick={() => {
              console.log("EMITE-CLICK");
              socket.emit("start-game", {
                idRoom: idRoom,
                rounds: location.state.rounds,
                blackCards: blackCards,
                whiteCards: whiteCards,
              });
            }}
          >
            Start Game
          </Button>
        )}
        <ReturnToLobby leaveRoom={leaveRoom} />
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Hace falta 1 jugador"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Para poder iniciar una partida es necesario contar con minimo 2
              jugador en la sala.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Aceptar</Button>
          </DialogActions>
        </Dialog>
      </div>
      <Box
        sx={{
          backgroundColor: "black",
          display: "flex",
          alignContent: "center",
          flexWrap: "wrap",
        }}
        width={"100%"}
        height={70}
      >
        <Typography
          color={"white"}
          marginLeft={5}
          fontFamily={"Axiforma Heavy"}
          fontSize={30}
        >
          ESPERANDO JUGADORES...
        </Typography>
      </Box>
    </div>
  );
};
