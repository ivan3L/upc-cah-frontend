import axios from "axios";

let BASE_URL = "https://loadbalancer.wtm-upc.online:8084";

export const getBlackCards = async () => {
  const { data } = await axios.get(`${BASE_URL}/black_card`);

  return data.data;
};

export const getWhiteCards = async () => {
  const { data } = await axios.get(`${BASE_URL}/white_card`);

  return data.data;
};
