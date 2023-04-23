import { SocketContext } from "./SocketContext";
import io from "socket.io-client";
import { useEffect, useState } from "react";

export const SocketProvider = ({ children }) => {
  const [socket, setsocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:8080");
    setsocket(newSocket);
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
