import { Card, Button, Grid, Dialog } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import logo from "../../assets/WTM Logo.png";
import "./Home.scss";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { v4 as uuidv4 } from "uuid";
import { Dropdown } from "../../components/Dropdown/Dropdown";
import { DialogCreateRoom } from "../../components/Dialogs/DialogCreateRoom/DialogCreateRoom";
import { SocketContext } from "../../context/SocketContext";

export const Home = () => {
  const [openModal, setopenModal] = useState(false);
  const navigate = useNavigate();
  const idUni = uuidv4();
  const { user, setUser } = useContext(UserContext);
  const idRoom = uuidv4();  
  const { socket } = useContext(SocketContext);

  const handleUser = (data) => {
    setUser(data);
  };

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

  useEffect(() => {
    const item = localStorage.getItem("user");
    if (item) {
      handleUser(JSON.parse(item));
      navigate("/home");
    }
  }, []);

  const goToLobby = () => {
    // Perform logout logic if needed
    navigate("/lobby");
  };

  return (
    <div className="login-container">
      <Card
        className="card-login"
        sx={{
          width: "40%",
          minHeight: "75%",
          backgroundColor: "rgba(193, 193, 193, 0)",
          border: "none",
          boxShadow: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={logo} style={{ width: "45%", height: "45%" }} alt="Logo" />
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Grid item>
            <Button
              variant="contained"
              className="custom-button"
              style={{
                fontFamily: "Axiforma Heavy",
                backgroundColor: "#1D0F71",
                borderRadius: 0,
              }}
              onClick={handleModal}
            >
              CREATE ROOM
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={goToLobby}
              variant="contained"
              className="custom-button"
              style={{
                fontFamily: "Axiforma Heavy",
                backgroundColor: "#756BB1",
                borderRadius: 0,
              }}
            >
              EXPLORE ROOMS
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              className="custom-button"
              style={{
                fontFamily: "Axiforma Heavy",
                backgroundColor: "#503EB9",
                borderRadius: 0,
              }}
            >
              JOIN ROOM
            </Button>
          </Grid>
        </Grid>
        <Grid item> {/* Wrap the Dropdown component in a separate Grid container */}
          <Dropdown />
        </Grid>
      </Card>
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
              idRoom={idRoom}
            />
          </Dialog>
    </div>
  );
};
