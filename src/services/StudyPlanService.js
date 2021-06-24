import axios from "axios";

const server = axios.create({
  baseURL: `http://localhost:3000`,
});

export default {
  fetchStudyPlans() {
    return server.get("studyplans");
  },
  fetchStudyPlan(userId) {
    return server.get(`studyplan/${userId}`);
  },
  updateStudyPlanOfUser(userId, studyPlan) {
    console.log("StudyPlan", studyPlan);
    return server.put(`studyplan/${userId}`, studyPlan);
  },
};
