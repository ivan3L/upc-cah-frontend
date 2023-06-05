import {
  FormControl,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  InputAdornment,
  Button,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, { useContext, useState } from "react";
import "./DialogCreateRoom.scss";
import RoomService from "../../../services/Room/roomService";
import { Form, useNavigate } from "react-router-dom";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { RoomContext } from "../../../context/RoomContext";
import { SocketContext } from "../../../context/SocketContext";

export const DialogCreateRoom = ({ createRoomSocket, idRoom }) => {
  const [user] = useLocalStorage("user");
  const navigate = useNavigate();
  const { addRoom } = useContext(RoomContext);
  const { socket } = useContext(SocketContext);

  const [form, setform] = useState({
    id: user.id,
    name: "",
    password: "",
    max_number_player: "",
    number: "1",
    rounds: 0,
    owner_id: "1",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    setform({ ...form, [event.target.name]: event.target.value });
  };

  const createRoomDB = async () => {
    await RoomService.createRoom(
      form.name,
      form.password,
      form.max_number_player,
      form.number,
      form.owner_id,
      idRoom,
      form.rounds
    );
    socket.emit("getRooms");
  };

  const handleClick = async () => {
    createRoomDB();
    //manejo de error
    createRoomSocket(
      form.id,
      form.name,
      form.password,
      form.max_number_player,
      form.number,
      form.owner_id
    );
    navigate(`/room/${idRoom}`, {
      state: { rounds: form.rounds, number_player: form.max_number_player },
    });
  };

  return (
    <div className="container-dialog-create-room">
      <form onSubmit={handleSubmit} className="form-create-room">
        <div style={{ textAlign: "center" }}>
          <Typography
            variant="h4"
            component="h1"
            align="center"
            style={{
              fontFamily: "Axiforma Heavy",
              color: "#8E85FF",
              WebkitTextStroke: "2px black",
              textStroke: "1px black",
              marginTop: "10px",
              fontWeight: "bold",
              marginBottom: "15px",
            }}
          >
            Create Room
          </Typography>
        </div>
        <FormControl>
          <TextField
            id="outlined-size-small"
            size="small"
            label="Room Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            style={{ padding: 0, width: 350, marginBottom: 30 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
            }}
          />
          <TextField
            id="outlined-size-small"
            size="small"
            label="Password (optional)"
            name="password"
            value={form.password}
            onChange={handleChange}
            style={{ padding: 0, width: 350 }}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
            }}
          />
        </FormControl>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "10px", // Added gap between the elements
          }}
        >
          <FormControl>
            <InputLabel
              variant="standard"
              htmlFor="uncontrolled-native"
              style={{
                position: "relative",
                fontSize: "12px",
                marginLeft: "8px",
              }}
            >
              Max Players
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={form.max_number_player}
              onChange={handleChange}
              name="max_number_player"
              label="N° de jugadores"
              size="small"
              style={{ width: 170, margin: 0 }}
            >
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel
              variant="standard"
              htmlFor="uncontrolled-native"
              style={{
                position: "relative",
                fontSize: "12px",
                marginLeft: "8px",
              }}
            >
              Rounds
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={form.rounds || ""}
              onChange={handleChange}
              name="rounds"
              label="N° de rondas"
              size="small"
              style={{ width: 170, margin: 0 }}
              required
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={38}>38</MenuItem>
            </Select>
          </FormControl>
        </div>

        <FormControl style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ textAlign: "center" }}>
            <Button
              variant="contained"
              className="custom-button"
              style={{
                fontFamily: "Axiforma Heavy",
                backgroundColor: "#503EB9",
                borderRadius: 0,
                margin: 20,
              }}
              onClick={handleClick}
            >
              Create
            </Button>
          </div>
        </FormControl>
      </form>
    </div>
  );
};
