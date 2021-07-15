import axios from "axios";

export default () => {
  let url;
  if (process.env.PRODUCTION) {
    url = "https://studyplan.herokuapp.com/api";
  } else {
    url = "http://localhost:3000/api";
  }
  return axios.create({
    baseURL: url,
  });
};
