import Api from "@/services/Api";

export default {
  fetchPrograms() {
    return Api().get("api/programs");
  },
  fetchProgram(code) {
    return Api().get("api/" + code);
  },
};
