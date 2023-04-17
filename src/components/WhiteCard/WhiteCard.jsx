import React, { useContext, useState } from "react";
import { Card, Typography } from "@mui/material";
import logoBlack from "../../assets/logoBlack.png";
import { SocketContext } from "../../context/SocketContext";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useLocation } from "react-router-dom";
import CardFlip from "react-card-flip";
import "./WhiteCards.scss";

export const WhiteCard = ({
  playerCzar,
  whiteCard,
  handleCardClick,
  selectedCard,
  id,
}) => {
  const { socket } = useContext(SocketContext);
  const [user] = useLocalStorage("user");
  const location = useLocation();
  const url = location.pathname;
  const idRoom = url.split("/")[2];
  const [czarSelection, setCzarSelection] = useState(false);

  socket.on("start-czar-answer-selection", (cardsSelection) => {
    console.log("Czar-selection");
    setCzarSelection(true);
  });

  return (
    <div
      className={`selectable-card ${selectedCard === id ? "selected" : ""} ${
        czarSelection ? "rotate" : null
      }`}
    >
      <Card
        onClick={handleCardClick}
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
        {playerCzar && !czarSelection ? (
          <img
            className="logo-navbar"
            src={logoBlack}
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          <Typography sx={{ padding: 2, wordBreak: "break-word" }}>
            {whiteCard.answer}
          </Typography>
        )}
      </Card>
    </div>
  );
};
