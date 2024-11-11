import axios from "axios";

const apiQuickCup = axios.create({
  baseURL: `${process.env.REACT_APP_QUICKCUP_API_URL}`,
  headers: {
    Authorization: `${process.env.REACT_APP_QUICKCUP_API_KEY}`,
  },
});

export default apiQuickCup;
