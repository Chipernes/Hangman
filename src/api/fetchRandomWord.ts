import axios from "axios";

export const fetchRandomWord = async () => {
    const {data} = await axios.get<string[]>('https://random-word-api.herokuapp.com/word');

    return data[0];
}