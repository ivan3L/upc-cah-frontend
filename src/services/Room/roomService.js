import axios from "axios";

let BASE_URL = "http://localhost:8080";

const RoomService = {
  createRoom: async (
    name,
    password,
    max_number_player,
    number,
    owner_id,
    identificador
  ) => {
    const body = {
      name,
      password,
      max_number_player,
      number,
      owner_id,
      identificador,
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
