import { Button, Dialog, Grid } from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import { RoomList } from "../../components/RoomList/RoomList";
import { v4 as uuidv4 } from "uuid";
import { SocketContext } from "../../context/SocketContext";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Dropdown } from "../../components/Dropdown/Dropdown";
import { ReturnToHome } from "../../components/ReturnToHome/ReturnToHome";
import "./Lobby.scss";

export const Lobby = () => {
  const [openModal, setopenModal] = useState(false);
  const { socket } = useContext(SocketContext);
  const [user] = useLocalStorage("user");
  const idRoom = uuidv4();

  // const handleUser = (data) => {
  //   setUser(data);
  // };

  const handleModal = () => {
    setopenModal(!openModal);
  };

  const createRoom = (data) => {
    socket.emit("crear-room", {
      idRoom: idRoom,
      roomName: data.name,
      name: user.name,
      password: data.password,
      max_number_player: data.max_number_player,
      user: user,
      owner: true,
    });
  };

  const joinRoom = () => {
    // socket.emit("join-room", { roomName: "abc", namePlayer: user.name });
  };
  if (socket) {
    return (
      <>
        <div className="container-menu-lobby">
          <Grid item>
            {" "}
            {/* Wrap the Dropdown component in a separate Grid container */}
            <ReturnToHome />
            <Dropdown />
          </Grid>
        </div>
        <div className="container-room-lobby" style={{ marginTop: "100px" }}>
          {/* Add margin-top to create some space */}
          <RoomList />
        </div>
      </>
    );
  }
};
