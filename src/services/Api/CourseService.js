import Api from "@/services/Api/Api";
import authHeader from "../AuthHeader";

export default {
  fetchCourses(program) {
    //program = "imi-b/v1"
    return Api().get(program);
  },
  fetchCourseWithSemester(program, code, semester) {
    code = code.replace(/\./g, "-").toLowerCase();
    return Api().get(`${program}/${code}/semester/${semester.toLowerCase()}`, {
      headers: authHeader(),
    });
  },
  fetchCourseWithoutSemester(program, code) {
    code = code.replace(/\./g, "-").toLowerCase();
    return Api().get(`${program}/${code}`, { headers: authHeader() });
  },
};
