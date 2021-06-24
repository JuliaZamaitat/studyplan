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
          console.log(!response.data.semesterPlans);
          console.log(JSON.stringify(response.data.semesterPlans));
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
  async fillEmptyStudyPlanWithOfficalCourses({ rootGetters, commit }, userId) {
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
    console.log("before update");
    await StudyPlanService.updateStudyPlanOfUser(userId, state.studyPlan)
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
    //TODO
    const studyPlan = state.studyPlan;
    if (!studyPlan) return;
    console.log(studyPlan.semesterPlans);
    return studyPlan.semesterPlans;
  },
};
