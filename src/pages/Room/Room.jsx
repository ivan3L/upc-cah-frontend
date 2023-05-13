import React, { useState, useEffect, useContext } from "react";
import { PlayerSlot } from "../../components/PlayerSlot/PlayerSlot";
import { SocketContext } from "../../context/SocketContext";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
} from "@mui/material";
import "./Room.scss";
import { useLocation, useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useGeBlackCard } from "../../hooks/useGetBlackCard";
import { useGeWhiteCard } from "../../hooks/useGetWhiteCard";
import { ReturnToLobby } from "../../components/ReturnToLobby/ReturnToLobby";
import "../../fonts.css";

export const Room = () => {
  const { blackCards } = useGeBlackCard();
  const { whiteCards } = useGeWhiteCard();
  const [open, setOpen] = useState(false);
  const [playersList, setplayersList] = useState([]);
  const [newPlayer, setnewPlayer] = useState(false);
  const [user] = useLocalStorage("user");
  const { socket } = useContext(SocketContext);
  const location = useLocation();
  const url = location.pathname;
  const navigate = useNavigate();
  const idRoom = url.split("/")[2];

  useEffect(() => {
    // console.log("location", location.state.rounds);
    socket.on("playersInRoom", (data) => {
      console.log("DATA", data.playersInRoom);
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
        `Esperando a los jugadores...`
      </Typography>
      <div className="container-slot-player">
        {playersList && playersList.length > 0 ? (
          playersList.map((player) => (
            <PlayerSlot key={player.id} player={player} />
          ))
        ) : (
          <h1>ERROR</h1>
        )}
      </div>
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
    </div>
  );
};
