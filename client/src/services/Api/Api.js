import axios from "axios";
import url from "../url";

export default () => {
  return axios.create({
    baseURL: `${url.url}api/`,
  });
};
