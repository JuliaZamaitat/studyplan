/* eslint-disable no-unused-vars */
import StudyPlanService from "@/services/StudyPlanService.js";

export const namespaced = true;

export const state = {
  studyPlans: [],
  studyPlan: {},
  studyPlansTotal: 0,
};
export const mutations = {
  SET_STUDYPLANS(state, studyPlans) {
    state.studyPlans = studyPlans;
  },
  SET_STUDYPLANS_TOTAL(state, studyPlansTotal) {
    state.studyPlansTotal = studyPlansTotal;
  },
  SET_STUDYPLAN(state, studyPlan) {
    state.studyPlan = studyPlan;
  },
};

export const actions = {
  async fetchStudyPlans({ commit }) {
    await StudyPlanService.fetchStudyPlans()
      .then((response) => {
        commit(
          "SET_STUDYPLANS_TOTAL",
          parseInt(response.headers["x-total-count"])
        );
        commit("SET_STUDYPLANS", response.data);
      })
      .catch((error) => {
        const notification = {
          type: "error",
          message: "There was a problem fetching studyplans: " + error.message,
        };
        console.log(notification);
      });
  },
  async fetchStudyPlan({ commit, dispatch, getters }, userId) {
    var studyPlan = getters.getStudyPlanByUserId(userId);
    if (studyPlan) {
      commit("SET_STUDYPLAN", studyPlan);
    } else {
      await StudyPlanService.fetchStudyPlan(userId)
        .then((response) => {
          commit("SET_STUDYPLAN", response.data);
          if (
            !response.data.semesterPlans ||
            response.data.semesterPlans.length === 0
          ) {
            dispatch("fillEmptyStudyPlanWithOfficalCourses", userId);
          }
        })
        .catch((error) => {
          const notification = {
            type: "error",
            message:
              "There was a problem fetching a studyplan: " + error.message,
          };
          console.log(notification);
        });
    }
  },

  async updateStudyPlan({ state, commit }) {
    await StudyPlanService.updateStudyPlan(state.studyPlan)
      .then((response) => {
        commit("SET_STUDYPLAN", response.data);
      })
      .catch((error) => {
        const notification = {
          type: "error",
          message: "There was a problem updating a studyplan: " + error.message,
        };
        console.log(notification);
      });
  },
  async fillEmptyStudyPlanWithOfficalCourses(
    { rootGetters, dispatch },
    userId
  ) {
    const officialCoursesInSemester =
      rootGetters["program/officialCoursesInSemester"];
    for (let semester in officialCoursesInSemester) {
      const courseCodes = [];
      for (let course in officialCoursesInSemester[semester]) {
        courseCodes.push({
          code: officialCoursesInSemester[semester][course].code,
          name: officialCoursesInSemester[semester][course].name,
          ects: officialCoursesInSemester[semester][course].ects,
        });
      }
      const obj = {
        currentSemesterCount: semester,
        semester: "",
        plannedCourses: courseCodes,
      };

      state.studyPlan.semesterPlans.push(obj);
    }
    await dispatch("updateStudyPlan", userId);
  },
  async moveCourse(
    { dispatch },
    { fromCourses, fromCourseIndex, toCourses, toCourseIndex }
  ) {
    const courseToMove = fromCourses.splice(fromCourseIndex, 1)[0];
    if (toCourseIndex == undefined) {
      toCourses.push(courseToMove);
      return;
    }

    toCourses.splice(toCourseIndex, 0, courseToMove);
    await dispatch("updateStudyPlan");
  },
  async addSemester({ state, dispatch }) {
    let semesterPlans = state.studyPlan.semesterPlans;
    semesterPlans.push({
      currentSemesterCount:
        semesterPlans[semesterPlans.length - 1].currentSemesterCount + 1,
      semester: "",
      plannedCourses: [],
    });
    await dispatch("updateStudyPlan");
  },
  async deleteSemester({ state, dispatch }, { semesterIndex }) {
    let semesterPlans = state.studyPlan.semesterPlans;
    semesterPlans.splice(semesterIndex, 1);
    for (let i = semesterIndex; i < semesterPlans.length; i++) {
      semesterPlans[i].currentSemesterCount -= 1;
    }
    await dispatch("updateStudyPlan");
  },
};

export const getters = {
  getStudyPlanByUserId: (state) => (userId) => {
    return state.studyPlans.find((studyPlan) => studyPlan.userId === userId);
  },
  myCourses: (state) => {
    //TODO
    const semesterPlans = state.studyPlan.semesterPlans;
    if (!semesterPlans) return;
  },
  myCoursesInSemester: () => {
    const studyPlan = state.studyPlan;
    if (!studyPlan) return;
    return studyPlan.semesterPlans;
  },
};
