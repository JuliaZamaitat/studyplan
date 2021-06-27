import axios from "axios";

const server = axios.create({
  baseURL: `http://localhost:3000`,
});

export default {
  fetchSemesters() {
    return server.get("semesters");
  },
};
