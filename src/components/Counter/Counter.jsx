import React, { useEffect, useState } from "react";

export const Counter = () => {
  const [count, setCount] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((count) => (count === 0 ? 30 : count - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <h1>{count}</h1>;
};
