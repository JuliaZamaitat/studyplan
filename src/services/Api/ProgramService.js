import Api from "@/services/Api/Api";

export default {
  fetchPrograms() {
    return Api().get("programs");
  },
  fetchProgram(code) {
    return Api().get(code);
  },
};