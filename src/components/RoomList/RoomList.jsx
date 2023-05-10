import { handleBreakpoints } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { getRooms } from "../../api/getRooms";
import RoomService from "../../services/Room/roomService";
import { RoomItem } from "../RoomItem/RoomItem";
import { RoomContext } from "../../context/RoomContext";
import { SocketContext } from "../../context/SocketContext";

export const RoomList = () => {
  const { rooms, addRoom } = useContext(RoomContext);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    // fetchData();
    socket.emit("getRooms");
  }, []);

  socket.on("getRooms", (data) => {
    addRoom(data.data);
    console.log("socketdata", data);
  });

  // const fetchData = async () => {
  //   const { data } = await RoomService.getRooms();
  //   addRoom(data);
  // };

  console.log("rooms", rooms);
  return (
    <>
      {rooms
        ? rooms.map((room) => <RoomItem key={room.id} room={room} />)
        : null}
    </>
  );
};
