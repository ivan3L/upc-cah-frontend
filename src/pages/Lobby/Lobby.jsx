import { Button, Dialog } from "@mui/material";
import React, { useContext, useState } from "react";
import { RoomList } from "../../components/RoomList/RoomList";
import "./Lobby.scss";
import AddIcon from "@mui/icons-material/Add";
import GroupsIcon from "@mui/icons-material/Groups";
import { getWebSocket } from "../../services/websocket/websocket";
import io from "socket.io-client";
import { UserContext } from "../../context/UserContext";
import { v4 as uuidv4 } from "uuid";
// import { DialogCreateRoom } from "../../components/Dialog/DialogCreateRoom/DialogCreateRoom";

export const Lobby = () => {
  const [openModal, setopenModal] = useState(false);

  const { user } = useContext(UserContext);
  const temp = uuidv4();
  const socket = io("http://localhost:8080");

  const handleModal = () => {
    setopenModal(!openModal);
  };

  const createRoom = () => {
    socket.emit("crear-room", { namePlayer: user.name, identificador: temp });
    console.log("ID", temp);
  };

  const joinRoom = () => {
    console.log("click");
    socket.emit("join-room", { roomName: "abc", namePlayer: user.name });
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
          onClick={createRoom}
        >
          <div>
            <AddIcon sx={{ height: "30px", width: "2em" }} />
            <p>Create</p>
          </div>
        </Button>
        {/* <Dialog
          open={openModal}
          onClose={handleModal}
          className="animate__animated animate__backInDown"
        >
          <DialogCreateRoom/>
        </Dialog> */}
      </div>
      <div className="container-room">
        <RoomList />
      </div>
    </>
  );
};
