import axios from "axios";

const apiQuickCup = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  // headers: {
  //   Authorization: `${process.env.REACT_APP_GITHUB_TOKEN}`,
  //   "X-GitHub-Api-Version": "2022-11-28",
  // },
});

export default apiQuickCup;
