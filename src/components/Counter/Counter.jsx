import React, { useEffect, useState, useContext } from "react";
import { SocketContext } from "../../context/SocketContext";
import "./Counter.scss";

export const Counter = ({ idRoom }) => {
  const [count, setCount] = useState(30);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on("temporizador", (value) => {
      console.log("value", value);
      setCount(value);
    });
  });

  useEffect(() => {
    const interval = setInterval(() => {
      socket.emit("decrementarTemporizador", { idRoom: idRoom });
    }, 1000);
  });
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCount((count) => (count === 0 ? 30 : count - 1));
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="counter-container">
      <h1 className="counter-text">{count}</h1>
    </div>
  );
};
