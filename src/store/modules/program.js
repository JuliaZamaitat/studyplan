import ProgramService from "@/services/Api/ProgramService.js";

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
  async fetchPrograms({ commit }) {
    await ProgramService.fetchPrograms()
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
  async fetchProgram({ commit, getters }, code) {
    var program = getters.getProgramByCode(code);
    if (program) {
      commit("SET_PROGRAM", program);
      console.log("not fetching program");
    } else {
      await ProgramService.fetchProgram(code)
        .then((response) => {
          commit("SET_PROGRAM", response.data);
          console.log("recieved data", response.data.courses);
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
    //TODO later save all programs in programs and search this array
    // return state.programs.find((program) => program.code === code);
    if (!state.program.code) return;
    if (state.program.code.toLowerCase() + "/1" === code) return state.program;
  },
  courses: (state) => {
    const courses = state.program.courses;
    console.log("getter", courses);
    if (!courses) return;
    return courses.sort(function (a, b) {
      //sort in ascending order
      var lowerCaseA = a.code.match(/\d+/)[0];
      var lowerCaseB = b.code.match(/\d+/)[0];
      return lowerCaseA - lowerCaseB;
    });
  },
  semester: (state, getters) => {
    const courses = getters.courses;
    if (!courses) return;
    const semester = [];
    for (let i in getters.courses) {
      let semesterCount = getters.courses[i].semester;
      if (semester.indexOf(semesterCount) == -1) semester.push(semesterCount);
    }
    return semester.sort();
  },
  officialCoursesInSemester: (state, getters) => {
    const semester = getters.semester;
    if (!semester) return;
    const coursesInSemester = {};
    for (let i in getters.semester) {
      if (getters.semester[i] == 0) continue; //ohne Wahlpflichtfächer
      let courses = [];
      for (let y in getters.courses) {
        if (getters.courses[y].code.includes(".")) continue; //ohne B20.1, also required Submodule
        if (getters.semester[i] == getters.courses[y].semester)
          courses.push(getters.courses[y]);
      }
      coursesInSemester[getters.semester[i]] = courses;
    }
    return coursesInSemester;
  },
};
