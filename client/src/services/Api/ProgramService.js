import Api from "@/services/Api/Api";
import authHeader from "../AuthHeader";

export default {
  fetchPrograms() {
    return Api().get("programs", { headers: authHeader() });
  },
  fetchProgram(program, version) {
    version = version.replace(/\//g, "");
    return Api().get(`${program}/${version}`, { headers: authHeader() });
  },
};
