import React, { useState, useEffect, useContext } from "react";
import { PlayerSlot } from "../../components/PlayerSlot/PlayerSlot";
import { SocketContext } from "../../context/SocketContext";
import "./Room.scss";

export const Room = () => {
  const { socket } = useContext(SocketContext);
  const [playersList, setplayersList] = useState([]);

  useEffect(() => {
    socket.on("playersInRoom", (players) => {
      console.log("Players in the room:", players);
      setplayersList(players);
    });
  }, [playersList]);

  console.log("playersList", playersList);
  return (
    <div className="container-slot-player">
      {playersList.map((player) => (
        <PlayerSlot key={player.id} player={player} />
      ))}
    </div>
  );
};
