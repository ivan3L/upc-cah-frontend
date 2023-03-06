import React, { useState, useEffect, useContext } from "react";
import { PlayerSlot } from "../../components/PlayerSlot/PlayerSlot";
import { SocketContext } from "../../context/SocketContext";
import { Button } from "@mui/material";
import useLocalStorage from "../../hooks/useLocalStorage";
import io from "socket.io-client";
import "./Room.scss";

export const Room = () => {
  const [playersList, setplayersList] = useState([]);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on("playersInRoom", (players) => {
      console.log("Players in the room:", players);
      setplayersList(players);
    });
  }, [playersList]);

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
        <Button variant="contained" style={{ margin: 10 }}>
          Volver
        </Button>
      </div>
    </div>
  );
};
