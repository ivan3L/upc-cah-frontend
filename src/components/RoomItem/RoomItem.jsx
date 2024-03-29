import {
  Card,
  CardActions,
  Dialog,
  Box,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import "./RoomItem.scss";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import imagen from "../../assets/WTM Logo.png";
import "./RoomItem.scss";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { DialogPassword } from "../../components/Dialogs/DialogPassword/DialogPassword";
import { SocketContext } from "../../context/SocketContext";
import { UserContext } from "../../context/UserContext";
import useLocalStorage from "../../hooks/useLocalStorage";

export const RoomItem = ({ room }) => {
  const { socket } = useContext(SocketContext);
  const [user] = useLocalStorage("user");
  const navigate = useNavigate();
  const [openModal, setopenModal] = useState(false);
  const [players, setplayers] = useState([]);
  const handleModal = () => {
    setopenModal(!openModal);
  };
  return (
    <>
      <Card
        className="card-room-item"
        sx={{ boxShadow: "none", border: "1px solid black" }}
        onClick={() => {
          socket.emit("join-room", {
            idRoom: room.identificador,
            user,
            owner: false,
          });
          room.private
            ? handleModal()
            : navigate(`/room/${room.identificador}`);
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {room.name}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              Numero de Sala: #{room.id}
            </Typography>
            <Link to="/room123"></Link>
          </CardContent>
          {room.private ? (
            <CardActions>
              <LockIcon />
            </CardActions>
          ) : (
            <CardActions>
              <LockOpenIcon />
            </CardActions>
          )}
        </Box>
        <CardMedia
          component="img"
          sx={{
            width: "50%",
            height: "100%",
            objectFit: "contain",
          }}
          image={imagen}
          alt="Live from space album cover"
        />
      </Card>
      <Dialog
        open={openModal}
        onClose={handleModal}
        className="animate__animated animate__backInDown"
      >
        <DialogPassword room={room} />
      </Dialog>
    </>
  );
};
