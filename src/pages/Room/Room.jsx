import React, { useState, useEffect, useContext } from "react";
import { PlayerSlot } from "../../components/PlayerSlot/PlayerSlot";
import { SocketContext } from "../../context/SocketContext";
import { Button } from "@mui/material";
import "./Room.scss";
import { useLocation, useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";

export const Room = () => {
  const [playersList, setplayersList] = useState([]);
  const [newPlayer, setnewPlayer] = useState({
    name: "",
    owner: false,
  });
  const [user] = useLocalStorage("user");
  const { socket } = useContext(SocketContext);
  const location = useLocation();
  const url = location.pathname;
  const navigate = useNavigate();
  const idRoom = url.split("/")[2];

  useEffect(() => {
    // console.log("location", location.state.rounds);
    socket.on("playersInRoom", (data) => {
      console.log("Players in the room:", data.playersInRoom);
      console.log("NewPlayer:", data.newPlayer);
      setplayersList(data.playersInRoom);
      if (data.newPlayer) {
        setnewPlayer(data.newPlayer);
      }
    });
  }, [playersList]);

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
      <div className="container-slot-player">
        {playersList.map((player) => (
          <PlayerSlot key={player.id} player={player} />
        ))}
      </div>
      <div className="container-buttons">
        {newPlayer.owner && (
          <Button
            variant="contained"
            style={{ margin: 10 }}
            onClick={() => {
              socket.emit("start-game", {
                idRoom: idRoom,
                rounds: location.state.rounds,
              });
            }}
          >
            Comenzar
          </Button>
        )}
        <Button variant="contained" style={{ margin: 10 }} onClick={leaveRoom}>
          Regresar
        </Button>
      </div>
    </div>
  );
};
