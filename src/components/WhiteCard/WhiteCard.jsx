import React, { useContext, useState } from "react";
import { Card, Typography, CardActions, IconButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
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
  czarSelection,
  showCorrectCard,
  correct,
  id,
}) => {
  console.log("czarSelection-WH", czarSelection);
  console.log("showCorrectCard-WH", showCorrectCard);
  const { socket } = useContext(SocketContext);
  const [user] = useLocalStorage("user");
  const location = useLocation();
  const url = location.pathname;
  const idRoom = url.split("/")[2];

  return (
    <div
      className={`selectable-card ${selectedCard === id ? "selected" : ""} ${
        czarSelection ? "rotate" : null
      }`}
      style={{ height: 245 }}
    >
      <Card
        onClick={() => {
          console.log("click");
          handleCardClick(whiteCard);
        }}
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
        {
          playerCzar && showCorrectCard && correct ? (
            <CardActions>
              <IconButton style={{ marginLeft: "auto", color: "black" }}>
                <CheckIcon sx={{ color: "black" }} />
              </IconButton>
            </CardActions>
          ) : null
          // <CardActions>
          //   <IconButton style={{ marginLeft: "auto", color: "black" }}>
          //     <CloseIcon sx={{ color: "black" }} />
          //   </IconButton>
          // </CardActions>
        }
      </Card>
    </div>
  );
};
