import axios from "axios";
import authHeader from "./AuthHeader";
import url from "./url";

const server = axios.create({
  baseURL: url.url,
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
  createStudyPlan(studyPlan) {
    return server.post(`studyplan/create`, studyPlan, {
      headers: authHeader(),
    });
  },
  deleteStudyPlan(studyPlan) {
    return server.delete(
      `studyplan/${studyPlan._id}`,
      {
        headers: authHeader(),
      },
      { studyPlan }
    );
  },
  saveToUser(studyPlan, userId) {
    return server.post(
      `studyplan/save`,
      { studyPlan, userId },
      {
        headers: authHeader(),
      }
    );
  },
};
