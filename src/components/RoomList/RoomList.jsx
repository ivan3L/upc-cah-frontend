import { handleBreakpoints } from "@mui/system";
import React from "react";
import { getRooms } from "../../api/getRooms";
import { RoomItem } from "../RoomItem/RoomItem";

export const RoomList = () => {
  const rooms = getRooms();
  return (
    <>
        {rooms.map((room) => (
          <RoomItem key={room.id} room={room} />
        ))}
    </>
  );
};
