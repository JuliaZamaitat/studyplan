import axios from "axios";
import authHeader from "./AuthHeader";
// let url;
// if (process.env.NODE_ENV == "production") {
//   url = "https://studyplan.herokuapp.com";
// } else {
//   url = "http://localhost:3000";
// }

const server = axios.create({
  baseURL: "https://studyplan.herokuapp.com/",
});

export default {
  fetchSemesters() {
    return server.get("semesters", { headers: authHeader() });
  },
};
