import React, { useContext, useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { BlackCard } from "../BlackCard/BlackCard";
import { WhiteCard } from "../WhiteCard/WhiteCard";
import "./Game.scss";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useLocation } from "react-router-dom";
import { SocketContext } from "../../context/SocketContext";
// import { useGetCard } from "../../hooks/useGetBlackCard";

export const Game = () => {
  const [correctCard, setCorrectCard] = useState({});
  const [selectedCards, setSelectedCards] = useState([]); //Todas las cartas que eligen los jugadores + la verdadera
  const [blackCard, setBlackCard] = useState({});
  const [whiteCard, setWhiteCard] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null); //Carta que elige 1 jugador
  const [playerCzar, setPlayerCzar] = useState(false);
  const [user] = useLocalStorage("user");
  const { socket } = useContext(SocketContext);
  const [czarSelection, setCzarSelection] = useState(false);
  const [Pzar, setPzar] = useState({});
  const location = useLocation();
  const url = location.pathname;
  const idRoom = url.split("/")[2];

  socket.on("start-game", (game) => {
    console.log("game", game);
    setBlackCard(game.currentBlackCard);
    setWhiteCard(game.currentWhiteCards);
    setCorrectCard(game.currentCorrectWhiteCard);
    const { czar } = game;
    setPzar(czar);
    if (czar.idUser == user.id) {
      setPlayerCzar(true);
    }
  });

  socket.on("start-czar-answer-selection", (selections) => {
    setCzarSelection(true);
    setSelectedCards(selections);
  });

  const handleCardClick = (card) => {
    console.log(card);
    if (!playerCzar && !czarSelection) {
      setSelectedCard(card.id);
      socket.emit("answer-selection", {
        userId: user.id,
        idRoom: idRoom,
        whiteCard: card,
      });
      // Actualiza el estado con el ID de la tarjeta seleccionada
    } else if (playerCzar && czarSelection) {
      setSelectedCard(card.id);
    }
  };

  return (
    <div className="game-container">
      <Typography
        variant="inherit"
        style={{
          fontWeight: 700,
          fontFamily: "Roboto",
          fontSize: 24,
          letterSpacing: "-0.015em",
          marginBottom: 4,
          width: "100%",
          textAlign: "center",
        }}
      >
        {Pzar && `${Pzar.name} is czar`}
      </Typography>

      <BlackCard blackCard={blackCard} />
      {czarSelection && playerCzar
        ? selectedCards && selectedCards.length > 0
          ? selectedCards.map((card) => (
              <WhiteCard
                key={card.id}
                playerCzar={playerCzar}
                whiteCard={card}
                handleCardClick={() => handleCardClick(card)}
                selectedCard={selectedCard}
                czarSelection={czarSelection}
                id={card.id}
              />
            ))
          : null
        : whiteCard &&
          whiteCard.length > 0 &&
          whiteCard.map((card) => (
            <WhiteCard
              key={card.id}
              playerCzar={playerCzar}
              whiteCard={card}
              handleCardClick={() => handleCardClick(card)}
              selectedCard={selectedCard}
              czarSelection={czarSelection}
              id={card.id}
            />
          ))}
    </div>
  );
};
