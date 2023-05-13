import axios from "axios";

let BASE_URL = "https://wtm-service-257373244.us-east-1.elb.amazonaws.com:8084";

export const getBlackCards = async () => {
  const { data } = await axios.get(`${BASE_URL}/black_card`);

  return data.data;
};

export const getWhiteCards = async () => {
  const { data } = await axios.get(`${BASE_URL}/white_card`);

  return data.data;
};
