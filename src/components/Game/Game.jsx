import React, { useContext, useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { BlackCard } from "../BlackCard/BlackCard";
import { WhiteCard } from "../WhiteCard/WhiteCard";
import "./Game.scss";
import useLocalStorage from "../../hooks/useLocalStorage";
import { SocketContext } from "../../context/SocketContext";
import { useGetCard } from "../../hooks/useGetCard";

export const Game = () => {
  const { cards } = useGetCard();
  const [deckCards, setDeckCards] = useState([]);
  const [blackCard, setBlackCard] = useState([]);
  const [whiteCard, setWhiteCard] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [playerCzar, setPlayerCzar] = useState(false);
  const [user] = useLocalStorage("user");
  const { socket } = useContext(SocketContext);

  socket.on("start-game", (game) => {
    const { czar } = game;
    if (czar.idUser == user.id) {
      console.log("czar", czar.idUser);
      setPlayerCzar(true);
    }
  });

  useEffect(() => {
    setDeckCards(cards);
    setBlackCard((prevBlackCard) => {
      const newBlackCard = cards[0];
      return newBlackCard;
    });
    setWhiteCard((prevWhiteCard) => {
      const newWhiteCard = cards.slice(1);
      return newWhiteCard;
    });
  }, [cards]);

  const handleCardClick = (cardId) => {
    if (!playerCzar) {
      setSelectedCard(cardId); // Actualiza el estado con el ID de la tarjeta seleccionada
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
        IPORTENIU IS THE CZAR
      </Typography>

      <BlackCard blackCard={blackCard} />
      {whiteCard[0] &&
        whiteCard[0].length > 0 &&
        whiteCard[0].map((card) => {
          return (
            <WhiteCard
              key={card.id}
              playerCzar={playerCzar}
              whiteCard={card}
              handleCardClick={() => handleCardClick(card.id)}
              selectedCard={selectedCard}
              id={card.id}
            />
          );
        })}
    </div>
  );
};
