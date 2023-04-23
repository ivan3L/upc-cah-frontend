import React, { useContext, useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { BlackCard } from "../BlackCard/BlackCard";
import { WhiteCard } from "../WhiteCard/WhiteCard";
import "./Game.scss";
import useLocalStorage from "../../hooks/useLocalStorage";
import { SocketContext } from "../../context/SocketContext";
// import { useGetCard } from "../../hooks/useGetBlackCard";

export const Game = () => {
  // const { cards } = useGetCard();
  const [deckCards, setDeckCards] = useState([]);
  const [blackCard, setBlackCard] = useState([]);
  const [whiteCard, setWhiteCard] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [playerCzar, setPlayerCzar] = useState(false);
  const [user] = useLocalStorage("user");
  const { socket } = useContext(SocketContext);
  const [czarSelection, setCzarSelection] = useState(false);
  const [Pzar, setPzar] = useState({});

  socket.on("start-game", (game) => {
    const { czar } = game;
    setPzar(czar);
    if (czar.idUser == user.id) {
      setPlayerCzar(true);
    }
  });

  socket.on("start-czar-answer-selection", (cardsSelection) => {
    setCzarSelection(true);
  });

  useEffect(() => {
    setDeckCards(cards);
    setBlackCard((prevBlackCard) => {
      const newBlackCard = cards[0];
      return newBlackCard;
    });
    setWhiteCard((prevWhiteCard) => {
      console.log("cards", cards);
      const WhiteCard = cards.slice(1);
      if (WhiteCard.length > 0) {
        console.log("WhiteCard", WhiteCard);
        const indexCardIsCorrect = WhiteCard[0].findIndex(
          (card) => card.is_correct == true
        );
        const CardCorrect = WhiteCard[0][indexCardIsCorrect];
        WhiteCard[0].splice(indexCardIsCorrect, 1);
      }
      const newWhiteCard = WhiteCard;
      console.log("newWhiteCard", newWhiteCard);
      return newWhiteCard;
    });
  }, [cards]);

  const handleCardClick = (cardId) => {
    if (!playerCzar && !czarSelection) {
      setSelectedCard(cardId); // Actualiza el estado con el ID de la tarjeta seleccionada
    } else if (playerCzar && czarSelection) {
      setSelectedCard(cardId);
    }
  };

  console.log("Pzar", Pzar);
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
              czarSelection={czarSelection}
              id={card.id}
            />
          );
        })}
    </div>
  );
};
