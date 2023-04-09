import React, { useEffect, useState } from "react";
import { Card, Typography } from "@mui/material";
import logoBlack from '../../assets/logoBlack.png'

export const WhiteCard = ({playerCzar, whiteCard}) => {
  useEffect(() => {
    console.log("whiteCard123",whiteCard)
  }, [])
  
  const [animated, setAnimated] = useState(false);

  const handleClick = () => {
    console.log(animated);
    setAnimated(true);
    setTimeout(() => {
      setAnimated(false);
      console.log(animated);
    }, 1000);
  };
  return (
    <div
      className={`card ${animated ? "animate__animated animate__flash" : ""}`}
    >
      <Card
        onClick={handleClick}
        sx={{
          backgroundColor: "white",
          color: "black",
          height: 225,
          width: 175,
          borderRadius: 5,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignContent: "center",
          border: "1px solid black",
          margin: 1,
        }}
      >
        {playerCzar ? (<img className="logo-navbar" src={logoBlack} />) : (<Typography sx={{ padding: 2, wordBreak: "break-word" }}>
        {whiteCard.answer}
      </Typography>) }
        
      </Card>

    </div>
  );
};
