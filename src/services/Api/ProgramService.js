import Api from "@/services/Api/Api";
import authHeader from "../AuthHeader";

export default {
  fetchPrograms() {
    return Api().get("programs", { headers: authHeader() });
  },
  fetchProgram(code) {
    return Api().get(code, { headers: authHeader() });
  },
};
