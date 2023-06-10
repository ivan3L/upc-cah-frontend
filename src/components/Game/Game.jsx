import React, { useContext, useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { BlackCard } from "../BlackCard/BlackCard";
import { WhiteCard } from "../WhiteCard/WhiteCard";
import "./Game.scss";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useNavigate, useLocation } from "react-router-dom";
import { SocketContext } from "../../context/SocketContext";
// import { useGetCard } from "../../hooks/useGetBlackCard";

export const Game = ({ showCorrectCard, socket, resetGame, setResetGame }) => {
  const [correctCard, setCorrectCard] = useState({});
  const [selectedCards, setSelectedCards] = useState([]); //Todas las cartas que eligen los jugadores + la verdadera
  const [blackCard, setBlackCard] = useState({});
  const [whiteCard, setWhiteCard] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null); //Carta que elige 1 jugador
  const [playerCzar, setPlayerCzar] = useState(false);
  const [user] = useLocalStorage("user");
  const [czarSelection, setCzarSelection] = useState(false);
  const [Pzar, setPzar] = useState({});
  const [endingRound, setEndingRound] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const url = location.pathname;
  const idRoom = url.split("/")[2];

  useEffect(() => {
    if (resetGame) {
      setSelectedCards([]);
      setSelectedCard(null);
      setCzarSelection(false);
      setResetGame(false);
      setEndingRound(false);
      if (playerCzar) {
        setPlayerCzar(!playerCzar);
        socket.emit("start-game", { idRoom: idRoom });
      }
    }
  }, [resetGame]);

  socket.on("game-ended-show-final-scoreboard", (playersInRoom) => {
    navigate(`/scoreboard/${idRoom}`, {
      state: { data: { playersInRoom: playersInRoom } },
    });
  });

  socket.on("start-game", (game) => {
    console.log("START-GAME3", resetGame);
    setBlackCard(game.currentBlackCard);
    setWhiteCard(game.currentWhiteCards);
    setCorrectCard(game.currentCorrectWhiteCard);
    const { czar } = game;
    console.log("czar", czar);
    console.log("NAVEGADOR", user);

    //CZAR
    //USUARIO
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
    if (!playerCzar && !czarSelection) {
      //cuando eligen los jugadores
      setSelectedCard(card.id);
      socket.emit("answer-selection", {
        userId: user.id,
        idRoom: idRoom,
        whiteCard: card,
      });
      // Actualiza el estado con el ID de la tarjeta seleccionada
    } else if (playerCzar && czarSelection && !endingRound) {
      setEndingRound(true);
      setSelectedCard(card.id);
      socket.emit("czar-answer-selection", {
        userId: user.id,
        idRoom: idRoom,
        whiteCard: card,
      });
    }
  };

  return (
    <div className="game-container">
      <Typography
        variant="inherit"
        className="czar-text" // Add custom class name here
      >
        {Pzar &&
          `${Pzar.name}, el Zar, está eligiendo una respuesta...`.toUpperCase()}
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
                showCorrectCard={showCorrectCard}
                correct={card.is_correct}
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
              showCorrectCard={showCorrectCard}
              id={card.id}
            />
          ))}
    </div>
  );
};
