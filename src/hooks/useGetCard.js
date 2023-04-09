import React, { useState, useEffect } from "react";
import { getCards } from "../services/Cards/CardService";

export const useGetCard = () => {
  const [cards, setCards] = useState([]);

  const getCard = async () => {
    const newCards = await getCards();
    setCards(newCards);
  };
  useEffect(() => {
    getCard();
  }, []);

  return {
    cards: cards,
  };
};