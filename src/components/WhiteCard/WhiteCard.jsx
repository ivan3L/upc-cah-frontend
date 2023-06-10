import React, { useContext, useState } from "react";
import {
  Card,
  Typography,
  CardActions,
  IconButton,
  CardContent,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import logoBlack from "../../assets/WTM Logo.png";
import check from "../../assets/check.png";
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
  const { socket } = useContext(SocketContext);
  const [user] = useLocalStorage("user");
  const location = useLocation();
  const url = location.pathname;
  const idRoom = url.split("/")[2];
  return (
    <div
      className={`selectable-card ${selectedCard === id ? "selected" : ""} ${
        czarSelection ? "rotate" : "rotate"
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
          borderRadius: 0,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignContent: "center",
          border: "4px solid black",
          margin: 1,
        }}
      >
        <CardContent>
          {playerCzar && !czarSelection ? (
            <img
              className="logo-navbar"
              src={logoBlack}
              style={{ width: "90%", height: "auto" }}
            />
          ) : (
            <Typography sx={{ padding: 2, wordBreak: "break-word" }}>
              {whiteCard.answer}
            </Typography>
          )}
        </CardContent>
        {playerCzar && showCorrectCard && correct ? (
          <CardActions height={"25px"}>
            <img src={check} height={"30px"} width={"30px"} />
          </CardActions>
        ) : (
          <></>
        )}
      </Card>
    </div>
  );
};
