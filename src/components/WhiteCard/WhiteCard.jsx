import React, { useContext, useState } from "react";
import {
  Card,
  Typography,
  CardActions,
  IconButton,
  CardContent,
} from "@mui/material";

import logoBlack from "../../assets/question.png";
import check from "../../assets/check.png";
import equis from "../../assets/equis.png";
import { useLocation } from "react-router-dom";
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
  const location = useLocation();
  const url = location.pathname;
  return (
    <Card
      className={`selectable-card ${selectedCard === id ? "selected" : ""} ${
        czarSelection ? "rotate" : null
      }`}
      onClick={() => {
        console.log("click");
        handleCardClick(whiteCard);
      }}
      sx={{
        backgroundColor: "white",
        color: "black",
        height: 250,
        width: 200,
        borderRadius: 0,
        border: "4px solid black",
        margin: 1,
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          alignContent: playerCzar && !czarSelection ? "flex-end" : undefined,
          height: "165px",
          paddingTop: "30px",
        }}
      >
        {playerCzar && !czarSelection ? (
          <img
            className="logo-navbar"
            src={logoBlack}
            style={{ width: "60%", height: "85%" }}
          />
        ) : (
          <Typography
            sx={{
              wordBreak: "break-word",
              fontFamily: "Axiforma Heavy, sans-serif",
            }}
          >
            {whiteCard.answer}
          </Typography>
        )}
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignContent: "flex-end",
        }}
      >
        {playerCzar && showCorrectCard && correct ? (
          <img src={check} height={"30px"} width={"30px"} />
        ) : (
          <></>
        )}
        {playerCzar && showCorrectCard && !correct && selectedCard == id ? (
          <img src={equis} height={"30px"} width={"30px"} />
        ) : (
          <></>
        )}
      </CardActions>
    </Card>
  );
};
