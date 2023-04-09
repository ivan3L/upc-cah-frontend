import axios from "axios";

let BASE_URL = "http://localhost:8080";

export const getCards = async() =>{
    const {data} = await axios.get(`${BASE_URL}/black_card`)

    return data.data
}

