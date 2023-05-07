import React, { useEffect, useState } from "react";
import "./Counter.scss";

export const Counter = ({ showCorrectCard }) => {
  const [count, setCount] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((count) => (count === 0 ? 30 : count - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="counter-container">
      <h1 className="counter-text">{count}</h1>
    </div>
  );
};
