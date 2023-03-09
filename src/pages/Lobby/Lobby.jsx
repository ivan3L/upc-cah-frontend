import { Button, Dialog } from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import { RoomList } from "../../components/RoomList/RoomList";
import AddIcon from "@mui/icons-material/Add";
import GroupsIcon from "@mui/icons-material/Groups";
import { UserContext } from "../../context/UserContext";
import { v4 as uuidv4 } from "uuid";
import { DialogCreateRoom } from "../../components/Dialogs/DialogCreateRoom/DialogCreateRoom";
import { SocketContext } from "../../context/SocketContext";
import useLocalStorage from "../../hooks/useLocalStorage";
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
    });
  };

  const joinRoom = () => {
    console.log("click");
    // socket.emit("join-room", { roomName: "abc", namePlayer: user.name });
  };
  return (
    <>
      <div className="container-menu-lobby">
        <Button
          className="button-create"
          sx={{
            color: "black",
          }}
          onClick={joinRoom}
        >
          <div>
            <GroupsIcon sx={{ height: "30px", width: "2em" }} />
            <p>Join</p>
          </div>
        </Button>
        <Button
          className="button-create"
          sx={{
            color: "black",
          }}
          onClick={handleModal}
        >
          <div>
            <AddIcon sx={{ height: "30px", width: "2em" }} />
            <p>Create</p>
          </div>
        </Button>
        <Dialog
          open={openModal}
          onClose={handleModal}
          className="animate__animated animate__backInDown"
        >
          <DialogCreateRoom
            createRoomSocket={(
              id,
              name,
              password,
              max_number_player,
              number,
              owner_id
            ) => {
              const data = {
                id,
                name,
                password,
                max_number_player,
                number,
                owner_id,
              };
              createRoom(data);
            }}
          />
        </Dialog>
      </div>
      <div className="container-room-lobby">
        <RoomList />
      </div>
    </>
  );
};
