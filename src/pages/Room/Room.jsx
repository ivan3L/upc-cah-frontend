import React, { useState, useEffect, useContext } from "react";
import { PlayerSlot } from "../../components/PlayerSlot/PlayerSlot";
import { SocketContext } from "../../context/SocketContext";
import { Button } from "@mui/material";
import "./Room.scss";
import { useLocation } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";

export const Room = ({ match }) => {
  const [playersList, setplayersList] = useState([]);
  const [user] = useLocalStorage("user");
  const { socket } = useContext(SocketContext);
  const location = useLocation();
  const url = location.pathname;
  const idRoom = url.split("/")[2];

  useEffect(() => {
    socket.on("playersInRoom", (players) => {
      console.log("Players in the room:", players);
      setplayersList(players);
    });
  }, [playersList]);

  const leaveRoom = () => {
    socket.emit("leave-room", {
      idRoom: idRoom,
      idUser: user.id,
    });
  };

  return (
    <div className="container-room">
      <div className="container-slot-player">
        {playersList.map((player) => (
          <PlayerSlot key={player.id} player={player} />
        ))}
      </div>
      <div className="container-buttons">
        <Button variant="contained" style={{ margin: 10 }}>
          Aceptar
        </Button>
        <Button variant="contained" style={{ margin: 10 }} onClick={leaveRoom}>
          Volver
        </Button>
      </div>
    </div>
  );
};
