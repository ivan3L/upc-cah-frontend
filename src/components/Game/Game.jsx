import React, { useContext, useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { BlackCard } from "../BlackCard/BlackCard";
import { WhiteCard } from "../WhiteCard/WhiteCard";
import "./Game.scss";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useLocation } from "react-router-dom";
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
  const location = useLocation();
  const url = location.pathname;
  const idRoom = url.split("/")[2];

  

  useEffect(() => {
    if (resetGame) {
      console.log("reset-game-true")
      console.log("flag-czar-empieza-como", playerCzar)
      setSelectedCards([]);
      setSelectedCard(null);
      setCzarSelection(false);
      setResetGame(false);
      console.log("player",playerCzar)
      if (playerCzar) {
        console.log("RESETGAME2")
        setPlayerCzar(!playerCzar);
        socket.emit("start-game", { idRoom: idRoom });

      }
    }
  }, [resetGame]);

  socket.on("start-game", (game) => {
    console.log("START-GAME3",resetGame)
    setBlackCard(game.currentBlackCard);
    setWhiteCard(game.currentWhiteCards);
    setCorrectCard(game.currentCorrectWhiteCard);
    const { czar } = game;
    console.log("czar",czar)
    console.log("NAVEGADOR",user)

    //CZAR 
    //USUARIO
    setPzar(czar);
    if (czar.idUser == user.id) {
      setPlayerCzar(true);
    }
  });

  socket.on("start-czar-answer-selection", (selections) => {
    console.log("SELECTIONS",selections)
    setCzarSelection(true);
    setSelectedCards(selections);
  });

  const handleCardClick = (card) => {
    console.log(card);
    if (!playerCzar && !czarSelection) {
      //cuando eligen los jugadores
      setSelectedCard(card.id);
      socket.emit("answer-selection", {
        userId: user.id,
        idRoom: idRoom,
        whiteCard: card,
      });
      // Actualiza el estado con el ID de la tarjeta seleccionada
    } else if (playerCzar && czarSelection) {
      //Cuado elige el czar
      setSelectedCard(card.id);
      socket.emit("czar-answer-selection", {
        userId: user.id,
        idRoom: idRoom,
        whiteCard: card,
      });
    }
  };
  console.log("player2",playerCzar)

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
