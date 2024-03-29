import axios from "axios";

let BASE_URL = "https://loadbalancer.wtm-upc.online:8084";
//let BASE_URL = "http://localhost:8080";

const RoomService = {
  createRoom: async (
    name,
    password,
    max_number_player,
    number,
    owner_id,
    identificador,
    rounds
  ) => {
    const body = {
      name,
      password,
      max_number_player,
      number,
      owner_id,
      identificador,
      rounds,
    };
    const { data } = await axios.post(`${BASE_URL}/room`, body);
    return data;
  },

  getRooms: async () => {
    const { data } = await axios.get(`${BASE_URL}/room`);
    return data;
  },
};

export default RoomService;
