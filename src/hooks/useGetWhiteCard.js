import React, { useState, useEffect } from "react";
import { getWhiteCards } from "../services/Cards/CardService";

export const useGeWhiteCard = () => {
  const [whiteCards, setWhiteCards] = useState([]);

  const getWhiteCard = async () => {
    const newCards = await getWhiteCards();
    setWhiteCards(newCards);
  };
  useEffect(() => {
    getWhiteCard();
  }, []);

  return {
    whiteCards: whiteCards,
  };
};
