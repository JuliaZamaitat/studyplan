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
          console.log("fetching");
          commit("SET_STUDYPLAN", response.data);
          if (
            !response.data.semesterPlans ||
            response.data.semesterPlans.length === 0
          ) {
            console.log("dispatching");
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
    let helperArrayForSemesterPlans = [];
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
      helperArrayForSemesterPlans.push(obj);
    }
    state.studyPlan.semesterPlans = assignSemestersToSemesterPlans(
      rootGetters["semester/getSemesters"],
      helperArrayForSemesterPlans
    );
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
  async addSemester({ state, dispatch, rootGetters }) {
    let semesterPlans = state.studyPlan.semesterPlans;
    const semesters = rootGetters["semester/getSemesters"].slice();
    let semesterToAdd;

    //adding the semester name to semesterPlan
    for (let i = 0; i < semesters.length; i++) {
      if (
        semesters[i].name ===
        semesterPlans[semesterPlans.length - 1].semester.name
      ) {
        semesterToAdd = semesters.splice(i + 1, 1);
        break;
      }
    }
    semesterPlans.push({
      currentSemesterCount:
        semesterPlans[semesterPlans.length - 1].currentSemesterCount + 1,
      semester: semesterToAdd[0],
      plannedCourses: [],
    });
    await dispatch("updateStudyPlan");
  },
  async deleteSemester({ state, dispatch }, { semesterIndex }) {
    let semesterPlans = state.studyPlan.semesterPlans;
    const removed = semesterPlans.splice(semesterIndex, 1);
    //change semester names
    var newSemesterName = removed[0].semester.name;
    for (let i = semesterIndex; i < semesterPlans.length; i++) {
      semesterPlans[i].currentSemesterCount -= 1;
      let oldSemesterName = semesterPlans[i].semester.name;
      semesterPlans[i].semester.name = newSemesterName;
      newSemesterName = oldSemesterName;
    }
    await dispatch("updateStudyPlan");
  },
};

export const getters = {
  getStudyPlanByUserId: (state) => (userId) => {
    return state.studyPlans.find((studyPlan) => studyPlan.userId === userId);
  },
  myCoursesInSemester: () => {
    const studyPlan = state.studyPlan;
    if (!studyPlan) return;
    return studyPlan.semesterPlans;
  },
};

function assignSemestersToSemesterPlans(semesters, semesterPlans) {
  const startOfStudy = "SoSe15"; //TODO change to query from user
  for (let i in semesters) {
    if (semesters[i].name === startOfStudy) {
      semesters = semesters.splice(i);
      break;
    }
  }
  for (let i = 0; i < semesterPlans.length; i++) {
    semesterPlans[i].semester = semesters[i];
  }
  return semesterPlans;
}
