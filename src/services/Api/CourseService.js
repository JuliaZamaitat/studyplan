import Api from "@/services/Api/Api";

export default {
  fetchCourses(program) {
    //program = "imi-b/v1"
    return Api().get(program);
  },
  fetchCourseWithSemester(program, code, semester) {
    code = code.replace(/\./g, "-").toLowerCase();
    return Api().get(`${program}/${code}/semester/${semester.toLowerCase()}`);
  },
  fetchCourseWithoutSemester(program, code) {
    code = code.replace(/\./g, "-").toLowerCase();
    return Api().get(`${program}/${code}`);
  },
};
