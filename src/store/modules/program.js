import ProgramService from "@/services/ProgramService.js";

export const namespaced = true;

export const state = {
  programs: [],
  program: {},
  programsTotal: 0,
};

export const mutations = {
  SET_PROGRAMS(state, programs) {
    state.programs = programs;
  },
  SET_PROGRAMS_TOTAL(state, programsTotal) {
    state.programsTotal = programsTotal;
  },
  SET_PROGRAM(state, program) {
    state.program = program;
  },
};

export const actions = {
  fetchPrograms({ commit }) {
    ProgramService.fetchPrograms()
      .then((response) => {
        commit(
          "SET_PROGRAMS_TOTAL",
          parseInt(response.headers["x-total-count"])
        );
        commit("SET_PROGRAMS", response.data);
      })
      .catch((error) => {
        const notification = {
          type: "error",
          message: "There was a problem fetching programs: " + error.message,
        };
        console.log(notification);
      });
  },
  fetchProgram({ commit, getters }, code) {
    console.log("here");

    var program = getters.getProgramByCode(code);

    if (program) {
      commit("SET_PROGRAM", program);
    } else {
      ProgramService.fetchProgram(code)
        .then((response) => {
          commit("SET_PROGRAM", response.data);
        })
        .catch((error) => {
          const notification = {
            type: "error",
            message: "There was a problem fetching a program: " + error.message,
          };
          console.log(notification);
        });
    }
  },
};

export const getters = {
  getProgramByCode: (state) => (code) => {
    return state.programs.find((program) => program.code === code);
  },
};
