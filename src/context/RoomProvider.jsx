import { useEffect, useState } from "react";
import { RoomContext } from "./RoomContext";
import RoomService from "../services/Room/roomService";

export const RoomProvider = ({ children }) => {
  const [rooms, setRoom] = useState([]);

  const addRoom = (newRoom) => {
    console.log("newRoom", newRoom);
    if (Array.isArray(newRoom)) {
      console.log("1");
      setRoom(newRoom);
    } else {
      console.log("2");
      setRoom((prevRooms) =>
        Array.isArray(prevRooms) ? [...prevRooms, newRoom] : [newRoom]
      );
    }
  };
  console.log(" Rooms", rooms);
  return (
    <RoomContext.Provider value={{ rooms, addRoom }}>
      {children}
    </RoomContext.Provider>
  );
};
