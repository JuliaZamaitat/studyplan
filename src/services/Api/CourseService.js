import Api from "@/services/Api/Api";

export default {
  fetchCourses(program) {
    //program = "imi-b/v1"
    return Api().get(program);
  },
  fetchCourse(program, code) {
    return Api().get(`${program}/${code.toLowerCase()}`);
  },
};
