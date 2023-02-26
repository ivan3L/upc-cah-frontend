import {
  FormControl,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  InputAdornment,
  Button,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, { useState } from "react";
import "./DialogCreateRoom.scss";
import RoomService from "../../../services/Room/roomService";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export const DialogCreateRoom = ({ createRoomSocket }) => {
  const navigate = useNavigate();
  const idUni = uuidv4();

  const [form, setform] = useState({
    id: idUni,
    name: "",
    password: "",
    max_number_player: "",
    number: "1",
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
      form.id
    );
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
    navigate(`/room/${form.id}`);
  };

  return (
    <div className="container-dialog-create-room">
      <form onSubmit={handleSubmit} className="form-create-room">
        <h1>Crear Room</h1>
        <hr />
        <FormControl>
          <TextField
            id="outlined-size-small"
            size="small"
            label="Nombre de la sala"
            name="name"
            value={form.name}
            onChange={handleChange}
            style={{ padding: 10, width: 350 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
            }}
          />
        </FormControl>
        <FormControl>
          <TextField
            id="outlined-size-small"
            size="small"
            label="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            style={{ padding: 10, width: 350 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
            }}
          />
          <InputLabel
            variant="standard"
            htmlFor="uncontrolled-native"
            style={{ position: "relative", marginLeft: 15 }}
          >
            N° de jugadores
          </InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={form.max_number_player}
            onChange={handleChange}
            name="max_number_player"
            label="N° de jugadores"
            size="small"
            style={{ width: 150, marginLeft: 10 }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>10</MenuItem>
          </Select>
          <Button
            onClick={handleClick}
            variant="contained"
            style={{ margin: 10 }}
            endIcon={<SendIcon />}
          >
            Aceptar
          </Button>
        </FormControl>
      </form>
    </div>
  );
};
