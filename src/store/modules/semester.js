import SemesterService from "@/services/SemesterService.js";

export const namespaced = true;

export const state = {
  semesters: [],
  semester: {},
  semestersTotal: 0,
};

export const mutations = {
  SET_SEMESTERS(state, semesters) {
    state.semesters = semesters;
  },
  SET_SEMESTERS_TOTAL(state, semestersTotal) {
    state.semestersTotal = semestersTotal;
  },
  // SET_SEMESTER(state, semester) {
  //   state.semester = semester;
  // },
};

export const actions = {
  async fetchSemesters({ commit }) {
    await SemesterService.fetchSemesters()
      .then((response) => {
        commit(
          "SET_SEMESTERS_TOTAL",
          parseInt(response.headers["x-total-count"])
        );
        commit("SET_SEMESTERS", response.data);
      })
      .catch((error) => {
        const notification = {
          type: "error",
          message: "There was a problem fetching semesters: " + error.message,
        };
        console.log(notification);
      });
  },
};

export const getters = {
  getSemesterByName: (state) => (name) => {
    return state.semesters.find((semester) => semester.name === name);
  },
  getSemesters: (state) => {
    return state.semesters;
  },
};
