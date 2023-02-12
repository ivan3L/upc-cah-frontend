import React from "react";
import { PlayerSlot } from "../../components/PlayerSlot/PlayerSlot";
import "./Room.scss";

const players = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
];

export const Room = () => {
  return (
    <div className="container-slot-player">
      {players.map((player) => (
        <PlayerSlot key={player.id} />
      ))}
    </div>
  );
};
