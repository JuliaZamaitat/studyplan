import Api from "@/services/Api/Api";
import authHeader from "../AuthHeader";

export default {
  fetchCourseWithSemester(program, version, code, semester) {
    code = code.replace(/\./g, "-").toLowerCase();
    semester = semester.replace(/\//g, "");
    program = program.replace(/\//g, "");
    version = version.replace(/\//g, "");
    return Api().get(
      `${program}/${version}/${code}/semester/${semester.toLowerCase()}`,
      {
        headers: authHeader(),
      }
    );
  },
  fetchCourseWithoutSemester(program, version, code) {
    code = code.replace(/\./g, "-").toLowerCase();
    program = program.replace(/\//g, "");
    version = version.replace(/\//g, "");
    return Api().get(`${program}/${version}/${code}`, {
      headers: authHeader(),
    });
  },
};
