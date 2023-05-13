import { SocketContext } from "./SocketContext";
import io from "socket.io-client";
import { useEffect, useState } from "react";

export const SocketProvider = ({ children }) => {
  const [socket, setsocket] = useState(null);

  useEffect(() => {
    const newSocket = io("https://wtm-service-257373244.us-east-1.elb.amazonaws.com:8084");
    setsocket(newSocket);
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
