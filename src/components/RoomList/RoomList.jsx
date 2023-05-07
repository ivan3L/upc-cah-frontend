import { handleBreakpoints } from "@mui/system";
import React, { useEffect, useState } from "react";
import { getRooms } from "../../api/getRooms";
import RoomService from "../../services/Room/roomService";
import { RoomItem } from "../RoomItem/RoomItem";

export const RoomList = () => {
  const [rooms, setrooms] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await RoomService.getRooms();
    setrooms(data);
  };

  return (
    <>
      {rooms.map((room) => (
        <RoomItem key={room.id} room={room} />
      ))}
    </>
  );
};
