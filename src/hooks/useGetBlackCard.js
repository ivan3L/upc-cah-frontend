import React, { useState, useEffect } from "react";
import { getBlackCards } from "../services/Cards/CardService";

export const useGeBlackCard = () => {
  const [blackCards, setBlackCards] = useState([]);

  const getBlackCard = async () => {
    const newCards = await getBlackCards();
    setBlackCards(newCards);
  };
  useEffect(() => {
    getBlackCard();
  }, []);

  return {
    blackCards: blackCards,
  };
};
