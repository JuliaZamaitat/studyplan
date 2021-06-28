import Api from "@/services/Api/Api";

export default {
  fetchCourses(program) {
    //program = "imi-b/v1"
    return Api().get(program);
  },
  fetchCourse(program, code, semester) {
    return Api().get(
      `${program}/${code.toLowerCase()}/semester/${semester.toLowerCase()}`
    );
  },
};
