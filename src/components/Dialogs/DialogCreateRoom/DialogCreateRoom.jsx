import { FormControl, TextField } from "@mui/material";
import React, { useState } from "react";
import './DialogCreateRoom.scss'

export const DialogCreateRoom = () => {
  const [form, setform] = useState({
    nameRoom: "",
    Nplayers: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(form);
  };

  const handleChange = (event) => {
    setform({ [event.target.name]: event.target.value });
  };

  return (
    <div className="container-dialog-create-room">
      <form onSubmit={handleSubmit} className="form-create-room">
        <h1>Crear Room</h1>
        <hr/>
        <FormControl>
          <TextField
            label="Nombre del room"
            name="nameRoom"
            value={form.nameRoom}
            onChange={handleChange}
            style={{padding: 10}}
          />
        </FormControl>
        <FormControl>
          <TextField
            label="Numero de jugadores"
            name="Nplayers"
            value={form.Nplayers}
            onChange={handleChange}
            style={{padding: 10}}
          />
        </FormControl>
      </form>
    </div>
  );
};
