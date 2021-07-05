import axios from "axios";
import authHeader from "./AuthHeader";

const server = axios.create({
  baseURL: `http://localhost:3000`,
});

export default {
  fetchSemesters() {
    return server.get("semesters", { headers: authHeader() });
  },
};
