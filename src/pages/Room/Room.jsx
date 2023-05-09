import React, { useState, useEffect, useContext } from "react";
import { PlayerSlot } from "../../components/PlayerSlot/PlayerSlot";
import { SocketContext } from "../../context/SocketContext";
import { Button } from "@mui/material";
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
      </div>
    </div>
  );
};
