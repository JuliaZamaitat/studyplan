import CourseService from "@/services/Api/CourseService.js";

export const namespaced = true;

export const state = {
  courses: [],
  course: {},
};

export const mutations = {
  SET_COURSES(state, courses) {
    state.courses = courses;
  },
  SET_COURSE(state, course) {
    state.course = course;
  },
  SET_PENDING(state, status) {
    state.pending = status;
  },
};

export const actions = {
  async fetchCourse(
    { state, commit, getters },
    { program, version, code, semester }
  ) {
    //ask for the semester route -> if there is a 404, so no semester info is there yet,
    // check the basic vuex course state
    try {
      commit("SET_PENDING", true);
      if (!semester) {
        //no semester given, only in component 'example-studyplan'
        var savedCourse = getters.getCourseByCode(code); //take the basic stored course
        if (!savedCourse) {
          const response = await CourseService.fetchCourse(
            program,
            version,
            code
          );
          let course = response.data;
          let courses = state.courses || [];
          courses.push(response.data);
          commit("SET_COURSES", courses);
          commit("SET_COURSE", course);
          console.log(state.course);
        } else if (savedCourse) {
          commit("SET_COURSE", savedCourse);
        }
      } else {
        await CourseService.fetchCourseWithSemester(
          program,
          version,
          code,
          semester
        )
          .then((response) => {
            commit("SET_COURSE", response.data); //don't save the course to vuex, because we don't save the semester versions
          })
          .catch(async (error) => {
            if (error.response.status == 404) {
              //there is no semester information yet, so fetching and saving the basic course
              await CourseService.fetchCourse(program, version, code)
                .then((response) => {
                  let courses = state.courses || [];
                  courses.push(response.data);
                  commit("SET_COURSE", response.data);
                  commit("SET_COURSES", courses);
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
            } else {
              const notification = {
                type: "error",
                message:
                  "There was a problem fetching course with code " +
                  code +
                  ": " +
                  error.message,
              };
              console.log(notification);
            }
          });
      }
    } finally {
      commit("SET_PENDING", false);
    }
  },
};

export const getters = {
  getCourseByCode: (state) => (code) => {
    if (!state.courses) return;
    return state.courses.find((course) => course.course.code === code);
  },
};
