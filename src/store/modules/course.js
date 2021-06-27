import CourseService from "@/services/Api/CourseService.js";

export const namespaced = true;

export const state = {
  courses: [],
  course: {},
  coursesTotal: 0,
};

export const mutations = {
  SET_COURSES(state, courses) {
    state.courses = courses;
  },
  SET_COURSES_TOTAL(state, coursesTotal) {
    state.coursesTotal = coursesTotal;
  },
  SET_COURSE(state, course) {
    state.course = course;
  },
};

export const actions = {
  getCourses({ commit, rootGetters }) {
    const courses = rootGetters["program/courses"];
    if (!courses) return;
    commit("SET_COURSES_TOTAL", courses.length);
    commit("SET_COURSES", courses);
  },
  async fetchCourse({ commit, getters }, { program, code }) {
    var course = getters.getCourseByCode(code);
    if (course) {
      commit("SET_COURSE", course);
    } else {
      await CourseService.fetchCourse(program, code)
        .then((response) => {
          commit("SET_COURSE", response.data);
          console.log(state.course);
        })
        .catch((error) => {
          const notification = {
            type: "error",
            message:
              "There was a problem fetching course with code " +
              code +
              ": " +
              error.message,
          };
          console.log(notification);
        });
    }
  },
  clearCourse({ commit }) {
    commit("SET_COURSE", {});
  },
};

export const getters = {
  getCourseByCode: (state) => (code) => {
    return state.courses.find((course) => course.code === code);
  },
};
