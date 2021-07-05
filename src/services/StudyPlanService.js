import axios from "axios";
import authHeader from "./AuthHeader";

const server = axios.create({
  baseURL: `http://localhost:3000`,
});

export default {
  fetchStudyPlans() {
    return server.get("studyplans");
  },
  fetchStudyPlan(userId) {
    return server.get(`studyplan/${userId}`, { headers: authHeader() });
  },
  updateStudyPlan(studyPlan) {
    return server.put(`studyplan/${studyPlan._id}`, studyPlan, {
      headers: authHeader(),
    });
  },
};
